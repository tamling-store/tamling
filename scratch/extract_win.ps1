
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
        [int]$TargetWidth = 2400
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

    for ($i = 0; $i -lt $doc.PageCount; $i++) {
        $page = $doc.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
        $options.DestinationWidth = $TargetWidth

        $renderOp = $page.RenderToStreamAsync($stream, $options)
        $renderTask = $asTaskAction[0].Invoke($null, @($renderOp))
        $renderTask.Wait()

        $stream.Seek(0)
        $netStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream)
        $rawImg = [System.Drawing.Image]::FromStream($netStream)
        
        $targetFile = [System.IO.Path]::Combine($OutDir, "page_$($i + 1).jpg")

        $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 93L)

        $rawImg.Save($targetFile, $jpegEncoder, $ep)

        $rawImg.Dispose()
        $netStream.Dispose()
        $stream.Dispose()
        $page.Dispose()
        
        $fInfo = Get-Item $targetFile
        Write-Host "Saved Page $($i + 1) -> $targetFile ($($fInfo.Length / 1KB) KB)"
    }
}

Render-PdfPagesB64 -PdfPathB64 'ZDpcU09VUkNFU1x0YW1saW5nXHB1YmxpY1xpbWFnZXNcU+G6o24gcGjhuqltXFRp4bq/bmcgVmnhu4d0XFRyw6AgY+G7lSB0aOG7pSDEkeG6t2Mgc+G6o24gVmnhu4d0IE5hbVxUcsOgIGPhu5UgdGjhu6UgxJHhurdjIHPhuqNuIFZp4buHdCBOYW0ucGRm' -OutDirB64 'ZDpcU09VUkNFU1x0YW1saW5nXHNjcmF0Y2hcaGRfdmk=' -TargetWidth 2400
Render-PdfPagesB64 -PdfPathB64 'ZDpcU09VUkNFU1x0YW1saW5nXHB1YmxpY1xpbWFnZXNcU+G6o24gcGjhuqltXEVuZ2xpc2hcVmlldG5hbWVzZSBzcGVjaWFsdHkgdGVhc1xWaWV0bmFtIFNwZWNpYWx0eSBURUFTLnBkZg==' -OutDirB64 'ZDpcU09VUkNFU1x0YW1saW5nXHNjcmF0Y2hcaGRfZW4=' -TargetWidth 2400
