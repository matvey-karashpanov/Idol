const previews = {
  home: {
    image: "assets/home-preview.png",
    alt: "Макет главной страницы IDOLVERSE",
    kicker: "01 — DASHBOARD",
    title: "Твоя главная сцена",
    description: "Последние новости, популярные артисты и музыкальные открытия — всё начинается здесь."
  },
  idol: {
    image: "assets/idol-preview.png",
    alt: "Макет страницы профиля айдола",
    kicker: "02 — ARTIST PROFILE",
    title: "История каждого артиста",
    description: "Биография, важные события, фотогалерея и дискография — собранные в одном профиле."
  },
  news: {
    image: "assets/news-preview.png",
    alt: "Макет новостной ленты IDOLVERSE",
    kicker: "03 — WHAT'S NEW",
    title: "Будь в центре событий",
    description: "Следи за премьерами, выступлениями и новостями, не переключаясь между десятками сайтов."
  },
  group: {
    image: "assets/group-preview.png",
    alt: "Макет страницы музыкальной группы",
    kicker: "04 — GROUP SPACE",
    title: "Исследуй целые группы",
    description: "Участники, альбомы и карьерные моменты связаны между собой, чтобы было проще открывать новое."
  }
};

const tabButtons = [...document.querySelectorAll(".preview-tab")];
const previewImage = document.querySelector("#preview-image");
const previewViewport = document.querySelector(".preview-image-viewport");
const previewKicker = document.querySelector("#preview-kicker");
const previewTitle = document.querySelector("#preview-title");
const previewDescription = document.querySelector("#preview-description");
const previewCount = document.querySelector("#preview-count");
const keys = Object.keys(previews);
let activePreview = "home";

function setPreview(key) {
  if (!previews[key]) return;
  activePreview = key;
  const item = previews[key];
  if (previewViewport) previewViewport.scrollTop = 0;
  previewImage.classList.add("changing");
  window.setTimeout(() => {
    previewImage.src = item.image;
    previewImage.alt = item.alt;
    previewKicker.textContent = item.kicker;
    previewTitle.textContent = item.title;
    previewDescription.textContent = item.description;
    previewCount.textContent = `${String(keys.indexOf(key) + 1).padStart(2, "0")} / 04`;
    previewImage.classList.remove("changing");
  }, 140);
  tabButtons.forEach(button => {
    const selected = button.dataset.preview === key;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
}

tabButtons.forEach(button => button.addEventListener("click", () => setPreview(button.dataset.preview)));
document.querySelector("#preview-prev").addEventListener("click", () => {
  const index = keys.indexOf(activePreview);
  setPreview(keys[(index - 1 + keys.length) % keys.length]);
});
document.querySelector("#preview-next").addEventListener("click", () => {
  const index = keys.indexOf(activePreview);
  setPreview(keys[(index + 1) % keys.length]);
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
}));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".button-primary, .header-cta").forEach(link => {
  link.addEventListener("click", () => {
    if (link.getAttribute("href") === "#preview") {
      const toast = document.querySelector(".toast");
      toast.textContent = "Выбирай экран и исследуй концепцию IDOLVERSE ✦";
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2600);
    }
  });
});


