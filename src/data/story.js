/**
 * Story text: seasonal tales, hints, endings and the old book.
 */

const HT = [
    [
      `Lạ thật, mình lên tàu mà chẳng nhớ đã mua vé lúc nào. Chỉ nhớ có một câu cứ nghẹn lại nơi cổ.`,
      `Bạn có để ý không, ai trên tàu này cũng mang theo một điều chưa nói ra.`,
      `Mình hiểu rồi. Tàu này chỉ chở những lời đến muộn, và nó chờ ta nói xong mới chịu dừng.`,
      `Lá thư của bạn nặng hơn trông bề ngoài nhiều đấy. Nó mang cả nỗi nhớ của người viết.`,
    ],
    [
      `Bạn có thấy tiếng bánh xe nhỏ dần không? Như thể nó vọng từ một căn phòng khác.`,
      `Lạ chưa, mình nhớ rõ từng người trên tàu, mà chẳng nhớ nổi mặt mình trong gương.`,
      `Ánh đèn ngoài kia giống đèn đầu giường lắm. Sắp sáng rồi, bạn nhỉ?`,
      `Lá thư ấy do chính tay bạn viết, bạn biết mà. Chỉ là bạn quên mất thôi.`,
    ],
    [
      `Ga này mình đi qua rồi, chắc vậy. Hay là đã nghe tên nó trong một chuyến khác?`,
      `Tàu vẫn chạy, mà sao mình có cảm giác đang quay về nơi cũ.`,
      `Mình đã đợi ở ga cuối nhiều lần lắm. Lần nào cũng có người đến sau vài phút.`,
      `Vòng này khác. Hôm nay tàu sẽ dừng, và bạn sẽ là người bước xuống.`,
    ],
  ],
  TH = [
    `Trong túi áo, lá thư khẽ ấm lên như vừa có ai cầm.`,
    `Trong tấm kính, bóng bạn hơi mờ đi, như sắp thức dậy.`,
    `Bảng ga phía xa chưa kịp viết tên, chỉ có một chiếc đèn đang chờ.`,
  ],
  EN = [
    [
      `Lời nói kịp lúc`,
      `Tàu dừng ở một sân ga không tên. Bạn đọc to lá thư, từng dòng một, và những điều bạn tự viết trong nhật ký bỗng hóa thành lời. Hành khách lần lượt đứng dậy, ai cũng mỉm cười như vừa đặt xuống một gánh nặng. Ngoài cửa sổ, trời hửng sáng, và lần đầu sau nhiều năm, bạn thấy nhẹ lòng.`,
    ],
    [
      `Lời để dành`,
      `Tàu dừng, nhưng bạn vẫn ngồi lại với lá thư trong tay. Có những lời chưa sẵn sàng để nói, và tàu đêm hiểu điều đó. Nó lặng lẽ chạy thêm một đoạn, đủ để bạn ngắm sao lần nữa. Lá thư vẫn ấm, đợi một chuyến sau.`,
    ],
    [
      `Thức dậy dịu dàng`,
      `Ngoài khung cửa trời sáng dần, và tiếng bánh xe hóa thành tiếng chuông báo thức rất nhỏ. Bạn tỉnh dậy trong căn phòng quen thuộc, tách trà bên giường còn hơi ấm. Trên bàn có một lá thư viết dở, và bạn biết hôm nay mình nên gửi nó đi.`,
    ],
    [
      `Giấc mơ ở lại`,
      `Bạn tỉnh dậy, nhưng mùi trà và tiếng bánh xe vẫn đọng lại rất lâu. Bạn chẳng nhớ rõ từng khuôn mặt, chỉ nhớ cảm giác có người ngồi đối diện. Đêm ấy bạn ngủ ngon hơn mọi đêm, và đâu đó, con tàu vẫn đang chạy.`,
    ],
    [
      `Người bước xuống`,
      `Tàu dừng hẳn, lần đầu tiên. Cửa toa mở ra, ánh đèn ga vàng ấm. Bạn là người duy nhất xuống ga, và ở đó có một người đang đợi, tay cầm chiếc đèn lồng giấy. “Cuối cùng cũng đến,” họ nói. Lá thư được trao đi, và bạn hiểu mình đã được đợi từ rất lâu.`,
    ],
    [
      `Vòng tiếp theo`,
      `Tàu chầm chậm vào ga cuối, nhưng cánh cửa chưa mở. Bạn thấy ngoài kia có người đang đợi, mờ trong sương. “Chưa đâu,” một giọng nhẹ nói. “Vòng sau nhé.” Con tàu lại lăn bánh, và bạn mỉm cười, vì lần này bạn biết mình đã gần hơn.`,
    ],
    [
      `Ga Không Tên`,
      `Bạn xếp những kỷ vật lên bàn: chiếc lá, vỏ sò, tấm vé, bưu thiếp và món quà. Chúng sáng lên rồi nối thành một đường ray, chạy ra ngoài cửa sổ, vào bình minh. Tàu rẽ vào một ga chưa từng có trên bản đồ. Bảng tên để trống, chờ bạn viết.`,
    ],
    [
      `Người đứng đợi`,
      `Tàu dừng ở một sân ga nhỏ mà bạn đã thấy lướt qua suốt bốn mùa: đào trắng, tiếng ve, lá vàng, sương mỏng. Người cầm ô đứng đó, vẫn như lần đầu. “Tôi viết lá thư ấy mà không biết gọi tên ai,” họ nói. “Hóa ra là bạn.” Bạn đưa lá thư lại, giờ đã đủ sáu mảnh, và dòng đầu tiên bỗng có tên. Sau lưng bạn, cả toa tàu đứng dậy vẫy tay.`,
    ],
  ];

