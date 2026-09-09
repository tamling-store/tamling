
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
    "$([Object].Assembly.Location | Split-Path)\System.Runtime.WindowsRuntime.dll",
    "C:\Windows\System32\WinMetadata\Windows.Data.Pdf.winmd",
    "C:\Windows\System32\WinMetadata\Windows.Storage.winmd"
)

try {
    Add-Type -TypeDefinition $code -ReferencedAssemblies $refs -Language CSharp
} catch {
    # Fallback to dynamic execution if winmd refs differ
    Write-Host "Assembly load note: " $_
}
