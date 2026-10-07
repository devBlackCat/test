const FALLBACK = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="#eef1f5"/><circle cx="450" cy="220" r="78" fill="#e60012"/><text x="450" y="235" text-anchor="middle" fill="white" font-size="40" font-family="sans-serif" font-weight="700">TRIP</text><text x="450" y="330" text-anchor="middle" fill="#98a2b3" font-size="20" font-family="sans-serif">image unavailable</text></svg>`)}`;

const places = [
  {id:'kix',title:'간사이국제공항 KIX',category:'airport',kind:'main',duration:'이동 거점',tags:['공항','이동'],desc:'여행의 시작과 끝이 되는 공항. 도착·출발 시간에 맞춰 일정에 직접 넣을 수 있다.',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Kansai_International_Airport_Terminal_1.jpg/1280px-Kansai_International_Airport_Terminal_1.jpg',facts:{지역:'간사이공항','용도':'도착 / 출발 / 환승'},reservation:'예약 없음.',source:'https://www.kansai-airport.or.jp/en/'},
  {id:'darakhyu',title:'인천공항 다락휴 캡슐호텔',category:'airport',kind:'option',duration:'숙박',tags:['공항','숙박','옵션'],desc:'12일을 활용할 때 선택할 수 있는 인천공항 숙박 옵션. 일정판의 원하는 날짜와 시간에 직접 배치한다.',image:FALLBACK,facts:{지역:'인천공항','용도':'출국 전 숙면'},reservation:'숙박 사전예약 권장.',source:'https://www.walkerhill.com/darakhyu/'},
  {id:'firstcabin',title:'간사이공항 캡슐호텔 · First Cabin KIX',category:'airport',kind:'option',duration:'숙박',tags:['KIX','숙박','옵션'],desc:'전날 밤 KIX에 도착했을 때 사용할 수 있는 공항 직결 캡슐형 숙박 옵션.',image:'https://first-cabin.jp/wp-content/uploads/2024/06/kansai_01.jpg',facts:{지역:'KIX Aeroplaza','용도':'심야 도착 후 숙박'},reservation:'사전예약 권장.',source:'https://first-cabin.jp/hotels/kansaikukou/'},
  {id:'kixhotel',title:'KIX 공항 호텔',category:'airport',kind:'option',duration:'숙박',tags:['KIX','숙박','옵션'],desc:'캡슐보다 숙면을 우선할 때 사용할 수 있는 공항 또는 공항 인근 일반 호텔 옵션.',image:FALLBACK,facts:{지역:'KIX / 린쿠타운','용도':'심야 도착 후 숙박'},reservation:'호텔 사전예약 필요.',source:'https://www.kansai-airport.or.jp/en/service/relax/hotel'},
  {id:'nikkokix',title:'Hotel Nikko Kansai Airport',category:'airport',kind:'option',duration:'숙박',tags:['KIX','숙박','호텔','옵션'],desc:'간사이공항 Aeroplaza에 연결된 일반 호텔. 심야 도착 후 이동을 최소화하면서 캡슐보다 편하게 자고 싶을 때 쓰는 선택지.',image:FALLBACK,facts:{지역:'KIX Aeroplaza','유형':'공항 직결 일반 호텔','용도':'심야 도착 후 숙면'},reservation:'사전예약 권장.',source:'https://www.nikkokix.com/en/'},
  {id:'washingtonkix',title:'Kansai Airport Washington Hotel',category:'airport',kind:'option',duration:'숙박',tags:['KIX','린쿠타운','숙박','호텔','옵션'],desc:'KIX에서 한 정거장 떨어진 린쿠타운의 일반 호텔 후보. 공항 직결 호텔보다 가격을 낮추고 싶은 경우 비교용으로 넣을 수 있다.',image:FALLBACK,facts:{지역:'린쿠타운','유형':'공항 근처 일반 호텔','용도':'KIX 인근 숙박'},reservation:'사전예약 권장. 심야 도착이면 마지막 이동수단을 함께 확인.',source:'https://en.washington-hotels.jp/kansai/'},
  {id:'kixnearhotel',title:'KIX 근처 저가호텔 · 린쿠타운',category:'airport',kind:'option',duration:'숙박',tags:['KIX','린쿠타운','숙박','저가호텔','옵션'],desc:'특정 호텔을 정하지 않은 상태에서 린쿠타운 등 KIX 근처 저가호텔을 후보로 배치하는 카드. 실제 예약 후 커스텀 일정으로 호텔명을 바꿔도 된다.',image:FALLBACK,facts:{지역:'린쿠타운 / KIX 인근','유형':'저가 비즈니스호텔 후보','용도':'가격 우선 숙박'},reservation:'실제 호텔을 정한 뒤 예약 및 심야 이동 가능 여부 확인.',source:'https://www.kansai-airport.or.jp/en/service/relax/hotel'},
  {id:'haruka',title:'HARUKA',category:'transport',kind:'main',duration:'약 1시간대',tags:['이동','열차'],desc:'KIX와 신오사카·교토·오사카를 연결하는 JR 공항특급. 원하는 이동 구간에 일정 카드로 넣을 수 있다.',image:FALLBACK,facts:{종류:'JR 공항특급','활용':'KIX ↔ 신오사카 / 교토 / 오사카'},reservation:'좌석·승차권 조건은 여행 시점에 확인.',source:'https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/'},
  {id:'shinosaka',title:'신오사카역',category:'shinosaka',kind:'option',duration:'20~45분',tags:['신오사카','옵션'],desc:'교토로 가는 길에 선택적으로 들를 수 있는 신칸센 거점역. 에키벤, Pokémon Stand와 묶어 짧게 보기 좋다.',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Shin-Osaka_Station_2020.jpg/1280px-Shin-Osaka_Station_2020.jpg',facts:{지역:'오사카시 요도가와구','추천':'경유형 짧은 체류'},reservation:'예약 없음.',source:'https://www.jr-odekake.net/eki/top?id=0610155'},
  {id:'ekiben',title:'신오사카 에키벤',category:'shinosaka',kind:'option',duration:'20~30분',tags:['신오사카','에키벤','옵션'],desc:'신오사카의 대형 에키벤 판매점에서 여러 지역 도시락을 고르는 경험. 이동 중 경유 옵션으로 넣기 좋다.',image:FALLBACK,facts:{지역:'신오사카역','성격':'에키벤 쇼핑 / 식사'},reservation:'예약 없음. 일부 상품은 사전예약 가능.',source:'https://www.arde-shinosaka.jp/'},
  {id:'pokemonstand',title:'Pokémon Stand · 신오사카',category:'shinosaka',kind:'option',duration:'5~10분',tags:['포켓몬','신오사카','옵션'],desc:'신오사카역 상업시설 안의 공식 포켓몬 굿즈 자판기. 단독 목적지보다는 에키벤 경유에 곁들이는 보너스.',image:FALLBACK,facts:{지역:'신오사카역','규모':'자판기형'},reservation:'예약 없음.',source:'https://shop.pokemon.co.jp/en/services/pokemonstand/'},
  {id:'kyotohotel',title:'교토 숙소',category:'kyoto',kind:'hotel',duration:'숙박',tags:['교토','숙박'],desc:'교토 체류용 숙소 카드. 실제 호텔이 정해지면 메모나 커스텀 일정으로 구체화할 수 있다.',image:FALLBACK,facts:{추천권역:'교토역권','용도':'교토 체류 거점'},reservation:'호텔 사전예약 필요.',source:''},
  {id:'marufukuro',title:'옛 Nintendo 본사 · Marufukuro',category:'kyoto',kind:'option',duration:'20~30분',tags:['닌텐도','교토','역사','옵션'],desc:'닌텐도 창업 역사와 연결되는 옛 본사 건물. 현재 호텔이라 외관·주변 중심으로 보는 역사 스폿.',image:'https://img.hanako.tokyo/2023/04/14010627/unnamed.jpg',facts:{지역:'교토 시내','성격':'역사 스폿','주의':'박물관형 자유관람 시설 아님'},reservation:'외관·주변 관람은 예약 없음. 내부 이용은 호텔 정책 확인.',source:'https://marufukuro.com/'},
  {id:'pkmkyoto',title:'Pokémon Center KYOTO',category:'kyoto',kind:'main',duration:'40~70분',tags:['포켓몬','교토'],desc:'교토풍 매장 디자인과 호우오우·루기아 연출이 특징인 공식 포켓몬센터.',image:'https://pbs.twimg.com/media/D1vdlwMW0AAx7V0.png',facts:{위치:'SUINA室町 2F','성격':'공식 포켓몬센터'},reservation:'통상 예약 없음. 혼잡/정리권 여부는 여행 직전 확인.',source:'https://shop.pokemon.co.jp/en/shop/pokemoncenter-kyoto/'},
  {id:'ninkyoto',title:'Nintendo KYOTO',category:'kyoto',kind:'main',duration:'60~90분',tags:['닌텐도','교토'],desc:'교토의 Nintendo 공식 직영점. 교토 한정 상품과 포토스폿이 있어 Nintendo OSAKA와 별개로 볼 이유가 있다.',image:'https://cdn-ak.f.st-hatena.com/images/fotolife/S/Sig-Maru/20250912/20250912191154.jpg',facts:{위치:'교토 다카시마야 S.C. T8 7F','성격':'Nintendo 공식 직영점'},reservation:'통상 예약 없음. 혼잡 시 운영 공지 확인.',source:'https://www.nintendo.com/jp/officialstore/index.html'},
  {id:'museum',title:'Nintendo Museum',category:'uji',kind:'required',duration:'3~5시간',tags:['닌텐도','우지','필수','예약'],desc:'이번 여행의 필수 장소. 옛 Nintendo 공장 부지에 조성된 박물관으로 닌텐도 역사와 인터랙티브 체험을 볼 수 있다.',image:'https://upload.wikimedia.org/wikipedia/commons/c/c0/Nintendo_Museum_Entrance.jpg',facts:{위치:'교토부 우지시 오구라',추천체류:'3~5시간',접근:'긴테쓰 오구라역 / JR 오구라역'},reservation:'필수: 날짜·시간 지정 티켓을 사전에 확보해야 함.',source:'https://museum.nintendo.com/en/index.html'},
  {id:'osakahotel',title:'오사카 숙소',category:'osaka',kind:'hotel',duration:'숙박',tags:['오사카','숙박'],desc:'오사카 체류용 숙소 카드. 우메다·오사카역권을 중심으로 두면 Nintendo OSAKA와 이동이 편하다.',image:FALLBACK,facts:{추천권역:'오사카역 / 우메다','용도':'오사카 체류 거점'},reservation:'호텔 사전예약 필요.',source:''},
  {id:'ninosaka',title:'Nintendo OSAKA',category:'osaka',kind:'main',duration:'60~90분',tags:['닌텐도','오사카'],desc:'오사카의 Nintendo 공식 직영점. Pokémon Center OSAKA와 같은 생활권이라 한 번에 묶기 좋다.',image:'https://cdn.prod.rexby.com/image/f4242834cc8f4f63ac91a6da175eefc1',facts:{위치:'LUCUA SOUTH 13F','성격':'Nintendo 공식 직영점'},reservation:'통상 예약 없음. 혼잡 시 공지 확인.',source:'https://www.nintendo.com/jp/officialstore/index.html'},
  {id:'pkmosaka',title:'Pokémon Center OSAKA',category:'osaka',kind:'main',duration:'40~70분',tags:['포켓몬','오사카'],desc:'우메다의 공식 포켓몬센터. Nintendo OSAKA와 같은 층이라 추가 동선이 거의 없다.',image:'https://maido-bob.osaka/wp-content/uploads/2024/02/PokemonCenterOsaka_01.jpg',facts:{위치:'LUCUA SOUTH 13F','장점':'Nintendo OSAKA와 묶기 쉬움'},reservation:'통상 예약 없음.',source:'https://shop.pokemon.co.jp/en/shop/pokemoncenter-osaka/'},
  {id:'shinsaibashi',title:'신사이바시 · Pokémon Center OSAKA DX',category:'shinsaibashi',kind:'option',duration:'45~90분',tags:['포켓몬','신사이바시','옵션'],desc:'Pokémon Center OSAKA와 일반 굿즈 중복은 많지만, Pokémon Cafe·도톤보리와 묶으면 별도 방문 가치가 생긴다.',image:'https://cdn.osaka-info.jp/page_translation/content/16889556312516/img_01.jpg',facts:{위치:'다이마루 신사이바시 본관 9F','성격':'공식 포켓몬센터'},reservation:'매장 예약 없음. 혼잡 공지는 여행 직전 확인.',source:'https://shop.pokemon.co.jp/en/shop/pokemoncenter-osakadx/'},
  {id:'pokecafe',title:'Pokémon Cafe OSAKA',category:'shinsaibashi',kind:'option',duration:'약 90분',tags:['포켓몬','카페','신사이바시','옵션','예약'],desc:'공식 포켓몬 테마 레스토랑. 굿즈 매장과 다른 경험이라 신사이바시를 넣는 가장 큰 이유 중 하나.',image:'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000671/img/ja/a2000671_parts_615af5f83203f.jpg',facts:{위치:'다이마루 신사이바시 본관 9F','성격':'공식 테마 레스토랑'},reservation:'사전예약 필요.',source:'https://www.pokemoncenter-online.com/cafe/'},
  {id:'dotonbori',title:'신사이바시 · 도톤보리',category:'shinsaibashi',kind:'option',duration:'1~3시간',tags:['오사카','관광','신사이바시','옵션'],desc:'Pokémon Center OSAKA DX / Cafe와 묶기 좋은 오사카 미나미 관광 블록.',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dotonbori_Osaka_Japan.jpg/1280px-Dotonbori_Osaka_Japan.jpg',facts:{지역:'신사이바시 / 난바','성격':'관광 / 식사'},reservation:'예약 없음.',source:'https://osaka-info.jp/en/spot/dotonbori/'},
  {id:'usj',title:'USJ',category:'usj',kind:'option',duration:'하루',tags:['USJ','옵션','예약'],desc:'Universal Studios Japan. Nintendo 중심이라면 SUPER NINTENDO WORLD와 함께 하루 블록으로 잡기 좋다.',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Universal_Studios_Japan_entrance.jpg/1280px-Universal_Studios_Japan_entrance.jpg',facts:{지역:'Universal City',추천체류:'하루'},reservation:'입장권 필요. 날짜별 가격·운영조건은 여행 직전 확인.',source:'https://www.usj.co.jp/web/en/us'},
  {id:'snw',title:'SUPER NINTENDO WORLD',category:'usj',kind:'option',duration:'반나절~하루',tags:['닌텐도','USJ','옵션','예약'],desc:'USJ 내부의 닌텐도 테마 구역. 마리오와 동키콩 콘텐츠, Power-Up Band 연동 체험이 핵심.',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Super_Nintendo_World_at_Universal_Studios_Japan.jpg/1280px-Super_Nintendo_World_at_Universal_Studios_Japan.jpg',facts:{위치:'USJ 내부','성격':'Nintendo 테마 구역'},reservation:'USJ 입장권 필요. 구역 입장 정리권·시간지정권 조건은 당일/사전 상품에 따라 확인.',source:'https://www.usj.co.jp/web/en/us/areas/super-nintendo-world'},
  {id:'powerup',title:'Power-Up Band',category:'usj',kind:'option',duration:'체험 도구',tags:['닌텐도','USJ','옵션'],desc:'SUPER NINTENDO WORLD 내 키 챌린지·코인 등 상호작용을 확장하는 밴드. 일정 장소라기보다 체험 옵션으로 넣어둔 카드.',image:FALLBACK,facts:{위치:'SUPER NINTENDO WORLD','성격':'체험 액세서리'},reservation:'현장 판매/재고·가격은 여행 직전 확인.',source:'https://www.usj.co.jp/web/en/us/areas/super-nintendo-world'},
  {id:'kixreturn',title:'오사카 → KIX 이동',category:'transport',kind:'main',duration:'공항 이동',tags:['이동','공항'],desc:'귀국일 오사카에서 KIX로 이동하는 블록. 실제 열차나 버스는 항공 시간에 맞춰 선택한다.',image:FALLBACK,facts:{구간:'오사카 → KIX','용도':'귀국 이동'},reservation:'교통수단에 따라 좌석예약 여부 확인.',source:''},
  {id:'kirbystore',title:'Kirby Café THE STORE OSAKA',category:'shinsaibashi',kind:'option',duration:'30~60분',tags:['커비','Kirby','굿즈','신사이바시','옵션'],desc:'카비 카페 공식 굿즈숍 OSAKA점. 신사이바시의 Pokémon Center OSAKA DX·Pokémon Cafe와 같은 다이마루 신사이바시 본관 9층이라 함께 보기 좋다.',image:FALLBACK,facts:{위치:'다이마루 신사이바시 본관 9F',영업:'10:00~20:00',성격:'Kirby 공식 굿즈숍'},reservation:'예약 없음. 혼잡 시 현장 운영은 여행 직전 확인.',source:'https://kirbycafe.jp/thestore/osaka/'},
  {id:'dendentown',title:'덴덴타운 · 오타로드',category:'nippombashi',kind:'option',duration:'2~4시간',tags:['오사카','닛폰바시','덴덴타운','오타로드','레트로','게임','카드','옵션'],desc:'오사카 닛폰바시의 전자·게임·애니·카드 상권. 레트로게임과 TCG 목적점을 여러 곳 묶어 걷는 지역형 일정으로 쓰기 좋다.',image:FALLBACK,facts:{지역:'닛폰바시~에비스초',성격:'레트로게임 / TCG / 서브컬처 상권',추천:'개별 매장과 묶어서 방문'},reservation:'예약 없음.',source:'https://www.nippombashi.jp/'},
  {id:'superpotato',title:'Super Potato 오타로드점',category:'nippombashi',kind:'option',duration:'45~90분',tags:['레트로','게임','닌텐도','패미컴','게임보이','덴덴타운','옵션'],desc:'오타로드의 레트로게임 전문점. FC·SFC·N64·GC·GB·GBA·Virtual Boy·Game & Watch 등 오래된 게임기와 소프트를 폭넓게 볼 수 있다.',image:FALLBACK,facts:{위치:'大阪市浪速区日本橋3-8-18',영업:'평일 11:00~20:00 / 토일공휴일 10:00~20:00',성격:'레트로게임 전문점'},reservation:'예약 없음.',source:'https://www.superpotato.com/shop/otaroad/'},
  {id:'gametanteidan',title:'게임탐정단 · ゲーム探偵団',category:'nippombashi',kind:'option',duration:'45~90분',tags:['레트로','게임','닌텐도','Game & Watch','패미컴','덴덴타운','옵션'],desc:'오래된 Nintendo 하드웨어·소프트와 희귀품을 깊게 볼 수 있는 레트로게임점. 1층은 패미컴부터 Wii까지 Nintendo 중심이며 Game & Watch도 취급한다.',image:FALLBACK,facts:{위치:'大阪市浪速区日本橋5-7-18',영업:'12:00~19:00 전후',성격:'희귀·중고 레트로게임'},reservation:'예약 없음. 재고는 수시 변동.',source:'https://game-tanteidan.com/main/omise/oindex.html'},
  {id:'cardstation',title:'Pokémon Card Station OSAKA',category:'osaka',kind:'option',duration:'30~60분',tags:['포켓몬','카드','TCG','우메다','오사카','옵션'],desc:'Pokémon Center OSAKA와 함께 볼 수 있는 공식 포켓몬 카드 시설. 카드 이벤트·상품 확인을 우메다 Nintendo/Pokémon 동선에 묶기 좋다.',image:FALLBACK,facts:{지역:'오사카역·우메다',연계:'Pokémon Center OSAKA 주변 시설',성격:'공식 Pokémon Card 거점'},reservation:'일반 방문 예약 없음. 특정 이벤트는 별도 사전 신청이 있을 수 있음.',source:'https://shop.pokemon.co.jp/en/shop/pokemoncenter-osaka/'},
  {id:'preyzmain',title:'Preyz 오사카 닛폰바시 본점',category:'nippombashi',kind:'option',duration:'45~90분',tags:['포켓몬','카드','TCG','덴덴타운','옵션'],desc:'포켓몬카드 등 여러 TCG를 취급하는 대형 카드숍. 210석 규모 대전 공간이 있는 종합 TCG 매장이다.',image:FALLBACK,facts:{위치:'大阪市浪速区日本橋3-7-6',영업:'평일 12:00~22:00 / 토일공휴일 10:00~22:00',성격:'대형 종합 TCG'},reservation:'일반 쇼핑 예약 없음. 대회·이벤트는 별도 신청 가능.',source:'https://www.preyz.com/category/shop/playze_osakanippombashi_headquarters/'},
  {id:'preyzotaro',title:'Preyz 닛폰바시 오타로드점',category:'nippombashi',kind:'option',duration:'30~75분',tags:['포켓몬','카드','TCG','포켓몬카드','덴덴타운','옵션'],desc:'1층 전체가 포켓몬카드 판매층인 카드숍. 포켓몬 카드 쇼핑 목적이면 덴덴타운 카드 코스에서 특히 우선순위가 높다.',image:FALLBACK,facts:{위치:'大阪市浪速区難波中2-4-4',영업:'평일 12:00~20:00 / 토일공휴일 10:00~20:00',성격:'1층 Pokémon Card 전문 판매'},reservation:'일반 쇼핑 예약 없음. 대회·이벤트는 별도 신청 가능.',source:'https://www.preyz.com/category/shop/playze_osakanippombashi_otaroad/'}
];

const ROUTE_GROUPS = [
  {id:'route-icn',major:'출국 전',areaKey:'icn',title:'인천공항 · 출국 전 숙박',region:'인천공항',duration:'숙박',placeIds:['darakhyu'],desc:'12일 밤을 국내에서 보내고 다음 날 아침 출국하는 선택지.',defaultPlaceIds:['darakhyu']},
  {id:'route-kix',major:'공항권',areaKey:'kix',title:'KIX · Aeroplaza',region:'간사이공항',duration:'도착 + 숙박',placeIds:['kix','firstcabin','nikkokix'],desc:'늦은 밤 KIX 도착 후 공항을 벗어나지 않고 바로 쉬는 동선. 숙박은 First Cabin 또는 Hotel Nikko 중 하나만 고르면 된다.',defaultPlaceIds:['kix','firstcabin']},
  {id:'route-rinku',major:'공항권',areaKey:'rinku',title:'린쿠타운 · 공항 인근 숙박',region:'린쿠타운',duration:'숙박',placeIds:['washingtonkix','kixnearhotel'],desc:'공항 직결 대신 한 정거장 이동해 숙박비를 낮추는 후보군.',defaultPlaceIds:['washingtonkix']},
  {id:'route-shinosaka',major:'신오사카',areaKey:'shinosaka',title:'신오사카 A · 역내 경유',region:'신오사카역',duration:'30~60분 + 이동',placeIds:['shinosaka','ekiben','pokemonstand'],desc:'교토로 가는 길에 신오사카역에서 에키벤과 Pokémon Stand를 묶어 보는 짧은 경유.',defaultPlaceIds:['shinosaka','ekiben','pokemonstand']},
  {id:'route-kyoto-a',major:'교토권',areaKey:'kyoto-a',title:'교토 A · 시조/가와라마치',region:'시조·가와라마치',duration:'2~3시간',placeIds:['pkmkyoto','ninkyoto'],desc:'Pokémon Center KYOTO와 Nintendo KYOTO를 같은 도심권에서 묶는 핵심 쇼핑 동선.',defaultPlaceIds:['pkmkyoto','ninkyoto']},
  {id:'route-kyoto-b',major:'교토권',areaKey:'kyoto-b',title:'교토 B · 시치조/교토역권',region:'교토역·시치조',duration:'1~2시간 + 숙박',placeIds:['marufukuro','kyotohotel'],desc:'옛 Nintendo 본사 역사 스폿과 교토 숙소 거점을 묶어 보는 권역.',defaultPlaceIds:['marufukuro']},
  {id:'route-kyoto-c',major:'교토권',areaKey:'kyoto-c',title:'교토 C · 우지/오구라',region:'우지·오구라',duration:'3~5시간',placeIds:['museum'],desc:'Nintendo Museum 하나를 중심으로 따로 시간을 잡아야 하는 우지 권역.',defaultPlaceIds:['museum']},
  {id:'route-osaka-a',major:'오사카권',areaKey:'osaka-a',title:'오사카 A · 우메다/오사카역',region:'우메다·오사카역',duration:'2~3시간',placeIds:['ninosaka','pkmosaka','cardstation','osakahotel'],desc:'Nintendo OSAKA, Pokémon Center OSAKA, Pokémon Card Station을 같은 역권에서 이어 보는 동선.',defaultPlaceIds:['ninosaka','pkmosaka','cardstation']},
  {id:'route-osaka-b',major:'오사카권',areaKey:'osaka-b',title:'오사카 B · 신사이바시/난바',region:'신사이바시·난바',duration:'3~5시간',placeIds:['shinsaibashi','pokecafe','kirbystore','dotonbori'],desc:'같은 건물의 Pokémon Center DX·Pokémon Cafe·Kirby Store를 보고 도톤보리까지 이어가는 동선.',defaultPlaceIds:['shinsaibashi','pokecafe','kirbystore','dotonbori']},
  {id:'route-osaka-c',major:'오사카권',areaKey:'osaka-c',title:'오사카 C · 닛폰바시/오타로드',region:'닛폰바시·오타로드',duration:'3~5시간',placeIds:['superpotato','gametanteidan','preyzotaro','preyzmain'],desc:'레트로 Nintendo 하드웨어·소프트와 Pokémon Card·TCG 매장을 도보권에서 몰아서 보는 쇼핑 동선.',defaultPlaceIds:['superpotato','gametanteidan','preyzotaro']},
  {id:'route-osaka-d',major:'오사카권',areaKey:'osaka-d',title:'오사카 D · 유니버설시티',region:'USJ·Universal City',duration:'하루',placeIds:['usj','snw'],desc:'USJ를 하루 잡고 SUPER NINTENDO WORLD를 핵심으로 보는 동선.',defaultPlaceIds:['usj','snw'],optionNote:'Power-Up Band는 장소가 아니라 SUPER NINTENDO WORLD 체험 옵션으로 관리합니다.'}
];

const RESERVATION_RULES = {
  museum:{level:'required',title:'예약 필수',doneLabel:'티켓 확보',note:'날짜·시간 지정 티켓을 사전에 확보해야 합니다.'},
  pokecafe:{level:'required',title:'예약 필수',doneLabel:'예약 완료',note:'Pokémon Cafe는 사전예약이 필요합니다.'},
  usj:{level:'required',title:'티켓 필요',doneLabel:'티켓 확보',note:'파크 입장권을 방문 전에 확보하세요.'},
  snw:{level:'conditional',title:'입장 조건 확인',doneLabel:'확인 완료',note:'정리권·시간지정권 또는 Express Pass 조건을 확인하세요.'},
  darakhyu:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'이 숙박안을 사용할 경우 객실을 미리 확보하세요.'},
  firstcabin:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'KIX 심야 도착안에 사용할 경우 미리 예약하는 편이 안전합니다.'},
  kixhotel:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'실제 이용할 호텔을 확정한 뒤 예약하세요.'},
  nikkokix:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'KIX 심야 도착안에 사용할 경우 객실을 미리 확보하세요.'},
  washingtonkix:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'숙박과 심야 이동수단을 함께 확인하세요.'},
  kixnearhotel:{level:'recommended',title:'숙박 예약 권장',doneLabel:'예약 완료',note:'실제 숙소를 정한 뒤 예약하세요.'},
  kyotohotel:{level:'recommended',title:'숙소 예약',doneLabel:'예약 완료',note:'교토에서 사용할 실제 숙소를 확정하세요.'},
  osakahotel:{level:'recommended',title:'숙소 예약',doneLabel:'예약 완료',note:'오사카에서 사용할 실제 숙소를 확정하세요.'}
};

