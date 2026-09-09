const fs = require('fs');
const path = require('path');

const viMap = {
  'page_1.jpg': 'Giới Thiệu Trà Cổ Thụ Đặc Sản Việt Nam.jpg',
  'page_2.jpg': 'Bích Sa Trà.jpg',
  'page_3.jpg': 'Bạch Vân Trà.jpg',
  'page_4.jpg': 'Hoàng Nha Trà.jpg',
  'page_5.jpg': 'Huyền Động Trà.jpg',
  'page_6.jpg': 'Hồng Dương Trà.jpg',
  'page_7.jpg': 'Lục Tuyền Trà.jpg',
  'page_8.jpg': 'Ngọc Sương Trà.jpg',
  'page_9.jpg': 'Phi Trang Trà.jpg',
  'page_10.jpg': 'Cách Pha Trà Bằng Ấm.jpg',
  'page_11.jpg': 'Cách Pha Trà Pour-over hoặc Phin-cafe.jpg',
  'page_12.jpg': 'Lưu Ý.jpg'
};

const enMap = {
  'page_1.jpg': 'Vietnam Specialty Teas Introduction.jpg',
  'page_2.jpg': 'Navi Sand Tea.jpg',
  'page_3.jpg': 'White Cloud Tea.jpg',
  'page_4.jpg': 'Yellow Syrupt Tea.jpg',
  'page_5.jpg': 'Black Cavern Tea.jpg',
  'page_6.jpg': 'Pink Sunshine Tea.jpg',
  'page_7.jpg': 'Green Cascade Tea.jpg',
  'page_8.jpg': 'Turquoise Brume Tea.jpg',
  'page_9.jpg': 'Purple Field Tea.jpg',
  'page_10.jpg': 'INDIGENOUS BREWING.jpg',
  'page_11.jpg': 'MODERN POUR-OVER OR PHIN-FILTER.jpg',
  'page_12.jpg': 'IMPORTANT NOTICE.jpg'
};

const viSrc = 'd:/SOURCES/tamling/scratch/hd_vi';
const viDest = 'd:/SOURCES/tamling/public/images/Sản phẩm/Tiếng Việt/Trà cổ thụ đặc sản Việt Nam';

const enSrc = 'd:/SOURCES/tamling/scratch/hd_en';
const enDest = 'd:/SOURCES/tamling/public/images/Sản phẩm/English/Vietnamese specialty teas';

console.log("Copying 2400px Ultra HD images to Vietnamese tea folder...");
Object.keys(viMap).forEach(page => {
  const s = path.join(viSrc, page);
  const d = path.join(viDest, viMap[page]);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    const sz = (fs.statSync(d).size / 1024).toFixed(2);
    console.log(`  ✓ Updated ${viMap[page]} (${sz} KB - 2400px HD)`);
  }
});

console.log("\nCopying 2400px Ultra HD images to English tea folder...");
Object.keys(enMap).forEach(page => {
  const s = path.join(enSrc, page);
  const d = path.join(enDest, enMap[page]);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    const sz = (fs.statSync(d).size / 1024).toFixed(2);
    console.log(`  ✓ Updated ${enMap[page]} (${sz} KB - 2400px HD)`);
  }
});

console.log("\nAll 2400px Ultra HD images copied successfully!");
