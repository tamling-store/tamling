const fs = require('fs');
const path = require('path');

// Target file in workspace
const outFile = 'd:/SOURCES/tamling/src/data/reviewsData.js';

// Ensure directory exists
const dir = path.dirname(outFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Product definitions
const PRODUCTS = [
  { id: 'bich-sa', name: 'Bích Sa Trà', category: 'specialtyTea', type: 'Lục trà cổ thụ' },
  { id: 'bach-van', name: 'Bạch Vân Trà', category: 'specialtyTea', type: 'Bạch trà cổ thụ' },
  { id: 'hoang-nha', name: 'Hoàng Nha Trà', category: 'specialtyTea', type: 'Hồng trà cổ thụ' },
  { id: 'huyen-dong', name: 'Huyền Động Trà', category: 'specialtyTea', type: 'Phổ nhĩ chín cổ thụ' },
  { id: 'hong-duong', name: 'Hồng Dương Trà', category: 'specialtyTea', type: 'Hồng trà cổ thụ' },
  { id: 'luc-tuyen', name: 'Lục Tuyền Trà', category: 'specialtyTea', type: 'Lục trà suối cổ thụ' },
  { id: 'ngoc-suong', name: 'Ngọc Sương Trà', category: 'specialtyTea', type: 'Phổ nhĩ sống cổ thụ' },
  { id: 'phi-trang', name: 'Phi Trang Trà', category: 'specialtyTea', type: 'Trà lá già cổ thụ' },
  { id: 'gom-hoat-khoang', name: 'Gốm hoạt khoáng hữu cơ Việt Nam', category: 'ceramic', type: 'Gốm sứ khoáng' },
  { id: 'nhang-thien', name: 'Nhang Thiền', category: 'incense', type: 'Thảo mộc thiền' },
  { id: 'tra-duong-sinh', name: 'Trà thảo mộc dưỡng sinh hàng ngày', category: 'wellnessTea', type: 'Trà thảo mộc' },
  { id: 'dung-dich-thao-moc', name: 'Dung dịch thảo mộc làm sạch ngoài da', category: 'herbalBath', type: 'Dưỡng sinh ngoài da' }
];

// Review templates per product type
const REVIEW_TEMPLATES = {
  'Bích Sa Trà': [
    "Hương thơm thanh khiết của mây núi sương sớm. Nước trà vàng xanh trong trẻo, nhấp một ngụm cảm nhận vị chát dịu và hậu ngọt lắng sâu.",
    "Lần đầu tiên thưởng thức loại lục trà cổ thụ có chiều sâu đến vậy. Vị trà thuần khiết, pha đến nước thứ 5 vẫn đượm hương.",
    "Sản phẩm búp trà rất đều và đẹp. Uống vào buổi sáng giúp tinh thần tỉnh táo, nhẹ nhàng mà không hề gây cồn ruột.",
    "The green tea broth is crystalline pale jade. Fresh, vegetal, with a stunning honeyed aftertaste that lingers gracefully.",
    "A masterclass in specialty green tea. Extremely smooth with zero bitter astringency. Rebrews wonderfully over 6 steeps.",
    "Trà thơm mùi cỏ sương núi cao, vị ngọt đượm ở cuống họng. Đóng gói hộp rất trang nhã làm quà tặng.",
    "As a green tea enthusiast from Kyoto, I am amazed by the clean mineral depth and delicate fragrance of Bich Sa Tra.",
    "Màu nước trà ươm vàng đẹp mắt. Thưởng trà cùng tri kỷ vào ngày mưa thực sự là một trải nghiệm bình yên tuyệt vời.",
    "Hương vị tươi mới của núi rừng Tây Bắc. Vị chát nhẹ thoảng qua rồi nhường chỗ cho vị ngọt hậu quyến rũ.",
    "Trà ngon vượt mong đợi. Búp trà xoắn chặt, khi nở trong ấm tỏa hương thơm thanh nhã làm say đắm lòng người.",
    "Crisp, refined, and deeply satisfying. Perfect afternoon tea for quiet contemplation.",
    "Nước trà thanh trong, hậu vị kéo dài rất lâu. Gia đình tôi ai cũng khen nước trà ngọt đậm đà tự nhiên.",
    "Excellent craft tea! The dry leaf aroma alone is breathtaking, and the liquor feels silky and soothing."
  ],
  'Bạch Vân Trà': [
    "Bạch trà cổ thụ thượng hạng, lá trà phủ lớp lông nhung trắng muốt. Nước trà màu vàng nhạt thanh khiết, vị ngọt như mật hoa dại.",
    "Vị trà dịu nhẹ, thanh mát và vô cùng tinh tế. Uống vào thấy cơ thể thư thái, nhẹ nhàng như tan vào mây trời.",
    "White tea of extraordinary quality. The liquor is soft, floral, and naturally sweet without any harshness.",
    "Trà bạch vân có hương hoa rừng thanh nhã. Rất thích hợp để thưởng thức vào những buổi chiều yên tĩnh đọc sách.",
    "Lông tuyết trên búp trà rất dày, chứng tỏ trà được thu hái từ những cây cổ thụ đỉnh núi cao ngút ngàn.",
    "Delicate, silky, and rich in antioxidants. My daily choice for mindfulness and inner calm.",
    "Bạch trà giữ trọn vẹn sự thuần khiết của thiên nhiên. Pha nước ấm 85 độ là dậy mùi thơm hoa quả chín dịu dịu.",
    "Một loại trà dưỡng tâm tuyệt vời. Vị ngọt thanh thanh lan tỏa khắp khoang miệng sau mỗi ngụm trà.",
    "Astonishing elegance! Notes of dried wildflowers and fresh mountain air. Absolutely world-class white tea.",
    "Cảm giác thư thái dịu êm ngay từ ngụm đầu tiên. Rất thích hợp cho người thích vị trà nhẹ nhàng thanh thoát.",
    "Búp trà đẹp như một tác phẩm nghệ thuật. Nước trà càng uống càng thấy ngọt hậu đằm thắm.",
    "The delicate taste is unforgettable. Very soothing for evening tea sessions.",
    "Bạch Vân Trà cho hương thơm thuần khiết tự nhiên, không hóa chất, vị hậu kéo dài khiến người thưởng trà vấn vương."
  ],
  'Hoàng Nha Trà': [
    "Hồng trà cổ thụ búp vàng óng ả. Nước trà màu đỏ hổ phách sánh mịn, hương thơm mật ngào ngạt quyến rũ.",
    "Vị hồng trà ngọt đậm đà, thoảng hương trái cây chín và mật ô long. Pha với nước sôi nồng nàn thơm nức cả phòng.",
    "Stunning amber liquor with a rich, malted honey aroma. One of the finest black teas I have ever tasted.",
    "Trà búp vàng Hoàng Nha có hậu vị rất sâu, ngọt lịm ở cổ họng. Thích hợp uống cả mùa đông lẫn mùa hè.",
    "A blend of luxury and warmth. The sweet fruity aroma fills the whole room during brewing.",
    "Hoàng Nha Trà vị đậm mà êm ái, không hề chát đắng. Màu nước đỏ cam lấp lánh dưới ánh đèn vô cùng sang trọng.",
    "Lần đầu tiên thử hồng trà từ búp cổ thụ Việt Nam và hoàn toàn bị chinh phục bởi độ êm mượt và thơm ngọt.",
    "Rich, smooth, with subtle dried longan and wild honey undertones. Truly a regal tea experience.",
    "Hương thơm ngào ngạt như mật hoa dại. Uống trà này cùng bánh ngọt vào buổi chiều là tuyệt vời nhất.",
    "Trà ngon xuất sắc! Nước trà sánh đậm, vị ngọt mật lưu lại rất lâu sau khi uống.",
    "Deep warming character. Perfect for cold mornings or relaxing evening tea rituals.",
    "Hồng trà tôm búp cao cấp, cánh trà vàng ươm. Hương vị nồng nàn đẳng cấp xứng đáng với tên gọi Hoàng Nha.",
    "The natural amber sheen and comforting warm sweetness make this my absolute favorite tea."
  ],
  'Huyền Động Trà': [
    "Phổ nhĩ chín cổ thụ chất lượng đỉnh cao. Nước trà màu đỏ trầm ruby sánh như rượu vang, hương trầm gỗ thoảng êm dịu.",
    "Vị trà rất mượt, êm bộc và ấm áp. Uống vào thấy dạ dày dễ chịu, cơ thể ấm áp ngay lập tức.",
    "Exceptional ripe Puerh! Earthy, smooth, camphor notes with a velvety texture that glides down effortlessly.",
    "Trà được lên men chuẩn mực, không hề có mùi ẩm mốc. Hương thơm gỗ trầm và vị ngọt hậu lưu luyến.",
    "Deeply grounding and digestive-soothing. I drink this every night after dinner for smooth digestion.",
    "Huyền Động Trà có màu nước đỏ đậm lộng lẫy. Pha được hơn 10 nước mà vị vẫn đằm thắm êm ái.",
    "Rich, woody, and comforting. The medicinal soothing quality of this aged tea is undeniable.",
    "Uống Huyền Động Trà cảm nhận sự thâm trầm của thời gian và cây trà cổ thụ ngàn năm. Rất đáng giá.",
    "Trà vị êm ru, ngọt hậu đậm. Dùng sau bữa ăn giúp tiêu hóa cực tốt và ngủ rất ngon.",
    "Remarkable complexity! Notes of aged oak, sweet root, and subtle cacao. Highly recommended.",
    "Nước trà đậm sánh như mật, không một chút chát đắng. Một phẩm trà phổ nhĩ chín tuyệt hảo.",
    "Trà ngon, êm bụng, hương thơm trầm ấm dễ chịu. Sẽ ủng hộ Tamling lâu dài.",
    "The smooth earthy body is incredibly relaxing. Perfect for winter days."
  ],
  'Hồng Dương Trà': [
    "Hồng trà cổ thụ lá mây đỏ hồng rực rỡ. Vị ngọt như trái cây chín đượm nồng hương hoa hồng dại.",
    "Màu nước trà đỏ tươi lấp lánh. Vị ngọt hậu kéo dài, mượt mà và tròn vị.",
    "A vibrant red tea with delightful citrus and floral honey highlights. Pure perfection in every sip.",
    "Hương thơm quyến rũ độc đáo khác biệt hẳn các loại hồng trà thông thường. Đậm đà mà thanh thoát.",
    "So aromatic and uplifting! The naturally sweet berry-like finish makes it a joy to brew.",
    "Trà Hồng Dương uống ấm áp lòng người. Bạn bè đến chơi nhà ai cũng khen trà thơm ngọt lạ kỳ.",
    "Gorgeous amber-red infusion. The fragrance of mountain blossom and ripe fruit is intoxicating.",
    "Lựa chọn tuyệt vời cho quà biếu đối tác. Bao bì sang trọng, phẩm trà thượng hạng.",
    "Vị ngọt thanh tự nhiên, thoảng hương vỏ cam khô và mật ong. Càng uống càng mê.",
    "Exquisite craft tea! Bright, fruity, and elegantly structured.",
    "Nước trà thơm nức, vị ngọt lưu lại rất lâu trên đầu lưỡi. Thật sự ấn tượng với dòng trà này.",
    "Trà rất đậm đà, pha được nhiều nước mà hương vị vẫn nguyên vẹn như ngụm đầu.",
    "Pure mountain sunshine captured in a cup. Outstanding aroma and soothing taste."
  ],
  'Lục Tuyền Trà': [
    "Lục trà suối cổ thụ thanh mát như dòng suối tinh khiết đỉnh núi. Vị chát nhẹ thanh nhã, vị ngọt bộc lộ ngay sau đó.",
    "Nước trà xanh trong như ngọc bích. Uống một ngụm thấy sảng khoái toàn thân, xua tan mọi mệt mỏi.",
    "Crisp, vibrant green tea with a clean mineral finish like fresh mountain spring water.",
    "Trà Lục Tuyền thơm mùi cốm mới thoang thoảng. Vị trà thuần khiết mộc mạc mà đỉnh cao.",
    "Refreshing and energizing! The delicate sweet aftertaste comes back instantly after every sip.",
    "Búp trà tươi xanh rờn, pha nước 85 độ là nồng nàn hương trà xuân Tây Bắc.",
    "Beautiful jade green color and sweet grassy notes. Reminds me of high mountain tea gardens.",
    "Trà uống rất êm, thanh nhiệt giải độc tuyệt vời cho mùa hè. Rất hài lòng.",
    "High elevation character comes through brilliantly—pure, crisp, and wonderfully lingering sweetness.",
    "Cánh trà nhỏ xoắn tít, màu nước vàng chanh trong suốt. Vị ngọt hậu sâu lắng.",
    "A pristine cup of mountain tea. Unadulterated purity and great clarity.",
    "Lục Tuyền Trà mang lại cảm giác tươi mát tự nhiên. Uống mỗi ngày giúp tinh thần minh mẫn.",
    "Refreshing spring green tea with superior quality leaves. Highly recommended for daily enjoyment."
  ],
  'Ngọc Sương Trà': [
    "Phổ nhĩ sống cổ thụ thượng hạng. Nước trà vàng óng như mật ong, hương hoa quả rừng nồng nàn và vị hồi gan mạnh mẽ.",
    "Vị chát bộc phát mạnh mẽ rồi nhanh chóng chuyển thành vị ngọt lịm kéo dài khắp vòm họng.",
    "A stunning Raw Puerh! Intense floral bouquet, vibrant energy (Cha Qi), and an extraordinary long sweet aftertaste.",
    "Trà Ngọc Sương có lực trà rất mạnh mẽ, hậu vị kéo dài hàng giờ sau khi thưởng thức.",
    "Pours a radiant golden color. Complex layers of stone fruit, wild honey, and mountain mist.",
    "Hương thơm ngạt ngào như sương sớm đỉnh núi cao. Trà ngon chuẩn phẩm phổ nhĩ sống sưu tầm.",
    "Exceptional power and depth! The Cha Qi is deeply relaxing yet awakening. Magnificent raw Puerh.",
    "Bánh trà ép vừa tay, búp trà phủ tuyết trắng. Càng lưu trữ lâu năm hứa hẹn càng chuyển hóa tuyệt vời.",
    "Nước trà trong suốt sánh như dầu, hương quả chín nồng nàn. Phẩm trà dành cho người sành trà thực sự.",
    "Bold, vibrant, and filled with mountain spirit. A collector's dream tea.",
    "Trà uống vào thấy người bừng sáng, năng lượng tràn đầy. Vị ngọt hậu lịm cả giọng.",
    "Rất xứng đáng là danh trà cổ thụ. Phẩm chất vượt trội so với các loại phổ nhĩ sống trên thị trường.",
    "Incredible endurance over 15+ brews. Rich, sweet, and deeply aromatic."
  ],
  'Phi Trang Trà': [
    "Trà lá già cổ thụ thâm trầm, đằm thắm. Vị trà mộc mạc, êm dịu, không hề chát đắng.",
    "Nước trà vàng óng hổ phách, vị ngọt khoáng chất tự nhiên sâu thẳm từ lòng đất ngàn năm.",
    "Unique ancient leaf tea! Smooth, earthy mineral sweetness that feels grounding and deeply comforting.",
    "Trà lá già càng nấu hoặc pha lâu càng ngọt đượm. Rất thích hợp uống dưỡng sinh hàng ngày.",
    "Deeply restorative tea. Gentle on the stomach and filled with warm natural minerals.",
    "Phi Trang Trà cho hương thơm thoảng mùi lá mộc khô và mật dại. Uống cả ngày không biết chán.",
    "A hidden gem! Mild, sweet, and incredibly relaxing for all-day hydration.",
    "Lá trà cổ thụ to dày chứa đựng sinh khí của núi rừng. Nước trà ngọt dịu mát mẻ.",
    "Pha bằng ấm đất nung cho nước trà cực kỳ sánh ngọt. Giá trị dưỡng sinh rất cao.",
    "Comforting herbal warmth with zero bitterness. Wonderful choice for cozy evenings.",
    "Trà lá già giúp bình ổn thân tâm, giấc ngủ sâu hơn. Cả nhà tôi đều rất thích loại trà này.",
    "Màu nước trà vàng sậm ấm áp. Vị ngọt mộc mạc tự nhiên không lẫn vào đâu được.",
    "Authentic rustic charm. A serene and peaceful tea drinking experience."
  ],
  'Gốm hoạt khoáng hữu cơ Việt Nam': [
    "Bộ chén gốm hoạt khoáng làm nước trà mềm và ngọt hơn hẳn. Thiết kế mộc mạc sang trọng.",
    "Chén gốm cầm rất đầm tay, giữ nhiệt tốt và tôn vinh màu nước trà óng ả.",
    "Beautiful handcrafted mineral stoneware. It truly softens the water texture and elevates tea flavors.",
    "Gốm làm từ đất khoáng tự nhiên Việt Nam rất tinh xảo. Uống trà bằng chén này cảm giác vị trà đằm hơn.",
    "Exquisite artisan quality! The subtle texture and thermal properties make every tea ritual magical.",
    "Sản phẩm gốm mộc mạc mà chứa đựng hồn Việt. Đóng gói cẩn thận chống vỡ rất tốt.",
    "Handmade perfection! Beautiful organic finish and enhances the tactile tea tasting experience.",
    "Chén gốm vừa mang tính mỹ thuật cao vừa có công năng hoạt khoáng tuyệt vời.",
    "Dùng chén gốm Tamling thưởng trà là một niềm vui mỗi ngày. Chất gốm mịn và đượm trà.",
    "Stunning craftsmanship. The minerals in the clay make a noticeable difference in water softness.",
    "Màu men gốm tự nhiên rất nịnh mắt. Quà tặng ý nghĩa cho người yêu trà nghệ thuật.",
    "Bộ gốm hoàn thiện tỉ mỉ, cầm thích tay. Rất hài lòng với chất lượng gốm hữu cơ Tamling.",
    "Elegant design and supreme functional quality. A must-have for tea connoisseurs."
  ],
  'Nhang Thiền': [
    "Nhang thiền thảo mộc hương thơm dịu nhẹ, thanh khiết. Đốt lên giúp không gian tĩnh lặng thanh tịnh ngay lập tức.",
    "Không hề có khói cay mắt hay mùi hóa chất. Mùi hương gỗ trầm thảo mộc tự nhiên mộc mạc.",
    "Pure botanical incense. Clean, soothing smoke that creates a peaceful atmosphere for meditation.",
    "Mùi nhang thoang thoảng giúp thư giãn tinh thần sau ngày làm việc căng thẳng. Rất dễ chịu.",
    "Wonderful natural fragrance! Great for yoga, mindfulness practice, or relaxing evening routines.",
    "Nhang thiền Tamling làm từ thảo mộc nguyên chất, an toàn cho sức khỏe cả gia đình.",
    "Calming, sacred, and completely natural scent. No artificial perfumes whatsoever.",
    "Đốt một nén nhang thiền cùng tách trà ấm là liệu pháp thư giãn tuyệt vời nhất.",
    "Hương thơm mộc mạc lưu lại lâu trong phòng mà không bị nồng sặc.",
    "Authentic herbal incense. Helps focus the mind during breathwork and tea meditation.",
    "Mùi hương ấm áp như trở về ngôi chùa cổ thanh tịnh. Rất tôn kính và dễ chịu.",
    "Nhang cháy đều, tàn nhang cuốn đẹp tự nhiên. Sản phẩm tâm huyết của Tamling.",
    "Serene botanical fragrance that instantly calms the senses and clarifies the room."
  ],
  'Trà thảo mộc dưỡng sinh hàng ngày': [
    "Trà thảo mộc vị dịu mát, thoảng mùi thảo dược tự nhiên. Uống hàng ngày giúp thanh lọc cơ thể rất tốt.",
    "Sau 2 tuần uống trà dưỡng sinh, da dẻ tôi sáng hơn và tiêu hóa rất dễ chịu.",
    "A wonderful daily detox herbal tea! Mild, pleasant taste and leaves me feeling light and refreshed.",
    "Trà thảo mộc không chứa caffeine nên uống vào buổi tối vẫn ngủ rất ngon.",
    "Gentle wellness blend that supports daily vitality and natural body detox.",
    "Thành phần thảo mộc hữu cơ tự nhiên lành tính. Cả gia đình tôi đều dùng làm thức uống hàng ngày.",
    "Refreshing herbal brew. Light, subtle floral-herbal notes that taste great hot or iced.",
    "Uống thay nước lọc mỗi ngày giúp cơ thể nhẹ nhàng, giảm mệt mỏi công việc.",
    "Gói trà đóng tiện lợi, thảo mộc sấy khô sạch sẽ nguyên bông nguyên lá.",
    "Great natural remedy for stress relief and gentle body rejuvenation.",
    "Vị trà ngọt nhẹ của thảo mộc tự nhiên không đường. Rất phù hợp cho người ăn kiêng dưỡng sinh.",
    "Trà thơm dịu, uống vào thấy bụng êm và tinh thần thoải mái hẳn.",
    "Highly nourishing herbal tea blend. Exceptional purity and visible wellness benefits."
  ],
  'Dung dịch thảo mộc làm sạch ngoài da': [
    "Dung dịch thảo mộc mùi thơm sả chanh và thảo dược tự nhiên cực kỳ dễ chịu. Làm sạch da nhẹ nhàng không bị khô.",
    "Dùng tắm rửa thảo mộc cảm giác da sạch mịn, dịu mát và xua tan mệt mỏi.",
    "Pure herbal skin wash with a heavenly botanical scent. Gentle, soothing, and leaves skin refreshed.",
    "Thành phần thảo mộc tự nhiên không bọt hóa chất. Rất an toàn cho da nhạy cảm.",
    "Incredible soothing skin cleanser. Solved my dry skin irritation naturally.",
    "Mùi thơm thảo mộc tự nhiên lưu lại trên da thoang thoảng như đi spa dưỡng sinh.",
    "Wonderful natural body wash! Clean ingredients with genuine herbal extracts.",
    "Rửa mặt và tắm bằng sản phẩm này thấy da mềm mại và sạch thoáng dã dượi.",
    "Sản phẩm thiên nhiên rất an toàn cho cả em bé và người lớn tuổi.",
    "Refreshing herbal aroma and deeply hydrating effect. My new skincare staple.",
    "Dung dịch thảo mộc dùng rất dôi, tạo cảm giác sạch sâu mà da vẫn đủ độ ẩm.",
    "Chiết xuất hoàn toàn từ cây cỏ Việt Nam lành tính. Rất tự hào về sản phẩm Việt chất lượng cao.",
    "A deeply soothing botanical wash that restores natural skin vitality."
  ]
};

// Global User Demographics (Diverse Ages, Names, Countries)
const DEMOGRAPHICS = [
  { name: "Nguyễn Thanh Hà", age: 34, country: "Việt Nam", lang: "vi" },
  { name: "Kenji Takahashi", age: 42, country: "Japan", lang: "en" },
  { name: "Sophie Laurent", age: 29, country: "France", lang: "en" },
  { name: "Trần Minh Đức", age: 51, country: "Việt Nam", lang: "vi" },
  { name: "David Miller", age: 38, country: "United Kingdom", lang: "en" },
  { name: "Charlotte Dubois", age: 45, country: "Canada", lang: "en" },
  { name: "Phạm Hoàng Yến", age: 26, country: "Việt Nam", lang: "vi" },
  { name: "Michael Chen", age: 33, country: "Singapore", lang: "en" },
  { name: "Elena Rossi", age: 47, country: "Italy", lang: "en" },
  { name: "Lê Văn An", age: 62, country: "Việt Nam", lang: "vi" },
  { name: "Marcus Vance", age: 31, country: "USA", lang: "en" },
  { name: "Hans Weber", age: 55, country: "Germany", lang: "en" },
  { name: "Đặng Thu Thảo", age: 28, country: "Việt Nam", lang: "vi" },
  { name: "Park Ji-won", age: 36, country: "South Korea", lang: "en" },
  { name: "Isabella Santos", age: 40, country: "Spain", lang: "en" },
  { name: "Vũ Bảo Long", age: 49, country: "Việt Nam", lang: "vi" },
  { name: "Oliver Smith", age: 27, country: "Australia", lang: "en" },
  { name: "Lin Wei-Ting", age: 44, country: "Taiwan", lang: "en" },
  { name: "Bùi Mai Anh", age: 32, country: "Việt Nam", lang: "vi" },
  { name: "Lucas Meyer", age: 39, country: "Switzerland", lang: "en" }
];

// Generate 150+ realistic reviews
const allReviews = [];
let idCount = 100;

PRODUCTS.forEach(product => {
  const templates = REVIEW_TEMPLATES[product.name] || REVIEW_TEMPLATES['Bích Sa Trà'];
  
  for (let i = 0; i < templates.length; i++) {
    const demo = DEMOGRAPHICS[(idCount + i) % DEMOGRAPHICS.length];
    const month = String(Math.floor(Math.random() * 8) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const year = Math.random() > 0.3 ? '2026' : '2025';
    const rating = (i % 6 === 0) ? 4 : 5;

    allReviews.push({
      id: `rev-${idCount++}`,
      name: `${demo.name} (${demo.country}, ${demo.age}t)`,
      rawName: demo.name,
      country: demo.country,
      age: demo.age,
      product: product.name,
      category: product.category,
      rating: rating,
      comment: templates[i],
      date: `${year}-${month}-${day}`,
      status: 'approved'
    });
  }
});

const fileContent = `// Auto-generated rich multi-cultural product review dataset for Tamling Store
// Covers all 5 product lines & 8 ancient specialty teas

export const INITIAL_REVIEWS = ${JSON.stringify(allReviews, null, 2)};
`;

fs.writeFileSync(outFile, fileContent, 'utf8');
console.log(`Successfully generated ${allReviews.length} pre-approved reviews covering all products at ${outFile}!`);
