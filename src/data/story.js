/**
 * Story text: seasonal tales, hints, endings and the old book.
 * Keep lines short and concrete: every passenger owns one image that returns each season.
 */

/** One hint, said by a passenger in winter: the train carries words that came too late. */
const HT = [
  `Tàu này chỉ chở những lời đến muộn, và chờ ta nói xong mới chịu dừng.`,
  `Lá thư của bạn nặng hơn trông bề ngoài nhiều đấy.`,
];

const TH = `Trong túi áo, lá thư khẽ ấm lên như vừa có ai cầm.`;

/**
 * Endings. Which one you get depends on how much of the letter you wrote (see finale()):
 * 0 none -> 5, 1 line -> 1, 2-3 -> 3, 4-5 -> 0 (or 2 without a diary), 6 -> 4,
 * then 6, 7, 8 are special endings for gifts, the platform figure and all six secrets.
 */
const EN = [
    [
      `Lời nói kịp lúc`,
      `Tàu dừng ở một sân ga không tên. Bạn đọc to lá thư, và hành khách lần lượt mỉm cười. Ngoài cửa sổ trời hửng sáng. Lần đầu sau nhiều năm, bạn thấy nhẹ lòng.`,
    ],
    [
      `Lời để dành`,
      `Tàu dừng, bạn vẫn ngồi lại với lá thư trong tay. Có những lời chưa sẵn sàng. Tàu lặng lẽ chạy thêm một đoạn, đủ để bạn ngắm sao lần nữa.`,
    ],
    [
      `Gửi đi`,
      `Trời sáng dần ngoài cửa sổ. Lá thư chưa kín chữ, nhưng bạn thấy đủ rồi. Tàu dừng nhẹ như một hơi thở, và bạn đặt thư vào hòm ở sân ga.`,
    ],
    [
      `Lời còn đọng`,
      `Tàu dừng, bạn xuống ga, còn mấy dòng thư chưa viết. Mùi trà và tiếng bánh xe vẫn đọng lại rất lâu. Đâu đó, con tàu vẫn chạy, chờ bạn viết nốt.`,
    ],
    [
      `Người bước xuống`,
      `Tàu dừng hẳn, lần đầu tiên. Bạn bước xuống ga. Có người đang đợi, tay cầm chiếc đèn lồng giấy. “Cuối cùng cũng đến,” họ nói. Bạn trao lá thư.`,
    ],
    [
      `Vòng tiếp theo`,
      `Tàu vào ga cuối nhưng cửa chưa mở. Ngoài sương có người đang đợi. “Chưa đâu,” họ nói. “Vòng sau nhé.” Bạn mỉm cười, vì đã gần hơn.`,
    ],
    [
      `Ga Không Tên`,
      `Bạn xếp năm món kỷ vật lên bàn. Chúng sáng lên, nối thành một đường ray chạy vào bình minh. Tàu rẽ vào một ga chưa có trên bản đồ. Bảng tên để trống, chờ bạn viết.`,
    ],
    [
      `Người đứng đợi`,
      `Sân ga nhỏ bạn đã thấy suốt bốn mùa. Người cầm ô vẫn đứng đó. “Tôi đã đợi bốn mùa mà chưa biết bạn là ai,” họ nói. “Hóa ra là bạn.” Bạn đưa lá thư, và dòng đầu bỗng có tên. Cả toa tàu đứng dậy vẫy tay.`,
    ],
  ];

const SN = ['Xuân', 'Hạ', 'Thu', 'Đông'],
  sea = () => (S.loop | 0) % 4,
  SS = [
    [
      `Hoa đào nở trắng sân ga. Có người đứng đợi, tay ôm chiếc ô chưa mở.`,
      `Hai người nói chuyện đến hết chuyến cuối. Chỉ nhớ là đã cười nhiều.`,
      `Lúc chia tay, người ấy hẹn: “Hè này gặp lại ở đây.”`,
    ],
    [
      `Ve rền cả sân ga. Người ấy đến sớm, đếm từng chuyến tàu đi qua.`,
      `Mưa rào ập xuống. Người ấy nép dưới mái ga, đợi mưa tạnh.`,
      `Chiều muộn, người ấy gấp ô lại, mỉm cười như chưa từng thất vọng.`,
    ],
    [
      `Lá vàng phủ kín bậc thềm. Người ấy vẫn đến, chẳng còn hẹn, chỉ quen chân.`,
      `Bà bán trà dưới gốc cây bảo: “Cứ đợi đi cháu, ga nào cũng có ngày tàu đến.”`,
      `Đêm đó, người ấy ngồi dưới đèn ga, nghĩ xem nếu người kia đến thì nói gì trước.`,
    ],
    [
      `Sương phủ trắng sân ga. Người ấy vẫn đứng đó.`,
      `Chuyến đêm cuối năm dừng lâu hơn thường lệ. Qua ô cửa sáng đèn, người ấy thấy một hành khách đang viết dở lá thư.`,
      `Người ấy chưa biết thư gửi cho mình. Chỉ thấy ánh đèn trong toa ấm như một lời hẹn.`,
    ],
  ];

