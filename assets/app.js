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
  {id:'suntorykyoto',title:'산토리 천연수 맥주공장 · 교토',category:'kyoto',kind:'option',duration:'견학 약 90분',tags:['교토','나가오카쿄','맥주','공장견학','예약','시음','옵션'],desc:'교토 나가오카쿄의 산토리 맥주공장. 더 프리미엄 몰츠 제조 과정을 견학하고 시음 체험을 할 수 있다. 교토 도심과 떨어져 있어 이동시간을 따로 확보해야 한다.',image:FALLBACK,facts:{위치:'교토부 나가오카쿄시',소요:'투어 약 90분',요금:'일반 투어 성인 ¥1,000 안내 (2026-10 기준)'},reservation:'투어는 사전 예약 필요. 2027년 5월 일정은 예약 개시 후 확인.',source:'https://www.suntory.co.jp/factory/kyoto/'},
  {id:'osakahotel',title:'오사카 숙소',category:'osaka',kind:'hotel',duration:'숙박',tags:['오사카','숙박'],desc:'오사카 체류용 숙소 카드. 우메다·오사카역권을 중심으로 두면 Nintendo OSAKA와 이동이 편하다.',image:FALLBACK,facts:{추천권역:'오사카역 / 우메다','용도':'오사카 체류 거점'},reservation:'호텔 사전예약 필요.',source:''},
  {id:'asahisuita',title:'아사히 맥주 뮤지엄 · 스이타공장',category:'osaka',kind:'option',duration:'견학 약 90분',tags:['오사카','스이타','맥주','공장견학','예약','시음','옵션'],desc:'오사카부 스이타시의 아사히 맥주 생산시설에 있는 체험형 뮤지엄. 제조 과정 체험과 맥주 시음이 가능하며 우메다에서 JR로 접근하기 편하다.',image:FALLBACK,facts:{위치:'오사카부 스이타시',소요:'투어 약 90분',요금:'20세 이상 ¥1,000 안내 (2026-10 기준)'},reservation:'투어는 사전 예약 필요. 2027년 5월 일정은 예약 개시 후 확인.',source:'https://www.asahibeer.co.jp/brewery/suita/'},
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

