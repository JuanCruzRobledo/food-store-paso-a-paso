const slides      = Array.from(document.querySelectorAll(".slide"));
const railModules = Array.from(document.querySelectorAll(".rail-module"));
const railTitles  = Array.from(document.querySelectorAll(".rail-title"));
const counter     = document.getElementById("counter");
const progress    = document.getElementById("progress");
const deckApp     = document.querySelector(".deck-app");
const modeBadge   = document.getElementById("mode-badge");

let current     = 0;
let isAnimating = false;

// module index -> badge label (kept short, calm, lowercase)
const modeMap = {
  0: "setup",
  1: "knowledge",
  2: "framework",
  3: "execute",
  4: "closing",
};

function buildDots() {
  const moduleMap = {};
  slides.forEach((slide, idx) => {
    const mod = slide.dataset.module;
    if (!moduleMap[mod]) moduleMap[mod] = [];
    moduleMap[mod].push(idx);
  });
  Object.entries(moduleMap).forEach(([mod, indices]) => {
    const container = document.getElementById(`dots-${mod}`);
    if (!container) return;
    indices.forEach((slideIdx) => {
      const pip = document.createElement("button");
      pip.className = "rail-pip";
      pip.dataset.slide = slideIdx;
      pip.setAttribute("aria-label", `Slide ${slideIdx + 1}`);
      pip.addEventListener("click", () => render(slideIdx));
      container.appendChild(pip);
    });
  });
}

function pad(v) { return String(v).padStart(2, "0"); }

function cleanupTransitionClasses(slide) {
  slide.classList.remove("is-entering", "is-leaving", "from-next", "from-prev", "to-next", "to-prev");
}

function updateChrome() {
  const pips = Array.from(document.querySelectorAll(".rail-pip"));
  pips.forEach(pip => pip.classList.toggle("is-active", Number(pip.dataset.slide) === current));

  const currentModule = slides[current]?.dataset.module;
  railModules.forEach(mod => mod.classList.toggle("is-active-module", mod.dataset.module === currentModule));

  const ratio = ((current + 1) / slides.length) * 100;
  progress.style.width = `${ratio}%`;
  counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;

  const tone = slides[current]?.dataset.tone;
  const moduleIdx = Number(currentModule);
  const mode = modeMap[moduleIdx] || "setup";

  deckApp.className = deckApp.className
    .replace(/tone-\w+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (tone) deckApp.classList.add(`tone-${tone}`);
  if (modeBadge) modeBadge.textContent = mode;
}

function render(index, options = {}) {
  const { animate = true } = options;
  const next = Math.max(0, Math.min(index, slides.length - 1));
  if (next === current && animate) { updateChrome(); return; }
  if (isAnimating) return;

  const previous     = current;
  current            = next;
  try { localStorage.setItem("deck-slide", current); } catch (_) {}
  const direction    = next > previous ? "next" : "prev";
  const currentSlide = slides[current];
  const previousSlide = slides[previous];

  if (!animate) {
    slides.forEach((s, idx) => { cleanupTransitionClasses(s); s.classList.toggle("is-active", idx === current); });
    updateChrome();
    return;
  }

  isAnimating = true;
  cleanupTransitionClasses(previousSlide);
  cleanupTransitionClasses(currentSlide);

  previousSlide.classList.remove("is-active");
  previousSlide.classList.add("is-leaving", direction === "next" ? "to-next" : "to-prev");
  currentSlide.classList.add("is-active", "is-entering", direction === "next" ? "from-next" : "from-prev");

  window.setTimeout(() => {
    cleanupTransitionClasses(previousSlide);
    cleanupTransitionClasses(currentSlide);
    isAnimating = false;
  }, 440);
  updateChrome();
}

railTitles.forEach(title => {
  title.addEventListener("click", () => render(Number(title.dataset.first)));
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); render(current + 1); }
  if (e.key === "ArrowLeft"  || e.key === "PageUp")                    { e.preventDefault(); render(current - 1); }
  if (e.key === "Home") render(0);
  if (e.key === "End")  render(slides.length - 1);
  if (e.key.toLowerCase() === "f") document.body.classList.toggle("focus-mode");
});

let touchStartX = 0;
window.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; });
window.addEventListener("touchend",   e => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta < 0) render(current + 1);
  if (delta > 0) render(current - 1);
});

buildDots();
const saved = Number(localStorage.getItem("deck-slide")) || 0;
render(Math.min(saved, slides.length - 1), { animate: false });