const SG = {
  'Bà Tư': ['Rau đắng bà hái', 'Quạt mo cau của bà', 'Hồng phơi của bà Tư', 'Khăn len bà đan'],
  'Chú mèo Mướp': [
    'Cánh hoa mèo ngậm về',
    'Sợi lông mèo mướp',
    'Chiếc lá mèo bắt được',
    'Cuộn len mèo nghịch',
  ],
  'Anh họa sĩ': [
    'Bức phác thảo sắc hồng',
    'Bức phác thảo bóng nắng',
    'Bức phác thảo lá vàng',
    'Bức phác thảo ô cửa đêm',
  ],
  'Bé Đèn Lồng': ['Đèn lồng giấy hồng', 'Lồng đèn đom đóm', 'Đèn ông sao nhỏ', 'Đèn lồng ủ tay'],
  'Bác lái buôn': [
    'Gói trà xanh mới',
    'Gói trà đá mát',
    'Gói trà sảo nồi đồng',
    'Gói trà sen ủ ấm',
  ],
  'Cú Hiền': ['Lông cú ngày xuân', 'Lông cú đêm hè', 'Lông cú mùa gió', 'Lông cú đêm đông'],
};

const BOOK = [
  '“Trên đường ray dài, mọi nỗi lo đều nhỏ lại.”',
  'Bạn đọc vài trang, rồi nhìn ra cửa sổ. Một ngôi sao trôi qua rất chậm.',
  '“Điều quý nhất của chuyến đi là quãng đường, không phải ga cuối.”',
  'Trang sách thơm mùi trà và mùi gỗ cũ. Lòng bạn dịu lại.',
];

/** Gift lines are generated from the gift actually given, so speech and item always match. */
const GL = {
  'Bà Tư': (g) => `Cầm lấy "${g}" này. Ấm lắm.`,
  'Chú mèo Mướp': (g) => `Meo! Tặng cháu "${g}". Chú hiếm khi cho ai đâu.`,
  'Anh họa sĩ': (g) => `Tôi gửi em "${g}". Một mẩu của chuyến đi này.`,
  'Bé Đèn Lồng': (g) => `Em cho chị "${g}" nè. Giữ cẩn thận nha.`,
  'Bác lái buôn': (g) => `Bác biếu cháu "${g}". Để dành mãi, nay mới có người xứng.`,
  'Cú Hiền': (g) => `Hú… Ta tặng con "${g}". Cài vào sổ sẽ ngủ ngon.`,
};

/** Hidden truths: unlocked when a passenger has given gifts in two different seasons. */
const TRUE = {
  'Bà Tư': 'Bà là bà ngoại của bạn. Đông nào bà cũng đan một chiếc khăn, dù biết cháu sẽ không ghé.',
  'Chú mèo Mướp': 'Mướp là chú mèo thuở nhỏ của bạn. Chiều nào nó cũng đợi ở ga cuối.',
  'Anh họa sĩ': 'Anh vẽ bạn mỗi mùa, mà chưa lần nào dám đưa tận tay.',
  'Bé Đèn Lồng': 'Bé là bạn năm tám tuổi, thả đèn lồng gửi một người đã đi xa.',
  'Bác lái buôn': 'Bác là cha bạn. Tách trà nào bác pha cũng chừa một chỗ ngồi trống.',
  'Cú Hiền': 'Cú thức canh những đêm bạn không ngủ được, để bạn khỏi ở một mình.',
};
const secretOK = (n) => [0, 1, 2, 3].filter((i) => S.gifted[n + i]).length >= 2;

/** What every passenger says in the epilogue conversation, by ending index. */
const EG = [
  'Cảm ơn bạn đã nói ra điều ấy.',
  'Lặng lẽ cũng là một cách yêu thương.',
  'Chuyến này trông bạn nhẹ nhõm hơn hẳn.',
  'Còn dòng nào chưa viết, tàu vẫn chờ.',
  'Chúc mừng bạn đã bước xuống ga.',
  'Không sao, lần sau tàu vẫn chờ bạn.',
  'Những món nhỏ ấy nối được cả một đường ray.',
  'Người ấy đã đợi bạn, và tôi mừng vì bạn đến.',
  'Cuối cùng bạn cũng nghe hết sáu lời của chúng tôi.',
];

EN.push([
  'Sáu ngọn đèn',
  'Sáu món quà sáng lên cùng lúc. Bạn hiểu họ chưa bao giờ là người lạ: bà, chú mèo, người vẽ tranh, đứa trẻ cầm đèn, người cha, người canh đêm. Sáu lời chưa nói, và chính bạn đã viết ra. Tàu dừng, sáu ngọn đèn dẫn bạn về sân ga, nơi có ai đó đang gọi tên bạn.',
]);