// v13: 모든 장소의 실제/현장 참고 이미지와 상세 모달 정보를 한 곳에서 보강합니다.
// 운영시간·예약 조건은 2026-10 확인 기준이며 2027-05 방문 전 공식 페이지를 다시 확인하세요.
const PLACE_ENRICHMENTS = {
  suntorykyoto:{image:'https://www.maff.go.jp/kinki/syouhi/seikatu/syokuiku/attach/img/kengakukyoto-1.jpg',desc:'교토 나가오카쿄시에 있는 산토리의 맥주 생산시설. 더 프리미엄 몰츠의 제조 공정을 관찰하고 맥주를 시음하는 예약제 견학 코스이며, 교토 도심·우지와 다른 지역이므로 이동시간을 별도로 확보해야 한다.',facts:{주소:'京都府長岡京市調子3-1-1',현재운영:'9:30~17:00 / 숍 11:00~16:30 안내',접근:'JR 나가오카쿄역 무료 셔틀 또는 한큐 니시야마텐노잔역 도보 약 10분',견학:'일반 투어 약 90분 · 성인 ¥1,000 안내',시음:'더 프리미엄 몰츠 시음 포함'},tips:['교토 시조·가와라마치나 우지의 Nintendo Museum과는 별도 권역이므로 왕복 이동시간을 추가로 잡기','시음하지 않을 경우 제공 가능한 음료와 투어 조건을 예약 시 확인','2027년 5월 일정과 예약 개시일은 방문 전에 공식 홈페이지에서 확인'],photoNote:'산토리 천연수 맥주공장 교토 실제 전경 · 일본 농림수산성',checkedAt:'2026-10'},
  asahisuita:{image:'https://osaka-info.jp/spot/images/b7b68d68e3976311b2989228b2fd9e2fb5d57abe.jpg',desc:'오사카 스이타시의 아사히 맥주 생산시설에 있는 체험형 뮤지엄. 맥주 제조 과정과 전시를 경험하고 시음할 수 있는 예약제 투어로, JR 스이타역에서 걸어서 접근할 수 있다.',facts:{주소:'大阪府吹田市西の庄町1-45',현재운영:'9:30~16:50 / 숍 16:40까지 안내',접근:'JR 스이타역 동쪽 개찰구(북쪽 출구) 도보 약 10분',견학:'뮤지엄 투어 약 90분 · 20세 이상 ¥1,000 안내',시음:'투어 후 최대 2잔 · 무알코올 음료 선택 가능'},tips:['오사카역·우메다 관광일에 넣을 수 있지만 스이타역 왕복 이동시간은 따로 확보','투어 온라인 예약은 1~6명 기준으로 안내됨','2027년 5월 예약 개시일과 휴관일은 공식 페이지에서 재확인'],photoNote:'오사카 관광 공식 사이트 제공 · 아사히 맥주 뮤지엄 참고 사진',checkedAt:'2026-10'},
  kix:{image:'https://ppap.kinto-jp.com/spots_images/4020-images/16534.jpg',desc:'간사이국제공항은 오사카·교토 여행의 출입국 거점이다. 제1·2터미널과 항공편을 먼저 확인하고, JR 특급 HARUKA·난카이 전철·공항버스 중 숙소 방향에 맞는 교통수단을 고르면 된다.',facts:{권역:'KIX · Aeroplaza',핵심:'입국·출국 및 공항 숙박의 기준점',연계:'JR/Nankai 간사이공항역 · Aeroplaza'},tips:['12일 밤 도착안이면 입국 후 숙소까지 이동시간과 체크인 마감부터 확인','13일 아침 교토로 갈 때 HARUKA·신오사카 경유 여부를 여기서 결정'],photoNote:'간사이국제공항 제1터미널 체크인 구역 실제 사진 · Prism Japan',checkedAt:'2026-10'},
  darakhyu:{image:'https://img.koreatimes.co.kr/upload/newsV2/images/Capsule.jpg',desc:'인천공항 일반구역 교통센터에 있는 워커힐 운영 캡슐호텔. 전날 공항에서 숙면한 뒤 이른 아침 비행기에 탑승하는 옵션으로, 제1·2터미널 위치와 객실의 샤워시설 유무를 확인해야 한다.',facts:{위치:'인천공항 T1 교통센터 1F / T2 교통센터 B1F 일반구역',숙박형태:'캡슐호텔 · Day Use / Overnight',현재기준:'T1 Overnight 20:00~08:00 안내',편의:'샤워·휴식공간·비즈니스 코너'},tips:['이용 항공편 터미널(T1/T2)을 먼저 확인하고 해당 다락휴로 예약','아침 비행기라면 출국 수속·보안검색 시간을 역산해 체크아웃 시간 결정'],photoNote:'인천공항 다락휴 실제 객실·복도 사진 · 코리아타임스',checkedAt:'2026-10'},
  firstcabin:{image:'https://trvimg.r10s.jp/share/image_up/182304/origin/fbd8277281b2f0745ad80964fc938fc661e18953.47.9.26.3.jpeg?fit=inside%7C888%3A498',desc:'간사이공항 Aeroplaza에 있는 캐빈형 숙소. 늦은 밤 KIX에 도착해 별도 장거리 이동 없이 쉬는 선택지이며, 캐빈 형태와 공용 편의시설·체크인 가능 시간을 확인하고 예약하면 좋다.',facts:{위치:'KIX Aeroplaza',형태:'캐빈형 숙박',장점:'공항 밖 장거리 이동 없이 바로 취침',추천상황:'12일 늦은 밤 KIX 도착'},tips:['심야 도착 시 입국·수하물 수령이 늦어질 수 있으니 체크인 가능시간 확인','아침에는 Aeroplaza에서 JR/Nankai 역으로 바로 이어 이동하기 편함'],photoNote:'First Cabin Kansai Airport 실제 비즈니스 캐빈 객실 사진 · 라쿠텐트래블',checkedAt:'2026-10'},
  kixhotel:{image:'https://www.nikkokix.com/zh_tw/facility/img/img_gallery19.jpg',facts:{권역:'KIX / Aeroplaza / 린쿠타운',형태:'일반 호텔 후보군',비교기준:'공항 직결성 · 숙면 · 가격 · 심야 이동'},tips:['이 카드는 특정 호텔이 아니라 비교용이므로 실제 예약 후 호텔명을 커스텀 일정에 적기','23시 이후 도착이면 셔틀·전철 막차가 필요한 호텔인지 반드시 확인'],photoNote:'KIX 공항호텔 참고 이미지 · 실제 예약 호텔과 다를 수 있음',checkedAt:'2026-10'},
  nikkokix:{image:'https://www.nikkokix.com/zh_tw/facility/img/img_gallery19.jpg',facts:{위치:'간사이공항섬 Aeroplaza',연결:'T1 및 공항철도역과 건물 연결',형태:'풀서비스 일반 호텔',장점:'심야 도착 후 이동 최소화 + 숙면'},tips:['가격보다 수면 품질을 우선할 때 First Cabin보다 강한 선택','T2 이용 시 Aeroplaza 1F의 T2 이동수단 동선을 확인'],photoNote:'Hotel Nikko Kansai Airport 공식 시설 이미지',checkedAt:'2026-10'},
  washingtonkix:{image:'https://trvimg.r10s.jp/share/HOTEL/4650/4650.jpg',desc:'린쿠타운역 인근의 일반 비즈니스호텔로 간사이공항에서 전철 한 정거장 거리다. 공항 직결 숙소보다 추가 이동이 필요하지만 숙면과 가격을 함께 비교할 때 좋은 후보이다.',facts:{위치:'린쿠타운',거리감:'KIX에서 전철 1정거장 권역',형태:'일반 비즈니스호텔',비교:'공항 직결보다 이동 추가 · 가격 절감 가능'},tips:['심야 도착이면 KIX→린쿠타운 마지막 전철/셔틀을 예약 전에 확인','다음 날 아침 다시 KIX를 거쳐 HARUKA를 탈지 다른 철도 동선을 탈지 결정'],photoNote:'Kansai Airport Washington Hotel 실제 외관 사진 · 라쿠텐트래블',checkedAt:'2026-10'},
  kixnearhotel:{image:'https://www.jal.co.jp/ph/en/guide-to-japan/destinations/articles/osaka/how-to-spend-time-during-layover-Kansai-Airport/_jcr_content/root/responsivegrid/sectioncontainer_cop/image_copy_9191255.coreimg.jpeg/1752028487947.jpeg',facts:{위치:'린쿠타운 / 이즈미사노 일대',형태:'가격 우선 호텔 후보',주의:'실제 호텔마다 셔틀·막차·체크인 조건 다름'},tips:['가격만 보지 말고 KIX 도착시각 이후 실제 이동 가능 여부를 먼저 확인','4명이라면 객실 1~2개 구성과 택시 분할 비용도 함께 비교'],photoNote:'린쿠타운 실제 지역 이미지 · 특정 호텔을 뜻하지 않음',checkedAt:'2026-10'},
  haruka:{image:'https://www.railway-enjoy.net/pictures/jr/281/16.jpg',facts:{종류:'JR 서일본 공항특급 HARUKA',주요정차:'KIX → 신오사카 → 교토',용도:'공항에서 교토/오사카권 장거리 이동',주의:'2027 실제 시간표·요금은 여행 전 재확인'},tips:['신오사카에서 에키벤을 볼 사람만 내리고 나머지는 교토까지 계속 가는 분리 운영도 가능','항공 지연을 고려해 지나치게 촘촘한 지정석 연결은 피하는 편이 안전'],photoNote:'JR 281계 HARUKA 실제 열차 참고 이미지',checkedAt:'2026-10'},
  shinosaka:{image:'https://images.microcms-assets.io/assets/14d13bd618dc45c7b684223c0ca9d033/00fb4e2793684e22986a4a5f7a56ce11/sinosaka.jpg?auto=format&fit=max&q=50&w=1920',facts:{권역:'신오사카역',역할:'신칸센·JR 환승 거점',이번여행:'에키벤 + Pokémon Stand 경유 선택지'},tips:['Nintendo 목적지는 아니므로 에키벤/포켓몬 스탠드를 볼 때만 30~60분 체류','큰 짐이 있으면 역사 내 이동시간을 여유 있게 잡기'],photoNote:'JR 신오사카역 실제 외관 사진 · NEWT',checkedAt:'2026-10'},
  ekiben:{image:'https://blog-imgs-131.fc2.com/t/a/k/takoyakikun1/3P1050810.jpg',facts:{매장:'旅弁当 駅弁にぎわい',위치:'신오사카역 상업시설',현재영업:'06:30~22:00 안내',특징:'전국 각지 에키벤을 폭넓게 고르는 대형 매장'},tips:['아침 경유 시 영업 시작 직후에도 선택지가 줄 수 있으니 현장 재고는 유동적','열차 안에서 먹을 목적이면 교토 이동 직전에 구입'],photoNote:'신오사카 「駅弁にぎわい」 실제 매장 이미지',checkedAt:'2026-10'},
  pokemonstand:{image:'https://pbs.twimg.com/media/GxUqUOkaIAAuU9A.jpg',facts:{위치:'JR 신오사카역권',형태:'Pokémon 상품 자동판매 스탠드',체류:'5~10분이면 충분',연계:'에키벤 구매와 한 번에'},tips:['매장형 Pokémon Center가 아니라 작은 자동판매 시설이라 단독 방문 목적으론 약함','상품 구성·재고는 수시로 바뀔 수 있음'],photoNote:'신오사카 Pokémon 판매 스탠드 실제 이미지',checkedAt:'2026-10'},
  kyotohotel:{image:'https://cdn-ak.f.st-hatena.com/images/fotolife/c/chidorimemo/20231105/20231105135025.jpg',desc:'교토 숙소 후보를 관리하는 가상 카드. 교토역 인근에 묵으면 간사이공항에서의 이동, Nintendo Museum이 있는 우지 방문, 이후 오사카로의 이동을 연결하기 쉽다. 특정 호텔이 아니라 숙박 지역을 나타낸다.',facts:{추천권역:'교토역 주변',장점:'KIX·오사카·우지 이동의 교통 거점',선택기준:'역 도보거리 · 체크인 전 짐보관 · 가격'},tips:['실제 호텔이 정해지면 이 카드를 삭제하고 커스텀 일정에 호텔명/체크인시간을 적어도 됨','Nintendo Museum 다음 날 이동을 고려하면 교토역권이 짐 처리에 편함'],photoNote:'교토역 실제 이미지 · 특정 숙소를 뜻하지 않음',checkedAt:'2026-10'},
  marufukuro:{image:'https://img.hanako.tokyo/2023/04/14010627/unnamed.jpg',facts:{정체:'옛 Nintendo 본사 건물을 활용한 호텔',관람성격:'Nintendo 역사 스폿 · 외관 중심',주의:'Nintendo Museum처럼 자유 관람하는 전시시설은 아님'},tips:['Nintendo 역사에 관심이 클 때 짧게 외관 위주로 넣기','호텔 이용객 공간은 무단 관람하지 않고 운영정책을 따르기'],photoNote:'Marufukuro/옛 Nintendo 본사 건물 실제 이미지',checkedAt:'2026-10'},
  pkmkyoto:{image:'https://res.cloudinary.com/dbm1qiew0/image/upload/blog-images/2024/08/mv-kyoto-1.jpg',facts:{위치:'SUINA MUROMACHI 2F',현재영업:'10:00~20:00 안내',접근:'지하철 시조역·한큐 카라스마역권',성격:'교토 테마 Pokémon Center'},tips:['Nintendo KYOTO와 같은 교토 A권역이지만 같은 건물은 아니므로 도보 이동시간 확보','교토 테마 굿즈/연출을 우선 보고 일반 상품은 오사카점과 중복 가능'],photoNote:'Pokémon Center KYOTO 실제 매장 참고 이미지',checkedAt:'2026-10'},
  ninkyoto:{image:'https://cdn-ak.f.st-hatena.com/images/fotolife/S/Sig-Maru/20250912/20250912191154.jpg',facts:{위치:'교토 다카시마야 S.C. T8 7F',현재영업:'10:30~20:00 안내',접근:'한큐 교토카와라마치역 지하 직결',혼잡:'주말·공휴일 등 번호표 운영 가능'},tips:['혼잡일에는 번호표 공지를 먼저 확인하고 주변 일정과 순서를 바꿀 수 있게 설계','Pokémon Center KYOTO와 도보권으로 묶되 같은 건물은 아님'],photoNote:'Nintendo KYOTO 실제 매장 이미지',checkedAt:'2026-10'},
  museum:{image:'https://upload.wikimedia.org/wikipedia/commons/c/c0/Nintendo_Museum_Entrance.jpg',facts:{주소:'교토부 우지시 오구라초 카구라덴 56',현재운영:'10:00~20:00 안내',접근:'긴테쓰 오구라역 동쪽 출구 도보 약 5분 / JR 오구라역 북쪽 출구 약 8분',주의:'일반 차량·택시 방문 제한 안내'},tips:['이번 여행 필수 장소라 다른 일정과 겹치지 않게 3~5시간 블록 확보','티켓의 지정 입장시간보다 충분히 먼저 우지/오구라에 도착하도록 이동 버퍼 확보'],photoNote:'Nintendo Museum 입구 실제 이미지',checkedAt:'2026-10'},
  osakahotel:{image:'https://www.japan-guide.com/g24/osaka_2411_00.jpg',desc:'오사카 숙소를 정하기 위한 가상 카드. JR 오사카역·우메다를 거점으로 숙박하면 Nintendo OSAKA와 Pokémon Center OSAKA 방문 및 교토·USJ 이동이 편리하다. 실제 숙소는 예약 후 별도로 확정한다.',facts:{추천권역:'우메다 / 오사카역',장점:'Nintendo OSAKA·Pokémon Center OSAKA와 같은 생활권',선택기준:'JR/지하철 접근 · KIX 귀국 이동 · 짐보관'},tips:['USJ와 신사이바시 양쪽을 모두 갈 경우 우메다는 교통 균형이 좋음','실제 호텔 확정 후 체크인/짐보관 가능시간을 일정에 반영'],photoNote:'오사카역 우메키타 지역 실제 사진 · 특정 숙소가 아닌 숙박 권역',checkedAt:'2026-10'},
  ninosaka:{image:'https://pic.k-cdn.media/2023/04/20220407-nintendo-osaka-part1-img16.jpg',desc:'우메다의 Nintendo 공식 직영점으로 마리오·젤다·동물의 숲 등 게임 캐릭터 굿즈와 한정 상품을 살펴볼 수 있다. LUCUA SOUTH 13층의 Pokémon Center OSAKA와 묶어 방문하기 좋다.',facts:{위치:'LUCUA SOUTH 13F · 우메다',현재영업:'10:00~20:00 안내',접근:'JR 오사카역 중앙출구 약 5분',혼잡:'주말·공휴일 등 번호표 운영 가능'},tips:['Pokémon Center OSAKA와 같은 층이므로 두 곳을 연속 배치','혼잡일 번호표를 받으면 대기시간 동안 같은 층/우메다 주변 일정을 소화'],photoNote:'Nintendo OSAKA 마리오 굿즈 매장 사진 · Osaka Metro NiNE',checkedAt:'2026-10'},
  pkmosaka:{image:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Osaka_Pok%C3%A9mon_Center.jpg',facts:{위치:'LUCUA SOUTH 13F',현재영업:'10:00~20:00 안내',접근:'JR 오사카역 중앙출구 약 5분',연계:'Pokémon Card Station 주변 시설'},tips:['Nintendo OSAKA와 사실상 한 번에 보는 우메다 핵심 블록','카드 관심이 있으면 Card Station까지 이어서 30~60분 추가'],photoNote:'Pokémon Center OSAKA 실제 이미지',checkedAt:'2026-10'},
  shinsaibashi:{image:'https://yukigo.tw/wp-content/uploads/2025/02/pokemon-center-osaka-dx10.jpg',desc:'다이마루 신사이바시 본관 9층의 대형 포켓몬 공식 매장. 같은 건물에 Pokémon Cafe OSAKA와 Kirby Café THE STORE OSAKA가 있어 굿즈 쇼핑과 예약제 테마 카페를 함께 즐기기 좋다.',facts:{정식명:'Pokémon Center OSAKA DX',위치:'다이마루 신사이바시 본관 9F',현재영업:'10:00~20:00 안내',접근:'신사이바시역 4번 출구 지하 연결'},tips:['Pokémon Cafe·Kirby Store와 같은 건물이므로 따로 이동하지 말고 한 블록으로 계획','우메다 Pokémon Center와 상품 중복이 많으면 이곳은 카페/신사이바시 경험 중심'],photoNote:'Pokémon Center OSAKA DX 실제 매장 사진 · Yukigo',checkedAt:'2026-10'},
  pokecafe:{image:'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000671/img/ja/a2000671_parts_615af5f83203f.jpg',facts:{위치:'다이마루 신사이바시 본관 9F',현재영업:'10:00~20:00 안내',예약:'사전예약 필수',연계:'Pokémon Center OSAKA DX와 같은 층'},tips:['예약시간이 하루 동선의 고정점이 되므로 먼저 잡은 뒤 전후 일정을 배치','예약 규정·입장시간은 2027 방문 직전 공식 사이트에서 다시 확인'],photoNote:'Pokémon Cafe OSAKA 실제 매장 참고 이미지',checkedAt:'2026-10'},
  dotonbori:{image:'https://www.glico.com/assets/images/original/glicosign_2026.jpg',desc:'오사카 미나미의 대표 번화가. 글리코 사인·도톤보리강 주변을 산책하며 타코야키 등 먹거리를 즐길 수 있어 신사이바시 Pokémon Center DX나 포켓몬 카페 일정 전후에 묶기 좋다.',facts:{권역:'신사이바시 / 난바',성격:'관광 · 야경 · 식사',추천:'Pokémon/Kirby 쇼핑 후 저녁 블록'},tips:['낮보다 저녁에 오사카다운 분위기가 강해 쇼핑 후 이어가기 좋음','식당 대기시간을 일정에 너무 정확히 고정하지 말고 자유시간으로 남기기'],photoNote:'오사카 도톤보리 글리코 사인 사진 · Glico 공식',checkedAt:'2026-10'},
  usj:{image:'https://maido-storage.oss-cn-hongkong.aliyuncs.com/maido/uploads/2024/04/words-unique-to-kansai-img05.jpg',desc:'오사카 유니버설시티에 있는 테마파크. 이번 여행에서는 SUPER NINTENDO WORLD가 핵심이며, 혼잡도와 어트랙션 대기시간을 감안해 하루 일정으로 잡는 편이 좋다. 입장권과 방문일 운영 정책을 별도 확인해야 한다.',facts:{권역:'Universal City',형태:'테마파크',필요:'날짜 지정 파크 입장권',추천체류:'Nintendo 목적이면 하루 확보'},tips:['입장권과 SUPER NINTENDO WORLD 입장 조건은 서로 다른 문제라 둘 다 확인','운영시간·Express Pass 구성은 날짜별로 달라질 수 있어 2027 판매 개시 후 확정'],photoNote:'유니버설 스튜디오 재팬 정문 실제 사진 · Maido',checkedAt:'2026-10'},
  snw:{image:'https://images.keizai.biz/osakabay_keizai/headline/1616031068_photo.jpg',desc:'USJ 내부의 마리오·동키콩 테마 구역. 마리오 카트와 동키콩 관련 어트랙션, 포토스폿 및 Power-Up Band 연동 체험이 핵심이다. 혼잡일 구역 입장 조건을 사전에 확인해야 한다.',facts:{위치:'USJ 내부',콘텐츠:'Mario · Donkey Kong 등 Nintendo 테마',입장:'혼잡 시 Area Timed Entry/Standby 등 조건 확인',체험:'Power-Up Band 연동 가능'},tips:['USJ 입장권만 있다고 항상 원하는 시간에 구역 입장이 보장되는 것은 아니므로 조건 확인','Nintendo가 핵심이면 파크 입장 직후의 운영전략을 여행 직전 다시 세우기'],photoNote:'SUPER NINTENDO WORLD 마리오 테마구역 실제 사진 · 오사카베이경제신문',checkedAt:'2026-10'},
  powerup:{image:'https://res.klook.com/image/upload/fl_lossy.progressive%2Cq_85/c_fill%2Cw_1000/v1617609417/blog/vnctj29rbbvmuitnngdv.jpg',desc:'SUPER NINTENDO WORLD 안에서 블록·키 챌린지 등과 상호작용하는 유료 손목 밴드. 공원이나 입장권이 아닌 별도 체험 도구로, 게임처럼 코인과 기록을 모으는 데 활용한다.',facts:{정체:'SUPER NINTENDO WORLD 체험용 밴드',기능:'키 챌린지 · 코인 · 스탬프 등 연동',추가:'일부 amiibo 기능 지원',주의:'밴드 자체는 구역 입장권이 아님'},tips:['Nintendo World를 오래 즐길 사람만 구매 우선순위를 높이기','일행 4명 모두가 필요한지 체험 성향과 예산을 보고 결정'],photoNote:'USJ Power-Up Band 실제 착용·키 챌린지 체험 사진 · Klook',checkedAt:'2026-10'},
  kixreturn:{image:'https://www.railway-enjoy.net/pictures/jr/281/16.jpg',facts:{구간:'오사카/우메다 → KIX',후보:'HARUKA · 공항리무진버스 등',핵심:'항공 체크인 마감보다 충분히 앞서 공항 도착',주의:'2027 시간표·공사·운행상황 재확인'},tips:['마지막 날 쇼핑을 먼저 줄이고 공항 이동 버퍼는 넉넉하게 유지','4명이라도 택시는 장거리라 비용이 커질 수 있어 철도/버스를 기본으로 비교'],photoNote:'HARUKA 실제 열차 참고 이미지 · 귀국 이동 대표 이미지',checkedAt:'2026-10'},
  kirbystore:{image:'https://kirbycafe.jp/thestore/osaka/imgs/img-shop-visual.jpg',facts:{위치:'다이마루 신사이바시 본관 9F',현재영업:'10:00~20:00 안내',성격:'Kirby Café 공식 굿즈숍',연계:'Pokémon Center DX·Pokémon Cafe와 같은 건물'},tips:['카페 예약 없이 굿즈샵만 보는 선택도 가능','같은 층의 Pokémon 일정 사이에 30~60분 정도 넣기 좋음'],photoNote:'Kirby Café THE STORE OSAKA 공식 이미지',checkedAt:'2026-10'},
  dendentown:{image:'https://livedoor.blogimg.jp/kmmh9189/imgs/e/7/e7d44974.jpg',facts:{권역:'닛폰바시 · 오타로드',성격:'레트로게임 · TCG · 서브컬처 상권',접근:'난바/닛폰바시/에비스초에서 도보 접근',이번여행:'개별 매장들을 묶는 부모 권역'},tips:['지역 자체보다 Super Potato·게임탐정단·Preyz 중 관심 매장을 고르는 방식이 효율적','카드/레트로 재고는 방문일에 따라 크게 달라지므로 탐색 시간을 여유 있게'],photoNote:'닛폰바시·덴덴타운 실제 거리 참고 이미지',checkedAt:'2026-10'},
  superpotato:{image:'https://pic.k-cdn.media/2020/12/20201225-ranking2020-img04.jpg',facts:{권역:'닛폰바시 오타로드',현재영업:'평일 11:00~20:00 / 주말·공휴일 10:00~20:00 안내',주력:'레트로 콘솔·소프트',예시:'Super Famicom · Game Boy 등 Nintendo 구형기'},tips:['희귀품 가격은 편차가 크므로 “구경/구매” 예산을 따로 정하기','게임탐정단과 상품 성격이 겹치지만 매물은 달라 둘 다 볼 가치가 있음'],photoNote:'Super Potato 오타로드 실제 매장 이미지',checkedAt:'2026-10'},
  gametanteidan:{image:'https://assets.st-note.com/img/1749286969-5QDIMStF6yOdNm0Bh4JxY1bo.jpg?fit=bounds&height=2000&quality=85&width=2000',desc:'오사카 닛폰바시의 레트로게임 전문점. 패미컴·슈퍼패미컴·게임보이 등 오래된 닌텐도 하드웨어와 소프트를 찾아볼 수 있어 Super Potato와 비교하며 중고 게임 매물을 구경하기 좋다.',facts:{주소:'오사카시 나니와구 닛폰바시 5-7-18',현재영업:'12:00~18:45 · 매입 17:00 종료 안내',접근:'에비스초역 1-A 출구에서 매우 가까움',특징:'1F Famicom~Wii Nintendo 중심 · Game & Watch · 희귀품'},tips:['Nintendo 구형 하드웨어를 실제로 보고 싶다면 덴덴타운 코스 우선순위가 높음','Super Potato보다 남쪽이라 오타로드를 걸으며 순서를 잡는 게 편함'],photoNote:'게임탐정단 오사카 닛폰바시 실제 매장 입구 사진 · 2025 방문기',checkedAt:'2026-10'},
  cardstation:{image:'https://image.ekiten.jp/contribution/old/593/6082589/5936492_20221006144806.jpg',facts:{권역:'우메다 / LUCUA SOUTH 13F 주변',연계:'Pokémon Center OSAKA 주변 공식 시설',성격:'Pokémon Card 플레이·이벤트 거점',주의:'특정 이벤트는 별도 참가조건 가능'},tips:['일반 굿즈보다 Pokémon Card 관심이 있을 때 체류시간을 늘리기','대회나 이벤트가 목적이면 방문일 이벤트 스케줄을 별도 확인'],photoNote:'Pokémon Card Station OSAKA 실제 참고 이미지',checkedAt:'2026-10'},
  preyzmain:{image:'https://www.pokemon-card.com/events/api/up/images/index/61d38e5d2af861d4740cff527424e62a6e57fa4a.jpg',facts:{주소:'오사카시 나니와구 닛폰바시 3-7-6',현재영업:'평일 12:00~22:00 / 주말·공휴일 10:00~22:00',규모:'대전공간 210석',취급:'Pokémon Card 포함 다수 TCG'},tips:['포켓몬만이 아니라 여러 TCG를 한 번에 보고 싶을 때 적합','싱글카드 시세·재고는 실시간 변동이라 현장 비교 전제로 보기'],photoNote:'Preyz 오사카 닛폰바시 본점 실제 매장 이미지',checkedAt:'2026-10'},
  preyzotaro:{image:'https://prcdn.freetls.fastly.net/release_image/14337/6/14337-6-f3e8be815696944598e5a2c489c3c554-1717x2700.jpg?auto=webp&fit=bounds&format=jpeg&height=1350&quality=85%2C65&width=1950',facts:{주소:'오사카시 나니와구 난바나카 2-4-4',현재영업:'평일 12:00~20:00 / 주말·공휴일 10:00~20:00',핵심:'1F Pokémon Card 전문 판매층',기타:'2F 타 TCG + 매입센터'},tips:['포켓몬 카드 쇼핑이 목적이면 Preyz 본점보다 먼저 볼 가치가 큼','Super Potato와 함께 오타로드 중심으로 묶고 본점은 시간 남으면 추가'],photoNote:'Preyz 계열 오사카 매장 실제 참고 이미지',checkedAt:'2026-10'}
};

places.forEach(p=>{
  const x=PLACE_ENRICHMENTS[p.id];
  if(!x)return;
  if(x.image)p.image=x.image;
  if(x.desc)p.desc=x.desc;
  if(x.source)p.source=x.source;
  p.facts={...(p.facts||{}),...(x.facts||{})};
  p.tips=x.tips||[];
  p.photoNote=x.photoNote||'';
  p.checkedAt=x.checkedAt||'2026-10';
});

const ROUTE_GROUPS = [
  {id:'route-icn',major:'출국 전',areaKey:'icn',title:'인천공항 · 출국 전 숙박',region:'인천공항',duration:'숙박',placeIds:['darakhyu'],desc:'12일 밤을 국내에서 보내고 다음 날 아침 출국하는 선택지.',defaultPlaceIds:['darakhyu']},
  {id:'route-kix',major:'공항권',areaKey:'kix',title:'KIX · Aeroplaza',region:'간사이공항',duration:'도착 + 숙박',placeIds:['kix','firstcabin','nikkokix'],desc:'늦은 밤 KIX 도착 후 공항을 벗어나지 않고 바로 쉬는 동선. 숙박은 First Cabin 또는 Hotel Nikko 중 하나만 고르면 된다.',defaultPlaceIds:['kix','firstcabin']},
  {id:'route-rinku',major:'공항권',areaKey:'rinku',title:'린쿠타운 · 공항 인근 숙박',region:'린쿠타운',duration:'숙박',placeIds:['washingtonkix','kixnearhotel'],desc:'공항 직결 대신 한 정거장 이동해 숙박비를 낮추는 후보군.',defaultPlaceIds:['washingtonkix']},
  {id:'route-shinosaka',major:'신오사카',areaKey:'shinosaka',title:'신오사카 A · 역내 경유',region:'신오사카역',duration:'30~60분 + 이동',placeIds:['shinosaka','ekiben','pokemonstand'],desc:'교토로 가는 길에 신오사카역에서 에키벤과 Pokémon Stand를 묶어 보는 짧은 경유.',defaultPlaceIds:['shinosaka','ekiben','pokemonstand']},
  {id:'route-kyoto-a',major:'교토권',areaKey:'kyoto-a',title:'교토 A · 시조/가와라마치',region:'시조·가와라마치',duration:'2~3시간',placeIds:['pkmkyoto','ninkyoto'],desc:'Pokémon Center KYOTO와 Nintendo KYOTO를 같은 도심권에서 묶는 핵심 쇼핑 동선.',defaultPlaceIds:['pkmkyoto','ninkyoto']},
  {id:'route-kyoto-b',major:'교토권',areaKey:'kyoto-b',title:'교토 B · 시치조/교토역권',region:'교토역·시치조',duration:'1~2시간 + 숙박',placeIds:['marufukuro','kyotohotel'],desc:'옛 Nintendo 본사 역사 스폿과 교토 숙소 거점을 묶어 보는 권역.',defaultPlaceIds:['marufukuro']},
  {id:'route-kyoto-c',major:'교토권',areaKey:'kyoto-c',title:'교토 C · 우지/오구라',region:'우지·오구라',duration:'3~5시간',placeIds:['museum'],desc:'Nintendo Museum 하나를 중심으로 따로 시간을 잡아야 하는 우지 권역.',defaultPlaceIds:['museum']},
  {id:'route-kyoto-d',major:'교토권',areaKey:'kyoto-d',title:'교토 D · 나가오카쿄 맥주공장',region:'나가오카쿄',duration:'견학 약 90분 + 왕복 이동',placeIds:['suntorykyoto'],desc:'산토리 천연수 맥주공장 견학. 교토 시내 핵심 쇼핑 동선과 분리해 원하는 날짜에 추가하는 예약제 선택 코스.',defaultPlaceIds:['suntorykyoto']},
  {id:'route-osaka-a',major:'오사카권',areaKey:'osaka-a',title:'오사카 A · 우메다/오사카역',region:'우메다·오사카역',duration:'2~3시간',placeIds:['ninosaka','pkmosaka','cardstation','osakahotel'],desc:'Nintendo OSAKA, Pokémon Center OSAKA, Pokémon Card Station을 같은 역권에서 이어 보는 동선.',defaultPlaceIds:['ninosaka','pkmosaka','cardstation']},
  {id:'route-osaka-b',major:'오사카권',areaKey:'osaka-b',title:'오사카 B · 신사이바시/난바',region:'신사이바시·난바',duration:'3~5시간',placeIds:['shinsaibashi','pokecafe','kirbystore','dotonbori'],desc:'같은 건물의 Pokémon Center DX·Pokémon Cafe·Kirby Store를 보고 도톤보리까지 이어가는 동선.',defaultPlaceIds:['shinsaibashi','pokecafe','kirbystore','dotonbori']},
  {id:'route-osaka-c',major:'오사카권',areaKey:'osaka-c',title:'오사카 C · 닛폰바시/오타로드',region:'닛폰바시·오타로드',duration:'3~5시간',placeIds:['superpotato','gametanteidan','preyzotaro','preyzmain'],desc:'레트로 Nintendo 하드웨어·소프트와 Pokémon Card·TCG 매장을 도보권에서 몰아서 보는 쇼핑 동선.',defaultPlaceIds:['superpotato','gametanteidan','preyzotaro']},
  {id:'route-osaka-d',major:'오사카권',areaKey:'osaka-d',title:'오사카 D · 유니버설시티',region:'USJ·Universal City',duration:'하루',placeIds:['usj','snw'],desc:'USJ를 하루 잡고 SUPER NINTENDO WORLD를 핵심으로 보는 동선.',defaultPlaceIds:['usj','snw'],optionNote:'Power-Up Band는 장소가 아니라 SUPER NINTENDO WORLD 체험 옵션으로 관리합니다.'},
  {id:'route-osaka-e',major:'오사카권',areaKey:'osaka-e',title:'오사카 E · 스이타 맥주공장',region:'스이타',duration:'견학 약 90분 + 왕복 이동',placeIds:['asahisuita'],desc:'아사히 맥주 뮤지엄 투어. 오사카역·우메다에서 JR로 이동하는 예약제 선택 코스.',defaultPlaceIds:['asahisuita']}
];

const RESERVATION_RULES = {
  suntorykyoto:{level:'required',title:'공장 견학 예약 필수',doneLabel:'투어 예약 완료',note:'공식 사이트에서 날짜·시간별 투어를 미리 예약하세요.'},
  asahisuita:{level:'required',title:'공장 견학 예약 필수',doneLabel:'투어 예약 완료',note:'아사히 뮤지엄 투어를 사전에 예약하세요.'},
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
  'kyoto-d':{label:'교토 D · 나가오카쿄/맥주공장',major:'교토권',order:6.5},
  'osaka-a':{label:'오사카 A · 우메다/오사카역',major:'오사카권',order:7},
  'osaka-b':{label:'오사카 B · 신사이바시/난바',major:'오사카권',order:8},
  'osaka-c':{label:'오사카 C · 닛폰바시/오타로드',major:'오사카권',order:9},
  'osaka-d':{label:'오사카 D · 유니버설시티',major:'오사카권',order:10},
  'osaka-e':{label:'오사카 E · 스이타/맥주공장',major:'오사카권',order:10.5},
  transfer:{label:'도시간·공항 이동',major:'이동',order:11}
};
const MAJOR_ORDER=['출국 전','공항권','신오사카','교토권','오사카권','이동'];
const PLACE_AREA = {
  darakhyu:'icn',kix:'kix',firstcabin:'kix',nikkokix:'kix',kixhotel:'kix',washingtonkix:'rinku',kixnearhotel:'rinku',
  shinosaka:'shinosaka',ekiben:'shinosaka',pokemonstand:'shinosaka',
  suntorykyoto:'kyoto-d',
  pkmkyoto:'kyoto-a',ninkyoto:'kyoto-a',marufukuro:'kyoto-b',kyotohotel:'kyoto-b',museum:'kyoto-c',
  asahisuita:'osaka-e',
  ninosaka:'osaka-a',pkmosaka:'osaka-a',cardstation:'osaka-a',osakahotel:'osaka-a',
  shinsaibashi:'osaka-b',pokecafe:'osaka-b',kirbystore:'osaka-b',dotonbori:'osaka-b',
  superpotato:'osaka-c',gametanteidan:'osaka-c',preyzotaro:'osaka-c',preyzmain:'osaka-c',dendentown:'osaka-c',
  usj:'osaka-d',snw:'osaka-d',powerup:'osaka-d',haruka:'transfer',kixreturn:'transfer'
};
const PLACE_LIBRARY_EXCLUDE=new Set(['dendentown','powerup']);
const PLACE_OPTION_NOTES={snw:'Power-Up Band · 선택 옵션: 구입 시 키 챌린지·코인 등 연동 체험을 확장할 수 있습니다.'};
const PLACE_CARD_META = {
  suntorykyoto:{type:'맥주공장',cls:'experience',tags:['Suntory','공장견학','시음']},
  asahisuita:{type:'맥주공장',cls:'experience',tags:['Asahi','공장견학','시음']},
  kix:{type:'공항',cls:'airport',tags:['입출국','환승']},
  darakhyu:{type:'숙박',cls:'hotel',tags:['캡슐호텔','인천공항']},
  firstcabin:{type:'숙박',cls:'hotel',tags:['캡슐호텔','공항직결']},
  kixhotel:{type:'숙박',cls:'hotel',tags:['일반호텔','KIX']},
  nikkokix:{type:'숙박',cls:'hotel',tags:['일반호텔','공항직결']},
  washingtonkix:{type:'숙박',cls:'hotel',tags:['일반호텔','린쿠타운']},
  kixnearhotel:{type:'숙박',cls:'hotel',tags:['저가호텔','린쿠타운']},
  haruka:{type:'이동',cls:'transport',tags:['JR특급','공항철도']},
  shinosaka:{type:'역',cls:'station',tags:['신칸센','환승']},
  ekiben:{type:'식사',cls:'food',tags:['에키벤','도시락쇼핑']},
  pokemonstand:{type:'굿즈',cls:'shop',tags:['Pokémon','자판기']},
  kyotohotel:{type:'숙박',cls:'hotel',tags:['교토','호텔']},
  marufukuro:{type:'관광',cls:'tour',tags:['Nintendo역사','건축']},
  pkmkyoto:{type:'굿즈',cls:'shop',tags:['Pokémon','공식매장']},
  ninkyoto:{type:'굿즈',cls:'shop',tags:['Nintendo','공식매장']},
  museum:{type:'박물관',cls:'museum',tags:['Nintendo','체험']},
  osakahotel:{type:'숙박',cls:'hotel',tags:['오사카','호텔']},
  ninosaka:{type:'굿즈',cls:'shop',tags:['Nintendo','공식매장']},
  pkmosaka:{type:'굿즈',cls:'shop',tags:['Pokémon','공식매장']},
  shinsaibashi:{type:'굿즈',cls:'shop',tags:['Pokémon','DX매장']},
  pokecafe:{type:'카페',cls:'food',tags:['Pokémon','테마식사']},
  dotonbori:{type:'관광',cls:'tour',tags:['먹거리','거리관광']},
  usj:{type:'테마파크',cls:'park',tags:['어트랙션','하루코스']},
  snw:{type:'테마존',cls:'park',tags:['Nintendo','Mario','DK']},
  powerup:{type:'체험',cls:'experience',tags:['Nintendo','밴드연동']},
  kixreturn:{type:'이동',cls:'transport',tags:['공항이동','귀국']},
  kirbystore:{type:'굿즈',cls:'shop',tags:['Kirby','공식매장']},
  dendentown:{type:'쇼핑거리',cls:'gaming',tags:['레트로게임','TCG']},
  superpotato:{type:'레트로게임',cls:'gaming',tags:['Nintendo','중고게임']},
  gametanteidan:{type:'레트로게임',cls:'gaming',tags:['Nintendo','희귀게임']},
  cardstation:{type:'카드',cls:'card',tags:['Pokémon','공식TCG']},
  preyzmain:{type:'카드',cls:'card',tags:['TCG','싱글카드']},
  preyzotaro:{type:'카드',cls:'card',tags:['Pokémon','싱글카드']}
};

const SAME_BUILDING = [new Set(['ninosaka','pkmosaka']),new Set(['shinsaibashi','pokecafe','kirbystore'])];

const DAY_META = {
  '12':{date:'5/12',week:'수'}, '13':{date:'5/13',week:'목'}, '14':{date:'5/14',week:'금'}, '15':{date:'5/15',week:'토'}, '16':{date:'5/16',week:'일'}
};

const JSON_FORMAT='nintendo-kansai-trip-planner';
const JSON_VERSION=14;
let state = {
  activePlan:'start13',
  plans:{use12:{'12':[],'13':[],'14':[],'15':[],'16':[]},start13:{'13':[],'14':[],'15':[],'16':[]}},
  reservationDone:{},
  placeVotes:{}
};
ensureState();
function migrateLegacyRoutes(){
  // Split members that no longer belong to the replacement bundle into individual cards.
  // In particular, legacy route-kyoto included Marufukuro; silently dropping it loses a stop.
  const map={
    'route-kyoto':['route-kyoto-a',['marufukuro','pkmkyoto','ninkyoto']],
    'route-umeda':['route-osaka-a',['ninosaka','pkmosaka','cardstation']],
    'route-shinsaibashi':['route-osaka-b',['shinsaibashi','pokecafe','kirbystore','dotonbori']],
    'route-dendentown':['route-osaka-c',['superpotato','gametanteidan','preyzotaro','preyzmain']],
    'route-usj':['route-osaka-d',['usj','snw']]
  };
  for(const plan of Object.values(state.plans)){
    for(const items of Object.values(plan)){
      if(!Array.isArray(items))continue;
      for(let i=items.length-1;i>=0;i--){
        const item=items[i],mapping=map[item.routeId];
        if(!mapping)continue;
        const group=routeById(mapping[0]);
        if(!group)continue;
        const original=[...new Set(Array.isArray(item.memberIds)&&item.memberIds.length?item.memberIds:mapping[1])];
        const matching=original.filter(id=>group.placeIds.includes(id));
        const extras=original.filter(id=>!group.placeIds.includes(id)&&placeById(id));
        const additions=extras.map(id=>({uid:uid(),placeId:id,start:'',end:''}));
        if(matching.length){
          item.routeId=group.id;
          item.memberIds=matching;
          items.splice(i,1,...additions,item);
        }else{
          items.splice(i,1,...additions);
        }
      }
    }
  }
}
migrateLegacyRoutes();
let currentFileName='';
let dirty=false;
let placeFilter='available';
let placeSearch='';
let selectedPlace=null;
let pendingAdd=null;
let editingCustom=null;
let lastRemoved=null;
let draggedSchedule=null;

function blankPlan(use12=false){return use12?{'12':[],'13':[],'14':[],'15':[],'16':[]}:{'13':[],'14':[],'15':[],'16':[]}}
function ensureState(){
  state.activePlan = state.activePlan==='use12'?'use12':'start13';
  state.plans ||= {};
  state.plans.use12 ||= blankPlan(true);state.plans.start13 ||= blankPlan(false);
  ['12','13','14','15','16'].forEach(d=>state.plans.use12[d] ||= []);
  ['13','14','15','16'].forEach(d=>state.plans.start13[d] ||= []);
  state.reservationDone ||= {};
  state.placeVotes ||= {};
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
function markDirty(){dirty=true;setJsonStatus('● 변경됨 · 자동 저장 대기','dirty')}
function persist(){editRevision++;markDirty();queueVoteSave()}
function buildJsonPayload(){
  return {format:JSON_FORMAT,version:JSON_VERSION,savedAt:new Date().toISOString(),state};
}
function downloadJsonText(text,filename){
  const blob=new Blob([text],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),0);
}
const API_URL=window.TRIP_API_URL||'';
let remoteSha=null;
let syncInProgress=false;
let editRevision=0;
let voteSaveTimer=null;
let libraryDropBound=false;
function queueVoteSave(){
  clearTimeout(voteSaveTimer);
  voteSaveTimer=setTimeout(()=>{
    if(syncInProgress){queueVoteSave();return;}
    if(remoteSha===null){setJsonStatus('● 공유 연결 필요 · 로컬 변경 유지 · JSON 백업 가능','dirty');return;}
    saveJson();
  },900);
}
function renderAll(){renderLibraryTabs();renderLibrary();renderBoard();}
function fetchSharedJsonp(){
  return new Promise((resolve,reject)=>{
    if(!API_URL)return reject(new Error('Google Apps Script URL이 설정되지 않았습니다.'));
    const cb='tripCallback_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    const timer=setTimeout(()=>finish(new Error('조회 시간 초과')),12000);
    function finish(err,data){clearTimeout(timer);delete window[cb];script.remove();err?reject(err):resolve(data);}
    window[cb]=data=>finish(null,data);
    script.onerror=()=>finish(new Error('Google Sheets 연결 실패'));
    script.src=API_URL+(API_URL.includes('?')?'&':'?')+'callback='+encodeURIComponent(cb)+'&_='+Date.now();
    document.head.appendChild(script);
  });
}
async function loadShared({silent=false,force=false}={}){
  if(syncInProgress)return;
  if(dirty&&!force){if(!silent)toast('미저장 변경 사항이 있습니다. 공유 저장 후 새로고침하세요.');return;}
  if(force&&dirty&&!confirm('저장하지 않은 변경을 버리고 최신 공유 일정을 불러올까요?'))return;
  const initialLoading=remoteSha===null;
  const startingRevision=editRevision;
  const workspace=document.getElementById('workspace');
  const planControl=document.querySelector('.plan-control');
  syncInProgress=true;
  if(initialLoading){
    document.body.classList.add('trip-initial-loading');
    if(workspace)workspace.inert=true;
    if(planControl)planControl.inert=true;
  }
  try{
    const result=await fetchSharedJsonp();
    if(!result.success)throw new Error(result.error||'조회 실패');
    if(!Number.isSafeInteger(result.version))throw new Error('잘못된 공유 데이터 버전');
    if(editRevision!==startingRevision){
      // A programmatic edit during an in-flight load must not be clobbered by a late reply.
      // Also do not auto-save the unsynchronized local snapshot over the remote plan.
      clearTimeout(voteSaveTimer);
      remoteSha=null;
      setJsonStatus('⚠ 공유 조회 중 편집 발생 · 로컬 변경 보존','dirty');
      toast('공유 일정을 불러오는 도중 변경되어 덮어쓰기를 차단했습니다.');
      return;
    }
    if(result.version===remoteSha&&!force){if(!silent)setJsonStatus('✓ 최신 공유 일정','saved');return;}
    if(result.data){
      state=normalizeImportedState(result.data);
      ensureState();migrateLegacyRoutes();
      if(!silent||remoteSha===null)selectPlanWithSavedItems();
      renderAll();
    }
    if(!result.data&&(!silent||remoteSha===null)){selectPlanWithSavedItems();renderBoard();}
    remoteSha=result.version;dirty=false;
    setJsonStatus(result.data?'✓ 공유 일정 동기화됨':'✓ 공유 일정 준비됨 · 최초 저장 가능','saved');
    if(!silent)toast('공유 일정을 불러왔습니다.');
  }catch(err){console.error('Shared load:',err);setJsonStatus('공유 일정 조회 실패','dirty');if(!silent)toast('조회 실패: '+err.message);}
  finally{
    syncInProgress=false;
    if(initialLoading){
      document.body.classList.remove('trip-initial-loading');
      if(workspace)workspace.inert=false;
      if(planControl)planControl.inert=false;
    }
  }
}
async function saveJson(){
  if(syncInProgress){toast('동기화 중입니다.');return;}
  if(remoteSha===null){
    // A failed first read must not strand edits, and must never overwrite unknown
    // remote data without the user's explicit confirmation.
    setJsonStatus('공유 서버 확인 중 · 로컬 일정 유지','neutral');
    try{
      const snapshot=await fetchSharedJsonp();
      if(!snapshot.success||!Number.isSafeInteger(snapshot.version))throw new Error(snapshot.error||'공유 정보 조회 실패');
      if(snapshot.data&&!dirty){
        // A user clicking Save after an initial read failure is asking to reconnect.
        // Never write an empty local plan over an existing shared schedule.
        state=normalizeImportedState(snapshot.data);
        ensureState();migrateLegacyRoutes();selectPlanWithSavedItems();
        remoteSha=snapshot.version;dirty=false;
        renderAll();setJsonStatus('✓ 공유 일정 다시 연결됨','saved');
        toast('기존 공유 일정을 안전하게 불러왔습니다.');
        return;
      }
      if(snapshot.data&&dirty&&!confirm('서버에 공유 일정이 있습니다. 현재 화면의 일정으로 덮어쓰기를 시도할까요? 먼저 JSON 백업을 권장합니다.')){
        setJsonStatus('● 기존 공유본 보존 · 백업 후 다시 시도','dirty');return;
      }
      remoteSha=snapshot.version;
    }catch(err){
      setJsonStatus('● 공유 연결 실패 · 로컬 일정 보존 · JSON 백업 가능','dirty');
      toast('저장 실패: '+err.message);return;
    }
  }
  const requestId='req_'+Date.now()+'_'+Math.random().toString(36).slice(2);
  const baseVersion=remoteSha;
  const savingRevision=editRevision;
  const payload=JSON.stringify({baseVersion,requestId,data:buildJsonPayload()});
  syncInProgress=true;setJsonStatus('공유 일정 저장 중 · 확인 대기','neutral');
  try{
    // Simple POST request; Apps Script does not provide a cross-origin readable POST response.
    await fetch(API_URL,{method:'POST',mode:'no-cors',body:new URLSearchParams({payload})});
  }catch(err){console.warn('POST transport uncertain:',err);}
  try{
    let latest;
    for(let attempt=0;attempt<5;attempt++){
      if(attempt)await new Promise(resolve=>setTimeout(resolve,900));
      latest=await fetchSharedJsonp();
      if(latest.success&&latest.requestId===requestId)break;
      if(latest.success&&latest.version!==baseVersion)break;
    }
    if(latest?.success&&latest.requestId===requestId){
      remoteSha=latest.version;
      if(editRevision===savingRevision){
        dirty=false;
        setJsonStatus('✓ Google Sheets 공유 저장 완료','saved');
      }else{
        setJsonStatus('● 추가 변경 사항 저장 대기','dirty');
        queueVoteSave();
      }
      toast('Google Sheets에 저장했습니다.');
    }else if(latest?.success&&latest.version!==baseVersion){
      setJsonStatus('⚠ 다른 사용자의 저장 내용 발견','dirty');
      toast('저장 충돌: 다른 사용자 변경 사항이 있습니다. 페이지를 새로고침하기 전 현재 수정 내용을 확인하세요.');
    }else{
      setJsonStatus('● 저장 확인 실패 · 변경 유지','dirty');
      toast('저장 여부를 확인할 수 없습니다. 잠시 뒤 최신 조회 후 확인하세요.');
    }
  }catch(err){console.error('Save verification:',err);setJsonStatus('● 저장 확인 실패 · 변경 유지','dirty');toast('저장 확인 실패: '+err.message);}
  finally{syncInProgress=false;}
}
function exportJsonBackup(){downloadJsonText(JSON.stringify(buildJsonPayload(),null,2),'nintendo-kansai-trip-backup.json');toast('현재 일정을 백업했습니다.');}
function normalizeImportedState(data){
  const imported=data?.format===JSON_FORMAT?data.state:(data?.state?.plans?data.state:data);
  if(!imported||typeof imported!=='object'||!imported.plans||typeof imported.plans!=='object')throw new Error('지원하지 않는 일정 JSON 형식입니다.');
  const cleaned={activePlan:imported.activePlan==='use12'?'use12':'start13',plans:{use12:blankPlan(true),start13:blankPlan(false)},reservationDone:{},placeVotes:{}};
  const legacyIds=new Set(['route-kyoto','route-umeda','route-shinsaibashi','route-dendentown','route-usj']);
  const seenUids=new Set();
  const cleanTime=v=>typeof v==='string'&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v)?v:'';
  for(const planName of ['use12','start13']){
    for(const day of Object.keys(cleaned.plans[planName])){
      const input=imported.plans[planName]?.[day];
      if(!Array.isArray(input))continue;
      cleaned.plans[planName][day]=input.slice(0,200).flatMap(raw=>{
        if(!raw||typeof raw!=='object')return [];
        const oldId=typeof raw.uid==='string'&&/^[\w-]{1,100}$/.test(raw.uid)?raw.uid:'';
        const item={uid:oldId&&!seenUids.has(oldId)?oldId:uid(),start:cleanTime(raw.start),end:cleanTime(raw.end)};
        seenUids.add(item.uid);
        if(typeof raw.placeId==='string'&&placeById(raw.placeId))item.placeId=raw.placeId;
        else if(typeof raw.routeId==='string'&&(routeById(raw.routeId)||legacyIds.has(raw.routeId))){
          item.routeId=raw.routeId;
          if(Array.isArray(raw.memberIds))item.memberIds=[...new Set(raw.memberIds.filter(id=>typeof id==='string'&&placeById(id)))].slice(0,40);
          item.expanded=!!raw.expanded;
        }else if(typeof raw.title==='string'||typeof raw.memo==='string'){
          item.title=String(raw.title||'커스텀 일정').slice(0,240);
          item.memo=String(raw.memo||'').slice(0,2500);
        }else if(typeof raw.placeId==='string'){
          item.title='기존 장소: '+raw.placeId.slice(0,120);
          item.memo='현재 장소 목록에 없는 항목입니다. 내용을 확인해 주세요.';
        }else return [];
        return [item];
      });
    }
  }
  if(imported.reservationDone&&typeof imported.reservationDone==='object'){
    for(const [key,value] of Object.entries(imported.reservationDone)){
      if(/^[\w|:-]{1,150}$/.test(key))cleaned.reservationDone[key]=!!value;
    }
  }
  if(imported.placeVotes&&typeof imported.placeVotes==='object'){
    for(const [key,value] of Object.entries(imported.placeVotes)){
      if(placeById(key)&&['up','down',''].includes(value))cleaned.placeVotes[key]=value;
    }
  }
  return cleaned;
}
async function loadJsonFile(file,fileHandle=null){
  if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    state=normalizeImportedState(data);ensureState();migrateLegacyRoutes();selectPlanWithSavedItems();
    currentFileName=file.name||'trip.json';editRevision++;markDirty();
    renderLibraryTabs();renderLibrary();renderBoard();setJsonStatus(`● ${currentFileName} · 공유 저장 필요`,'dirty');toast('JSON 일정을 불러왔습니다.');
  }catch(err){
    console.error(err);toast('JSON을 불러오지 못했습니다. 파일 형식을 확인하세요.');
  }
}
function itemPlaceIds(item){
  if(item.placeId)return [item.placeId];
  if(!item.routeId)return [];
  const group=routeById(item.routeId);
  const members=Array.isArray(item.memberIds)&&item.memberIds.length?item.memberIds:(group?.placeIds||[]);
  return members.filter(id=>group?.placeIds.includes(id));
}
function schedulePlaceIds(){
  const ids=new Set();
  Object.values(currentSchedule()).flat().forEach(item=>itemPlaceIds(item).forEach(id=>ids.add(id)));
  return ids;
}
function planCount(planName){return Object.values(state.plans[planName]||{}).reduce((n,list)=>n+list.length,0)}
function selectPlanWithSavedItems(){
  const has12=planCount('use12')>0;
  const has13=planCount('start13')>0;
  // 한쪽에만 일정이 있으면 그 일정안을 선택하고, 양쪽 모두 있으면 저장된 선택을 유지합니다.
  if(has12&&!has13)state.activePlan='use12';
  else if(has13&&!has12)state.activePlan='start13';
  // 둘 다 있는 경우에는 공유 JSON에 저장된 사용자의 선택을 보존합니다.
}
function regionKey(p){return PLACE_AREA[p?.id]||'transfer'}
function sameBuilding(a,b){if(!a||!b)return false;return SAME_BUILDING.some(set=>set.has(a)&&set.has(b))}
function areaLabel(key){return AREA_META[key]?.label||key||''}
function areaMajor(key){return AREA_META[key]?.major||'기타'}

