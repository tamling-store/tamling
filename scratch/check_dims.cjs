const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam',
  'd:/SOURCES/tamling/public/images/Sản phẩm/English/Vietnamese specialty teas'
];

for (const dir of dirs) {
  console.log('\n--- Directory:', dir);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const b64 = Buffer.from(fullPath).toString('base64');
    const ps = `
      Add-Type -AssemblyName System.Drawing
      $Path = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${b64}'))
      $img = [System.Drawing.Image]::FromFile($Path)
      Write-Host "$file -> $($img.Width) x $($img.Height) px, HorizontalRes: $($img.HorizontalResolution) dpi"
      $img.Dispose()
    `;
    const b64Ps = Buffer.from(ps, 'utf16le').toString('base64');
    try {
      const out = execSync(`powershell -EncodedCommand ${b64Ps}`).toString().trim();
      console.log(out);
    } catch(e) {
      console.error('Error:', file);
    }
  }
}