const SN = ['Xuân', 'Hạ', 'Thu', 'Đông'],
  sea = () => (S.loop | 0) % 4,
  SS = [
    [
      `hoa đào bên đường ray nở trắng cả sân ga nhỏ. Người viết lá thư đứng đó lần đầu, tay ôm chiếc ô chưa kịp mở.`,
      `Hai người nói chuyện đến khi chuyến cuối đã đi mất. Chẳng ai nhớ mình đã nói gì, chỉ nhớ cười nhiều lắm.`,
      `Lúc chia tay, người ấy hẹn: “Hè này mình lại gặp nhau ở đây.” Lời hẹn nhẹ như cánh hoa rơi trên vai.`,
    ],
    [
      `tiếng ve rền cả sân ga. Người ấy đến sớm, ngồi đếm từng chuyến tàu đi qua mà không thấy ai.`,
      `Cơn mưa rào ập xuống. Người ấy nép dưới mái ga, nghĩ rằng mưa tạnh thì người kia sẽ tới.`,
      `Chiều muộn, nắng đỏ lên cả đường ray. Người ấy gấp chiếc ô lại, mỉm cười như chưa từng thất vọng.`,
    ],
    [
      `lá vàng phủ kín bậc thềm ga. Người ấy vẫn đến, chẳng còn hẹn, chỉ là quen chân.`,
      `Một bà cụ bán trà dưới gốc cây bảo: “Cứ đợi đi cháu, ga nào cũng có ngày tàu đến.”`,
      `Đêm đó, người ấy ngồi viết dòng đầu tiên của một lá thư, rồi dừng lại vì không biết gọi tên ai.`,
    ],
    [
      `sương phủ trắng sân ga. Người ấy gói lá thư vào áo, tin rằng sẽ có một chuyến tàu mang nó đi.`,
      `Chuyến tàu đêm cuối năm dừng lại hơi lâu, như đang đợi ai lên. Người ấy đặt lá thư vào tay một hành khách.`,
      `Từ đó, lá thư theo tàu đi qua bốn mùa, cho đến khi gặp bạn.`,
    ],
  ];