function renderLibraryTabs(){
  document.querySelectorAll('[data-place-filter]').forEach(btn=>{
    const selected=btn.dataset.placeFilter===placeFilter;
    btn.classList.toggle('active',selected);
    btn.setAttribute('aria-pressed',String(selected));
  });
}
function cardMeta(p){return PLACE_CARD_META[p?.id]||{type:'장소',cls:'main',tags:[]}}
function placeBadges(p,includeTags=false){
  const meta=cardMeta(p),badges=[];
  if(p.kind==='required')badges.push('<span class="mini-badge required">필수</span>');
  badges.push(`<span class="mini-badge ${escapeHtml(meta.cls)}">${escapeHtml(meta.type)}</span>`);
  if(includeTags)meta.tags.forEach(tag=>badges.push(`<span class="mini-badge meta-tag-badge">#${escapeHtml(tag)}</span>`));
  return badges;
}
function renderPlaceMeta(p){
  const meta=cardMeta(p),seen=new Set(),parts=[];
  if(p.kind==='required'){parts.push('<span class="mini-badge required">필수</span>');seen.add('필수')}
  if(meta.type&&!seen.has(meta.type)){parts.push(`<span class="mini-badge ${escapeHtml(meta.cls)}">${escapeHtml(meta.type)}</span>`);seen.add(meta.type)}
  meta.tags.forEach(tag=>{const key=String(tag).toLowerCase();if(!seen.has(key)){parts.push(`<span class="meta-hashtag">#${escapeHtml(tag)}</span>`);seen.add(key)}});
  if(p.duration&&!seen.has(String(p.duration).toLowerCase()))parts.push(`<span class="meta-duration">${escapeHtml(p.duration)}</span>`);
  return parts.join('');
}
function requirementLabel(rule){return rule.level==='required'?'필수':rule.level==='conditional'?'확인':'권장'}
function reservationKey(placeId,day){return state.activePlan+'|'+day+'|'+placeId}
function renderRequirementInline(placeId,context='library',day=''){
  const rule=RESERVATION_RULES[placeId];if(!rule)return '';
  const scoped=context==='schedule'&&activeDays().includes(day);
  const done=scoped&&!!state.reservationDone[reservationKey(placeId,day)];
  // Library/detail show the rule, but not a misleading global completion checkbox.
  if(!scoped)return `<div class="inline-requirement ${rule.level}" data-requirement-row="${placeId}">
    <span class="inline-check">!</span>
    <span class="inline-requirement-copy"><strong>${escapeHtml(rule.title)}</strong><small>날짜별 예약 완료 여부는 해당 일정 카드에서 체크하세요. ${escapeHtml(rule.note)}</small></span>
    <span class="inline-requirement-state">${requirementLabel(rule)}</span>
  </div>`;
  return `<label class="inline-requirement ${rule.level} ${done?'done':''}" data-requirement-row="${placeId}">
    <input type="checkbox" data-reservation-toggle="${placeId}" data-reservation-day="${day}" ${done?'checked':''}>
    <span class="inline-check">${done?'✓':''}</span>
    <span class="inline-requirement-copy"><strong>${escapeHtml(rule.title)}</strong><small>${escapeHtml(rule.note)}</small></span>
    <span class="inline-requirement-state">${done?escapeHtml(rule.doneLabel):requirementLabel(rule)}</span>
  </label>`;
}
function bindReservationToggles(root=document){
  root.querySelectorAll('[data-reservation-toggle]').forEach(inp=>inp.onchange=e=>{
    e.stopPropagation();
    const day=inp.dataset.reservationDay;
    if(!activeDays().includes(day))return;
    state.reservationDone[reservationKey(inp.dataset.reservationToggle,day)]=inp.checked;
    persist();renderBoard();
  });
  root.querySelectorAll('.inline-requirement').forEach(row=>row.onclick=e=>e.stopPropagation());
}
function renderPlaceVote(placeId){
  const vote=state.placeVotes?.[placeId]||'';
  return `<div class="place-vote" data-vote-row="${escapeHtml(placeId)}" aria-label="장소 추천 여부">
    <span class="place-vote-label">공용 방문 의견 · 마지막 선택이 적용됩니다</span>
    <button type="button" class="vote-btn ${vote==='up'?'selected up':''}" data-vote="up" data-vote-place="${escapeHtml(placeId)}" aria-pressed="${vote==='up'}">👍 추천</button>
    <button type="button" class="vote-btn ${vote==='down'?'selected down':''}" data-vote="down" data-vote-place="${escapeHtml(placeId)}" aria-pressed="${vote==='down'}">👎 비추천</button>
  </div>`;
}
function refreshVoteButtons(placeId){
  document.querySelectorAll('[data-vote-place]').forEach(btn=>{
    if(btn.dataset.votePlace!==placeId)return;
    const selected=state.placeVotes?.[placeId]===btn.dataset.vote;
    btn.classList.toggle('selected',selected);
    btn.classList.toggle('up',selected&&btn.dataset.vote==='up');
    btn.classList.toggle('down',selected&&btn.dataset.vote==='down');
    btn.setAttribute('aria-pressed',String(selected));
  });
}
function bindPlaceVotes(root=document){
  root.querySelectorAll('[data-vote-place]').forEach(btn=>btn.onclick=e=>{
    e.preventDefault();e.stopPropagation();
    const id=btn.dataset.votePlace,vote=btn.dataset.vote;
    if(!placeById(id))return;
    state.placeVotes[id]=state.placeVotes[id]===vote?'':vote;
    persist();
    // 클릭할 때 목록/일정표 DOM 전체를 다시 만들지 않습니다.
    // 기존 전체 재렌더링은 사용자가 새로고침으로 인식하고 조작 중인 화면을 초기화했습니다.
    refreshVoteButtons(id);
    toast('방문 의견을 자동 저장합니다. 저장 완료 표시를 확인하세요.');
  });
}
function placeAssignedDays(id){
  return activeDays().filter(day=>(currentSchedule()[day]||[]).some(item=>itemPlaceIds(item).includes(id)));
}
function renderPlaceCard(p){
  const optionNote=PLACE_OPTION_NOTES[p.id],assignedDays=placeAssignedDays(p.id);
  return `<article class="place-card" draggable="true" data-place="${p.id}">
    <div class="place-card-main">
      <img class="place-thumb" src="${p.image||FALLBACK}" loading="lazy" decoding="async" alt="${escapeHtml(p.title)} 사진" onerror="this.onerror=null;this.src='${FALLBACK}'">
      <div class="place-copy"><div class="place-title">${escapeHtml(p.title)}${assignedDays.length?`<span class="place-assigned-tag" title="현재 일정에 배정됨">${assignedDays.map(day=>DAY_META[day].date).join(', ')} 등록</span>`:''}</div><div class="place-description">${escapeHtml(p.desc||"상세 정보는 장소를 클릭해 확인하세요.")}</div><div class="place-meta">${renderPlaceMeta(p)}</div>${optionNote?`<div class="place-option-note">🎮 ${escapeHtml(optionNote)}</div>`:''}</div>
      <button class="add-mini" data-add="${p.id}" title="일정에 추가">＋</button>
    </div>
    ${renderRequirementInline(p.id)}
  </article>`;
}
function renderPlacesGrouped(list){
  const grouped={};list.forEach(p=>{const key=regionKey(p);(grouped[key]??=[]).push(p)});
  const byMajor={};
  Object.entries(grouped).sort((a,b)=>(AREA_META[a[0]]?.order??99)-(AREA_META[b[0]]?.order??99)).forEach(([key,items])=>{const major=areaMajor(key);(byMajor[major]??=[]).push([key,items])});
  return MAJOR_ORDER.filter(m=>byMajor[m]?.length).map(major=>`<section class="major-region-section">
    <div class="major-region-head"><strong>${escapeHtml(major)}</strong><span>${byMajor[major].reduce((n,[,items])=>n+items.length,0)}곳</span></div>
    ${byMajor[major].map(([key,items])=>{
      const bundles=placeFilter==='available'&&!placeSearch?ROUTE_GROUPS.filter(g=>g.areaKey===key&&g.placeIds.length>1&&selectedRouteIds(g.id).length>1):[];
      return `<details class="region-group" data-region="${escapeHtml(key)}" open>
        <summary><span>${escapeHtml(AREA_META[key]?.label||key)}</span><b>${items.length}</b></summary>
        ${bundles.length?`<div class="region-bundle-tools">${bundles.map(g=>`<button type="button" class="region-bundle-btn" data-bundle-add="${g.id}" title="${escapeHtml(selectedRouteIds(g.id).map(id=>placeById(id)?.title).join(', '))}">＋ ${escapeHtml(g.title)} 묶음 추가</button>`).join('')}</div>`:''}
        <div class="region-group-body">${items.map(renderPlaceCard).join('')}</div></details>`;
    }).join('')}</section>`).join('');
}
function defaultRouteSelection(g){return new Set((g.defaultPlaceIds?.length?g.defaultPlaceIds:g.placeIds).filter(id=>g.placeIds.includes(id)))}
function selectedRouteIds(routeId){
  const g=routeById(routeId);if(!g)return[];
  const assigned=schedulePlaceIds();
  return [...defaultRouteSelection(g)].filter(id=>!assigned.has(id));
}
function bindLibraryPlaceCards(root){
  root.querySelectorAll('.place-card').forEach(card=>{card.onclick=e=>{if(e.target.closest('[data-add],.inline-requirement,.place-vote'))return;selectPlace(card.dataset.place)};card.addEventListener('dragstart',e=>{if(e.target.closest('button,input,label')){e.preventDefault();return}card.classList.add('dragging');e.dataTransfer.setData('text/place',card.dataset.place);e.dataTransfer.effectAllowed='copy'});card.addEventListener('dragend',()=>card.classList.remove('dragging'))});
  root.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();openAddDialog({type:'place',id:btn.dataset.add})});
  root.querySelectorAll('[data-bundle-add]').forEach(btn=>btn.onclick=e=>{
    e.stopPropagation();
    const id=btn.dataset.bundleAdd,members=selectedRouteIds(id);
    if(members.length<2){toast('현재 묶음으로 추가할 미배정 장소가 부족합니다.');return;}
    openAddDialog({type:'route',id,memberIds:members});
  });
  bindReservationToggles(root);bindPlaceVotes(root);
}
function renderLibrary(returnedIds=[]){
  const root=document.getElementById('placeLibrary'),scrollTop=root.scrollTop;
  const closedRegions=new Set([...root.querySelectorAll("details.region-group:not([open])")].map(el=>el.dataset.region));
  const assigned=schedulePlaceIds();
  const available=places.filter(p=>!PLACE_LIBRARY_EXCLUDE.has(p.id));
  const count=document.getElementById('placeCounts');
  if(count)count.textContent=available.filter(p=>!assigned.has(p.id)).length+' 미배정 / '+available.length+' 전체';
  const query=placeSearch.trim().toLocaleLowerCase();
  const list=available.filter(p=>{
    if(placeFilter==='available'&&assigned.has(p.id))return false;
    if(placeFilter==='assigned'&&!assigned.has(p.id))return false;
    return !query||[p.title,p.desc,areaLabel(regionKey(p)),...(p.tags||[])].join(' ').toLocaleLowerCase().includes(query);
  });
  root.innerHTML=renderPlacesGrouped(list)||'<div class="library-empty">조건에 맞는 장소가 없습니다. 검색어 또는 배정 필터를 바꿔보세요.</div>';
  bindLibraryPlaceCards(root);
  root.querySelectorAll("details.region-group").forEach(el=>{if(closedRegions.has(el.dataset.region))el.open=false;});
  root.scrollTop=scrollTop;
  const returned=returnedIds.find(id=>!assigned.has(id)&&!PLACE_LIBRARY_EXCLUDE.has(id));
  if(returned&&placeFilter==='available'){
    const card=[...root.querySelectorAll('[data-place]')].find(el=>el.dataset.place===returned);
    if(card){const group=card.closest('details.region-group');if(group)group.open=true;card.classList.add('returned-place');card.scrollIntoView({block:'nearest',behavior:'auto'});}
  }
}

