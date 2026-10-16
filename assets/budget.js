// 2026-10-16 fee research. 'assumption' prices are NOT verified future ticket fares.
// Confirm official fares again for May 2027. Travel segments are configured separately.
window.TRIP_BUDGET_DEFAULTS = {
  "checkedAt": "2026-10-16",
  "priceGuide": {
    "museum": {
      "category": "admission",
      "yen": 3300,
      "confidence": "official",
      "note": "성인 입장료. 2027년 가격 재확인 필요",
      "source": "https://museum.nintendo.com/en/guide/index.html"
    },
    "byodoin": {
      "category": "admission",
      "yen": 700,
      "confidence": "official",
      "note": "성인 정원+뮤지엄. 봉황당 내부 별도 ¥300",
      "source": "https://www.byodoin.or.jp/en/guide/"
    },
    "kyotomanga": {
      "category": "admission",
      "yen": 1200,
      "confidence": "official",
      "note": "성인 입장료. 2027년 가격 재확인 필요",
      "source": "https://kyotomm.jp/en/opentime-cost/"
    },
    "usj": {
      "category": "admission",
      "yen": 10500,
      "confidence": "assumption",
      "note": "임시 예산 평균 가정(공식 판매 시작가 ¥8,400, 날짜별 변동). 2027-05-15 미확정",
      "source": "https://www.usjticketing.com/?hl=ko-KR"
    },
    "snw": {
      "category": "admission",
      "yen": 0,
      "confidence": "included",
      "note": "USJ 입장권 비용은 USJ 카드로만 계상. 확약권·익스프레스 추가비 미포함",
      "source": "https://www.usj.co.jp/web/en/us/areas/super-nintendo-world"
    },
    "haruka": {
      "category": "transport",
      "yen": 2200,
      "confidence": "conditional",
      "note": "외국인용 KIX→교토 편도 HARUKA 티켓, 이용 자격·구간 확인",
      "source": "https://www.westjr.co.jp/travel-information/kr/tickets-passes/oneway/haruka/"
    },
    "ninosaka": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "공식 매장 쇼핑비는 별도. 입장 자체는 무료 가정",
      "source": ""
    },
    "pkmosaka": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "ninkyoto": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "pkmkyoto": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "shinsaibashi": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "kirbystore": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "superpotato": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    },
    "capcomumeda": {
      "category": "admission",
      "yen": 0,
      "confidence": "free_store",
      "note": "쇼핑비 제외",
      "source": ""
    }
  },
  "assumptions": {
    "mealJPY": 1500,
    "teaJPY": 750
  },
  "transportation": [
    "walk",
    "train",
    "bus",
    "taxi",
    "other"
  ]
};