// Lightweight front-end demo with illustrative data only (no backend).
const artistData = {
  scoups: {
    id: "IDV-001", initials: "SC", name: "S.Coups", category: "K-POP · ARTIST", subtitle: "Лидер SEVENTEEN",
    description: "Профиль артиста объединяет базовую информацию и связи с музыкальной группой.",
    relation: "SEVENTEEN", relationMeta: "Группа · K-pop", relationIcon: "SV", relationType: "ГРУППА · K-POP",
    relationDescription: "SEVENTEEN — группа, связанная с профилями участников, релизами и ключевыми моментами карьеры.",
    relationUpdate: "В карточке группы можно изучить участников и открыть их профили.", color: "art-lilac"
  },
  karina: {
    id: "IDV-002", initials: "KR", name: "Karina", category: "K-POP · ARTIST", subtitle: "Участница aespa",
    description: "Страница артиста связывает биографию, релизы и принадлежность к группе.",
    relation: "aespa", relationMeta: "Группа · K-pop", relationIcon: "ae", relationType: "ГРУППА · K-POP",
    relationDescription: "aespa — группа, у которой можно посмотреть состав, релизы и связанные новости.",
    relationUpdate: "Связи между профилями помогают исследовать участников группы.", color: "art-blue"
  },
  wangyibo: {
    id: "IDV-003", initials: "WY", name: "Wang Yibo", category: "C-POP · ARTIST", subtitle: "Сольный артист",
    description: "Пример карточки артиста китайской музыкальной сцены в общей базе IDOLVERSE.",
    relation: "Сольная карьера", relationMeta: "Артист · C-pop", relationIcon: "WY", relationType: "КАРЬЕРА · C-POP",
    relationDescription: "Карьерная страница может объединять музыкальные релизы, выступления и заметные события.",
    relationUpdate: "В концепции все направления используют единый формат профиля.", color: "art-rose"
  },
  fujii: {
    id: "IDV-004", initials: "FK", name: "Fujii Kaze", category: "J-POP · ARTIST", subtitle: "Сольный артист",
    description: "Пример профиля японского артиста — ещё одно направление внутри IDOLVERSE.",
    relation: "Дискография", relationMeta: "Релизы · J-pop", relationIcon: "♪", relationType: "МУЗЫКА · J-POP",
    relationDescription: "В разделе музыки можно будет связать релизы с артистом и датами выхода.",
    relationUpdate: "В дальнейшем карточки релизов будут вести к подробным страницам.", color: "art-green"
  }
};
const artistCards = [...document.querySelectorAll(".artist-card")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const artistSearch = document.querySelector("#artist-search");
const resultCount = document.querySelector("#artist-result-count");
const emptyResults = document.querySelector("#empty-results");
const detailFields = {
  id: document.querySelector("#detail-id"), initials: document.querySelector("#detail-avatar"),
  category: document.querySelector("#detail-category"), name: document.querySelector("#detail-name"),
  subtitle: document.querySelector("#detail-subtitle"), description: document.querySelector("#detail-description"),
  relation: document.querySelector("#related-name"), relationMeta: document.querySelector("#related-meta"),
  relationIcon: document.querySelector("#related-icon"), update: document.querySelector("#detail-update-text")
};
let activeFilter = "all";
let selectedArtist = "scoups";
let showingRelation = false;

function renderArtistDetails(key) {
  const artist = artistData[key];
  if (!artist) return;
  selectedArtist = key;
  showingRelation = false;
  detailFields.id.textContent = artist.id;
  detailFields.initials.textContent = artist.initials;
  detailFields.initials.className = `detail-avatar ${artist.color}`;
  detailFields.category.textContent = artist.category;
  detailFields.name.textContent = artist.name;
  detailFields.subtitle.textContent = artist.subtitle;
  detailFields.description.textContent = artist.description;
  detailFields.relation.textContent = artist.relation;
  detailFields.relationMeta.textContent = artist.relationMeta;
  detailFields.relationIcon.textContent = artist.relationIcon;
  detailFields.update.textContent = artist.relationUpdate;
  document.querySelector("#related-link").setAttribute("aria-label", `Открыть связанный объект: ${artist.relation}`);
  artistCards.forEach(card => {
    const selected = card.dataset.artist === key;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

function applyArtistFilters() {
  const query = artistSearch.value.trim().toLocaleLowerCase("ru");
  let visible = 0;
  artistCards.forEach(card => {
    const artist = artistData[card.dataset.artist];
    const searchable = `${artist.name} ${artist.subtitle} ${artist.category} ${artist.relation}`.toLocaleLowerCase("ru");
    const matchesFilter = activeFilter === "all" || artist.category.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesQuery = searchable.includes(query);
    const show = matchesFilter && matchesQuery;
    card.hidden = !show;
    if (show) visible++;
  });
  const countWord = visible % 10 === 1 && visible % 100 !== 11 ? "результат" : (visible % 10 >= 2 && visible % 10 <= 4 && (visible % 100 < 12 || visible % 100 > 14) ? "результата" : "результатов");
  resultCount.textContent = `${String(visible).padStart(2, "0")} ${countWord}`;
  emptyResults.hidden = visible !== 0;
  if (visible && !artistCards.some(card => !card.hidden && card.dataset.artist === selectedArtist)) {
    const firstVisible = artistCards.find(card => !card.hidden);
    renderArtistDetails(firstVisible.dataset.artist);
  }
}

artistCards.forEach(card => card.addEventListener("click", () => renderArtistDetails(card.dataset.artist)));
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle("active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  });
  applyArtistFilters();
}));
artistSearch.addEventListener("input", applyArtistFilters);
document.querySelector("#related-link").addEventListener("click", () => {
  const artist = artistData[selectedArtist];
  if (!artist) return;
  showingRelation = !showingRelation;
  if (showingRelation) {
    detailFields.id.textContent = "IDV-LINK";
    detailFields.initials.textContent = artist.relationIcon;
    detailFields.initials.className = `detail-avatar ${artist.color}`;
    detailFields.category.textContent = artist.relationType;
    detailFields.name.textContent = artist.relation;
    detailFields.subtitle.textContent = artist.relationMeta;
    detailFields.description.textContent = artist.relationDescription;
    detailFields.relation.textContent = artist.name;
    detailFields.relationMeta.textContent = "Артист · открыть профиль";
    detailFields.relationIcon.textContent = artist.initials;
    detailFields.update.textContent = `Связанный профиль: ${artist.name}. Нажми на карточку, чтобы вернуться к списку артистов.`;
    document.querySelector("#related-link").setAttribute("aria-label", `Вернуться к профилю ${artist.name}`);
  } else {
    renderArtistDetails(selectedArtist);
  }
});

// Keyboard shortcut for search; ignored while typing in another control.
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    artistSearch.focus();
  }
  if (event.key === "Escape" && document.activeElement === artistSearch) {
    artistSearch.value = "";
    applyArtistFilters();
    artistSearch.blur();
  }
});


