const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const viPdf = 'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam/Trà cổ thụ đặc sản Việt Nam.pdf';
const viOut = 'd:/SOURCES/tamling/scratch/hd_vi';

const enPdf = 'd:/SOURCES/tamling/public/images/Sản phẩm/English/Vietnamese specialty teas/Vietnam Specialty TEAS.pdf';
const enOut = 'd:/SOURCES/tamling/scratch/hd_en';

[viOut, enOut].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const psScript = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$code = @"
using System;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Threading.Tasks;

public class PdfHdExtractor {
    public static async Task Extract(string pdfPath, string outDir, int targetWidth) {
        var file = await Windows.Storage.StorageFile.GetFileFromPathAsync(pdfPath);
        var doc = await Windows.Data.Pdf.PdfDocument.LoadFromFileAsync(file);
        
        ImageCodecInfo jpegEncoder = null;
        foreach (var codec in ImageCodecInfo.GetImageEncoders()) {
            if (codec.MimeType == "image/jpeg") {
                jpegEncoder = codec;
                break;
            }
        }
        var encoderParams = new EncoderParameters(1);
        encoderParams.Param[0] = new EncoderParameter(Encoder.Quality, 92L);

        for (uint i = 0; i < doc.PageCount; i++) {
            using (var page = doc.GetPage(i))
            using (var stream = new Windows.Storage.Streams.InMemoryRandomAccessStream()) {
                var options = new Windows.Data.Pdf.PdfPageRenderOptions();
                options.DestinationWidth = (uint)targetWidth;
                await page.RenderToStreamAsync(stream, options);
                
                using (var netStream = System.IO.WindowsRuntimeStreamExtensions.AsStreamForRead(stream))
                using (var rawImg = Image.FromStream(netStream)) {
                    int w = rawImg.Width;
                    int h = rawImg.Height;
                    using (var bmp = new Bitmap(w, h))
                    using (var g = Graphics.FromImage(bmp)) {
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.SmoothingMode = SmoothingMode.HighQuality;
                        g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                        g.CompositingQuality = CompositingQuality.HighQuality;
                        g.DrawImage(rawImg, 0, 0, w, h);
                        
                        string outFile = Path.Combine(outDir, string.Format("page_{0}.jpg", i + 1));
                        bmp.Save(outFile, jpegEncoder, encoderParams);
                        Console.WriteLine("Saved: " + outFile + " (" + w + "x" + h + " px)");
                    }
                }
            }
        }
    }
}
"@

$refs = @(
    "System.Drawing",
    "System.Runtime.WindowsRuntime",
    "$([Object].Assembly.Location | Split-Path)\\System.Runtime.WindowsRuntime.dll",
    "C:\\Windows\\System32\\WinMetadata\\Windows.Data.Pdf.winmd",
    "C:\\Windows\\System32\\WinMetadata\\Windows.Storage.winmd"
)

try {
    Add-Type -TypeDefinition $code -ReferencedAssemblies $refs -Language CSharp
} catch {
    # Fallback to dynamic execution if winmd refs differ
    Write-Host "Assembly load note: " $_
}
`;

console.log("Preparing HD PDF extraction script...");
fs.writeFileSync('d:/SOURCES/tamling/scratch/ps_extract.ps1', psScript, 'utf8');

// Run via C# / PowerShell
const viPdfB64 = Buffer.from(viPdf).toString('base64');
const viOutB64 = Buffer.from(viOut).toString('base64');
const enPdfB64 = Buffer.from(enPdf).toString('base64');
const enOutB64 = Buffer.from(enOut).toString('base64');

const runPs = `
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing

function Render-PdfPages {
    param([string]$PdfB64, [string]$OutB64, [int]$TargetWidth = 2800)
    $PdfPath = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($PdfB64))
    $OutDir = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($OutB64))
    
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

    Write-Host "Extracting PDF ($($doc.PageCount) pages) at $TargetWidth px HD resolution to $OutDir..."

    $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

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

        $targetFile = [System.IO.Path]::Combine($OutDir, "page_$($i + 1).jpg")
        $bmp.Save($targetFile, $jpegEncoder, $ep)

        $g.Dispose()
        $bmp.Dispose()
        $origImg.Dispose()
        $netStream.Dispose()
        $stream.Dispose()
        $page.Dispose()
        Write-Host "  └─ Saved Page $($i + 1): $targetFile ($w x $h px)"
    }
}

Render-PdfPages -PdfB64 '${viPdfB64}' -OutB64 '${viOutB64}' -TargetWidth 2800
Render-PdfPages -PdfB64 '${enPdfB64}' -OutB64 '${enOutB64}' -TargetWidth 2800
`;

const b64RunPs = Buffer.from(runPs, 'utf16le').toString('base64');
try {
  const out = execSync(`powershell -EncodedCommand ${b64RunPs}`).toString();
  console.log(out);
} catch(e) {
  console.error("Error during HD PDF extraction:", e.message);
}
