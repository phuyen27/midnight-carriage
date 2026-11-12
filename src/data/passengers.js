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
 * What each passenger says when they first sit down, per season: two lines that follow the
 * arc of the year (spring: getting acquainted, summer: closer, autumn: a confession,
 * winter: letting go). Spring reuses the opening lines in PX[].say; the seasonal tale (SL),
 * hints, secret and gift line are woven in by update.js.
 */
const PS_MORE = {
  'Bà Tư': [
    [
      'Hè này tàu đông hơn xưa. Bà chen mãi mới có chỗ cạnh cửa sổ, vì muốn ngắm cánh đồng cho rõ.',
      'Bà vẫn đang đi thăm cháu đấy. Lần trước đến, nó đi vắng. Bà để lại bó rau ở cửa rồi về.',
    ],
    [
      'Thu rồi mà bà vẫn chưa tới được nhà cháu. Tàu cứ chạy, ga cứ trôi, bà thì đếm từng ga một.',
      'Bà nói thật nhé, bà không giận nó đâu. Bà chỉ muốn nó biết là bà vẫn đang đi.',
    ],
    [
      'Khăn len đan xong rồi này. Bà đan hơi dài, để cháu quấn thêm hai vòng cũng còn dư.',
      'Đi nhiều mùa thế, hóa ra bà chỉ cần ngồi cạnh một người trên tàu là đủ rồi.',
    ],
  ],
  'Chú mèo Mướp': [
    [
      'Meo, tàu hè nóng ghê. Chú nằm sát cửa sổ cho gió luồn qua bộ lông.',
      'Chú thấy cháu quen lắm. Mùi áo cháu giống mùi chiếc ghế ở ga cuối ấy.',
    ],
    [
      'Lá rơi đầy toa này. Chú định bắt một chiếc, nghĩ lại thấy để chúng rơi cũng hay.',
      'Ngày xưa chú hay đợi ở ga cuối. Đợi mãi rồi quên mất mình đợi ai, chỉ nhớ là đợi vui lắm.',
    ],
    [
      'Meo… Đông này chú không sợ lạnh nữa. Có tay áo của cháu rồi mà.',
      'Chú ngủ trước nhé. Nếu cháu xuống ga, nhớ vỗ nhẹ lên lưng chú một cái.',
    ],
  ],
  'Anh họa sĩ': [
    [
      'Hè này tôi vẽ nhanh hơn mọi mùa. Cảnh trôi qua cửa sổ vội lắm, tay tôi phải chạy theo.',
      'Có một gương mặt tôi vẽ hoài mà chưa xong. Tôi cứ để trống đôi mắt, vì chưa dám nhìn kỹ.',
    ],
    [
      'Em để ý không, bức nào của tôi cũng có một người ngồi ở góc toa. Tôi không định vẽ ai cả, tay tự vẽ.',
      'Có lẽ tôi muốn đưa tận tay người ấy một bức. Chỉ là chưa tìm được lời mở đầu.',
    ],
    [
      'Đông tôi chỉ còn hai màu nên vẽ ít hơn. Mà lạ, ít hơn lại thấy đủ hơn.',
      'Bức này tôi vẽ xong đôi mắt rồi. Em xem đi, nó giống em hơn tôi tưởng.',
    ],
  ],
  'Bé Đèn Lồng': [
    [
      'Hè em đi bắt đom đóm cả đêm! Đèn lồng của em lúc nào cũng đông khách.',
      'Em vẫn đi tìm ông. Em nghĩ ông ngồi ở một toa xa lắm, đi mãi mới tới.',
    ],
    [
      'Chị ơi, trăng rằm to ghê. Em xách đèn đi mà thấy trăng cũng đang đi theo em.',
      'Em hỏi nhỏ nhé: nếu mình tìm mãi mà không thấy ông, thì ông có buồn không?',
    ],
    [
      'Đèn em sáng lâu hơn rồi đó. Em che tay hoài mà giờ hết thấy nóng luôn.',
      'Em nghĩ ông không ở ga nào hết. Chắc ông ở chỗ nào có ánh đèn em thắp.',
    ],
  ],
  'Bác lái buôn': [
    [
      'Hè bác bán trà đá, hết veo từ sáng. Chiều về chỉ còn lại một ấm cho mình.',
      'Bác ít nói, cháu đừng ngại. Nghe cháu thở dài là bác biết cháu đang nghĩ gì.',
    ],
    [
      'Thu này bác sảo được mẻ trà ngon nhất đời. Bác để dành, tính khi gặp con thì pha.',
      'Ga nào bác cũng để trống một ghế. Quen rồi, ai ngồi xuống bác cũng thấy mừng.',
    ],
    [
      'Tách trà này bác pha hơi đậm. Đông mà, phải đậm mới đủ ấm cho hai người.',
      'Bác nói ít, nhưng nay bác nói một câu: bác mừng vì có cháu ngồi cùng.',
    ],
  ],
  'Cú Hiền': [
    [
      'Hú… Hè đêm ngắn nhưng sao nhiều. Ta đếm không xuể, đành đặt tên cho vài ngôi.',
      'Con có ngôi sao nào hay nhìn không? Ta để ý, đêm nào con cũng nhìn một ngôi ấy.',
    ],
    [
      'Gió thu mang mùi khói bếp. Ta nghe gió nói ở xa có người đang nhớ con.',
      'Ta thức đêm quen rồi. Có những đêm ta chỉ canh một người ngủ không yên.',
    ],
    [
      'Hú… Đêm đông dài nhất, ta vẫn canh. Nhưng lần này ta canh nhẹ tay hơn, vì con đã bớt lo.',
      'Sắp sáng rồi. Ta sẽ ngủ một giấc, còn con cứ đi tiếp, đèn ga vẫn sáng.',
    ],
  ],
};

/** PS[name][season] = the two opening lines for that season. */
const PS = Object.fromEntries(PX.map((p) => [p.n, [[p.say[0], p.say[1]], ...PS_MORE[p.n]]]));

const FR = {
  'Bà Tư': 'Có những chuyến đi dài mười năm, chỉ để được ngồi cạnh một người.',
  'Chú mèo Mướp': 'Ở ga cuối có một ô cửa đầy nắng, đủ chỗ cho cả hai ta.',
  'Anh họa sĩ': 'Tôi không giữ được cảnh trôi qua, nên tôi giữ lại cảm giác được ngắm nó.',
  'Bé Đèn Lồng': 'Nếu lạc đường, hãy nhìn theo ánh đèn. Luôn có ai đó thắp nó cho mình.',
  'Bác lái buôn': 'Tách trà ngon nhất là tách có người cùng ngồi.',
  'Cú Hiền': 'Sao trời đi chậm, nên chẳng ai phải vội cả.',
};