function minutes(v){if(!v||!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v))return null;const [h,m]=v.split(':').map(Number);return h*60+m}
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
  const curr=items[index],warnings=[];
  if(curr.start&&minutes(curr.start)===null||curr.end&&minutes(curr.end)===null)warnings.push('시간 형식 확인 필요');
  // Overnight stays are allowed; don't mistake their next-morning end for a conflict.
  if(index===0)return warnings;
  const prev=items[index-1],pe=minutes(prev.end),cs=minutes(curr.start);
  if(pe===null||cs===null)return warnings;
  const gap=cs-pe;
  if(gap<0&&!itemPlaceIds(prev).some(id=>placeById(id)?.tags?.includes('숙박')))warnings.push(`앞 일정과 ${Math.abs(gap)}분 겹침`);
  else if(itemArea(prev)&&itemArea(curr)&&itemArea(prev)!==itemArea(curr)&&gap<15)warnings.push('지역이 바뀌는데 이동 여유가 15분 미만');
  return warnings;
}
function renderWarnings(warnings){return warnings.length?`<div class="schedule-warning">⚠ ${warnings.map(escapeHtml).join(' · ')}</div>`:''}
function renderBoard(){
  document.querySelectorAll('.start-btn').forEach(b=>b.classList.toggle('active',(b.dataset.start==='12'&&state.activePlan==='use12')||(b.dataset.start==='13'&&state.activePlan==='start13')));
  document.querySelector('[data-plan-count="12"]').textContent=planCount('use12');document.querySelector('[data-plan-count="13"]').textContent=planCount('start13');
  const days=activeDays(),board=document.getElementById('scheduleBoard');board.style.setProperty('--day-count',days.length);
  board.innerHTML=days.map(day=>{const items=currentSchedule()[day]||[];const cards=items.map((item,i)=>`${i?renderMovement(items[i-1],item):''}${renderScheduleCard(item,day,timingWarnings(items,i))}`).join('');return `<section class="day-column" data-day="${day}"><header class="day-head"><div class="day-title-line"><div><span class="day-date">${DAY_META[day].date}</span><span class="day-week">${DAY_META[day].week}</span></div><div class="day-head-actions"><span class="day-count">${items.length}개</span><button type="button" class="day-add-btn" data-custom-day="${day}">＋ 일정</button></div></div></header><div class="drop-zone" data-day="${day}">${items.length?cards:'<div class="empty-drop"><div><b>비어 있음</b>왼쪽 장소·권역 동선을 끌어오세요.</div></div>'}</div></section>`}).join('');
  bindScheduleDrag();bindPlaceVotes(board);document.querySelectorAll('[data-custom-day]').forEach(btn=>btn.onclick=()=>openCustomForDay(btn.dataset.customDay));updateRequiredWarning();syncCustomDayOptions();bindReservationToggles(board);
}
function renderScheduleCard(item,day,warnings=[]){
  if(item.routeId)return renderRouteScheduleCard(item,day,warnings);
  const p=item.placeId?placeById(item.placeId):null;const title=p?.title||item.title||'일정';const kind=p?.kind||'custom';const note=p?.duration||item.memo||'직접 추가';
  return `<article class="schedule-card ${kind}" draggable="true" data-item="${escapeHtml(item.uid)}" data-day="${day}">
    <div class="card-head"><span class="drag-handle">⠿</span><div class="card-title">${escapeHtml(title)}</div><div class="card-actions">${p?`<button class="card-icon detail-btn" data-place="${p.id}" title="상세">ⓘ</button>`:`<button class="card-icon edit-custom-btn" data-edit-custom="${item.uid}" data-day="${day}" title="제목·메모 수정" aria-label="일정 수정">✎</button>`}<button class="card-icon remove-btn" data-remove="${escapeHtml(item.uid)}" data-day="${day}" title="삭제" aria-label="일정에서 삭제">×</button></div></div>
    ${renderWarnings(warnings)}
    <div class="time-row"><label class="time-field"><span>시작</span><input type="time" value="${escapeHtml(item.start||'')}" data-time="start" data-item="${escapeHtml(item.uid)}" data-day="${day}"></label><label class="time-field"><span>종료</span><input type="time" value="${escapeHtml(item.end||'')}" data-time="end" data-item="${escapeHtml(item.uid)}" data-day="${day}"></label></div>
    <div class="card-note">${escapeHtml(note)}</div>${p&&PLACE_OPTION_NOTES[p.id]?`<div class="schedule-option-note">🎮 ${escapeHtml(PLACE_OPTION_NOTES[p.id])}</div>`:''}${p?renderRequirementInline(p.id,'schedule',day):''}</article>`;
}
function renderRouteScheduleCard(item,day,warnings=[]){
  const g=routeById(item.routeId);if(!g)return '';const memberIds=item.memberIds?.length?item.memberIds:g.placeIds;const members=memberIds.map(placeById).filter(Boolean);const shown=item.expanded?members:members.slice(0,2);const reqs=members.filter(p=>RESERVATION_RULES[p.id]);
  return `<article class="schedule-card route-schedule-card" draggable="true" data-item="${escapeHtml(item.uid)}" data-day="${day}">
    <div class="card-head"><span class="drag-handle">⠿</span><div class="card-title"><span class="route-label">동선</span>${escapeHtml(g.title)}</div><div class="card-actions"><button class="card-icon route-toggle" data-route-toggle="${escapeHtml(item.uid)}" data-day="${day}" title="펼치기">${item.expanded?'▴':'▾'}</button><button class="card-icon ungroup-btn" data-ungroup="${escapeHtml(item.uid)}" data-day="${day}" title="묶음 해제">↗</button><button class="card-icon remove-btn" data-remove="${escapeHtml(item.uid)}" data-day="${day}" title="삭제">×</button></div></div>
    ${renderWarnings(warnings)}
    <div class="time-row"><label class="time-field"><span>시작</span><input type="time" value="${escapeHtml(item.start||'')}" data-time="start" data-item="${escapeHtml(item.uid)}" data-day="${day}"></label><label class="time-field"><span>종료</span><input type="time" value="${escapeHtml(item.end||'')}" data-time="end" data-item="${escapeHtml(item.uid)}" data-day="${day}"></label></div>
    <div class="route-schedule-members">${shown.map((p,i)=>`<button type="button" data-place-inline="${p.id}"><span>${i+1}</span>${escapeHtml(p.title)}${RESERVATION_RULES[p.id]?.level==='required'?'<b>예약</b>':''}</button>`).join('')}${!item.expanded&&members.length>2?`<small>+ ${members.length-2}곳 더</small>`:''}</div>
    ${g.optionNote?`<div class="schedule-option-note">🎮 ${escapeHtml(g.optionNote)}</div>`:''}<div class="card-note">${escapeHtml(g.region)} · ${escapeHtml(g.duration)}</div>${reqs.map(p=>renderRequirementInline(p.id,'schedule',day)).join('')}</article>`;
}
function getDropIndex(zone,clientY){const cards=[...zone.querySelectorAll('.schedule-card:not(.dragging)')];for(let i=0;i<cards.length;i++){const rect=cards[i].getBoundingClientRect();if(clientY<rect.top+rect.height/2)return i}return cards.length}
function bindScheduleDrag(){
  document.querySelectorAll('.schedule-card').forEach(card=>{card.addEventListener('dragstart',e=>{if(e.target.closest('input,button,label')){e.preventDefault();return}draggedSchedule={uid:card.dataset.item,from:card.dataset.day};card.classList.add('dragging');e.dataTransfer.setData('text/schedule',card.dataset.item);e.dataTransfer.effectAllowed='move'});card.addEventListener('dragend',()=>{card.classList.remove('dragging');document.querySelectorAll('.dragover,.library-drop-active').forEach(el=>el.classList.remove('dragover','library-drop-active'));draggedSchedule=null})});
  document.querySelectorAll('.drop-zone').forEach(zone=>{zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragover');e.dataTransfer.dropEffect=(e.dataTransfer.types.includes('text/place')||e.dataTransfer.types.includes('text/route'))?'copy':'move'});zone.addEventListener('dragleave',e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove('dragover')});zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('dragover');const day=zone.dataset.day,targetIndex=getDropIndex(zone,e.clientY),placeId=e.dataTransfer.getData('text/place');if(placeId){addPlaceToDay(placeId,day,targetIndex);return}const routeId=e.dataTransfer.getData('text/route');if(routeId){const ids=selectedRouteIds(routeId);if(ids.length)addRouteToDay(routeId,day,targetIndex,ids);return}if(draggedSchedule)moveItem(draggedSchedule.uid,draggedSchedule.from,day,targetIndex)})});
  const library=document.getElementById('libraryPanel');
  if(!libraryDropBound){libraryDropBound=true;library.addEventListener('dragover',e=>{if(!draggedSchedule)return;e.preventDefault();library.classList.add('library-drop-active');e.dataTransfer.dropEffect='move'});library.addEventListener('dragleave',e=>{if(!library.contains(e.relatedTarget))library.classList.remove('library-drop-active')});library.addEventListener('drop',e=>{if(!draggedSchedule)return;e.preventDefault();library.classList.remove('library-drop-active');removeItem(draggedSchedule.uid,draggedSchedule.from);draggedSchedule=null;toast('일정에서 뺐습니다.')});}
  document.querySelectorAll('.remove-btn').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove,b.dataset.day));
  document.querySelectorAll('[data-edit-custom]').forEach(b=>b.onclick=()=>openEditCustom(b.dataset.editCustom,b.dataset.day));
  document.querySelectorAll('.detail-btn').forEach(b=>b.onclick=()=>selectPlace(b.dataset.place));
  document.querySelectorAll('[data-place-inline]').forEach(b=>b.onclick=()=>selectPlace(b.dataset.placeInline));
  document.querySelectorAll('[data-time]').forEach(inp=>inp.onchange=()=>updateTime(inp.dataset.item,inp.dataset.day,inp.dataset.time,inp.value));
  document.querySelectorAll('[data-route-toggle]').forEach(b=>b.onclick=()=>toggleRouteItem(b.dataset.routeToggle,b.dataset.day));
  document.querySelectorAll('[data-ungroup]').forEach(b=>b.onclick=()=>ungroupRoute(b.dataset.ungroup,b.dataset.day));
}
function addPlaceToDay(placeId,day,index=null){
  const list=currentSchedule()[day];
  if(!list||!placeById(placeId))return;
  const item={uid:uid(),placeId,start:'',end:''};
  if(index===null||index<0||index>list.length)list.push(item);else list.splice(index,0,item);
  persist();renderLibrary();renderBoard();toast('일정에 추가했습니다.');
}
function addRouteToDay(routeId,day,index=null,memberIds=null){
  const list=currentSchedule()[day],g=routeById(routeId);
  if(!list||!g)return;
  const assigned=schedulePlaceIds();
  const ids=[...new Set(memberIds?.length?memberIds:selectedRouteIds(routeId))].filter(id=>g.placeIds.includes(id)&&!assigned.has(id));
  if(!ids.length){toast('추가 가능한 미배정 장소가 없습니다.');return;}
  const item={uid:uid(),routeId,memberIds:ids,start:'',end:'',expanded:false};
  if(index===null||index<0||index>list.length)list.push(item);else list.splice(index,0,item);
  persist();renderLibrary();renderBoard();toast('선택한 동선을 묶음으로 추가했습니다.');
}
function removeItem(itemId,day){
  const list=currentSchedule()[day];
  if(!list)return;
  const index=list.findIndex(x=>x.uid===itemId);
  if(index<0)return;
  const [removed]=list.splice(index,1);
  const placeIds=itemPlaceIds(removed);
  const remaining=schedulePlaceIds();
  const restored=placeIds.filter(id=>!remaining.has(id));
  lastRemoved={plan:state.activePlan,day,index,item:removed};
  persist();
  if(restored.length&&placeFilter==='assigned'){placeFilter='available';renderLibraryTabs();}
  renderLibrary(restored);renderBoard();
  toast(restored.length?'장소 목록으로 돌아왔습니다.':placeIds.length?'다른 일정에서 사용 중인 장소는 목록에 남지 않습니다.':'커스텀 일정을 삭제했습니다.',true);
}
function moveItem(itemId,from,to,targetIndex){
  const fromList=currentSchedule()[from],toList=currentSchedule()[to];
  if(!fromList||!toList)return;
  const idx=fromList.findIndex(x=>x.uid===itemId);
  if(idx<0)return;
  const [item]=fromList.splice(idx,1);
  let insertAt=targetIndex;
  // getDropIndex already excludes the dragged card: decrementing again shifts it left.
  insertAt=Math.max(0,Math.min(insertAt,toList.length));
  toList.splice(insertAt,0,item);
  persist();
  // Moving within the same day never changes assigned catalog data.
  if(from!==to&&placeFilter!=='available')renderLibrary();
  renderBoard();
}
function updateTime(itemId,day,key,value){const item=currentSchedule()[day].find(x=>x.uid===itemId);if(!item)return;item[key]=value;persist();renderBoard()}
function toggleRouteItem(itemId,day){const item=currentSchedule()[day].find(x=>x.uid===itemId);if(!item)return;item.expanded=!item.expanded;persist();renderBoard()}
function ungroupRoute(itemId,day){
  const list=currentSchedule()[day],idx=list?.findIndex(x=>x.uid===itemId);
  if(idx===undefined||idx<0)return;
  const item=list[idx],g=routeById(item.routeId);if(!g)return;
  const members=itemPlaceIds(item);
  if(!members.length)return;
  const children=members.map((id,i)=>({uid:uid(),placeId:id,start:i===0?(item.start||''):'',end:i===members.length-1?(item.end||''):''}));
  list.splice(idx,1,...children);
  persist();renderLibrary();renderBoard();toast('동선 묶음을 개별 장소로 풀었습니다.');
}
function hasRequiredMuseum(){return schedulePlaceIds().has('museum')}
function updateRequiredWarning(){document.getElementById('requiredWarning').classList.toggle('hidden',hasRequiredMuseum())}

