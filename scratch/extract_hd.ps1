$ErrorActionPreference = 'Stop'
[void][Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
[void][Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
[void][Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
[void][Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime]

Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing

function Render-PdfPagesB64 {
    param(
        [string]$PdfPathB64,
        [string]$OutDirB64,
        [int]$TargetWidth = 2800
    )

    $PdfPath = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($PdfPathB64))
    $OutDir = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($OutDirB64))

    if (-not (Test-Path $OutDir)) {
        New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
    }

    $asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' }
    $asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' }
    
    $fileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($PdfPath)
    $fileTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Storage.StorageFile]).Invoke($null, @($fileOp))
    $fileTask.Wait()
    $file = $fileTask.Result

    $docOp = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
    $docTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Data.Pdf.PdfDocument]).Invoke($null, @($docOp))
    $docTask.Wait()
    $doc = $docTask.Result

    Write-Host "Extracting PDF ($($doc.PageCount) pages) at $TargetWidth px HD resolution..."

    $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 94L)

    for ($i = 0; $i -lt $doc.PageCount; $i++) {
        $page = $doc.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
        $options.DestinationWidth = $TargetWidth

        $renderOp = $page.RenderToStreamAsync($stream, $options)
        $renderTask = $asTaskAction[0].Invoke($null, @($renderOp))
        $renderTask.Wait()

        $stream.Seek(0)
        $netStream = $stream.AsStreamForRead()
        $origImg = [System.Drawing.Image]::FromStream($netStream)

        $w = $origImg.Width
        $h = $origImg.Height

        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.DrawImage($origImg, 0, 0, $w, $h)

        $pageNum = $i + 1
        $targetFile = [System.IO.Path]::Combine($OutDir, "page_$pageNum.jpg")
        $bmp.Save($targetFile, $jpegEncoder, $ep)

        $g.Dispose()
        $bmp.Dispose()
        $origImg.Dispose()
        $netStream.Dispose()
        $stream.Dispose()
        $page.Dispose()
        Write-Host "Saved Page $pageNum -> $w x $h"
    }
}
