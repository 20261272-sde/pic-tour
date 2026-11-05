// Pic-Tour 콘텐츠 편집 파일
// 사진 출처: 한국관광공사 한국관광콘텐츠랩
//
// ▸ images   : 사진 한 장 = 하나의 항목
//     kinds  : 풍경 분류. 한 화면에는 분류가 겹치지 않는 사진만 함께 나와요. (바다 여러 장, 산 여러 장 방지)
//     tone   : 대표 색감 (green 초록 · blue 파랑 · warm 붉은/주황/금빛 · pink 핑크·보라 · pastel 파스텔 · white 화이트 · night 야경).
//              한 화면에는 색감도 겹치지 않게 나와요. (단풍 여러 장, 노을 여러 장 방지)
//     w      : 이 사진을 고르면 더해지는 취향 유형 점수
//     views  : 질문 주제(t)별로 보여줄 부분과 문구
//              pos  = 보여줄 위치 ("가로% 세로%"),  zoom = 확대 배율 (pos 지점 기준)
//              v    = 계절/시간대 질문에서 쓰는 값 (한 화면에 같은 값이 겹치지 않음)
// ▸ photoQuestions : 사진 질문 은행. 매번 이 중 일부만 무작위로 출제돼요.
// ▸ fixedQuestions : 매번 나오는 질문(시간대·동행·일정). 문장은 여러 버전 중 무작위.
// ▸ destinations   : 최종 택1 후보 여행지
// 장소 정보·운영 정보는 출품 전 공식 자료로 한 번 더 확인하세요.