const AREA_META = {
  icn:{label:'인천공항',major:'출국 전',order:0},
  kix:{label:'KIX · Aeroplaza',major:'공항권',order:1},
  rinku:{label:'린쿠타운',major:'공항권',order:2},
  shinosaka:{label:'신오사카역',major:'신오사카',order:3},
  'kyoto-a':{label:'교토 A · 시조/가와라마치',major:'교토권',order:4},
  'kyoto-b':{label:'교토 B · 시치조/교토역권',major:'교토권',order:5},
  'kyoto-c':{label:'교토 C · 우지/오구라',major:'교토권',order:6},
  'osaka-a':{label:'오사카 A · 우메다/오사카역',major:'오사카권',order:7},
  'osaka-b':{label:'오사카 B · 신사이바시/난바',major:'오사카권',order:8},
  'osaka-c':{label:'오사카 C · 닛폰바시/오타로드',major:'오사카권',order:9},
  'osaka-d':{label:'오사카 D · 유니버설시티',major:'오사카권',order:10},
  transfer:{label:'도시간·공항 이동',major:'이동',order:11}
};
const MAJOR_ORDER=['출국 전','공항권','신오사카','교토권','오사카권','이동'];
const PLACE_AREA = {
  darakhyu:'icn',kix:'kix',firstcabin:'kix',nikkokix:'kix',kixhotel:'kix',washingtonkix:'rinku',kixnearhotel:'rinku',
  shinosaka:'shinosaka',ekiben:'shinosaka',pokemonstand:'shinosaka',
  pkmkyoto:'kyoto-a',ninkyoto:'kyoto-a',marufukuro:'kyoto-b',kyotohotel:'kyoto-b',museum:'kyoto-c',
  ninosaka:'osaka-a',pkmosaka:'osaka-a',cardstation:'osaka-a',osakahotel:'osaka-a',
  shinsaibashi:'osaka-b',pokecafe:'osaka-b',kirbystore:'osaka-b',dotonbori:'osaka-b',
  superpotato:'osaka-c',gametanteidan:'osaka-c',preyzotaro:'osaka-c',preyzmain:'osaka-c',dendentown:'osaka-c',
  usj:'osaka-d',snw:'osaka-d',powerup:'osaka-d',haruka:'transfer',kixreturn:'transfer'
};
const PLACE_LIBRARY_EXCLUDE=new Set(['dendentown','powerup']);
const PLACE_OPTION_NOTES={snw:'Power-Up Band · 선택 옵션: 구입 시 키 챌린지·코인 등 연동 체험을 확장할 수 있습니다.'};
const RELATION_HINTS = {
  shinosaka:'에키벤·Pokémon Stand와 같은 신오사카역 안에서 묶기',ekiben:'Pokémon Stand와 같은 신오사카역 경유',pokemonstand:'에키벤과 같은 신오사카역 경유',
  marufukuro:'교토 B · 시치조/교토역권',pkmkyoto:'Nintendo KYOTO와 교토 A 동선',ninkyoto:'Pokémon Center KYOTO와 교토 A 동선',museum:'교토 C · 우지/오구라 단독 핵심',
  ninosaka:'Pokémon Center OSAKA·Card Station과 같은 우메다 권역',pkmosaka:'Nintendo OSAKA·Card Station과 같은 우메다 권역',cardstation:'Pokémon Center OSAKA와 같은 우메다 권역',
  shinsaibashi:'Pokémon Cafe·Kirby Store와 같은 건물',pokecafe:'Pokémon Center OSAKA DX·Kirby Store와 같은 건물',kirbystore:'Pokémon Center OSAKA DX·Pokémon Cafe와 같은 건물',dotonbori:'신사이바시/난바 동선 뒤에 이어가기 좋음',
  superpotato:'게임탐정단·Preyz와 오타로드 도보 쇼핑',gametanteidan:'Super Potato·Preyz와 오타로드 도보 쇼핑',preyzmain:'레트로게임점들과 닛폰바시에서 함께 보기',preyzotaro:'Pokémon Card 우선이면 오사카 C에서 우선순위 높음',
  usj:'SUPER NINTENDO WORLD와 같은 유니버설시티 하루 일정',snw:'USJ 내부 · Power-Up Band는 체험 옵션'
};
const SAME_BUILDING = [new Set(['ninosaka','pkmosaka']),new Set(['shinsaibashi','pokecafe','kirbystore'])];