// Moderation concept demo: actions update only the local presentation state.
const aiReviewDemo = document.querySelector("#ai-review-demo");
const aiReviewStatus = document.querySelector("#ai-review-status");
const aiReviewFeedback = document.querySelector("#ai-review-feedback");
const aiApproveButton = document.querySelector("#ai-approve");
const aiRejectButton = document.querySelector("#ai-reject");
const aiResetButton = document.querySelector("#ai-reset");

function setAiReviewState(state) {
  aiReviewDemo.classList.remove("is-approved", "is-rejected");
  if (state === "approved") {
    aiReviewDemo.classList.add("is-approved");
    aiReviewStatus.textContent = "Одобрено в демо";
    aiReviewFeedback.textContent = "Пример прошёл проверку. В реальном продукте публикация потребовала бы подтверждённого источника и сохранения на сервере.";
  } else if (state === "rejected") {
    aiReviewDemo.classList.add("is-rejected");
    aiReviewStatus.textContent = "Отклонено в демо";
    aiReviewFeedback.textContent = "Предложение отклонено. В этой статической демонстрации данные не отправляются и не публикуются.";
  } else {
    aiReviewStatus.textContent = "На проверке";
    aiReviewFeedback.textContent = "Выбери действие: решение изменит статус только в этой демонстрации.";
  }
  aiApproveButton.hidden = state === "approved";
  aiRejectButton.hidden = state === "rejected";
  aiResetButton.hidden = state === "pending";
}

aiApproveButton.addEventListener("click", () => setAiReviewState("approved"));
aiRejectButton.addEventListener("click", () => setAiReviewState("rejected"));
aiResetButton.addEventListener("click", () => setAiReviewState("pending"));