window.PIC_TOUR_DATA = {
  images: {
    saryeoni: { src: "images/saryeoni.jpg", credit: "이정수", tone: "green", kinds: ["green"], w: { forest: 3 }, views: [
      { t: "walk",  title: "삼나무 사이로 쭉 뻗은 데크길", sub: "걷기만 해도 머리가 맑아지는 숲뷰", pos: "50% 75%", zoom: 1.05 },
      { t: "rest",  title: "삼나무 숲 속 벤치 하나", sub: "알림 끄고 숲멍 30분", pos: "56% 58%", zoom: 2.2 },
      { t: "sound", title: "바람에 흔들리는 삼나무 숲", sub: "자연산 ASMR, 사각사각", pos: "50% 30%", zoom: 1.3 },
      { t: "keep",  title: "끝이 안 보이는 삼나무 숲", pos: "50% 45%", zoom: 1 }
    ]},
    chilgok: { src: "images/chilgok.jpg", credit: "김지호", tone: "green", kinds: ["green", "lake"], w: { forest: 2, meadow: 1 }, views: [
      { t: "color",  title: "물에 번진 봄 연두", sub: "FRESH GREEN · 눈이 맑아지는 색", pos: "50% 82%", zoom: 1.5 },
      { t: "doing",  title: "호숫가 데크 따라 느릿느릿", sub: "생각 비우는 저속 여행", pos: "28% 46%", zoom: 2.1 },
      { t: "season", v: "spring", title: "연두가 차오르는 봄", sub: "SPRING · 새순 시즌", pos: "50% 50%", zoom: 1 },
      { t: "keep",   title: "숲을 그대로 비춘 거울 호수", pos: "50% 50%", zoom: 1 }
    ]},
    gwangalli: { src: "images/gwangalli.jpg", credit: "박장용", tone: "blue", kinds: ["sea"], w: { ocean: 3, city: 1 }, views: [
      { t: "walk",   title: "맨발로 걷는 모래사장", sub: "BGM은 파도 소리로 충분", pos: "45% 92%", zoom: 1.6 },
      { t: "color",  title: "투명하게 일렁이는 바다 파랑", sub: "BLUE · 보기만 해도 시원", pos: "40% 70%", zoom: 2.2 },
      { t: "doing",  title: "패들보드 들고 바다로 직진", sub: "몸으로 노는 액티브 모드", pos: "84% 82%", zoom: 2.6 },
      { t: "sound",  title: "모래에 부서지는 잔잔한 파도", sub: "철썩, 쏴아 무한 반복", pos: "50% 75%", zoom: 1.4 },
      { t: "rest",   title: "파라솔 아래 모래사장", sub: "하루 종일 바다멍 확정", pos: "8% 82%", zoom: 2.2 },
      { t: "window", title: "커튼 열면 바다랑 다리가 한가득", sub: "OCEAN VIEW · 뷰 맛집", pos: "60% 50%", zoom: 1 },
      { t: "season", v: "summer", title: "햇살 쨍한 한여름 해변", sub: "SUMMER · 여름 그 자체", pos: "50% 60%", zoom: 1.2 },
      { t: "time",   v: "day", title: "해가 쨍쨍한 한낮의 해변", sub: "13:00 · 비타민D 충전", pos: "50% 60%", zoom: 1.2 },
      { t: "keep",   title: "바다 너머 빼곡한 스카이라인", pos: "50% 40%", zoom: 1.25 }
    ]},
    gamcheon: { src: "images/gamcheon.jpg", credit: "비디비디 스튜디오", tone: "pastel", kinds: ["village"], w: { village: 3, ocean: 0.5 }, views: [
      { t: "walk",   title: "알록달록 지붕 사이 언덕길", sub: "모퉁이 돌 때마다 새 포토스팟", pos: "55% 70%", zoom: 1.7 },
      { t: "color",  title: "언덕을 채운 파스텔 지붕", sub: "PASTEL · 필터 없이도 감성", pos: "72% 52%", zoom: 1.9 },
      { t: "doing",  title: "언덕 꼭대기에서 항구 내려다보기", sub: "숨은 뷰포인트 찾기 성공", pos: "15% 45%", zoom: 1.9 },
      { t: "window", title: "창밖으로 펼쳐진 색색의 지붕", sub: "VILLAGE VIEW · 동화 속 뷰", pos: "60% 60%", zoom: 1.3 },
      { t: "time",   v: "day", title: "골목마다 햇살 드는 오후", sub: "14:00 · 사진 잘 나오는 시간", pos: "60% 55%", zoom: 1.2 },
      { t: "keep",   title: "산비탈을 꽉 채운 색색의 마을", pos: "50% 50%", zoom: 1 }
    ]},
    gjGate: { src: "images/gongju-gate.jpg", credit: "장현호", tone: "warm", kinds: ["heritage"], w: { heritage: 3 }, views: [
      { t: "doing", title: "오래된 문 앞에서 TMI 상상하기", sub: "안내판 정독하는 여행", pos: "50% 45%", zoom: 1.15 },
      { t: "color", title: "붉은 문 위의 태극 문양", sub: "RED · BLUE · K-컬러", pos: "50% 52%", zoom: 1.6 }
    ]},
    gjHall: { src: "images/gongju-hall.jpg", credit: "장현호", tone: "green", kinds: ["heritage"], w: { heritage: 3 }, views: [
      { t: "walk", title: "기와 담장 따라 걷는 길", sub: "천 년 전으로 순간이동", pos: "92% 88%", zoom: 1.8 },
      { t: "rest", title: "잔디 마당이 보이는 담장 곁", sub: "역사 옆에서 멍때리기", pos: "40% 65%", zoom: 1.4 },
      { t: "keep", title: "초록 잔디 위 고요한 전각", pos: "50% 50%", zoom: 1 }
    ]},
    jeonju: { src: "images/jeonju-eaves.jpg", credit: "김찬영", tone: "warm", kinds: ["heritage"], w: { heritage: 2, village: 1 }, views: [
      { t: "color", title: "처마 끝 단청의 오방색", sub: "RED · GREEN · 원조 K-컬러", pos: "20% 30%", zoom: 1.35 },
      { t: "keep",  title: "파란 하늘 아래 단청 처마", pos: "50% 50%", zoom: 1 }
    ]},
    damyang: { src: "images/damyang.jpg", credit: "라이브스튜디오", tone: "warm", kinds: ["green"], w: { forest: 2, village: 1 }, views: [
      { t: "walk",   title: "주황빛 터널이 된 가로수길", sub: "걷기만 해도 뮤직비디오", pos: "50% 70%", zoom: 1.1 },
      { t: "color",  title: "늦가을 가로수의 주황", sub: "ORANGE · 따뜻한 필름 감성", pos: "50% 25%", zoom: 1.6 },
      { t: "season", v: "autumn", title: "가로수가 붉게 타는 가을", sub: "AUTUMN · 단풍 시즌", pos: "50% 50%", zoom: 1 },
      { t: "keep",   title: "끝없이 이어지는 메타세쿼이아 길", pos: "50% 50%", zoom: 1 }
    ]},
    sejong: { src: "images/sejong-arboretum.jpg", credit: "임현수", tone: "green", kinds: ["green"], w: { forest: 2, meadow: 1 }, views: [
      { t: "sound", title: "온실 속 작은 폭포 소리", sub: "백색소음 끝판왕", pos: "38% 55%", zoom: 1.4 },
      { t: "rest",  title: "초록 식물에 둘러싸인 온실", sub: "비 와도 일정 변경 없음", pos: "50% 50%", zoom: 1 },
      { t: "color", title: "열대 잎사귀의 싱그러운 초록", sub: "TROPICAL GREEN · 플랜테리어", pos: "80% 60%", zoom: 1.8 }
    ]},
    huibang: { src: "images/huibang-falls.jpg", credit: "윤석운", tone: "green", kinds: ["green", "mountain"], w: { forest: 2, summit: 1 }, views: [
      { t: "sound",  title: "계곡을 울리는 폭포 소리", sub: "에어컨보다 시원한 콸콸", pos: "50% 45%", zoom: 1.5 },
      { t: "doing",  title: "땀 흘려 올라가 만난 폭포", sub: "등산 인증샷까지 갓생", pos: "50% 50%", zoom: 1.15 },
      { t: "rest",   title: "물가 바위에 걸터앉기", sub: "계곡 바람 무제한", pos: "45% 80%", zoom: 1.6 },
      { t: "season", v: "summer", title: "초록이 진한 여름 계곡", sub: "SUMMER · 피서 모드", pos: "50% 50%", zoom: 1 }
    ]},
    seoulStation: { src: "images/seoul-station.jpg", credit: "안영관", tone: "night", kinds: ["city", "night"], w: { city: 3 }, views: [
      { t: "time",  v: "night", title: "불빛이 흐르는 도시의 밤", sub: "22:00 · 진짜 하루는 지금부터", pos: "50% 50%", zoom: 1 },
      { t: "color", title: "빛줄기로 물든 붉은 도로", sub: "NEON RED · 도파민 컬러", pos: "62% 72%", zoom: 1.7 },
      { t: "sound", title: "쉬지 않고 흐르는 도시의 소리", sub: "살아 있는 밤의 리듬", pos: "50% 50%", zoom: 1 },
      { t: "doing", title: "야경 스폿 찾아 밤 산책", sub: "해 지면 텐션 업", pos: "45% 45%", zoom: 1.2 }
    ]},
    sungnyemun: { src: "images/sungnyemun.jpg", credit: "안영관", tone: "blue", kinds: ["heritage", "city"], w: { city: 1.5, heritage: 1.5 }, views: [
      { t: "walk", title: "빌딩 숲 사이 옛 성문으로", sub: "600년을 오가는 도심 산책", pos: "50% 62%", zoom: 1.4 },
      { t: "time", v: "day", title: "햇살 아래 도심 속 성문", sub: "11:00 · 브런치 전 산책", pos: "50% 55%", zoom: 1.2 },
      { t: "keep", title: "고층 빌딩 사이에 선 숭례문", pos: "50% 55%", zoom: 1.2 }
    ]},
    yangeulsan: { src: "images/yangeulsan.jpg", credit: "정지훈", tone: "warm", kinds: ["mountain"], w: { summit: 3 }, views: [
      { t: "time",   v: "morning", title: "구름바다 위로 해가 뜨는 순간", sub: "05:40 · 일찍 일어난 사람만 보는 뷰", pos: "40% 50%", zoom: 1.2 },
      { t: "window", title: "창밖에 깔린 새벽 구름바다", sub: "SEA OF CLOUDS · 비현실 뷰", pos: "60% 55%", zoom: 1.1 },
      { t: "color",  title: "새벽 하늘의 오렌지·블루", sub: "DAWN · 그라데이션 장인", pos: "30% 30%", zoom: 1.6 },
      { t: "keep",   title: "구름 위에 떠 있는 새벽", pos: "50% 50%", zoom: 1 }
    ]},
    azalea: { src: "images/azalea-morning.jpg", credit: "백문규", tone: "pink", kinds: ["mountain"], w: { summit: 3, meadow: 0.5 }, views: [
      { t: "color",  title: "능선을 뒤덮은 철쭉 핑크", sub: "PINK · 산이 통째로 꽃밭", pos: "50% 85%", zoom: 1.6 },
      { t: "season", v: "spring", title: "산이 핑크로 물드는 봄", sub: "SPRING · 꽃 산행 시즌", pos: "50% 50%", zoom: 1 },
      { t: "doing",  title: "정상에서 해 뜨는 순간 맞이하기", sub: "새벽 4시 기상도 OK", pos: "35% 30%", zoom: 1.4 },
      { t: "time",   v: "morning", title: "꽃 능선 위로 해 뜨는 아침", sub: "05:30 · 오늘의 갓생 인증", pos: "35% 35%", zoom: 1.2 },
      { t: "keep",   title: "해 뜨는 철쭉 능선", pos: "50% 50%", zoom: 1 }
    ]},
    suwon: { src: "images/suwon-hwaseong.jpg", credit: "고요한", tone: "warm", kinds: ["heritage"], w: { heritage: 2, city: 1 }, views: [
      { t: "time", v: "sunset", title: "노을 지는 성곽 위 누각", sub: "19:20 · 하늘이 핑크로 바뀌는 시간", pos: "55% 50%", zoom: 1 },
      { t: "walk", title: "불 켜진 성곽길 따라 걷기", sub: "조선 성벽 위 야간 산책", pos: "30% 72%", zoom: 1.5 },
      { t: "keep", title: "도시와 성곽이 만나는 저녁", pos: "50% 50%", zoom: 1 }
    ]},
    yudalsan: { src: "images/yudalsan.jpg", credit: "정지훈", tone: "night", kinds: ["night", "sea"], w: { city: 2, ocean: 1, summit: 0.5 }, views: [
      { t: "time",   v: "night", title: "항구 불빛이 반짝이는 밤", sub: "21:30 · 야경 맛집 오픈", pos: "50% 50%", zoom: 1 },
      { t: "window", title: "창밖으로 보이는 항구 불빛", sub: "HARBOR VIEW · 밤에 더 예쁜 뷰", pos: "50% 30%", zoom: 1.3 },
      { t: "keep",   title: "불 켜진 항구 도시", pos: "50% 50%", zoom: 1 }
    ]},
    myeongdong: { src: "images/myeongdong-cathedral.jpg", credit: "김형민", tone: "night", kinds: ["city", "night"], w: { city: 2, village: 1 }, views: [
      { t: "walk", title: "불빛 따라 오르는 성당 언덕길", sub: "밤에 걸어야 완성되는 길", pos: "62% 70%", zoom: 1.3 },
      { t: "time", v: "night", title: "가로등 아래 성당 밤 산책", sub: "21:00 · 도심 속 고요 한 스푼", pos: "58% 45%", zoom: 1.1 },
      { t: "keep", title: "밤하늘 아래 붉은 벽돌 성당", pos: "58% 40%", zoom: 1.3 }
    ]},
    ranch: { src: "images/ranch-evening.jpg", credit: "황보달", tone: "warm", kinds: ["field"], w: { meadow: 3 }, views: [
      { t: "doing",  title: "양떼 사이를 어슬렁어슬렁", sub: "아무 계획 없는 게 계획", pos: "60% 75%", zoom: 1.4 },
      { t: "time",   v: "sunset", title: "황금빛으로 물드는 목장의 저녁", sub: "18:30 · 골든아워 확정", pos: "50% 50%", zoom: 1 },
      { t: "rest",   title: "양들이 풀 뜯는 언덕 잔디", sub: "돗자리 펴면 거기가 명당", pos: "40% 80%", zoom: 1.6 },
      { t: "sound",  title: "풀 뜯는 소리만 들리는 초원", sub: "자연이 틀어주는 힐링 플리", pos: "65% 70%", zoom: 1.3 },
      { t: "season", v: "autumn", title: "낙엽송이 황금빛으로 물든 가을", sub: "AUTUMN · 따스한 계절", pos: "55% 55%", zoom: 1.2 }
    ]},
    changgyeong: { src: "images/changgyeonggung.jpg", credit: "오한솔", tone: "warm", kinds: ["heritage", "night"], w: { heritage: 2.5, city: 0.5 }, views: [
      { t: "time", v: "sunset", title: "불 밝힌 궁궐의 해질녘", sub: "19:00 · 사극 속 한 장면", pos: "50% 50%", zoom: 1 },
      { t: "walk", title: "등불 켜진 궁궐 마당 거닐기", sub: "조선의 밤을 걷는 시간여행", pos: "50% 62%", zoom: 1.6 },
      { t: "keep", title: "노을 진 산 아래 고궁", pos: "50% 50%", zoom: 1 }
    ]},
    museum: { src: "images/kimbyungjong-museum.jpg", credit: "조영권", tone: "white", kinds: ["art"], w: { village: 3 }, views: [
      { t: "walk",  title: "물 위로 난 미술관 가는 길", sub: "입장 전부터 이미 작품", pos: "50% 88%", zoom: 1.6 },
      { t: "doing", title: "미술관에서 작품 감상", sub: "영감 충전하는 아트 트립", pos: "50% 55%", zoom: 1.1 },
      { t: "color", title: "새하얀 건축과 하늘색", sub: "WHITE · SKY · 미니멀 감성", pos: "38% 40%", zoom: 1.5 },
      { t: "time",  v: "day", title: "파란 하늘 아래 미술관 나들이", sub: "15:00 · 하늘이 다 한 시간", pos: "50% 50%", zoom: 1 },
      { t: "keep",  title: "하얀 미술관과 파란 하늘", pos: "50% 50%", zoom: 1 }
    ]},
    // 원본 사진 가운데에 워터마크가 있어 아래쪽만 잘라 사용해요.
    seoulDawn: { src: "images/seoul-dawn.jpg", credit: "송승욱", tone: "blue", kinds: ["city"], w: { city: 2, summit: 1 }, views: [
      { t: "time",   v: "morning", title: "강 위로 밝아오는 도시의 새벽", sub: "06:40 · 도시가 깨어나는 순간", pos: "50% 100%", zoom: 2.4 },
      { t: "window", title: "창밖으로 내려다보이는 강변 도시", sub: "RIVER VIEW · 시티뷰 원픽", pos: "40% 100%", zoom: 2.4 }
    ]},
    tea: { src: "images/tea-field.jpg", credit: "유지훈", tone: "green", kinds: ["field", "green"], w: { meadow: 3 }, views: [
      { t: "color",  title: "물결치는 차밭의 연두", sub: "LIME GREEN · 말차 컬러", pos: "50% 100%", zoom: 2.4 },
      { t: "doing",  title: "찻잎 향 가득한 이랑 걷기", sub: "천천히 스며드는 저속 여행", pos: "30% 100%", zoom: 2.4 },
      { t: "season", v: "spring", title: "새순 올라오는 봄 차밭", sub: "SPRING · 햇차 시즌", pos: "65% 100%", zoom: 2.4 },
      { t: "time",   v: "morning", title: "햇살 스미는 차밭의 아침", sub: "07:00 · 모닝 루틴 여행 버전", pos: "70% 100%", zoom: 2.4 }
    ]},
    meditation: { src: "images/meditation-lake.jpg", credit: "이모연", tone: "pink", kinds: ["lake"], w: { meadow: 2, forest: 1 }, views: [
      { t: "time",   v: "morning", title: "물안개 핀 호수의 새벽", sub: "06:10 · 세상에서 제일 조용한 시간", pos: "70% 50%", zoom: 1 },
      { t: "color",  title: "새벽 호수의 보랏빛 핑크", sub: "LAVENDER · 몽환 무드", pos: "40% 45%", zoom: 1.4 },
      { t: "rest",   title: "호숫가 나무 한 그루 곁", sub: "물멍하며 마음 정리", pos: "72% 50%", zoom: 1.6 },
      { t: "window", title: "창밖에 펼쳐진 고요한 호수", sub: "LAKE VIEW · 마음까지 잔잔", pos: "70% 50%", zoom: 1 },
      { t: "sound",  title: "아무 소리도 없는 새벽 호수", sub: "음소거 모드 ON", pos: "60% 55%", zoom: 1.2 },
      { t: "season", v: "winter", title: "앙상한 나무와 고요한 겨울 호수", sub: "WINTER · 비수기의 여유", pos: "70% 50%", zoom: 1 }
    ]},
    seonunsa: { src: "images/seonunsa.jpg", credit: "이모연", tone: "warm", kinds: ["mountain"], w: { summit: 2, heritage: 1 }, views: [
      { t: "season", v: "autumn", title: "산 전체가 물드는 가을", sub: "AUTUMN · 단풍 절정", pos: "50% 50%", zoom: 1 },
      { t: "color",  title: "단풍으로 불타는 산자락", sub: "AUTUMN RED · 가을 한정판", pos: "40% 80%", zoom: 1.5 },
      { t: "window", title: "창밖으로 보이는 단풍 든 산", sub: "MOUNTAIN VIEW · 숲뷰 > 오션뷰", pos: "50% 40%", zoom: 1.2 },
      { t: "keep",   title: "안개 깔린 단풍 계곡", pos: "50% 50%", zoom: 1 }
    ]},
    igari: { src: "images/igari-observatory.jpg", credit: "허영규", tone: "warm", kinds: ["sea"], w: { ocean: 2, summit: 1 }, views: [
      { t: "time",  v: "morning", title: "바다 위로 해 뜨는 전망대", sub: "06:00 · 일출 보고 소원 하나", pos: "45% 45%", zoom: 1 },
      { t: "doing", title: "바다 위 전망대 끝까지 걸어가기", sub: "발밑이 바다라 짜릿", pos: "30% 45%", zoom: 1.4 },
      { t: "sound", title: "갯바위에 부서지는 파도", sub: "속이 뻥 뚫리는 쏴아", pos: "60% 85%", zoom: 1.6 },
      { t: "keep",  title: "불타는 하늘 아래 바다 전망대", pos: "50% 50%", zoom: 1 }
    ]}
  },

  // 사진 질문 은행: 매 회차 이 중 4개를 무작위로 출제 (직전 회차에 나온 주제는 최대한 피함)
  photoQuestions: [
    { id: "walk",   count: 4, titles: ["지금 당장 걷고 싶은 길, 골라보세요", "운동화 끈 꽉 묶었어요. 어느 길로 갈까요?"], hint: "고민은 3초면 충분해요. 발이 먼저 가는 쪽으로!" },
    { id: "color",  count: 4, titles: ["이번 여행의 퍼스널 컬러는?", "여행 피드를 한 가지 색으로 채운다면?"], hint: "장소 말고 색감만 보고 골라보세요." },
    { id: "doing",  count: 4, titles: ["사진 속 주인공이 나라면, 뭐 하고 있을까요?", "여행 둘째 날 오후 3시, 나는 지금 어디서 뭐 하는 중?"], hint: "가장 나다운 장면을 상상해 보세요." },
    { id: "keep",   count: 6, titles: ["딱 한 장만 저장할 수 있다면?", "오늘부터 내 폰 배경화면, 뭘로 할까요?"], hint: "가장 오래 들여다보게 되는 한 장이 정답이에요." },
    { id: "sound",  count: 4, titles: ["눈 감으면 들렸으면 하는 여행 ASMR은?", "이어폰 빼고 듣고 싶은 소리, 골라주세요"], hint: "사진에서 소리가 난다고 상상해 보세요." },
    { id: "rest",   count: 4, titles: ["하루 종일 멍때려도 좋을 자리는?", "할 일 없는 하루, 어디 앉아 있을래요?"], hint: "숨이 제일 편하게 쉬어지는 곳으로." },
    { id: "window", count: 4, titles: ["숙소 커튼을 열었더니, 이 뷰였으면?", "숙소 고를 때 포기 못 하는 창밖 뷰는?"], hint: "아침에 커튼 여는 순간을 떠올려 보세요." },
    { id: "season", count: 4, distinct: true, titles: ["가장 설레는 계절 한 장면은?", "언제 떠날까요? 계절부터 정해봐요"], hint: "계절마다 한 장씩, 끌리는 쪽으로 골라보세요." }
  ],

  // 매 회차 나오는 질문 (문장은 버전 중 무작위)
  fixedQuestions: {
    time: { id: "time", kind: "photo", count: 4, distinct: true, styleKey: "time",
      titles: ["여행 중 제일 기다려지는 시간은?", "알람 없이 눈뜬 여행 첫날, 제일 기대되는 순간은?"],
      hint: "고른 시간이 티켓 탑승 시간으로 찍혀요." },
    comp: { id: "comp", kind: "mood",
      titles: ["이번 여행, 누구랑 갈래요?", "내 옆자리 탑승객은 누구?"],
      hint: "사진 고르기는 여기까지! 이제 여행 스타일만 정하면 돼요. 고른 동행은 티켓에 찍혀요.",
      choices: [
        { title: "혼행이 최고", sub: "내 속도대로, 내 맘대로", mood: { big: "혼행", icon: "🎧", small: "1 PASSENGER", bg: "linear-gradient(160deg,#e8efe6,#b6cdb5)", ink: "#25392b" }, w: { forest: 1, summit: 1 }, style: { comp: "solo" } },
        { title: "둘이서 오붓하게", sub: "같은 풍경, 같은 추억", mood: { big: "둘이", icon: "💞", small: "2 PASSENGERS", bg: "linear-gradient(160deg,#ffe1dc,#f3a6a0)", ink: "#4a1f22" }, w: { ocean: 1, city: 1 }, style: { comp: "couple" } },
        { title: "찐친들이랑 우르르", sub: "단톡방이 바빠지는 여행", mood: { big: "찐친", icon: "🎉", small: "3+ PASSENGERS", bg: "linear-gradient(160deg,#fff1c7,#f6c65b)", ink: "#4a3609" }, w: { village: 1, city: 1 }, style: { comp: "friends" } },
        { title: "가족 다 같이", sub: "3대가 함께 가는 효도 여행", mood: { big: "가족", icon: "🏡", small: "ALL ABOARD", bg: "linear-gradient(160deg,#dde9fb,#9cbbe8)", ink: "#1c3150" }, w: { meadow: 1, heritage: 1 }, style: { comp: "family" } }
      ] },
    pace: { id: "pace", kind: "mood",
      titles: ["여행 계획, 나는 J예요 P예요?", "여행 전날 밤, 내 메모장 상태는?"],
      hint: "마지막 질문이에요. 추천 코스를 내 계획 스타일에 맞춰 드릴게요.",
      choices: [
        { title: "엑셀 일정표까지 만드는 극J", sub: "동선, 맛집, 웨이팅 시간까지 완벽 정리", mood: { big: "극J", icon: "📋", small: "09:00 → 21:00", bg: "linear-gradient(160deg,#eef0f4,#c4cad6)", ink: "#1f2633" }, w: { heritage: 1, city: 1 }, style: { pace: "plan" } },
        { title: "큰 틀만 짜는 반J반P", sub: "꼭 갈 곳만 찜, 나머진 그때그때", mood: { big: "반J반P", icon: "🧭", small: "2–3 SPOTS / DAY", bg: "linear-gradient(160deg,#f0ebe1,#d8c8a8)", ink: "#3a2f1c" }, w: { forest: 1, village: 1 }, style: { pace: "balance" } },
        { title: "발길 닿는 대로 극P", sub: "계획? 그게 뭔데요", mood: { big: "극P", icon: "🎈", small: "NO SCHEDULE", bg: "linear-gradient(160deg,#e3f3f1,#97d1c9)", ink: "#12403b" }, w: { ocean: 1, meadow: 1 }, style: { pace: "free" } }
      ] }
  },

  finalRound: {
    tag: "FINAL · 최종 목적지",
    title: "최종 결정! 이번 여행지는 딱 한 곳",
    hint: "내 취향 저격 후보 3곳이에요. 분위기가 서로 달라서 더 고민될 거예요. 고르는 순간 바로 발권!"
  },

  // tagline: 결과 화면 유형 카드에 들어가는 한 줄 소개
  types: {
    forest:   { name: "숲결 산책자", en: "Forest Walker",    code: "FW", color: "#3f7d5c", keywords: ["숲뷰", "숲멍", "저속여행", "회복"],
                tagline: "오션뷰보다 숲뷰, 피톤치드로 충전하는 타입",
                description: "북적이는 핫플보다 나무 사이 조용한 길에서 진짜 쉼을 느껴요. 걷고, 듣고, 아무것도 안 하는 시간이 이 타입에게는 최고의 일정이에요. 여행이 끝나면 몸보다 마음이 먼저 가벼워져 있을 거예요." },
    ocean:    { name: "윤슬 자유인", en: "Sea Breezer",      code: "SB", color: "#2a7fc1", keywords: ["바다멍", "오션뷰", "즉흥", "햇살"],
                tagline: "바다만 보이면 텐션 회복, 계획은 파도에 맡기는 타입",
                description: "탁 트인 수평선과 바람만 있으면 충분해요. 정해진 코스보다 그날 날씨와 기분 따라 움직이고, 예상 못 한 순간을 여행의 하이라이트로 만들어요. 반짝이는 윤슬 앞에서 바다멍 때리는 시간이 이 타입의 진짜 일정이에요." },
    heritage: { name: "시간 수집가", en: "Time Collector",   code: "TC", color: "#b5482f", keywords: ["K-헤리티지", "안내판 정독", "이야기", "깊이"],
                tagline: "안내판 정독은 기본, 장소의 TMI까지 모으는 타입",
                description: "오래된 문, 기와 한 장에도 담긴 이야기를 알게 될 때 설레요. 사진만 찍고 지나가기보다 천천히 읽고 상상하면서 여행지를 내 것으로 만들어요. 다녀오면 친구들한테 들려줄 얘기가 제일 많은 타입이에요." },
    village:  { name: "감성 발견가", en: "Artful Explorer",  code: "AE", color: "#d4862b", keywords: ["포토스팟", "골목", "건축", "아트트립"],
                tagline: "골목 끝 숨은 포토스팟 찾기 장인",
                description: "지도에 없는 골목 모퉁이와 공간의 디테일에서 영감을 받아요. 알록달록한 벽, 하얀 미술관, 우연히 마주친 풍경까지 다 사진첩에 모아요. 이 타입의 여행 피드는 늘 저장 수가 많아요." },
    city:     { name: "도시 낭만가", en: "City Romantic",    code: "CR", color: "#5a4fb3", keywords: ["야경", "도시감성", "불빛", "밤산책"],
                tagline: "해 지면 텐션 업, 야경 수집하는 타입",
                description: "진짜 여행은 해가 진 뒤에 시작돼요. 반짝이는 불빛, 도시의 활기, 낮과 밤이 완전히 다른 얼굴을 가진 곳에서 에너지를 얻어요. 이 타입의 여행 사진은 대부분 밤에 찍혀 있어요." },
    summit:   { name: "새벽 능선가", en: "Dawn Climber",     code: "DC", color: "#c2557a", keywords: ["일출", "갓생", "운해", "정상뷰"],
                tagline: "새벽 4시 알람도 OK, 일출로 하루를 여는 갓생러",
                description: "조금 일찍 일어나고, 조금 더 높이 올라가는 수고를 즐겨요. 능선 위에서 맞는 해, 발아래 깔린 구름바다가 그 수고를 몇 배로 돌려줘요. 남들 잘 때 이미 오늘의 하이라이트를 찍고 내려오는 타입이에요." },
    meadow:   { name: "초원 소풍가", en: "Meadow Picnicker", code: "MP", color: "#6f8f2a", keywords: ["아보하", "돗자리", "느긋함", "골든아워"],
                tagline: "돗자리 펴면 거기가 명당, 아주 보통의 하루를 사랑하는 타입",
                description: "넓은 들판에 앉아 바람에 흔들리는 풀과 천천히 지는 해를 보는 게 최고의 일정이에요. 대단한 이벤트보다 별일 없는 하루가 주는 행복을 아는 타입이에요. 이 타입에게는 빈 일정도 계획의 일부예요." }
  },

  styleLabels: {
    time: { morning: "06:30 새벽형", day: "13:00 한낮형", sunset: "18:40 골든아워", night: "22:00 야행성" },
    comp: { solo: "혼행", couple: "둘이서", friends: "찐친들과", family: "가족과" },
    pace: { plan: "극J 플랜", balance: "반J반P", free: "극P 모드" }
  },

  paceTips: {
    plan: "J의 완벽한 계획에 빈틈 하나만 넣어보세요. 동선마다 이동 시간을 30분씩 넉넉히 잡고, 운영 시간과 휴무일은 전날 한 번 더 체크!",
    balance: "꼭 갈 곳 2~3곳만 찜해두고 나머지는 그날 기분대로 채우세요. 제일 가고 싶은 곳을 오전에 넣으면 오후가 편해져요.",
    free: "P라도 숙소와 돌아오는 교통편은 미리 잡아두기! 그것만 있으면 나머지는 즉흥으로 채워도 다 추억이 돼요."
  },
  compTips: {
    solo: "혼행이라면 사람 적은 이른 시간이 명당이에요. 이어폰은 잠깐 빼고 그곳 소리를 들어보세요.",
    couple: "둘만의 인생샷 스폿을 하나 정하고, 같은 자리에서 서로 찍어주기. 나중에 나란히 놓고 보면 더 예뻐요.",
    friends: "길잡이, 사진 담당, 맛집 담당처럼 역할을 나눠보세요. 단톡방 정산 담당까지 정하면 끝!",
    family: "어르신, 아이와 함께라면 걷는 구간 중간에 쉴 곳을 미리 체크해 두세요. 모두의 속도에 맞춘 여행이 최고예요."
  },

  // img: 대표 사진 키 (images의 kinds가 최종 후보 3곳의 분위기 중복을 막는 데 쓰여요)
  destinations: [
    { id: "saryeoni", name: "사려니숲길", en: "Saryeoni Forest", code: "CJU", region: "제주특별자치도",
      img: "saryeoni", w: { forest: 3, meadow: 0.5 }, fit: { comp: ["solo", "couple"], pace: ["free", "balance"] },
      line: "제주는 바다만 있는 게 아니에요, 숲뷰 원탑",
      description: "곧게 뻗은 삼나무와 붉은 화산송이 흙길이 이어지는 제주의 대표 숲길이에요. 숲 사이를 걷기만 해도 머리가 맑아지는 경험을 할 수 있어요.",
      course: ["숲길 입구에서 천천히 걷기 시작", "삼나무 숲 구간에서 잠깐 멈춰 숲멍", "근처 붉은오름·교래리 일대로 이어가기"],
      bestTime: "사람 적은 이른 오전", bring: "편한 운동화, 얇은 겉옷", walk: "숲길 걷기 위주" },
    { id: "chilgok", name: "국립칠곡숲체원", en: "Chilgok Forest", code: "CGK", region: "경상북도 칠곡군",
      img: "chilgok", w: { forest: 2.5, meadow: 1.5 }, fit: { comp: ["family", "solo"], pace: ["plan", "balance"] },
      line: "물빛까지 연두인 숲속 힐링 스테이",
      description: "숲속 데크길과 잔잔한 호수가 어우러진 산림 휴양·교육 공간이에요. 산림 체험 프로그램과 숙박 시설이 있어 가족과 함께 머물기 좋아요.",
      course: ["호숫가 데크길 산책", "산림 교육·치유 프로그램 참여 (사전 예약 확인)", "숲속 숙소에서 하룻밤 쉬어가기"],
      bestTime: "신록 오르는 봄 오전", bring: "운동화, 프로그램 예약 확인", walk: "완만한 데크길" },
    { id: "damyang", name: "담양 메타세쿼이아길", en: "Damyang Metasequoia Road", code: "DYG", region: "전라남도 담양군",
      img: "damyang", w: { forest: 2, village: 1, meadow: 1 }, fit: { comp: ["couple", "friends"], pace: ["free", "balance"] },
      line: "걷기만 해도 뮤비 한 편 나오는 나무 터널",
      description: "하늘 높이 뻗은 메타세쿼이아가 양옆으로 늘어서 터널을 만드는 가로수길이에요. 여름엔 초록, 늦가을엔 주황으로 물들어서 걷기만 해도 영화 속 장면이 돼요.",
      course: ["메타세쿼이아 가로수길 천천히 걷기", "바로 옆 메타프로방스 구경", "담양 죽녹원 대나무숲으로 이어가기"],
      bestTime: "늦가을 오후", bring: "편한 신발, 카메라", walk: "평지 가로수길" },
    { id: "sejong", name: "국립세종수목원", en: "Sejong National Arboretum", code: "SJA", region: "세종특별자치시",
      img: "sejong", w: { forest: 2, meadow: 2 }, fit: { comp: ["family", "couple"], pace: ["plan", "balance"] },
      line: "비 와도 일정 변경 없는 초록 온실",
      description: "사계절전시온실과 여러 주제 정원을 갖춘 도심 속 수목원이에요. 온실 안은 계절, 날씨와 상관없이 초록이 가득해서 비 오는 날에도 좋아요.",
      course: ["사계절전시온실에서 열대·지중해 식물 보기", "한국전통정원 산책", "세종호수공원으로 이어가기"],
      bestTime: "비 오는 날도 OK", bring: "가벼운 옷차림, 휴관일 확인", walk: "평지 정원 산책" },
    { id: "huibang", name: "희방폭포", en: "Huibang Falls", code: "YJU", region: "경상북도 영주시",
      img: "huibang", w: { forest: 2, summit: 2 }, fit: { comp: ["solo", "friends"], pace: ["plan", "balance"] },
      line: "땀 흘린 만큼 시원해지는 소백산 비밀 폭포",
      description: "소백산국립공원 자락, 짙은 숲 사이로 물줄기가 쏟아지는 폭포예요. 계곡 따라 오르는 길 끝에서 만나는 물소리가 한여름 더위를 싹 잊게 해줘요.",
      course: ["희방사 방면 탐방로 오르기", "희방폭포 앞에서 물멍", "체력 남으면 연화봉 방향 산행 (등산 준비 필수)"],
      bestTime: "녹음 짙은 여름 오전", bring: "등산화, 물, 여벌 양말", walk: "계곡 오르막·돌길" },
    { id: "gwangalli", name: "광안리해수욕장", en: "Gwangalli Beach", code: "PUS", region: "부산광역시 수영구",
      img: "gwangalli", w: { ocean: 3, city: 2.4 }, fit: { comp: ["couple", "friends"], pace: ["free", "balance"] },
      line: "낮엔 바다멍, 밤엔 야경멍, 하루 두 번 반하는 해변",
      description: "고운 모래사장 너머로 광안대교와 스카이라인이 펼쳐지는 부산의 해변이에요. 낮에는 해변과 해양 레저를, 밤에는 다리 위 야경을 즐길 수 있어요.",
      course: ["한낮: 해변 산책과 해양 레저", "해질녘: 민락수변공원 쪽에서 노을 보기", "밤: 광안대교 야경 감상 (드론쇼 일정은 미리 확인)"],
      bestTime: "해질녘부터 밤까지", bring: "선크림, 여벌 옷", walk: "평지 해변" },
    { id: "igari", name: "이가리 닻 전망대", en: "Igari Anchor Observatory", code: "PHG", region: "경상북도 포항시",
      img: "igari", w: { ocean: 2.5, summit: 1.5 }, fit: { comp: ["couple", "solo"], pace: ["free", "balance"] },
      line: "발밑이 바다인 동해 일출 명당",
      description: "닻 모양으로 바다 위에 길게 뻗은 동해안의 전망대예요. 발아래 부서지는 파도와 수평선 위로 떠오르는 해를 가장 가까이에서 볼 수 있어요.",
      course: ["이른 아침 전망대에서 일출 보기", "갯바위 해안 풍경 감상", "포항 동해안 해안도로 드라이브"],
      bestTime: "일출 시간", bring: "바람막이, 따뜻한 음료", walk: "짧은 전망대 산책" },
    { id: "gamcheon", name: "감천문화마을", en: "Gamcheon Culture Village", code: "GCV", region: "부산광역시 사하구",
      img: "gamcheon", w: { village: 3, ocean: 0.8, city: 0.8 }, fit: { comp: ["friends", "couple"], pace: ["free", "balance"] },
      line: "골목마다 포토스팟, 저장각 나오는 색색 마을",
      description: "산자락을 따라 알록달록한 집들이 층층이 이어진 마을이에요. 좁은 골목과 계단, 곳곳의 예술 작품과 전망 포인트를 찾아다니는 재미가 있어요.",
      course: ["마을 안내소에서 골목 지도 챙기기", "골목 전망 포인트·포토존 따라 걷기", "부산 원도심(남포동·자갈치시장)으로 이어가기"],
      bestTime: "맑은 날 오후", bring: "계단에 편한 신발", walk: "오르막·계단 많음" },
    { id: "museum", name: "남원시립김병종미술관", en: "Kim Byung-jong Art Museum", code: "NWN", region: "전북특별자치도 남원시",
      img: "museum", w: { village: 3, meadow: 0.6 }, fit: { comp: ["solo", "couple"], pace: ["balance", "plan"] },
      line: "건물부터 작품인 물 위의 하얀 미술관",
      description: "노출 콘크리트 건축과 잔잔한 수공간이 어우러진 미술관이에요. 작품 감상은 물론, 건물과 하늘이 만드는 장면 자체가 하나의 작품처럼 느껴져요.",
      course: ["미술관 전시 관람", "물 위 산책로에서 건축 사진 남기기", "남원 광한루원으로 이어가기"],
      bestTime: "하늘 파란 오후", bring: "가벼운 가방, 휴관일 확인", walk: "평지 짧은 산책" },
    { id: "gongju", name: "공주 무령왕릉과 왕릉원", en: "Gongju Royal Tombs", code: "GJU", region: "충청남도 공주시",
      img: "gjHall", w: { heritage: 3, forest: 0.8 }, fit: { comp: ["family", "solo"], pace: ["plan", "balance"] },
      line: "1,500년 전 백제로 떠나는 초록 언덕 산책",
      description: "유네스코 세계유산 '백제역사유적지구'에 속한 백제 왕릉군이에요. 잔디 언덕과 소나무 숲 사이를 걸으며 1,500년 전 백제의 이야기를 만날 수 있어요.",
      course: ["왕릉원 산책과 전시관 관람", "국립공주박물관에서 출토 유물 보기", "공산성 성곽길에서 금강 바라보기"],
      bestTime: "선선한 오전", bring: "모자, 편한 신발", walk: "완만한 언덕길" },
    { id: "jeonju", name: "전주 풍패지관", en: "Jeonju Gaeksa", code: "JJU", region: "전북특별자치도 전주시",
      img: "jeonju", w: { heritage: 2.4, village: 1.8, city: 1 }, fit: { comp: ["friends", "couple"], pace: ["plan", "balance"] },
      line: "단청 처마 아래, 객리단길 감성 한 바퀴",
      description: "조선시대 손님을 맞이하던 객사(전주객사)로, 화려한 단청과 웅장한 지붕이 인상적인 곳이에요. 주변 골목과 한옥마을까지 걸어서 이어지는 도심 속 전통 여행지예요.",
      course: ["풍패지관 처마와 단청 감상", "객사 주변 골목 카페 산책", "전주한옥마을·경기전으로 이어 걷기"],
      bestTime: "하늘 파란 오후", bring: "가벼운 가방", walk: "평지 도심 산책" },
    { id: "suwon", name: "수원화성", en: "Suwon Hwaseong", code: "SWN", region: "경기도 수원시",
      img: "suwon", w: { heritage: 2.5, city: 1.2 }, fit: { comp: ["friends", "family"], pace: ["plan", "balance"] },
      line: "가볍게 떠나는 유네스코 성곽 노을 산책",
      description: "도심을 따라 이어지는 조선 후기의 성곽으로, 유네스코 세계유산이에요. 낮엔 성곽길을 걷고, 해 질 녘엔 조명 켜진 성벽과 누각이 또 다른 풍경을 보여줘요.",
      course: ["성곽길 따라 걷기", "화성행궁 둘러보기", "해 질 녘 성곽 야경 감상"],
      bestTime: "해질녘", bring: "편한 운동화", walk: "성곽 오르막 일부" },
    { id: "changgyeong", name: "창경궁", en: "Changgyeonggung Palace", code: "CGG", region: "서울특별시 종로구",
      img: "changgyeong", w: { heritage: 3, city: 1 }, fit: { comp: ["couple", "family"], pace: ["plan", "balance"] },
      line: "해 지면 사극 세트장이 되는 서울 한복판 궁궐",
      description: "북한산 능선을 배경으로 전각들이 이어지는 조선의 궁궐이에요. 해가 지면 전각에 불이 켜지면서 낮과는 전혀 다른, 고요하고 따뜻한 분위기가 돼요.",
      course: ["궁궐 전각 둘러보기", "대온실(식물원) 들르기", "창덕궁·종묘 등 주변 궁궐로 이어가기"],
      bestTime: "해질녘 (야간 관람 운영 여부 확인)", bring: "편한 신발", walk: "평지 궁궐 산책" },
    { id: "sungnyemun", name: "숭례문", en: "Sungnyemun Gate", code: "SNM", region: "서울특별시 중구",
      img: "sungnyemun", w: { heritage: 1.8, city: 2.2 }, fit: { comp: ["friends", "solo"], pace: ["plan", "free"] },
      line: "빌딩 숲 한가운데, 600년 차 서울 터줏대감",
      description: "고층 빌딩 사이에 서 있는 서울 도성의 남쪽 정문이에요. 옛것과 새것이 한 장면에 담기는 서울 도심 여행의 출발점으로 좋아요.",
      course: ["숭례문 둘러보기", "서울로7017 공중 보행길 걷기", "남대문시장 구경"],
      bestTime: "맑은 날 오전", bring: "가벼운 가방", walk: "평지 도심 산책" },
    { id: "myeongdong", name: "명동성당", en: "Myeongdong Cathedral", code: "MDC", region: "서울특별시 중구",
      img: "myeongdong", w: { city: 2.4, village: 1.2, heritage: 1 }, fit: { comp: ["couple", "solo"], pace: ["free", "balance"] },
      line: "북적이는 명동 속 고요 한 스푼, 붉은 벽돌 성당",
      description: "우리나라 최초의 벽돌조 고딕 양식 성당으로 알려진 곳이에요. 밤이 되면 은은한 조명 아래 붉은 벽돌과 첨탑이 도심 속 고요한 쉼표가 돼요.",
      course: ["성당 언덕 산책 (미사 시간엔 조용히)", "명동 거리 구경", "남산서울타워로 이어서 야경 보기"],
      bestTime: "저녁~밤", bring: "편한 신발", walk: "완만한 언덕길" },
    { id: "mokpo", name: "목포 유달산", en: "Mokpo Yudalsan", code: "MKP", region: "전라남도 목포시",
      img: "yudalsan", w: { city: 1.8, ocean: 1.5, summit: 1.8 }, fit: { comp: ["couple", "friends"], pace: ["balance", "free"] },
      line: "항구 야경 맛집, 낭만 항구 도시의 전망대",
      description: "목포 원도심과 항구, 바다 건너 섬까지 한눈에 내려다보이는 산이에요. 해가 지면 항구와 골목에 불이 켜지면서 반짝이는 야경이 펼쳐져요.",
      course: ["유달산 전망대 오르기", "목포해상케이블카 타기", "원도심 근대역사거리 야경 산책"],
      bestTime: "해질녘~밤", bring: "편한 운동화, 겉옷", walk: "계단·오르막 있음" },
    { id: "seonunsa", name: "고창 선운사", en: "Seonunsa Temple", code: "GCH", region: "전북특별자치도 고창군",
      img: "seonunsa", w: { summit: 2, heritage: 1.5, forest: 1 }, fit: { comp: ["family", "solo"], pace: ["balance", "free"] },
      line: "가을엔 단풍, 봄엔 동백, 계절 한정판 산사",
      description: "도솔산 자락에 자리한 오래된 절이에요. 가을이면 계곡과 산 전체가 붉게 물들고, 봄에는 동백숲이 피어나요. 아침 안개가 깔린 풍경이 특히 아름다워요.",
      course: ["선운사 경내 둘러보기", "도솔천 따라 단풍길 걷기", "도솔암 방향 산책 (체력에 맞게)"],
      bestTime: "가을 이른 아침", bring: "편한 신발, 겉옷", walk: "완만한 계곡길" }
  ]
};