const DAY_META = {
  '12':{date:'5/12',week:'수'}, '13':{date:'5/13',week:'목'}, '14':{date:'5/14',week:'금'}, '15':{date:'5/15',week:'토'}, '16':{date:'5/16',week:'일'}
};

const JSON_FORMAT='nintendo-kansai-trip-planner';
const JSON_VERSION=12;
let state = {
  activePlan:'start13',
  plans:{use12:{'12':[],'13':[],'14':[],'15':[],'16':[]},start13:{'13':[],'14':[],'15':[],'16':[]}},
  reservationDone:{}
};
ensureState();
function migrateLegacyRoutes(){
  const map={
    'route-kyoto':['route-kyoto-a',['marufukuro','pkmkyoto','ninkyoto']],
    'route-umeda':['route-osaka-a',['ninosaka','pkmosaka','cardstation']],
    'route-shinsaibashi':['route-osaka-b',['shinsaibashi','pokecafe','kirbystore','dotonbori']],
    'route-dendentown':['route-osaka-c',['superpotato','gametanteidan','preyzotaro','preyzmain']],
    'route-usj':['route-osaka-d',['usj','snw']]
  };
  Object.values(state.plans).forEach(plan=>Object.values(plan).forEach(items=>items.forEach(item=>{const hit=map[item.routeId];if(hit){item.routeId=hit[0];item.memberIds ||= hit[1]}})));
}
migrateLegacyRoutes();
let currentFileHandle=null;
let currentFileName='';
let dirty=false;
let libraryMode='places';
let selectedPlace=null;
let pendingAdd=null;
let draggedSchedule=null;
const routeSelections=new Map();

