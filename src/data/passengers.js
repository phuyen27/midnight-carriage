/**
 * Passenger definitions and their parting words.
 */

const PX = [
  {
    n: 'Bà Tư',
    k: 'h',
    skin: '#e8b890',
    hair: '#d8d0c0',
    shirt: '#a8503a',
    acc: 'khan',
    gift: 'Kẹo gừng của bà Tư',
    say: [
      'Bà đi thăm cháu ngoại đấy. Mười năm rồi, bà mới lại được ngồi tàu đêm.',
      'Cháu biết không, tiếng bánh xe này ru bà ngủ ngon hơn mọi bài hát.',
      'Cầm lấy này, kẹo gừng bà tự nấu. Ấm bụng lắm.',
    ],
  },
  {
    n: 'Chú mèo Mướp',
    k: 'cat',
    skin: '#c89a5a',
    hair: '#c89a5a',
    shirt: '#5a7a5a',
    acc: '',
    gift: 'Sợi lông mèo mướp',
    say: [
      'Meo… Chú chỉ là một con mèo đi tàu thôi, đừng ngạc nhiên nhé.',
      'Ở ga cuối có một ô cửa đầy nắng. Chú định đến đó ngủ một giấc thật dài.',
      'Tặng cháu sợi lông này, nghe đâu nó mang lại may mắn đấy.',
    ],
  },
  {
    n: 'Anh họa sĩ',
    k: 'h',
    skin: '#f0c8a0',
    hair: '#3a2414',
    shirt: '#c8a040',
    acc: 'beret',
    gift: 'Bức phác thảo bằng chì',
    say: [
      'Tôi vẽ những ga nhỏ mà chẳng ai nhớ tên.',
      'Cảnh ngoài kia chỉ đẹp lúc nó đang trôi qua, nên tôi phải vẽ thật nhanh.',
      'Em giữ lấy bức phác thảo này nhé. Coi như tôi gửi lại một mẩu chuyến đi.',
    ],
  },
  {
    n: 'Bé Đèn Lồng',
    k: 'h',
    skin: '#f0c8a0',
    hair: '#2a1a10',
    shirt: '#e8c060',
    acc: 'lantern',
    glow: 1,
    gift: 'Đèn lồng giấy nhỏ',
    say: [
      'Em đi tìm ông. Ông bảo ông ở nơi có thật nhiều đèn.',
      'Chị có thấy phố đèn chưa? Em đoán là sắp đến rồi đó!',
      'Em cho chị mượn một tí ánh sáng nhé. Giữ cẩn thận nha.',
    ],
  },
  {
    n: 'Bác lái buôn',
    k: 'h',
    skin: '#d8a078',
    hair: '#6a4a2a',
    shirt: '#5a4a7a'.replace('#5a4a7a', '#7a5a3a'),
    acc: 'hat',
    gift: 'Gói trà sen',
    say: [
      'Bác bán trà cả đời, vậy mà vẫn thích nhất tách trà trên tàu.',
      'Trà ngon cần ba thứ: nước sôi, lá tốt và một người cùng ngồi.',
      'Gói trà sen này bác để dành, nay biếu cháu.',
    ],
  },
  {
    n: 'Cú Hiền',
    k: 'owl',
    skin: '#a87a4a',
    hair: '#a87a4a',
    shirt: '#4a6a5a',
    acc: '',
    gift: 'Chiếc lông cú',
    say: [
      'Hú… Ta thức suốt đêm để canh cho những vì sao khỏi lạc đường.',
      'Con tàu này đi chậm, nhưng chẳng sao. Sao trời cũng đi chậm mà.',
      'Lông này của ta, cài vào quyển sổ sẽ ngủ ngon lắm.',
    ],
  },
];

/**
 * What each passenger says when they sit down: two short lines per season [spring, summer,
 * autumn, winter]. Each person owns one image that returns every season and changes a little:
 * Bà Tư's scarf, Mướp's sunny window, the painter's missing eyes, the lantern's light,
 * the empty chair at the tea table, the owl's named star.
 */