const SL = {
  'Bà Tư': [
    `Xuân này bà ra vườn hái rau đắng, nghe chim sâu hót mà nhớ ra mình còn khỏe lắm.`,
    `Hè nóng, bà ngồi quạt mo cau ngoài hiên, kể chuyện cổ tích cho cả xóm nhỏ nghe.`,
    `Thu về bà phơi hồng, mùi ngọt thơm cả sân. Tiếc là cháu bà ở xa, chẳng ăn được.`,
    `Đông lạnh, bà đan len cả đêm. Đan được chiếc khăn rồi mới thấy đường đi thăm cháu dài thế nào.`,
  ],
  'Chú mèo Mướp': [
    `Meo, xuân là lúc chú thích nhất. Hoa rơi đầy mái nhà, nằm đó ngủ thì sướng khỏi nói.`,
    `Mùa hè chú trốn dưới gầm tàu cho mát. Ve kêu nhiều quá, chú đếm mãi chẳng hết.`,
    `Thu thì chú đuổi lá. Lá nào cũng chạy nhanh mà chẳng lá nào chịu chơi cùng.`,
    `Đông lạnh thì chú chui vào áo khoác của hành khách. Cháu cho chú mượn tay áo nhé?`,
  ],
  'Anh họa sĩ': [
    `Xuân tôi hay vẽ nhiều hồng nhạt. Màu ấy khó lắm, nhạt quá thì mất, đậm quá thì thành giả.`,
    `Hè nắng gắt, bóng đổ đen như mực. Tôi mê những cái bóng ấy hơn cả cảnh thật.`,
    `Thu là mùa dễ vẽ nhất mà cũng khó nhất. Ai nhìn cũng thấy buồn, nên tôi phải vẽ cho vui.`,
    `Đông tôi chỉ dùng hai màu: đen của đêm và vàng của ô cửa có người thức.`,
  ],
  'Bé Đèn Lồng': [
    `Xuân này em thả đèn lồng bay lên trời, hy vọng ông nhìn thấy từ xa.`,
    `Hè em bắt đom đóm bỏ vào đèn lồng. Chúng sáng ít thôi, nhưng sáng thật lòng.`,
    `Thu có tết đèn trăng rấm. Em mang đèn ông sao đi, mà chẳng ai chơi cùng.`,
    `Đông lạnh, ngọn đèn của em hay tắt. Em phải che tay mãi, tay nóng ran luôn.`,
  ],
  'Bác lái buôn': [
    `Xuân là mùa trà mới. Búp non hái lúc sương chưa tan, pha lên thơm như mùi đất mới.`,
    `Hè bác hay pha trà đá bán rong. Nóng mấy mà gặp ly trà mát thì ai cũng hiền.`,
    `Thu bác sảo trà trong nồi đồng, khói bay thơm cả xóm. Nghề này nghe cực mà vui.`,
    `Đông bác ôm ấm trà ngồi cạnh bếp. Trà nóng ấm bụng, nhưng ấm nhất vẫn là người ngồi cùng.`,
  ],
  'Cú Hiền': [
    `Hú, xuân đến thì đêm ngắn lại. Ta bớt thời gian ngắm sao, nhưng nghe tiếng ếch cũng vui.`,
    `Hè, Ngân Hà rõ nhất. Ta hay nằm ngửa trên cành, đếm cho tới khi ngủ quên.`,
    `Thu, gió mang mùi lá khô. Ta nghe gió kể chuyện những chuyến tàu đi xa lắm.`,
    `Đông, sao sáng và lạnh như băng. Ta cuộn mình trong lông, vẫn canh sao như mọi đêm.`,
  ],
};

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
  'Bà Tư': (g) => `Bà gói cho cháu "${g}" đây. Cầm lấy nhé, ấm lắm.`,
  'Chú mèo Mướp': (g) => `Meo! Tặng cháu "${g}". Chú mèo này hiếm khi cho ai đâu.`,
  'Anh họa sĩ': (g) => `Tôi gửi em "${g}". Coi như một mẩu của chuyến đi này.`,
  'Bé Đèn Lồng': (g) => `Em cho chị "${g}" nè. Giữ cẩn thận nha.`,
  'Bác lái buôn': (g) => `Bác biếu cháu "${g}". Để dành mãi, nay mới có người xứng.`,
  'Cú Hiền': (g) => `Hú… Ta tặng con "${g}". Cất vào quyển sổ sẽ ngủ ngon lắm.`,
};

/** Hidden truths: unlocked when a passenger has given gifts in two different seasons. */
const TRUE = {
  'Bà Tư':
    'Bà là bà ngoại của người viết thư. Mỗi mùa đông bà đan một chiếc khăn, dù biết đứa cháu sẽ chẳng ghé thăm.',
  'Chú mèo Mướp':
    'Mướp là chú mèo thuở nhỏ của người viết thư. Nó ngồi đợi ở ga cuối mỗi chiều, đến khi chẳng còn ai tới.',
  'Anh họa sĩ':
    'Anh vẽ người viết thư mỗi mùa mà chưa lần nào dám đưa tận tay. Bức nào cũng để trống đôi mắt.',
  'Bé Đèn Lồng': 'Bé chính là người viết thư năm tám tuổi, thả đèn lồng gửi một người đã đi xa.',
  'Bác lái buôn': 'Bác là người cha ít nói. Tách trà nào bác pha cũng để dành một chỗ ngồi trống.',
  'Cú Hiền': 'Cú thức canh những đêm người viết thư không ngủ được, để chẳng ai phải ở một mình.',
};
const secretOK = (n) => [0, 1, 2, 3].filter((i) => S.gifted[n + i]).length >= 2;

/** What every passenger says in the epilogue conversation, by ending index. */
const EG = [
  'Cảm ơn bạn đã nói ra điều ấy.',
  'Lặng lẽ cũng là một cách yêu thương.',
  'Chuyến này trông bạn nhẹ nhõm hơn hẳn.',
  'Giấc mơ nào cũng cần một người ở lại nhớ.',
  'Chúc mừng bạn đã bước xuống ga.',
  'Không sao, lần sau tàu vẫn chờ bạn.',
  'Những món nhỏ ấy nối được cả một đường ray.',
  'Người ấy đã đợi bạn, và tôi mừng vì bạn đến.',
  'Cuối cùng bạn cũng nghe hết sáu lời của chúng tôi.',
];

EN.push([
  'Sáu ngọn đèn',
  'Sáu món quà sáng lên cùng lúc. Bạn chợt hiểu họ chưa bao giờ là người lạ: bà, chú mèo, người bạn vẽ tranh, đứa trẻ cầm đèn, người cha lặng lẽ, người canh đêm. Họ là sáu người lá thư chưa kịp nhắn tới, và chính bạn đã viết nó. Con tàu chưa từng chở những lời đến muộn. Nó chở bạn đi gặp từng người một. Tàu dừng, cửa mở, sáu ngọn đèn dẫn bạn về phía sân ga, nơi có ai đó đang gọi tên bạn.',
]);