function safeParse(v){try{return v?JSON.parse(v):null}catch{return null}}
function blankPlan(use12=false){return use12?{'12':[],'13':[],'14':[],'15':[],'16':[]}:{'13':[],'14':[],'15':[],'16':[]}}
function ensureState(){
  state.activePlan = state.activePlan==='use12'?'use12':'start13';
  state.plans ||= {};
  state.plans.use12 ||= blankPlan(true);state.plans.start13 ||= blankPlan(false);
  ['12','13','14','15','16'].forEach(d=>state.plans.use12[d] ||= []);
  ['13','14','15','16'].forEach(d=>state.plans.start13[d] ||= []);
  state.reservationDone ||= {};
}
function currentSchedule(){return state.plans[state.activePlan]}
function activeDays(){return state.activePlan==='use12'?['12','13','14','15','16']:['13','14','15','16']}
function uid(){return 'i_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7)}
function placeById(id){return places.find(p=>p.id===id)}
function routeById(id){return ROUTE_GROUPS.find(g=>g.id===id)}
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function setJsonStatus(text,mode='neutral'){
  const el=document.getElementById('jsonStatus');if(!el)return;
  el.textContent=text;
  el.classList.remove('neutral','dirty','saved');
  el.classList.add(mode);
}
function markDirty(){dirty=true;setJsonStatus('● 저장 안 됨 · JSON 저장 필요','dirty')}
function persist(){markDirty()}
function buildJsonPayload(){
  return {format:JSON_FORMAT,version:JSON_VERSION,savedAt:new Date().toISOString(),state};
}
function downloadJsonText(text,filename){
  const blob=new Blob([text],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),0);
}
async function saveJson(){
  const text=JSON.stringify(buildJsonPayload(),null,2);
  const suggested=currentFileName||'nintendo-kansai-trip-2027.json';
  try{
    if(window.showSaveFilePicker){
      if(!currentFileHandle){
        currentFileHandle=await window.showSaveFilePicker({suggestedName:suggested,types:[{description:'여행 일정 JSON',accept:{'application/json':['.json']}}]});
      }
      const writable=await currentFileHandle.createWritable();await writable.write(text);await writable.close();
      currentFileName=currentFileHandle.name||suggested;dirty=false;setJsonStatus(`✓ ${currentFileName} · 저장됨`,'saved');toast('JSON 파일에 저장했습니다.');return;
    }
  }catch(err){
    if(err?.name==='AbortError')return;
    currentFileHandle=null;
  }
  downloadJsonText(text,suggested);currentFileName=suggested;dirty=false;setJsonStatus(`✓ ${currentFileName} · 다운로드됨`,'saved');toast('JSON 파일을 다운로드했습니다.');
}
function normalizeImportedState(data){
  const imported=data?.format===JSON_FORMAT?data.state:(data?.state?.plans?data.state:data);
  if(!imported||typeof imported!=='object'||!imported.plans)throw new Error('지원하지 않는 일정 JSON 형식입니다.');
  return imported;
}
async function openJson(){
  try{
    if(window.showOpenFilePicker){
      const [handle]=await window.showOpenFilePicker({multiple:false,types:[{description:'여행 일정 JSON',accept:{'application/json':['.json']}}]});
      if(!handle)return;const file=await handle.getFile();await loadJsonFile(file,handle);return;
    }
  }catch(err){if(err?.name==='AbortError')return;console.error(err)}
  document.getElementById('jsonFileInput').click();
}
async function loadJsonFile(file,fileHandle=null){
  if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    state=normalizeImportedState(data);ensureState();migrateLegacyRoutes();
    currentFileHandle=fileHandle;currentFileName=file.name||'trip.json';dirty=false;
    renderLibraryTabs();renderLibrary();renderBoard();setJsonStatus(`✓ ${currentFileName} · 불러옴`,'saved');toast('JSON 일정을 불러왔습니다.');
  }catch(err){
    console.error(err);toast('JSON을 불러오지 못했습니다. 파일 형식을 확인하세요.');
  }
}
function schedulePlaceIds(){
  const ids=new Set();Object.values(currentSchedule()).flat().forEach(item=>{if(item.placeId)ids.add(item.placeId);if(item.routeId){const g=routeById(item.routeId);(item.memberIds||g?.placeIds||[]).forEach(id=>ids.add(id))}});return ids;
}
function planCount(planName){return Object.values(state.plans[planName]||{}).reduce((n,list)=>n+list.length,0)}
function regionKey(p){return PLACE_AREA[p?.id]||'transfer'}
function placeType(p){
  if(!p)return 'all';
  if(p.kind==='hotel'||p.tags.includes('숙박'))return 'hotel';
  if(['airport','transport'].includes(p.category)||p.tags.includes('이동'))return 'transport';
  if(['museum','usj','snw'].includes(p.id))return 'experience';
  if(['pokecafe','ekiben','dotonbori'].includes(p.id))return 'food';
  if(p.tags.some(t=>['레트로','카드','tcg','포켓몬카드','게임'].includes(String(t).toLowerCase())))return 'gaming';
  if(['pkmkyoto','ninkyoto','ninosaka','pkmosaka','shinsaibashi','kirbystore','pokemonstand','cardstation'].includes(p.id))return 'shop';
  return 'experience';
}
function sameBuilding(a,b){if(!a||!b)return false;return SAME_BUILDING.some(set=>set.has(a)&&set.has(b))}
function areaLabel(key){return AREA_META[key]?.label||key||''}
function areaMajor(key){return AREA_META[key]?.major||'기타'}