function selectPlace(id){
  const p=placeById(id);if(!p)return;selectedPlace=p;
  const img=document.getElementById('detailImage');img.decoding='async';img.fetchPriority='high';img.src=p.image||FALLBACK;img.alt=`${p.title} 이미지`;img.onerror=()=>{img.onerror=null;img.src=FALLBACK};
  document.getElementById('detailPhotoNote').textContent=p.photoNote||'현장 참고 이미지';
  document.getElementById('detailTitle').textContent=p.title;document.getElementById('detailDesc').textContent=p.desc;const badges=placeBadges(p,true);badges.push(`<span class="mini-badge main">${escapeHtml(p.duration)}</span>`);badges.push(`<span class="mini-badge area">${escapeHtml(areaLabel(regionKey(p)))}</span>`);document.getElementById('detailBadges').innerHTML=badges.join('');
  document.getElementById('detailFacts').innerHTML=Object.entries(p.facts||{}).map(([k,v])=>`<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join('');
  const tipsSection=document.getElementById('detailTipsSection'),tips=document.getElementById('detailTips');tips.innerHTML=(p.tips||[]).map(t=>`<li>${escapeHtml(t)}</li>`).join('');tipsSection.classList.toggle('hidden',!(p.tips||[]).length);
  document.getElementById('detailFreshness').textContent=`${p.checkedAt||'2026-10'} 확인 기준 · 2027년 5월 방문 전 운영시간·예약·재고를 공식 페이지에서 재확인`;
  const note=document.getElementById('detailReservation'),rule=RESERVATION_RULES[p.id];note.innerHTML=rule?`${renderRequirementInline(p.id,'detail')}`:escapeHtml(p.reservation||'');note.classList.toggle('hidden',!(rule||p.reservation));note.classList.toggle('critical',rule?.level==='required');bindReservationToggles(note);
  const detailVote=document.getElementById('detailVote');detailVote.innerHTML=renderPlaceVote(p.id);bindPlaceVotes(detailVote);
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
function openCustomForDay(day){
  editingCustom=null;
  document.getElementById('customDialogTitle').textContent='커스텀 일정 추가';
  document.getElementById('customSubmit').textContent='추가';
  document.getElementById('customTitle').value='';document.getElementById('customMemo').value='';
  syncCustomDayOptions();const sel=document.getElementById('customDay');
  if(activeDays().includes(day))sel.value=day;
  document.getElementById('customDialog').showModal();
}
function openEditCustom(itemId,day){
  const item=currentSchedule()[day]?.find(x=>x.uid===itemId);
  if(!item||item.placeId||item.routeId)return;
  editingCustom={uid:itemId,day:day};
  document.getElementById('customDialogTitle').textContent='커스텀 일정 수정';
  document.getElementById('customSubmit').textContent='변경 저장';
  syncCustomDayOptions();document.getElementById('customDay').value=day;
  document.getElementById('customTitle').value=item.title||'';
  document.getElementById('customMemo').value=item.memo||'';
  document.getElementById('customDialog').showModal();
}
function addCustom(){
  const title=document.getElementById('customTitle').value.trim();
  if(!title){toast('일정 이름을 입력하세요.');return false;}
  const memo=document.getElementById('customMemo').value.trim(),day=document.getElementById('customDay').value;
  if(!activeDays().includes(day))return false;
  const wasEdit=!!editingCustom;
  if(editingCustom){
    const from=currentSchedule()[editingCustom.day],item=from?.find(x=>x.uid===editingCustom.uid);
    if(!item||item.placeId||item.routeId)return false;
    item.title=title;item.memo=memo;
    if(day!==editingCustom.day){from.splice(from.indexOf(item),1);currentSchedule()[day].push(item);}
  }else currentSchedule()[day].push({uid:uid(),title,memo,start:'',end:''});
  editingCustom=null;
  persist();renderBoard();toast(wasEdit?'커스텀 일정을 수정했습니다.':'직접 일정을 추가했습니다.');
  return true;
}

function setStartDay(day){state.activePlan=day==='12'?'use12':'start13';persist();renderLibrary();renderBoard();toast(day==='12'?'A · 12일 밤 출발 일정':'B · 13일 출발 일정')}
function undoLastRemoval(){
  if(!lastRemoved||lastRemoved.plan!==state.activePlan){toast('해당 일정안에서만 되돌릴 수 있습니다.');return;}
  const {day,index,item}=lastRemoved;lastRemoved=null;
  const list=currentSchedule()[day];if(!list)return;
  if(list.some(x=>x.uid===item.uid))return;
  list.splice(Math.min(index,list.length),0,item);
  persist();renderLibrary();renderBoard();toast('일정 삭제를 되돌렸습니다.');
}
function toast(msg,offerUndo=false){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  if(offerUndo){
    const btn=document.createElement('button');btn.type='button';btn.className='undo-toast-btn';btn.textContent='되돌리기';
    btn.onclick=undoLastRemoval;t.appendChild(btn);
  }
  clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),offerUndo?8000:2400);
}

// UI bindings
document.querySelectorAll('.start-btn').forEach(b=>b.onclick=()=>setStartDay(b.dataset.start));
document.getElementById('customForm').addEventListener('submit',e=>{e.preventDefault();if(e.submitter?.id!=='customSubmit')return;if(addCustom())document.getElementById('customDialog').close()});
document.querySelectorAll('#customDialog [data-custom-cancel]').forEach(btn=>btn.addEventListener('click',()=>{editingCustom=null;document.getElementById('customDialog').close()}));
document.getElementById('detailAddBtn').onclick=()=>{if(selectedPlace)openAddDialog({type:'place',id:selectedPlace.id})};
document.getElementById('detailCloseBtn').onclick=()=>document.getElementById('detailDialog').close();
document.getElementById('detailDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.querySelectorAll('[data-place-filter]').forEach(btn=>btn.onclick=()=>{
  placeFilter=btn.dataset.placeFilter;renderLibraryTabs();renderLibrary();
});
document.getElementById('placeSearch').addEventListener('input',e=>{placeSearch=e.target.value;renderLibrary()});
document.getElementById('jsonSaveBtn').onclick=saveJson;
document.getElementById('jsonBackupBtn').onclick=()=>{exportJsonBackup();document.querySelector('.data-menu').open=false;};
document.getElementById('jsonImportBtn').onclick=()=>document.getElementById('jsonImportFile').click();
document.getElementById('jsonImportFile').addEventListener('change',async e=>{
  const file=e.target.files?.[0];e.target.value='';
  document.querySelector('.data-menu').open=false;
  if(!file)return;
  if(dirty&&!confirm('현재 저장되지 않은 편집 내용이 있습니다. 먼저 JSON 백업을 하셨나요? 이 파일로 바꾸시겠습니까?'))return;
  await loadJsonFile(file);
});
window.addEventListener('beforeunload',e=>{if(!dirty)return;e.preventDefault();e.returnValue=''});
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveJson()}});

renderLibraryTabs();renderLibrary();renderBoard();setJsonStatus('공유 일정 연결 중','neutral');

// 공유 일정: 수정 중에는 자동 덮어쓰지 않습니다.
loadShared();
// 변경 사항은 최초 접속과 명시적인 저장 검증 시에만 조회합니다.
// 다른 브라우저의 변경 내용은 페이지를 새로고침하면 불러옵니다.