const PS = {
  'Bà Tư': [
    ['Bà đi thăm cháu. Mười năm rồi.', 'Bà mang cuộn len theo, đan cho đỡ nhớ.'],
    ['Bà đến nhà cháu. Cháu đi vắng.', 'Bà để lại bó rau ở cửa rồi về.'],
    ['Khăn bà đan được nửa rồi.', 'Cháu đừng giận. Bà vẫn đang đi.'],
    ['Khăn xong rồi. Dài lắm đấy.', 'Quấn hai vòng vẫn còn dư.'],
  ],
  'Chú mèo Mướp': [
    ['Meo. Ga cuối có ô cửa đầy nắng.', 'Chú định đến đó ngủ một giấc.'],
    ['Meo. Nóng quá, chú nằm sát cửa sổ.', 'Áo cháu có mùi ga cuối đấy.'],
    ['Chú từng đợi ở ga cuối. Lâu lắm.', 'Quên mất đợi ai. Chỉ nhớ là vui.'],
    ['Chú chui vào tay áo cháu nhé.', 'Ấm rồi. Chú ngủ đây.'],
  ],
  'Anh họa sĩ': [
    ['Tôi vẽ những ga chẳng ai nhớ tên.', 'Cảnh đẹp nhất là lúc nó trôi qua.'],
    ['Tôi vẽ một gương mặt hoài chưa xong.', 'Đôi mắt vẫn để trống.'],
    ['Bức nào cũng có người ngồi góc toa.', 'Tôi chưa dám đưa tận tay.'],
    ['Tôi vẽ xong đôi mắt rồi.', 'Em xem. Giống em lắm.'],
  ],
  'Bé Đèn Lồng': [
    ['Em đi tìm ông. Ông ở nơi nhiều đèn.', 'Đèn em còn nhỏ xíu.'],
    ['Em bắt đom đóm bỏ vào đèn.', 'Đèn sáng hơn rồi nè.'],
    ['Trăng rằm to ghê. Nó theo em suốt.', 'Tìm mãi không thấy ông, ông có buồn không?'],
    ['Đèn em sáng lâu rồi đó.', 'Chắc ông ở chỗ nào có đèn em thắp.'],
  ],
  'Bác lái buôn': [
    ['Bác bán trà cả đời.', 'Trà ngon cần một người ngồi cùng.'],
    ['Bác ít nói. Cháu đừng ngại.', 'Bác để trống một ghế, quen rồi.'],
    ['Mẻ trà này ngon nhất đời bác.', 'Bác để dành, chờ người đến uống.'],
    ['Trà bác pha hơi đậm.', 'Đủ ấm cho hai người.'],
  ],
  'Cú Hiền': [
    ['Hú. Ta canh sao suốt đêm.', 'Sao đi chậm, chẳng ai phải vội.'],
    ['Con hay nhìn một ngôi sao.', 'Ta nhớ rồi. Ta đặt tên cho nó.'],
    ['Gió mang mùi khói bếp.', 'Có ai ở xa đang nhớ con.'],
    ['Sắp sáng rồi.', 'Ta ngủ đây. Con cứ đi tiếp.'],
  ],
};
/**
 * The letter, one line per passenger, in the writer's own voice. Each line is the word
 * that passenger stands for; together they read as one letter to the person who waited.
 * Always shown in PX order (see letterHTML in book.js).
 */
const FR = {
  'Bà Tư': 'Xin lỗi người, mình chưa một lần về thăm.',
  'Chú mèo Mướp': 'Hôm nào người cũng chờ, mà mình không tới.',
  'Anh họa sĩ': 'Có điều mình chưa dám đưa tận tay người.',
  'Bé Đèn Lồng': 'Hồi nhỏ mình thả đèn, mong người nhìn thấy.',
  'Bác lái buôn': 'Mình thương người hơn những gì mình từng nói.',
  'Cú Hiền': 'Đêm không ngủ được, mình vẫn nghĩ về người.',
};

/** Each passenger's own parting words (used in the epilogue chat). */
const FQ = {
  'Bà Tư': 'Có những chuyến đi dài mười năm, chỉ để được ngồi cạnh một người.',
  'Chú mèo Mướp': 'Ở ga cuối có một ô cửa đầy nắng, đủ chỗ cho cả hai ta.',
  'Anh họa sĩ': 'Tôi không giữ được cảnh trôi qua, nên tôi giữ lại cảm giác được ngắm nó.',
  'Bé Đèn Lồng': 'Nếu lạc đường, hãy nhìn theo ánh đèn. Luôn có ai đó thắp nó cho mình.',
  'Bác lái buôn': 'Tách trà ngon nhất là tách có người cùng ngồi.',
  'Cú Hiền': 'Sao trời đi chậm, nên chẳng ai phải vội cả.',
};
