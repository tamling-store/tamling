const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const pdfPath = 'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam/Trà cổ thụ đặc sản Việt Nam.pdf';
const outPath = 'd:/SOURCES/tamling/scratch/test_page0_2400.jpg';
const b64Pdf = Buffer.from(pdfPath).toString('base64');
const b64Out = Buffer.from(outPath).toString('base64');

const psCmd = `
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing

$PdfPath = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64Pdf}'))
$OutPath = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64Out}'))

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation\`1' }
$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' }

$fileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($PdfPath)
$fileTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Storage.StorageFile]).Invoke($null, @($fileOp))
$fileTask.Wait()
$file = $fileTask.Result

$docOp = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
$docTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Data.Pdf.PdfDocument]).Invoke($null, @($docOp))
$docTask.Wait()
$doc = $docTask.Result

Write-Host "Total Pages: $($doc.PageCount)"

# Render Page 0 at 2400px width
$page = $doc.GetPage(0)
$stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
$options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
$options.DestinationWidth = 2400

$renderOp = $page.RenderToStreamAsync($stream)
$renderTask = $asTaskAction[0].Invoke($null, @($renderOp))
$renderTask.Wait()

# Convert WinRT stream to System.Drawing.Bitmap
$stream.Seek(0)
$netStream = $stream.AsStreamForRead()
$origImg = [System.Drawing.Image]::FromStream($netStream)

# Resize to 2400px HD with High Quality Bicubic
$w = $origImg.Width
$h = $origImg.Height
$targetW = 2400
$targetH = [int]($h * ($targetW / $w))

$bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($origImg, 0, 0, $targetW, $targetH)

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$bmp.Save($OutPath, $jpegEncoder, $ep)

$g.Dispose()
$bmp.Dispose()
$origImg.Dispose()
$netStream.Dispose()
$stream.Dispose()

$info = Get-Item $OutPath
Write-Host "Rendered Page 0 -> Size: $($info.Length / 1KB) KB, Width: $targetW px"
`;

const b64Ps = Buffer.from(psCmd, 'utf16le').toString('base64');
try {
  const out = execSync(`powershell -EncodedCommand ${b64Ps}`).toString();
  console.log(out);
} catch(e) {
  console.error("Error:", e.message);
}
