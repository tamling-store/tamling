const { execSync } = require('child_process');
const path = require('path');

const pdfPath = 'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam/Trà cổ thụ đặc sản Việt Nam.pdf';
const b64 = Buffer.from(pdfPath).toString('base64');

const ps = `
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null

$Path = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64}'))
$file = [Windows.Storage.StorageFile]::GetFileFromPathAsync($Path).Await()
$doc = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file).Await()
Write-Host "Page Count: $($doc.PageCount)"
`;

// Run script using PowerShell with WinRT extension
const wrapperPs = `
$code = @"
using System;
using System.Threading.Tasks;
using Windows.Data.Pdf;
using Windows.Storage;

public class PdfHelper {
    public static async Task<int> GetPageCount(string path) {
        StorageFile file = await StorageFile.GetFileFromPathAsync(path);
        PdfDocument doc = await PdfDocument.LoadFromFileAsync(file);
        return (int)doc.PageCount;
    }
}
"@
`;

console.log("Testing Windows WinRT PdfDocument native API...");
try {
  const psCmd = `
    Add-Type -AssemblyName System.Runtime.WindowsRuntime
    $Path = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64}'))
    $asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation\`1' }
    $fileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($Path)
    $fileTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Storage.StorageFile]).Invoke($null, @($fileOp))
    $fileTask.Wait()
    $file = $fileTask.Result
    $docOp = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
    $docTask = $asTaskGeneric[0].MakeGenericMethod([Windows.Data.Pdf.PdfDocument]).Invoke($null, @($docOp))
    $docTask.Wait()
    $doc = $docTask.Result
    Write-Host "SUCCESS: PDF Pages = $($doc.PageCount)"
  `;
  const b64Ps = Buffer.from(psCmd, 'utf16le').toString('base64');
  const out = execSync(`powershell -EncodedCommand ${b64Ps}`).toString();
  console.log(out);
} catch(e) {
  console.error("Error testing WinRT PDF:", e.message);
}
