// Simple client-only demo app. Data is stored in-memory (reload clears it).
const sampleArtisans = [
  {
    id: "a1",
    name: "Meera's Textiles",
    category: "textiles",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=60",
    story: "Meera crafts bandhani sarees using techniques passed down three generations.",
    products: [
      { name: "Bandhani Saree - Red", price: 85 },
      { name: "Bandhani Scarf", price: 20 }
    ]
  },
  {
    id: "a2",
    name: "Raj Woodworks",
    category: "wood",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1541534401786-7e3b4b5d2c6f?w=1200&q=60",
    story: "Raj carves home decor from salvaged wood, promoting reuse and local design.",
    products: [{ name: "Carved Box", price: 35 }]
  },
  {
    id: "a3",
    name: "Anika Pottery",
    category: "pottery",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200&q=60",
    story: "Anika mixes contemporary forms with local glazes made from river clay.",
    products: [{ name: "Ceramic Bowl", price: 18 }]
  }
];

let artisans = [...sampleArtisans];

const dom = {
  gallery: document.getElementById("gallery"),
  search: document.getElementById("search"),
  category: document.getElementById("category"),
  storiesSection: document.getElementById("stories"),
  storiesList: document.getElementById("stories-list"),
  modal: document.getElementById("modal"),
  modalBody: document.getElementById("modal-body"),
  modalClose: document.getElementById("modal-close"),
  admin: document.getElementById("admin"),
  adminForm: document.getElementById("adminForm"),
  btnExplore: document.getElementById("btn-explore"),
  btnStories: document.getElementById("btn-stories"),
  btnAdmin: document.getElementById("btn-admin"),
  ctaExplore: document.getElementById("cta-explore"),
  ctaLearn: document.getElementById("cta-learn")
};

function renderGallery(list = artisans) {
  dom.gallery.innerHTML = "";
  if (!list.length) {
    dom.gallery.innerHTML = "<p>No artisans match your search.</p>";
    return;
  }
  list.forEach(a => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <img src="${a.image || 'placeholder-thumb.jpg'}" alt="${escape(a.name)}" />
      <h4>${escape(a.name)}</h4>
      <p class="muted">${escape(a.category)} • ${escape(a.location || "Unknown")}</p>
      <p>${shorten(a.story, 120)}</p>
      <div class="meta">
        <span class="price">${a.products?.length ? a.products[0].name : ''}</span>
        <button class="view" data-id="${a.id}">View</button>
      </div>
    `;
    dom.gallery.appendChild(el);
  });

  // attach view buttons
  document.querySelectorAll(".view").forEach(btn => {
    btn.addEventListener("click", e => openModal(e.target.dataset.id));
  });
}

function renderStories() {
  dom.storiesList.innerHTML = "";
  artisans.forEach(a => {
    const s = document.createElement("div");
    s.className = "story";
    s.innerHTML = `<h4>${escape(a.name)}</h4><p>${shorten(a.story, 400)}</p><button class="view-story" data-id="${a.id}">Read more</button>`;
    dom.storiesList.appendChild(s);
  });
  document.querySelectorAll(".view-story").forEach(btn => {
    btn.addEventListener("click", e => openModal(e.target.dataset.id, "story"));
  });
}

function openModal(id, mode = "detail") {
  const a = artisans.find(x => x.id === id);
  if (!a) return;
  dom.modalBody.innerHTML = `
    <h2>${escape(a.name)}</h2>
    <p class="muted">${escape(a.category)} • ${escape(a.location || "Unknown")}</p>
    <img style="width:100%;max-height:320px;object-fit:cover;border-radius:8px;margin:12px 0" src="${a.image}" alt="${escape(a.name)}" />
    <p>${escape(a.story)}</p>
    <h3>Products</h3>
    <ul>
      ${ (a.products||[]).map(p=>`<li>${escape(p.name)} — $${p.price}</li>`).join("") || "<li>No products listed</li>"}
    </ul>
  `;
  dom.modal.classList.remove("hidden");
}

function closeModal() {
  dom.modal.classList.add("hidden");
  dom.modalBody.innerHTML = "";
}

function searchAndFilter() {
  const q = dom.search.value.trim().toLowerCase();
  const cat = dom.category.value;
  const filtered = artisans.filter(a => {
    const matchesQ = !q || (a.name + " " + a.story + " " + a.location + " " + a.category).toLowerCase().includes(q);
    const matchesC = cat === "all" || a.category === cat;
    return matchesQ && matchesC;
  });
  renderGallery(filtered);
}

function setupHandlers() {
  dom.search.addEventListener("input", debounce(searchAndFilter, 250));
  dom.category.addEventListener("change", searchAndFilter);
  dom.modalClose.addEventListener("click", closeModal);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) closeModal();
  });

  dom.btnExplore.addEventListener("click", () => { scrollToSection("gallery"); });
  dom.btnStories.addEventListener("click", () => { toggleSection("stories"); });
  dom.btnAdmin.addEventListener("click", () => { toggleSection("admin"); });
  dom.ctaExplore.addEventListener("click", () => { scrollToSection("gallery"); });
  dom.ctaLearn.addEventListener("click", () => { toggleSection("stories"); });

  dom.adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(dom.adminForm);
    const newArtisan = {
      id: `a${Date.now()}`,
      name: fd.get("name"),
      category: fd.get("category"),
      location: fd.get("location"),
      story: fd.get("story"),
      image: fd.get("image") || "placeholder-thumb.jpg",
      products: []
    };
    artisans.unshift(newArtisan);
    renderGallery();
    renderStories();
    dom.adminForm.reset();
    alert("Added locally (demo). For production connect to a backend or CMS.");
  });
}

function toggleSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("hidden");
  if (!el.classList.contains("hidden")) el.scrollIntoView({behavior:"smooth"});
}
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:"smooth"});
}

function shorten(text, n=140){ return text.length>n ? text.slice(0,n-1)+"…" : text; }
function escape(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function debounce(fn, wait=200){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }

function init() {
  renderGallery();
  renderStories();
  setupHandlers();
}
init();