function renderLibraryTabs(){document.querySelectorAll('.library-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.mode===libraryMode))}
function placeBadges(p){
  const badges=[];
  if(p.kind==='required')badges.push('<span class="mini-badge required">필수</span>');
  if(p.kind==='option')badges.push('<span class="mini-badge option">옵션</span>');
  if(p.kind==='hotel')badges.push('<span class="mini-badge hotel">숙박</span>');
  const type=placeType(p);if(type==='gaming')badges.push('<span class="mini-badge gaming">게임쇼핑</span>');
  if(type==='transport')badges.push('<span class="mini-badge transport">이동</span>');
  return badges;
}
function requirementLabel(rule){return rule.level==='required'?'필수':rule.level==='conditional'?'확인':'권장'}
function renderRequirementInline(placeId,context='library'){
  const rule=RESERVATION_RULES[placeId];if(!rule)return '';
  const done=!!state.reservationDone[placeId];
  return `<label class="inline-requirement ${rule.level} ${done?'done':''}" data-requirement-row="${placeId}">
    <input type="checkbox" data-reservation-toggle="${placeId}" ${done?'checked':''}>
    <span class="inline-check">${done?'✓':''}</span>
    <span class="inline-requirement-copy"><strong>${escapeHtml(rule.title)}</strong><small>${escapeHtml(rule.note)}</small></span>
    <span class="inline-requirement-state">${done?escapeHtml(rule.doneLabel):requirementLabel(rule)}</span>
  </label>`;
}
function bindReservationToggles(root=document){
  root.querySelectorAll('[data-reservation-toggle]').forEach(inp=>inp.onchange=e=>{
    e.stopPropagation();state.reservationDone[inp.dataset.reservationToggle]=inp.checked;persist();renderLibrary();renderBoard();
  });
  root.querySelectorAll('.inline-requirement').forEach(row=>row.onclick=e=>e.stopPropagation());
}
function renderPlaceCard(p){
  const relation=RELATION_HINTS[p.id],optionNote=PLACE_OPTION_NOTES[p.id];
  return `<article class="place-card" draggable="true" data-place="${p.id}">
    <div class="place-card-main">
      <img class="place-thumb" src="${p.image||FALLBACK}" alt="" onerror="this.src='${FALLBACK}'">
      <div class="place-copy"><div class="place-title">${escapeHtml(p.title)}</div><div class="place-meta">${placeBadges(p).join('')}<span>${escapeHtml(p.duration)}</span></div>${relation?`<div class="relation-hint">↳ ${escapeHtml(relation)}</div>`:''}${optionNote?`<div class="place-option-note">🎮 ${escapeHtml(optionNote)}</div>`:''}</div>
      <button class="add-mini" data-add="${p.id}" title="일정에 추가">＋</button>
    </div>
    ${renderRequirementInline(p.id)}
  </article>`;
}
function renderPlacesGrouped(list){
  const grouped={};list.forEach(p=>{const key=regionKey(p);(grouped[key]??=[]).push(p)});
  const byMajor={};
  Object.entries(grouped).sort((a,b)=>(AREA_META[a[0]]?.order??99)-(AREA_META[b[0]]?.order??99)).forEach(([key,items])=>{const major=areaMajor(key);(byMajor[major]??=[]).push([key,items])});
  return MAJOR_ORDER.filter(m=>byMajor[m]?.length).map(major=>`<section class="major-region-section"><div class="major-region-head"><strong>${escapeHtml(major)}</strong><span>${byMajor[major].reduce((n,[,items])=>n+items.length,0)}곳</span></div>${byMajor[major].map(([key,items])=>`<details class="region-group" open><summary><span>${escapeHtml(AREA_META[key]?.label||key)}</span><b>${items.length}</b></summary><div class="region-group-body">${items.map(renderPlaceCard).join('')}</div></details>`).join('')}</section>`).join('');
}
function defaultRouteSelection(g){return new Set((g.defaultPlaceIds?.length?g.defaultPlaceIds:g.placeIds).filter(id=>g.placeIds.includes(id)))}
function selectedRouteIds(routeId){const g=routeById(routeId);if(!g)return[];if(!routeSelections.has(routeId))routeSelections.set(routeId,defaultRouteSelection(g));return [...routeSelections.get(routeId)]}
function renderRouteCard(g){
  const members=g.placeIds.map(placeById).filter(Boolean),selected=new Set(selectedRouteIds(g.id));
  const hasRequired=members.some(p=>['required','conditional'].includes(RESERVATION_RULES[p.id]?.level));
  return `<article class="route-library-card" draggable="true" data-route="${g.id}">
    <div class="route-card-top"><div><div class="route-kicker">${escapeHtml(g.region)} · ${escapeHtml(g.duration)}</div><div class="route-title">${escapeHtml(g.title)}</div></div><button class="route-add-selected" data-add-route="${g.id}" title="선택한 장소를 묶음으로 추가">선택 추가</button></div>
    <p>${escapeHtml(g.desc)}</p>
    <div class="route-member-list">${members.map((p,i)=>`<label class="route-member-select"><input type="checkbox" data-route-select="${g.id}" data-place-id="${p.id}" ${selected.has(p.id)?'checked':''}><span class="route-member-index">${i+1}</span><span class="route-member-copy"><strong>${escapeHtml(p.title)}</strong><small>${escapeHtml(p.duration)}${RESERVATION_RULES[p.id]?.level==='required'?' · 예약 필수':''}</small></span><button type="button" class="route-member-info" data-route-member="${p.id}" title="장소 상세">ⓘ</button></label>`).join('')}</div>
    ${g.optionNote?`<div class="route-option-note">${escapeHtml(g.optionNote)}</div>`:''}
    <div class="route-footer"><span>${selected.size}/${members.length}곳 선택</span>${hasRequired?'<span class="route-reserve-alert">예약/조건 있음</span>':''}</div>
  </article>`;
}
function renderRoutesGrouped(){
  const byMajor={};ROUTE_GROUPS.forEach(g=>(byMajor[g.major]??=[]).push(g));
  return MAJOR_ORDER.filter(m=>byMajor[m]?.length).map(major=>`<section class="major-route-section"><div class="major-region-head"><strong>${escapeHtml(major)}</strong><span>${byMajor[major].length}개 동선</span></div><div class="major-route-body">${byMajor[major].map(renderRouteCard).join('')}</div></section>`).join('');
}
function bindLibraryPlaceCards(root){
  root.querySelectorAll('.place-card').forEach(card=>{card.onclick=e=>{if(e.target.closest('[data-add],.inline-requirement'))return;selectPlace(card.dataset.place)};card.addEventListener('dragstart',e=>{if(e.target.closest('button,input,label')){e.preventDefault();return}card.classList.add('dragging');e.dataTransfer.setData('text/place',card.dataset.place);e.dataTransfer.effectAllowed='copy'});card.addEventListener('dragend',()=>card.classList.remove('dragging'))});
  root.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();openAddDialog({type:'place',id:btn.dataset.add})});bindReservationToggles(root);
}
function bindRouteCards(root){
  root.querySelectorAll('.route-library-card').forEach(card=>{card.addEventListener('dragstart',e=>{if(e.target.closest('button,input,label')){e.preventDefault();return}const routeId=card.dataset.route;if(!selectedRouteIds(routeId).length){e.preventDefault();toast('동선에서 한 곳 이상 선택하세요.');return}card.classList.add('dragging');e.dataTransfer.setData('text/route',routeId);e.dataTransfer.effectAllowed='copy'});card.addEventListener('dragend',()=>card.classList.remove('dragging'))});
  root.querySelectorAll('[data-route-select]').forEach(inp=>inp.onchange=e=>{e.stopPropagation();const routeId=inp.dataset.routeSelect,placeId=inp.dataset.placeId,g=routeById(routeId);if(!routeSelections.has(routeId))routeSelections.set(routeId,defaultRouteSelection(g));const set=routeSelections.get(routeId);inp.checked?set.add(placeId):set.delete(placeId);renderLibrary()});
  root.querySelectorAll('[data-add-route]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();const ids=selectedRouteIds(btn.dataset.addRoute);if(!ids.length){toast('동선에서 한 곳 이상 선택하세요.');return}openAddDialog({type:'route',id:btn.dataset.addRoute,memberIds:ids})});
  root.querySelectorAll('[data-route-member]').forEach(btn=>btn.onclick=e=>{e.preventDefault();e.stopPropagation();selectPlace(btn.dataset.routeMember)});
}
function renderLibrary(){
  const root=document.getElementById('placeLibrary');
  if(libraryMode==='routes'){root.innerHTML=renderRoutesGrouped();bindRouteCards(root);return}
  const list=places.filter(p=>!PLACE_LIBRARY_EXCLUDE.has(p.id));root.innerHTML=renderPlacesGrouped(list);bindLibraryPlaceCards(root);
}

function minutes(v){if(!v||!/^[0-2]\d:[0-5]\d$/.test(v))return null;const [h,m]=v.split(':').map(Number);return h*60+m}
function itemArea(item){if(item.placeId)return regionKey(placeById(item.placeId));if(item.routeId)return routeById(item.routeId)?.areaKey||null;return null}
function itemPlaceId(item){return item.placeId||null}
function renderMovement(prev,curr){
  const a=itemArea(prev),b=itemArea(curr);if(!a||!b)return '';
  const same=a===b;const sameBld=sameBuilding(itemPlaceId(prev),itemPlaceId(curr));
  if(sameBld)return '<div class="movement-hint same">↳ 같은 건물 · 이동 거의 없음</div>';
  if(same)return `<div class="movement-hint same">↳ ${escapeHtml(areaLabel(a))} 안에서 이어보기</div>`;
  return `<div class="movement-hint move">↓ ${escapeHtml(areaLabel(a))} → ${escapeHtml(areaLabel(b))} · 이동 필요</div>`;
}
function timingWarnings(items,index){
  if(index===0)return[];const prev=items[index-1],curr=items[index],pe=minutes(prev.end),cs=minutes(curr.start);if(pe===null||cs===null)return[];const gap=cs-pe;const warnings=[];
  if(gap<0)warnings.push(`앞 일정과 ${Math.abs(gap)}분 겹침`);
  else if(itemArea(prev)&&itemArea(curr)&&itemArea(prev)!==itemArea(curr)&&gap<15)warnings.push('지역이 바뀌는데 이동 여유가 15분 미만');
  return warnings;
}
function renderWarnings(warnings){return warnings.length?`<div class="schedule-warning">⚠ ${warnings.map(escapeHtml).join(' · ')}</div>`:''}
function renderBoard(){
  document.querySelectorAll('.start-btn').forEach(b=>b.classList.toggle('active',(b.dataset.start==='12'&&state.activePlan==='use12')||(b.dataset.start==='13'&&state.activePlan==='start13')));
  document.querySelector('[data-plan-count="12"]').textContent=planCount('use12');document.querySelector('[data-plan-count="13"]').textContent=planCount('start13');
  const days=activeDays(),board=document.getElementById('scheduleBoard');board.style.setProperty('--day-count',days.length);
  board.innerHTML=days.map(day=>{const items=currentSchedule()[day]||[];const cards=items.map((item,i)=>`${i?renderMovement(items[i-1],item):''}${renderScheduleCard(item,day,timingWarnings(items,i))}`).join('');return `<section class="day-column" data-day="${day}"><header class="day-head"><div class="day-title-line"><div><span class="day-date">${DAY_META[day].date}</span><span class="day-week">${DAY_META[day].week}</span></div><div class="day-head-actions"><span class="day-count">${items.length}개</span><button type="button" class="day-add-btn" data-custom-day="${day}">＋ 일정</button></div></div></header><div class="drop-zone" data-day="${day}">${items.length?cards:'<div class="empty-drop"><div><b>비어 있음</b>왼쪽 장소·권역 동선을 끌어오세요.</div></div>'}</div></section>`}).join('');
  bindScheduleDrag();document.querySelectorAll('[data-custom-day]').forEach(btn=>btn.onclick=()=>openCustomForDay(btn.dataset.customDay));updateRequiredWarning();syncCustomDayOptions();bindReservationToggles(board);
}
function renderScheduleCard(item,day,warnings=[]){
  if(item.routeId)return renderRouteScheduleCard(item,day,warnings);
  const p=item.placeId?placeById(item.placeId):null;const title=p?.title||item.title||'일정';const kind=p?.kind||'custom';const note=p?.duration||item.memo||'직접 추가';
  return `<article class="schedule-card ${kind}" draggable="true" data-item="${item.uid}" data-day="${day}">
    <div class="card-head"><span class="drag-handle">⠿</span><div class="card-title">${escapeHtml(title)}</div><div class="card-actions">${p?`<button class="card-icon detail-btn" data-place="${p.id}" title="상세">ⓘ</button>`:''}<button class="card-icon remove-btn" data-remove="${item.uid}" data-day="${day}" title="삭제">×</button></div></div>
    ${renderWarnings(warnings)}
    <div class="time-row"><label class="time-field"><span>시작</span><input type="time" value="${item.start||''}" data-time="start" data-item="${item.uid}" data-day="${day}"></label><label class="time-field"><span>종료</span><input type="time" value="${item.end||''}" data-time="end" data-item="${item.uid}" data-day="${day}"></label></div>
    <div class="card-note">${escapeHtml(note)}</div>${p&&PLACE_OPTION_NOTES[p.id]?`<div class="schedule-option-note">🎮 ${escapeHtml(PLACE_OPTION_NOTES[p.id])}</div>`:''}${p?renderRequirementInline(p.id,'schedule'):''}</article>`;
}
function renderRouteScheduleCard(item,day,warnings=[]){
  const g=routeById(item.routeId);if(!g)return '';const memberIds=item.memberIds?.length?item.memberIds:g.placeIds;const members=memberIds.map(placeById).filter(Boolean);const shown=item.expanded?members:members.slice(0,2);const reqs=members.filter(p=>RESERVATION_RULES[p.id]);
  return `<article class="schedule-card route-schedule-card" draggable="true" data-item="${item.uid}" data-day="${day}">
    <div class="card-head"><span class="drag-handle">⠿</span><div class="card-title"><span class="route-label">동선</span>${escapeHtml(g.title)}</div><div class="card-actions"><button class="card-icon route-toggle" data-route-toggle="${item.uid}" data-day="${day}" title="펼치기">${item.expanded?'▴':'▾'}</button><button class="card-icon ungroup-btn" data-ungroup="${item.uid}" data-day="${day}" title="묶음 해제">↗</button><button class="card-icon remove-btn" data-remove="${item.uid}" data-day="${day}" title="삭제">×</button></div></div>
    ${renderWarnings(warnings)}
    <div class="time-row"><label class="time-field"><span>시작</span><input type="time" value="${item.start||''}" data-time="start" data-item="${item.uid}" data-day="${day}"></label><label class="time-field"><span>종료</span><input type="time" value="${item.end||''}" data-time="end" data-item="${item.uid}" data-day="${day}"></label></div>
    <div class="route-schedule-members">${shown.map((p,i)=>`<button type="button" data-place-inline="${p.id}"><span>${i+1}</span>${escapeHtml(p.title)}${RESERVATION_RULES[p.id]?.level==='required'?'<b>예약</b>':''}</button>`).join('')}${!item.expanded&&members.length>2?`<small>+ ${members.length-2}곳 더</small>`:''}</div>
    ${g.optionNote?`<div class="schedule-option-note">🎮 ${escapeHtml(g.optionNote)}</div>`:''}<div class="card-note">${escapeHtml(g.region)} · ${escapeHtml(g.duration)}</div>${reqs.map(p=>renderRequirementInline(p.id,'schedule')).join('')}</article>`;
}
function getDropIndex(zone,clientY){const cards=[...zone.querySelectorAll('.schedule-card:not(.dragging)')];for(let i=0;i<cards.length;i++){const rect=cards[i].getBoundingClientRect();if(clientY<rect.top+rect.height/2)return i}return cards.length}
function bindScheduleDrag(){
  document.querySelectorAll('.schedule-card').forEach(card=>{card.addEventListener('dragstart',e=>{if(e.target.closest('input,button,label')){e.preventDefault();return}draggedSchedule={uid:card.dataset.item,from:card.dataset.day};card.classList.add('dragging');e.dataTransfer.setData('text/schedule',card.dataset.item);e.dataTransfer.effectAllowed='move'});card.addEventListener('dragend',()=>{card.classList.remove('dragging');document.querySelectorAll('.dragover,.library-drop-active').forEach(el=>el.classList.remove('dragover','library-drop-active'));draggedSchedule=null})});
  document.querySelectorAll('.drop-zone').forEach(zone=>{zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragover');e.dataTransfer.dropEffect=(e.dataTransfer.types.includes('text/place')||e.dataTransfer.types.includes('text/route'))?'copy':'move'});zone.addEventListener('dragleave',e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove('dragover')});zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('dragover');const day=zone.dataset.day,targetIndex=getDropIndex(zone,e.clientY),placeId=e.dataTransfer.getData('text/place');if(placeId){addPlaceToDay(placeId,day,targetIndex);return}const routeId=e.dataTransfer.getData('text/route');if(routeId){const ids=selectedRouteIds(routeId);if(ids.length)addRouteToDay(routeId,day,targetIndex,ids);return}if(draggedSchedule)moveItem(draggedSchedule.uid,draggedSchedule.from,day,targetIndex)})});
  const library=document.getElementById('libraryPanel');library.addEventListener('dragover',e=>{if(!draggedSchedule)return;e.preventDefault();library.classList.add('library-drop-active');e.dataTransfer.dropEffect='move'});library.addEventListener('dragleave',e=>{if(!library.contains(e.relatedTarget))library.classList.remove('library-drop-active')});library.addEventListener('drop',e=>{if(!draggedSchedule)return;e.preventDefault();library.classList.remove('library-drop-active');removeItem(draggedSchedule.uid,draggedSchedule.from);toast('일정에서 뺐습니다.')});
  document.querySelectorAll('.remove-btn').forEach(b=>b.onclick=()=>removeItem(b.dataset.item,b.dataset.day));
  document.querySelectorAll('.detail-btn').forEach(b=>b.onclick=()=>selectPlace(b.dataset.place));
  document.querySelectorAll('[data-place-inline]').forEach(b=>b.onclick=()=>selectPlace(b.dataset.placeInline));
  document.querySelectorAll('[data-time]').forEach(inp=>inp.onchange=()=>updateTime(inp.dataset.item,inp.dataset.day,inp.dataset.time,inp.value));
  document.querySelectorAll('[data-route-toggle]').forEach(b=>b.onclick=()=>toggleRouteItem(b.dataset.routeToggle,b.dataset.day));
  document.querySelectorAll('[data-ungroup]').forEach(b=>b.onclick=()=>ungroupRoute(b.dataset.ungroup,b.dataset.day));
}
function addPlaceToDay(placeId,day,index=null){const list=currentSchedule()[day],item={uid:uid(),placeId,start:'',end:''};if(index===null||index<0||index>list.length)list.push(item);else list.splice(index,0,item);persist();renderBoard();toast('일정에 추가했습니다.')}
function addRouteToDay(routeId,day,index=null,memberIds=null){const list=currentSchedule()[day],g=routeById(routeId);const ids=(memberIds?.length?memberIds:selectedRouteIds(routeId)).filter(id=>g?.placeIds.includes(id));if(!ids.length){toast('동선에서 한 곳 이상 선택하세요.');return}const item={uid:uid(),routeId,memberIds:ids,start:'',end:'',expanded:false};if(index===null||index<0||index>list.length)list.push(item);else list.splice(index,0,item);persist();renderBoard();toast('선택한 동선을 묶음으로 추가했습니다.')}
function removeItem(itemId,day){currentSchedule()[day]=currentSchedule()[day].filter(x=>x.uid!==itemId);persist();renderBoard()}
function moveItem(itemId,from,to,targetIndex){const fromList=currentSchedule()[from],idx=fromList.findIndex(x=>x.uid===itemId);if(idx<0)return;const [item]=fromList.splice(idx,1),toList=currentSchedule()[to];let insertAt=targetIndex;if(from===to&&idx<insertAt)insertAt--;insertAt=Math.max(0,Math.min(insertAt,toList.length));toList.splice(insertAt,0,item);persist();renderBoard()}
function updateTime(itemId,day,key,value){const item=currentSchedule()[day].find(x=>x.uid===itemId);if(!item)return;item[key]=value;persist();renderBoard()}
function toggleRouteItem(itemId,day){const item=currentSchedule()[day].find(x=>x.uid===itemId);if(!item)return;item.expanded=!item.expanded;persist();renderBoard()}
function ungroupRoute(itemId,day){const list=currentSchedule()[day],idx=list.findIndex(x=>x.uid===itemId);if(idx<0)return;const item=list[idx],g=routeById(item.routeId);if(!g)return;const children=(item.memberIds?.length?item.memberIds:g.placeIds).map(id=>({uid:uid(),placeId:id,start:'',end:''}));list.splice(idx,1,...children);persist();renderBoard();toast('동선 묶음을 개별 장소로 풀었습니다.')}
function hasRequiredMuseum(){return schedulePlaceIds().has('museum')}
function updateRequiredWarning(){document.getElementById('requiredWarning').classList.toggle('hidden',hasRequiredMuseum())}

function selectPlace(id){
  const p=placeById(id);if(!p)return;selectedPlace=p;const img=document.getElementById('detailImage');img.src=p.image||FALLBACK;img.onerror=()=>img.src=FALLBACK;
  document.getElementById('detailTitle').textContent=p.title;document.getElementById('detailDesc').textContent=p.desc;const badges=placeBadges(p);badges.push(`<span class="mini-badge main">${escapeHtml(p.duration)}</span>`);document.getElementById('detailBadges').innerHTML=badges.join('');
  document.getElementById('detailFacts').innerHTML=Object.entries(p.facts||{}).map(([k,v])=>`<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join('');
  const note=document.getElementById('detailReservation'),rule=RESERVATION_RULES[p.id];note.innerHTML=rule?`${renderRequirementInline(p.id,'detail')}`:escapeHtml(p.reservation||'');note.classList.toggle('hidden',!(rule||p.reservation));note.classList.toggle('critical',rule?.level==='required');bindReservationToggles(note);
  const src=document.getElementById('detailSource');if(p.source){src.href=p.source;src.classList.remove('hidden')}else{src.removeAttribute('href');src.classList.add('hidden')};renderRelated(p.id);const dialog=document.getElementById('detailDialog');if(!dialog.open)dialog.showModal();
}
function renderRelated(placeId){
  const groups=ROUTE_GROUPS.filter(g=>g.placeIds.includes(placeId)),section=document.getElementById('relatedSection'),root=document.getElementById('relatedGroups');if(!groups.length){section.classList.add('hidden');root.innerHTML='';return}section.classList.remove('hidden');
  root.innerHTML=groups.map(g=>`<div class="related-group-card"><div class="related-group-top"><div><strong>${escapeHtml(g.title)}</strong><small>${escapeHtml(g.region)} · ${escapeHtml(g.duration)}</small></div><button type="button" class="related-add-route" data-related-route="${g.id}">권역 동선 추가</button></div><div class="related-place-chips">${g.placeIds.filter(id=>id!==placeId).map(id=>{const p=placeById(id);return p?`<button type="button" data-related-place="${p.id}">${escapeHtml(p.title)}</button>`:''}).join('')}</div></div>`).join('');
  root.querySelectorAll('[data-related-place]').forEach(b=>b.onclick=()=>selectPlace(b.dataset.relatedPlace));root.querySelectorAll('[data-related-route]').forEach(b=>b.onclick=()=>{const id=b.dataset.relatedRoute;openAddDialog({type:'route',id,memberIds:selectedRouteIds(id)})});
}
function openAddDialog(target){
  pendingAdd=target;const label=target.type==='route'?routeById(target.id)?.title:placeById(target.id)?.title;document.getElementById('addDialogTitle').textContent=`${label||'일정'} · 날짜 선택`;document.getElementById('dateChoices').innerHTML=activeDays().map(d=>`<button type="button" class="date-choice" data-day="${d}">${DAY_META[d].date}<small>${DAY_META[d].week}요일</small></button>`).join('');
  document.querySelectorAll('.date-choice').forEach(b=>b.onclick=()=>{if(pendingAdd.type==='route')addRouteToDay(pendingAdd.id,b.dataset.day,null,pendingAdd.memberIds);else addPlaceToDay(pendingAdd.id,b.dataset.day);document.getElementById('addDialog').close()});document.getElementById('addDialog').showModal();
}
function syncCustomDayOptions(){document.getElementById('customDay').innerHTML=activeDays().map(d=>`<option value="${d}">${DAY_META[d].date} ${DAY_META[d].week}</option>`).join('')}
function openCustomForDay(day){syncCustomDayOptions();const sel=document.getElementById('customDay');if(activeDays().includes(day))sel.value=day;document.getElementById('customDialog').showModal()}
function addCustom(){const title=document.getElementById('customTitle').value.trim();if(!title)return;const memo=document.getElementById('customMemo').value.trim(),day=document.getElementById('customDay').value;currentSchedule()[day].push({uid:uid(),title,memo,start:'',end:''});document.getElementById('customTitle').value='';document.getElementById('customMemo').value='';persist();renderBoard();toast('직접 일정을 추가했습니다.')}

const RECOMMENDED_SCHEDULE = {
  '12':[{placeId:'kix',start:'23:20',end:'23:50'},{placeId:'firstcabin',start:'23:55',end:''}],
  '13':[{placeId:'firstcabin',start:'00:00',end:'07:00'},{placeId:'haruka',start:'07:30',end:'08:25'},{routeId:'route-shinosaka',memberIds:['shinosaka','ekiben','pokemonstand'],start:'08:25',end:'09:20',expanded:false},{placeId:'kyotohotel',start:'10:15',end:'10:30'},{routeId:'route-kyoto-a',memberIds:['pkmkyoto','ninkyoto'],start:'12:00',end:'15:30',expanded:false},{title:'교토 자유관광 · 식사',memo:'니시키시장·가와라마치·기온 등에서 자유롭게 조정',start:'15:30',end:'21:00'}],
  '14':[{title:'교토 숙소 체크아웃 · 이동',memo:'짐을 가지고 Nintendo Museum 방향으로 이동',start:'08:30',end:'09:40'},{routeId:'route-kyoto-c',memberIds:['museum'],start:'10:00',end:'14:00',expanded:false},{title:'오구라 → 오사카/우메다 이동',memo:'Museum 종료 후 오사카 방향으로 이동',start:'14:15',end:'15:45'},{placeId:'osakahotel',start:'16:00',end:'16:30'},{routeId:'route-osaka-a',memberIds:['ninosaka','pkmosaka','cardstation'],start:'17:00',end:'19:30',expanded:false},{title:'우메다 저녁 · 자유시간',memo:'숙소 복귀 포함',start:'19:30',end:'22:00'}],
  '15':[{routeId:'route-osaka-d',memberIds:['usj','snw'],start:'08:00',end:'20:00',expanded:false}],
  '16':[{routeId:'route-osaka-b',memberIds:['shinsaibashi','pokecafe','kirbystore','dotonbori'],start:'10:00',end:'14:00',expanded:false},{placeId:'kixreturn',start:'14:30',end:'16:00'}]
};
function cloneRecommendedItem(item){return {...item,uid:uid()}}
function applyRecommendedSchedule(hotelId='firstcabin'){
  const target=state.plans.use12,hasAny=Object.values(target).some(items=>items.length);if(hasAny&&!confirm('12일 밤 출발 일정을 비우고 추천 일정을 불러올까요?'))return;state.activePlan='use12';state.plans.use12=blankPlan(true);
  Object.entries(RECOMMENDED_SCHEDULE).forEach(([day,items])=>{state.plans.use12[day]=items.map(item=>{const cloned=cloneRecommendedItem(item);if(cloned.placeId==='firstcabin')cloned.placeId=hotelId;return cloned})});persist();renderBoard();renderLibrary();toast(hotelId==='nikkokix'?'Hotel Nikko KIX 숙박 추천안을 적용했습니다.':'First Cabin KIX 숙박 추천안을 적용했습니다.')
}
function setStartDay(day){state.activePlan=day==='12'?'use12':'start13';persist();renderBoard();toast(day==='12'?'A · 12일 밤 출발 일정':'B · 13일 출발 일정')}
function resetAll(){if(!confirm('현재 보고 있는 일정만 모두 비울까요?'))return;state.plans[state.activePlan]=blankPlan(state.activePlan==='use12');persist();renderBoard();renderLibrary();toast('현재 일정을 비웠습니다.')}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800)}
function openRecommendation(){document.getElementById('recommendDialog').showModal()}
function applyRecommendationFromDialog(){const selected=document.querySelector('input[name="recommendHotel"]:checked')?.value||'firstcabin';document.getElementById('recommendDialog').close();applyRecommendedSchedule(selected)}

// UI bindings
document.querySelectorAll('.start-btn').forEach(b=>b.onclick=()=>setStartDay(b.dataset.start));
document.getElementById('recommendBtn').onclick=openRecommendation;
document.getElementById('recommendApplyBtn').onclick=applyRecommendationFromDialog;
document.getElementById('resetBtn').onclick=resetAll;
document.getElementById('customForm').addEventListener('submit',e=>{e.preventDefault();addCustom();document.getElementById('customDialog').close()});
document.getElementById('detailAddBtn').onclick=()=>{if(selectedPlace)openAddDialog({type:'place',id:selectedPlace.id})};
document.getElementById('detailCloseBtn').onclick=()=>document.getElementById('detailDialog').close();
document.getElementById('detailDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.querySelectorAll('.library-tab').forEach(btn=>btn.onclick=()=>{libraryMode=btn.dataset.mode;renderLibraryTabs();renderLibrary()});
document.getElementById('jsonOpenBtn').onclick=openJson;
document.getElementById('jsonSaveBtn').onclick=saveJson;
document.getElementById('jsonFileInput').onchange=e=>{const file=e.target.files?.[0];loadJsonFile(file);e.target.value=''};
window.addEventListener('beforeunload',e=>{if(!dirty)return;e.preventDefault();e.returnValue=''});
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveJson()}});

renderLibraryTabs();renderLibrary();renderBoard();setJsonStatus('새 일정 · JSON 미저장','neutral');
