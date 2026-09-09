const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const viPdf = 'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam/Trà cổ thụ đặc sản Việt Nam.pdf';
const viOut = 'd:/SOURCES/tamling/scratch/hd_vi';

const enPdf = 'd:/SOURCES/tamling/public/images/Sản phẩm/English/Vietnamese specialty teas/Vietnam Specialty TEAS.pdf';
const enOut = 'd:/SOURCES/tamling/scratch/hd_en';

[viOut, enOut].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const viPdfB64 = Buffer.from(viPdf).toString('base64');
const viOutB64 = Buffer.from(viOut).toString('base64');
const enPdfB64 = Buffer.from(enPdf).toString('base64');
const enOutB64 = Buffer.from(enOut).toString('base64');

console.log("Extracting 2800px Ultra HD pages from Vietnamese PDF...");
execSync(`powershell -ExecutionPolicy Bypass -Command ". 'd:\\SOURCES\\tamling\\scratch\\extract_hd.ps1'; Render-PdfPagesB64 -PdfPathB64 '${viPdfB64}' -OutDirB64 '${viOutB64}' -TargetWidth 2800"`, { stdio: 'inherit' });

console.log("\nExtracting 2800px Ultra HD pages from English PDF...");
execSync(`powershell -ExecutionPolicy Bypass -Command ". 'd:\\SOURCES\\tamling\\scratch\\extract_hd.ps1'; Render-PdfPagesB64 -PdfPathB64 '${enPdfB64}' -OutDirB64 '${enOutB64}' -TargetWidth 2800"`, { stdio: 'inherit' });

console.log("\nHD PDF Extraction complete!");
