const DATA = window.PIC_TOUR_DATA;
const TYPE_KEYS = Object.keys(DATA.types);
const PHOTO_ROUNDS = 4;            // 질문 은행에서 매번 뽑는 사진 질문 수 (+ 시간대·동행·일정 = 총 7라운드)
const RECENT_KEY = "pictour_recent";
const LABELS = { walk: "길", color: "색", doing: "장면", keep: "한 장면", sound: "소리", rest: "쉼", window: "창밖", season: "계절", time: "시간", comp: "동행", pace: "일정" };
const KIND_LABELS = { green: "숲", sea: "바다", mountain: "산", heritage: "전통", city: "도시", night: "야경", field: "들판", lake: "호수", art: "예술", village: "마을" };
const VALUE_ORDER = ["morning", "day", "sunset", "night", "spring", "summer", "autumn", "winter"];
const $ = (id) => document.getElementById(id);

const state = { step: 0, rounds: [], picks: [], scores: {}, style: {}, dest: null, name: "" };
let incoming = null;
let advancing = false;

/* ---------- 공통 ---------- */
function showScreen(id) {
  ["intro", "quiz", "result"].forEach((s) => $(s).classList.toggle("hidden", s !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const pad = (n, len = 2) => String(n).padStart(len, "0");
const imgSrc = (key) => DATA.images[key].src;
// 한 화면에서 겹치면 안 되는 특징: 풍경 분류 + 대표 색감
const looks = (key) => [...DATA.images[key].kinds, "tone:" + DATA.images[key].tone];
const pct = (m) => Math.round(m * 100) + "%";
function hash(str) { let h = 7; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
function today() { const d = new Date(); return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`; }
function loadRecent() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || {}; } catch (e) { return {}; } }
function saveRecent(r) { try { localStorage.setItem(RECENT_KEY, JSON.stringify(r)); } catch (e) {} }

/* ---------- 질문 출제 ---------- */
// 직전 회차에 나온 주제·문장은 최대한 피해서 이번 회차 질문을 구성
function buildQuiz() {
  const recent = loadRecent();
  const lastThemes = recent.themes || [];
  const lastTitles = recent.titles || {};
  const fresh = shuffle(DATA.photoQuestions.filter((q) => !lastThemes.includes(q.id)));
  const seen = shuffle(DATA.photoQuestions.filter((q) => lastThemes.includes(q.id)));
  const photoQs = [...fresh, ...seen].slice(0, PHOTO_ROUNDS);

  const F = DATA.fixedQuestions;
  const order = shuffle([...photoQs, F.time]);
  order.splice(2, 0, F.comp);   // 사진 질문 사이사이에 동행·일정 질문 배치
  order.splice(5, 0, F.pace);

  const titles = { ...lastTitles };
  const usedImgs = new Set();
  const rounds = order.map((q, i) => {
    let ti = Math.floor(Math.random() * q.titles.length);
    if (q.titles.length > 1 && ti === lastTitles[q.id]) ti = (ti + 1) % q.titles.length;
    titles[q.id] = ti;
    return {
      tag: `SCENE ${pad(i + 1)} · ${LABELS[q.id] || ""}`,
      title: q.titles[ti],
      hint: q.hint,
      choices: q.choices ? shuffle(q.choices) : pickViews(q, usedImgs)
    };
  });
  saveRecent({ themes: photoQs.map((q) => q.id), titles });
  return rounds;
}
// 한 화면에 풍경 분류·색감이 겹치지 않고, 이전 라운드에 나온 사진은 되도록 다시 쓰지 않게 선택
function pickViews(q, usedImgs) {
  const pool = [];
  Object.entries(DATA.images).forEach(([key, img]) => img.views.forEach((v) => {
    if (v.t === q.id) pool.push({ ...v, img: key, kinds: looks(key), w: img.w, style: q.styleKey ? { [q.styleKey]: v.v } : null });
  }));
  const want = q.distinct ? Math.min(q.count, new Set(pool.map((v) => v.v)).size) : q.count;
  let best = [];
  for (let attempt = 0; attempt < 150 && best.length < want; attempt++) {
    const avoidUsed = attempt < 80;
    const chosen = [], kinds = new Set(), vals = new Set();
    for (const v of shuffle(pool)) {
      if (chosen.some((c) => c.img === v.img)) continue;
      if (avoidUsed && usedImgs.has(v.img)) continue;
      if (v.kinds.some((k) => kinds.has(k))) continue;
      if (q.distinct && vals.has(v.v)) continue;
      chosen.push(v); v.kinds.forEach((k) => kinds.add(k)); vals.add(v.v);
      if (chosen.length === want) break;
    }
    if (chosen.length > best.length) best = chosen;
  }
  best.forEach((v) => usedImgs.add(v.img));
  if (q.distinct) best.sort((a, b) => VALUE_ORDER.indexOf(a.v) - VALUE_ORDER.indexOf(b.v));
  return best;
}

/* ---------- 점수 계산 ---------- */
function recompute() {
  state.scores = Object.fromEntries(TYPE_KEYS.map((k) => [k, 0]));
  state.style = {};
  state.picks.forEach((c) => {
    Object.entries(c.w || {}).forEach(([k, v]) => (state.scores[k] += v));
    Object.assign(state.style, c.style || {});
  });
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  TYPE_KEYS.forEach((k) => { const x = a[k] || 0, y = b[k] || 0; dot += x * y; na += x * x; nb += y * y; });
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}
function mainType(scores) {
  return TYPE_KEYS.reduce((best, k) => ((scores[k] || 0) > (scores[best] || 0) ? k : best), TYPE_KEYS[0]);
}
// 사진 취향 유사도 + 동행·일정 스타일이 맞으면 소폭 가산
function rankDestinations(scores, style) {
  return DATA.destinations
    .map((d) => {
      let match = cosine(scores, d.w);
      if (style.comp && d.fit.comp.includes(style.comp)) match += 0.04;
      if (style.pace && d.fit.pace.includes(style.pace)) match += 0.03;
      return { ...d, match: Math.min(match, 0.99) };
    })
    .sort((a, b) => b.match - a.match);
}
// 최종 후보 3곳도 풍경 분류·색감이 겹치지 않게
function finalCandidates() {
  const out = [], kinds = new Set();
  for (const d of rankDestinations(state.scores, state.style)) {
    const k = looks(d.img);
    if (k.some((x) => kinds.has(x))) continue;
    out.push(d); k.forEach((x) => kinds.add(x));
    if (out.length === 3) break;
  }
  return out;
}

/* ---------- 인트로 ---------- */
function renderIntro() {
  // 엽서 3장: 매번 분위기가 다른 사진으로
  const kinds = new Set(), picks = [];
  for (const [key, img] of shuffle(Object.entries(DATA.images))) {
    if (key === "seoulDawn" || key === "tea" || looks(key).some((k) => kinds.has(k))) continue; // 워터마크 사진 제외
    picks.push([key, img]); looks(key).forEach((k) => kinds.add(k));
    if (picks.length === 3) break;
  }
  document.querySelectorAll(".postcard").forEach((card, i) => {
    const [, img] = picks[i];
    card.querySelector("img").src = img.src;
    card.querySelector("figcaption").textContent = `No.${pad(i + 1)} · ${KIND_LABELS[img.kinds[0]]}`;
  });

  const times = ["07:10", "08:45", "10:20", "12:35", "14:50", "17:15", "19:55"];
  $("departureBoard").innerHTML = "";
  shuffle(DATA.destinations).slice(0, times.length).forEach((d, i) => {
    const row = el("div", "board-row");
    row.append(el("span", "b-time", times[i]), el("span", "b-code", d.code), el("span", "b-region", d.name),
      el("span", "b-theme", DATA.types[mainType(d.w)].en.toUpperCase()), el("span", "b-status", i === 0 ? "BOARDING" : "ON TIME"));
    $("departureBoard").appendChild(row);
  });
}

/* ---------- 퀴즈 ---------- */
function startQuiz() {
  state.rounds = buildQuiz();
  state.step = 0; state.picks = []; state.dest = null;
  recompute(); renderStep(); showScreen("quiz");
}
function renderStep() {
  advancing = false;
  const total = state.rounds.length + 1;
  $("roundNumber").textContent = pad(state.step + 1);
  $("roundTotal").textContent = pad(total);
  const progress = (state.step / (total - 1)) * 100;
  $("flightFill").style.width = progress + "%";
  $("plane").style.left = progress + "%";
  $("prevBtn").textContent = state.step === 0 ? "← 처음으로" : "← 이전";

  const box = $("choices");
  box.innerHTML = "";
  box.classList.remove("is-final");

  if (state.step < state.rounds.length) {
    const round = state.rounds[state.step];
    setQuestion(round.tag, round.title, round.hint);
    box.dataset.count = round.choices.length;
    round.choices.forEach((c, i) => box.appendChild(choiceCard(c, i)));
  } else {
    const f = DATA.finalRound;
    setQuestion(f.tag, f.title, f.hint);
    const candidates = finalCandidates();
    box.dataset.count = candidates.length;
    box.classList.add("is-final");
    candidates.forEach((d, i) => box.appendChild(finalCard(d, i)));
  }
}
function setQuestion(tag, title, hint) {
  $("qTag").textContent = tag; $("qTitle").textContent = title; $("qHint").textContent = hint;
  const q = document.querySelector(".question");
  q.classList.remove("enter"); void q.offsetWidth; q.classList.add("enter");
}
function choiceCard(c, i) {
  const btn = el("button", "choice");
  btn.type = "button";
  btn.style.animationDelay = i * 60 + "ms";
  const media = el("div", "choice-media");
  if (c.img) {
    const img = new Image();
    img.src = imgSrc(c.img); img.alt = c.title;
    img.style.objectPosition = c.pos || "50% 50%";
    img.style.transformOrigin = c.pos || "50% 50%";
    img.style.setProperty("--zoom", c.zoom || 1);
    media.appendChild(img);
  } else {
    media.classList.add("mood");
    media.style.background = c.mood.bg;
    media.style.color = c.mood.ink;
    if (c.mood.icon) media.appendChild(el("span", "mood-icon", c.mood.icon));
    media.append(el("span", "mood-small", c.mood.small), el("span", "mood-big", c.mood.big));
  }
  media.appendChild(el("span", "pick-stamp", "PICK!"));
  const cap = el("div", "choice-cap");
  cap.append(el("span", "choice-no", pad(i + 1)), el("strong", "choice-title", c.title));
  if (c.sub) cap.appendChild(el("span", "choice-sub", c.sub));
  btn.append(media, cap);
  btn.addEventListener("click", () => pick(btn, () => { state.picks[state.step] = c; state.picks.length = state.step + 1; recompute(); }));
  return btn;
}
function finalCard(d, i) {
  const btn = el("button", "choice final-card");
  btn.type = "button";
  btn.style.animationDelay = i * 90 + "ms";
  const media = el("div", "choice-media");
  const img = new Image(); img.src = imgSrc(d.img); img.alt = d.name;
  media.appendChild(img);
  media.append(el("span", "final-rank", i === 0 ? "BEST MATCH" : `CANDIDATE ${pad(i + 1)}`), el("span", "pick-stamp", "GO!"));
  const cap = el("div", "choice-cap");
  const top = el("div", "final-top");
  top.append(el("span", "final-code", d.code), el("span", "final-match", "취향 저격 " + pct(d.match)));
  cap.append(top, el("strong", "choice-title", d.name), el("span", "choice-sub", `${d.region} · ${d.line}`));
  btn.append(media, cap);
  btn.addEventListener("click", () => pick(btn, () => { state.dest = d; }));
  return btn;
}
function pick(btn, apply) {
  if (advancing) return;
  advancing = true;
  btn.classList.add("picked");
  $("choices").classList.add("locked");
  apply();
  setTimeout(() => {
    $("choices").classList.remove("locked");
    if (state.dest) return showResult();
    state.step++; renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 480);
}
function goBack() {
  if (state.step === 0) return showScreen("intro");
  state.step--; state.picks.length = state.step; recompute(); renderStep();
}

/* ---------- 결과 ---------- */
function showResult() {
  const typeKey = mainType(state.scores);
  const type = DATA.types[typeKey];
  const d = state.dest;
  const L = DATA.styleLabels;
  const s = state.style;
  const ymd = today();

  $("resultTypeName").textContent = type.name;
  $("resultDestName").textContent = d.name;

  // 티켓
  $("tPhoto").style.backgroundImage = `url("${imgSrc(d.img)}")`;
  $("tCode").textContent = d.code;
  $("tPostCode").textContent = d.code;
  $("tPostDate").textContent = ymd.slice(5);
  $("tDestName").textContent = d.name;
  $("tTypeEn").textContent = type.en;
  $("tRegion").textContent = `${d.region} · ${d.en}`;
  $("tDate").textContent = ymd;
  $("tTime").textContent = (L.time[s.time] || "13:00").split(" ")[0];
  $("tComp").textContent = L.comp[s.comp] || "혼자";
  $("tPace").textContent = L.pace[s.pace] || "여유로운 일정";
  $("tKeywords").textContent = type.keywords.join("  ·  ");
  $("tSeat").textContent = `${d.code}-${pad((hash(d.id + typeKey + ymd) % 900) + 100, 3)}`;
  $("tType").textContent = type.name;
  $("tMatch").textContent = pct(d.match);
  $("tSerial").textContent = `${type.code} ${ymd.replace(/\./g, "")} ${d.code}`;
  document.documentElement.style.setProperty("--type-color", type.color);
  renderBarcode(d.code + type.code + ymd);
  updateName();

  // 유형
  $("typeName").textContent = type.name;
  $("typeEn").textContent = type.en.toUpperCase();
  $("typeTagline").textContent = type.tagline;
  $("typeDescription").textContent = type.description;
  $("typeKeywords").innerHTML = "";
  type.keywords.forEach((k) => $("typeKeywords").appendChild(el("span", "chip", "#" + k)));
  renderBars();

  // 여행 고민 덜어주기
  $("planPhoto").style.backgroundImage = `url("${imgSrc(d.img)}")`;
  $("planRegion").textContent = d.region;
  $("planName").textContent = d.name;
  $("planDesc").textContent = d.description;
  $("planCourse").innerHTML = "";
  d.course.forEach((c) => $("planCourse").appendChild(el("li", null, c)));
  $("planFacts").innerHTML = "";
  [["추천 시간", d.bestTime], ["챙길 것", d.bring], ["걷기", d.walk]].forEach(([k, v]) => {
    const f = el("div", "fact"); f.append(el("small", null, k), el("b", null, v)); $("planFacts").appendChild(f);
  });
  $("planTips").innerHTML = "";
  if (s.pace) $("planTips").appendChild(tip(`${L.pace[s.pace]} 여행러를 위한 팁`, DATA.paceTips[s.pace]));
  if (s.comp) $("planTips").appendChild(tip(`${L.comp[s.comp]} 떠난다면`, DATA.compTips[s.comp]));

  // 다른 후보
  $("altList").innerHTML = "";
  rankDestinations(state.scores, state.style).filter((x) => x.id !== d.id).slice(0, 3).forEach((x) => {
    const card = el("article", "alt-card");
    const ph = el("div", "alt-photo"); ph.style.backgroundImage = `url("${imgSrc(x.img)}")`;
    const info = el("div", "alt-info");
    info.append(el("span", "alt-code", `${x.code} · ${pct(x.match)}`), el("strong", null, x.name), el("span", null, x.line));
    card.append(ph, info); $("altList").appendChild(card);
  });

  renderComparison();
  $("shareStatus").textContent = "";
  showScreen("result");
}
function tip(title, body) {
  const t = el("div", "tip"); t.append(el("b", null, title), el("p", null, body)); return t;
}
function renderBars() {
  const total = Object.values(state.scores).reduce((a, b) => a + b, 0) || 1;
  $("tasteBars").innerHTML = "";
  [...TYPE_KEYS].sort((a, b) => state.scores[b] - state.scores[a]).forEach((k) => {
    const t = DATA.types[k];
    const v = Math.round((state.scores[k] / total) * 100);
    const row = el("div", "bar-row");
    const track = el("div", "bar-track");
    const fill = el("div", "bar-fill"); fill.style.background = t.color;
    track.appendChild(fill);
    row.append(el("span", "bar-label", t.name), track, el("span", "bar-val", v + "%"));
    $("tasteBars").appendChild(row);
    requestAnimationFrame(() => setTimeout(() => (fill.style.width = v + "%"), 80));
  });
}
function renderBarcode(seed) {
  const box = $("tBarcode");
  box.innerHTML = "";
  let h = hash(seed);
  for (let i = 0; i < 42; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const bar = el("i"); bar.style.width = (1 + (h % 3)) + "px"; bar.style.opacity = h % 5 === 0 ? 0 : 1;
    box.appendChild(bar);
  }
}
function updateName() {
  state.name = $("passengerName").value.trim();
  $("tName").textContent = state.name || "TRAVELER";
}

/* ---------- 친구와 비교 ---------- */
function renderComparison() {
  const box = $("compare");
  box.innerHTML = "";
  if (!incoming) return;
  const theirDest = DATA.destinations.find((d) => d.id === incoming.d);
  const theirType = DATA.types[mainType(incoming.s)];
  const myType = DATA.types[mainType(state.scores)];
  const friend = incoming.n || "친구";
  const sim = Math.round(cosine(state.scores, incoming.s) * 100);

  // 두 사람 모두 만족하는 곳 = 두 사람 일치도 중 낮은 쪽이 가장 높은 여행지
  const theirs = rankDestinations(incoming.s, incoming.st || {});
  const together = rankDestinations(state.scores, state.style)
    .map((d) => ({ ...d, both: Math.min(d.match, theirs.find((t) => t.id === d.id).match) }))
    .sort((a, b) => b.both - a.both)[0];

  const shared = TYPE_KEYS.filter((k) => state.scores[k] > 0 && (incoming.s[k] || 0) > 0)
    .sort((a, b) => Math.min(state.scores[b], incoming.s[b]) - Math.min(state.scores[a], incoming.s[a]))
    .slice(0, 3).map((k) => DATA.types[k].keywords[0]);

  const notes = [];
  const L = DATA.styleLabels, st = incoming.st || {};
  if (state.dest.id === incoming.d) notes.push(`둘 다 ${state.dest.name} 픽! 이 정도면 운명이에요. 이제 날짜만 정하면 끝.`);
  if (st.pace && state.style.pace && st.pace !== state.style.pace)
    notes.push(`계획 스타일이 달라요 (나: ${L.pace[state.style.pace]} / ${friend}: ${L.pace[st.pace]}). 오전엔 꼭 갈 곳 하나, 오후는 자유 시간! 이렇게 나누면 일정 짜다 싸울 일 없어요.`);
  if (st.time && state.style.time && st.time !== state.style.time)
    notes.push(`최애 시간대가 달라요 (나: ${L.time[state.style.time]} / ${friend}: ${L.time[st.time]}). 하루에 둘의 시간대를 하나씩 넣으면 둘 다 만족!`);
  if (!notes.length) notes.push("여행 리듬까지 찰떡이에요. 이 조합이면 일정 조율은 그냥 패스해도 돼요!");

  const wrap = el("div", "compare-card");
  wrap.innerHTML = `
    <div class="cmp-head"><p class="eyebrow">TRAVEL MATCH · 우리 여행 궁합</p><div class="cmp-score"><b></b><small>여행 궁합 점수</small></div></div>
    <div class="cmp-pair">
      <div class="cmp-person"><small>ME</small><strong class="cmp-me-type"></strong><span class="cmp-me-dest"></span></div>
      <div class="cmp-plane">✈</div>
      <div class="cmp-person"><small class="cmp-friend-name"></small><strong class="cmp-fr-type"></strong><span class="cmp-fr-dest"></span></div>
    </div>
    <div class="cmp-together"><small>둘이 같이 간다면, 여기 어때요?</small><strong class="cmp-tg-name"></strong><span class="cmp-tg-line"></span></div>
    <div class="cmp-shared"></div>
    <ul class="cmp-notes"></ul>`;
  wrap.querySelector(".cmp-score b").textContent = sim + "%";
  wrap.querySelector(".cmp-me-type").textContent = myType.name;
  wrap.querySelector(".cmp-me-dest").textContent = "→ " + state.dest.name;
  wrap.querySelector(".cmp-friend-name").textContent = friend.toUpperCase();
  wrap.querySelector(".cmp-fr-type").textContent = theirType.name;
  wrap.querySelector(".cmp-fr-dest").textContent = "→ " + (theirDest ? theirDest.name : "비공개");
  wrap.querySelector(".cmp-tg-name").textContent = `${together.code} · ${together.name}`;
  wrap.querySelector(".cmp-tg-line").textContent = `둘 다 ${pct(together.both)} 이상 취향 저격 · ${together.line}`;
  const sharedBox = wrap.querySelector(".cmp-shared");
  sharedBox.appendChild(el("small", null, "우리 둘의 공통 취향"));
  (shared.length ? shared : ["취향이 정반대라 오히려 좋아"]).forEach((k) => sharedBox.appendChild(el("span", "chip", "#" + k)));
  notes.forEach((n) => wrap.querySelector(".cmp-notes").appendChild(el("li", null, n)));
  box.appendChild(wrap);
}

/* ---------- 공유 ---------- */
function encodeInvite() {
  const payload = { n: state.name, s: state.scores, d: state.dest.id, st: state.style };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}
function shareUrl() {
  const u = new URL(location.href);
  u.search = ""; u.hash = "";
  u.searchParams.set("invite", encodeInvite());
  return u.toString();
}
async function shareInvite() {
  const url = shareUrl();
  const who = state.name || "친구";
  const text = `✈ ${who}의 여행 티켓 발권 완료\n${DATA.types[mainType(state.scores)].name} → ${state.dest.name}\n너도 사진 몇 장만 골라봐. 우리 여행 궁합 바로 나와!`;
  if (navigator.share) {
    try { await navigator.share({ title: "Pic-Tour 탑승권", text, url }); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    $("shareStatus").textContent = "링크 복사 완료! 단톡방에 붙여넣고 같이 갈 사람 소환해 보세요.";
  } catch (e) {
    history.replaceState(null, "", url);
    $("shareStatus").textContent = "브라우저가 복사를 막았어요. 주소창의 링크를 직접 복사해 주세요.";
  }
}
async function downloadTicket() {
  if (!window.html2canvas) { $("shareStatus").textContent = "이미지 저장 기능을 불러오지 못했어요. 인터넷 연결을 확인하거나 화면을 캡처해 주세요."; return; }
  $("shareStatus").textContent = "티켓 이미지를 만드는 중…";
  try {
    const canvas = await html2canvas($("ticketWrap"), {
      scale: Math.max(3, window.devicePixelRatio || 1),
      useCORS: true,
      backgroundColor: "#fbf8f3", // 티켓 바깥 무대 색 (노치 구멍과 같은 색)
      onclone: (clonedDoc) => {
        // html2canvas는 복제본에서 등장 애니메이션을 처음부터 다시 재생하고(반투명하게 찍힘),
        // radial-gradient 노치를 뿌연 막으로 그리기 때문에 저장용으로만 단순한 모양으로 바꿔요.
        const style = clonedDoc.createElement("style");
        style.textContent = `
          *{animation:none!important;transition:none!important}
          .ticket{filter:none!important;opacity:1!important;transform:none!important}
          .ticket-main,.ticket-stub{background-image:none!important}
          .ticket-stub::after{display:none!important}
          .ticket-stub{border-left:2px dashed #d9c9ad}
          @media (max-width:900px){.ticket-stub{border-left:0;border-top:2px dashed #d9c9ad}}
          .t-notch{position:absolute;width:28px;height:28px;border-radius:50%;background:#fbf8f3;z-index:5}`;
        clonedDoc.head.appendChild(style);
        clonedDoc.querySelectorAll(".ticket-main, .ticket-stub").forEach((part) => {
          [["-14px", "-14px", null, null], ["-14px", null, null, "-14px"], [null, "-14px", "-14px", null], [null, null, "-14px", "-14px"]]
            .forEach(([top, left, bottom, right]) => {
              const n = clonedDoc.createElement("span");
              n.className = "t-notch";
              Object.assign(n.style, { top: top || "auto", left: left || "auto", bottom: bottom || "auto", right: right || "auto" });
              part.appendChild(n);
            });
        });
      }
    });
    const a = document.createElement("a");
    a.download = `pic-tour-${state.dest.code}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    $("shareStatus").textContent = "티켓 이미지를 저장했어요.";
  } catch (e) {
    $("shareStatus").textContent = "이미지 저장에 실패했어요. Live Server로 열었는지 확인하거나 화면 캡처를 이용해 주세요.";
  }
}
function readInvite() {
  const raw = new URLSearchParams(location.search).get("invite");
  if (!raw) return;
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
    if (data && data.s) incoming = data;
  } catch (e) { incoming = null; }
}
function renderIncoming() {
  const box = $("incomingNote");
  box.innerHTML = "";
  $("startBtn").firstChild.textContent = "탑승 수속 시작 ";
  if (!incoming) return;
  const d = DATA.destinations.find((x) => x.id === incoming.d);
  const note = el("div", "incoming");
  note.append(el("span", "incoming-badge", "✉ INVITATION"),
    el("strong", null, `${incoming.n || "친구"}님이 여행 티켓을 보냈어요!`),
    el("p", null, `${DATA.types[mainType(incoming.s)].name} · ${d ? d.name + "행" : ""}. 나도 사진 골라서 우리 여행 궁합 확인해 볼까요?`));
  box.appendChild(note);
  $("startBtn").firstChild.textContent = "나도 하고 궁합 보기 ";
}

/* ---------- 시작 ---------- */
function renderCredits() {
  const names = [...new Set(Object.values(DATA.images).map((i) => i.credit))];
  $("credits").textContent = `사진 출처: 한국관광공사 · 촬영 ${names.join(", ")}`;
}

$("startBtn").addEventListener("click", startQuiz);
$("prevBtn").addEventListener("click", goBack);
$("restartBtn").addEventListener("click", () => {
  incoming = null; history.replaceState(null, "", location.pathname);
  renderIncoming(); startQuiz();
});
$("shareBtn").addEventListener("click", shareInvite);
$("downloadBtn").addEventListener("click", downloadTicket);
$("passengerName").addEventListener("input", updateName);

readInvite();
renderIntro();
renderIncoming();
renderCredits();
