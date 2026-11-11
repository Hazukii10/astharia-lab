// ==========================================================================
// CUSTOMER PAGE SCRIPT - ASTHARIA LAB
// ==========================================================================

const STORAGE_ARTWORKS_KEY = "vexel_portfolio_artworks";
const STORAGE_SETTINGS_KEY = "astharia_lab_settings"; // key baru: pengaturan lama (identitas contoh) sengaja tidak dipakai lagi; key artworks tetap agar karya ter-upload tidak hilang

const INITIAL_ARTWORKS = [
  {
    id: "poster-1",
    title: "Neon Horizon Music Festival",
    category: "Poster Acara",
    client: "Jakarta Soundscape 2026",
    tags: ["cyberpunk", "music", "electric", "event"],
    desc: "Eksplorasi tipografi berani dan efek chromatic aberration untuk festival musik alternatif kontemporer di Jakarta.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    date: "2026-03-15",
    isDefault: true
  },
  {
    id: "poster-2",
    title: "Brutalist Editorial Swiss Type",
    category: "Typography",
    client: "Mono Type Mag",
    tags: ["brutalism", "swiss-style", "typography", "monochrome"],
    desc: "Gaya neo-brutalism Swiss dengan grid asimetris dan komposisi huruf eksperimental bernuansa high-fashion.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    date: "2026-02-20",
    isDefault: true
  },
  {
    id: "poster-3",
    title: "Aura Botanical Beverage Identity",
    category: "Branding & Logo",
    client: "Aura Artisan Drinks",
    tags: ["branding", "packaging", "clean", "organic"],
    desc: "Desain visual brand dan poster peluncuran produk minuman botanikal dengan palet warna hangat kontemporer.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    date: "2026-01-10",
    isDefault: true
  },
  {
    id: "poster-4",
    title: "Modern Architectural Symposium",
    category: "Poster Acara",
    client: "Design Forum 2026",
    tags: ["minimalist", "architecture", "conference", "cyan"],
    desc: "Poster simposium arsitektur modern berorientasi geometri tajam, grid presisi, dan hierarki visual tegas.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-05",
    isDefault: true
  },
  {
    id: "poster-5",
    title: "NOMAD Streetwear Capsule Lookbook",
    category: "Merchandise",
    client: "NOMAD Apparel",
    tags: ["apparel", "streetwear", "mockup", "fashion"],
    desc: "Poster promosi koleksi t-shirt streetwear bergaya acid graphics dan elemen distorsi visual berani.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    date: "2026-03-28",
    isDefault: true
  },
  {
    id: "poster-6",
    title: "Digital Agency Instagram Carousel Kit",
    category: "Social Media",
    client: "Pixel Forge Studio",
    tags: ["feed", "carousel", "social-media", "minimalist"],
    desc: "Serangkaian template slide Instagram yang saling menyambung dengan layout clean dan call-to-action memikat.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-14",
    isDefault: true
  }
];

const DEFAULT_SETTINGS = {
  brandName: "Astharia Lab",
  designerName: "Hazukii",
  phone: "6281234567890", // TODO: ganti dengan nomor WhatsApp asli Astharia Lab sebelum website dionlinekan
  bio: "Hazukii adalah desainer grafis asal Kediri yang fokus membuat poster dan desain visual untuk media sosial. Karyanya menonjolkan tipografi yang berani dan tampilan yang estetik — saat ini membuka jasa desain poster acara, konten Instagram, dan promosi."
};

let artworks = [];
let settings = {};
let currentFilter = "all";
let currentSearch = "";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  renderGallery();
  updateUIFromSettings();
});

function loadData() {
  const savedArt = localStorage.getItem(STORAGE_ARTWORKS_KEY);
  if (savedArt) {
    try {
      artworks = JSON.parse(savedArt);
    } catch (e) {
      artworks = [...INITIAL_ARTWORKS];
    }
  } else {
    artworks = [...INITIAL_ARTWORKS];
    localStorage.setItem(STORAGE_ARTWORKS_KEY, JSON.stringify(artworks));
  }

  const savedSet = localStorage.getItem(STORAGE_SETTINGS_KEY);
  if (savedSet) {
    try {
      settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSet) };
    } catch (e) {
      settings = { ...DEFAULT_SETTINGS };
    }
  } else {
    settings = { ...DEFAULT_SETTINGS };
  }
}

function updateUIFromSettings() {
  const navBrand = document.getElementById("navBrandName");
  if (navBrand) {
    const parts = settings.brandName.split(".");
    if (parts.length > 1) {
      navBrand.innerHTML = `${escapeHTML(parts[0])}<span class="text-brand-cyan">.${escapeHTML(parts.slice(1).join("."))}</span>`;
    } else {
      navBrand.textContent = settings.brandName;
    }
  }

  const footerBrand = document.getElementById("footerBrand");
  if (footerBrand) {
    footerBrand.textContent = `${settings.brandName} • Hak Cipta Dilindungi`;
  }

  const aboutName = document.getElementById("aboutName");
  if (aboutName) {
    aboutName.textContent = settings.designerName;
  }

  const aboutBio = document.getElementById("aboutBio");
  if (aboutBio) {
    aboutBio.textContent = settings.bio;
  }

  const cleanPhone = settings.phone.replace(/[^0-9]/g, "");

  const btnCustomConsultation = document.getElementById("btnCustomConsultation");
  if (btnCustomConsultation) {
    btnCustomConsultation.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Halo " + settings.brandName + ", saya ingin konsultasi mengenai pemesanan jasa desain poster.")}`;
  }

  const statTotal = document.getElementById("statTotalWorks");
  if (statTotal) {
    statTotal.textContent = `${artworks.length}+`;
  }
}

// Render Gallery
function renderGallery() {
  const container = document.getElementById("galleryGrid");
  const emptyState = document.getElementById("galleryEmptyState");
  if (!container) return;

  const filtered = artworks.filter(item => {
    const matchesCategory = currentFilter === "all" || item.category.toLowerCase() === currentFilter.toLowerCase();
    const matchesSearch = !currentSearch || 
      item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(currentSearch.toLowerCase()))) ||
      (item.client && item.client.toLowerCase().includes(currentSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  container.innerHTML = filtered.map(item => `
    <div class="poster-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group" onclick="openDetailModal('${item.id}')">
      <div class="poster-img-wrapper">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy" class="poster-img" onerror="this.src='https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'">
        
        <div class="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-semibold text-sky-300">
          ${escapeHTML(item.category)}
        </div>

        <div class="absolute inset-0 bg-dark-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <i class="ph-bold ph-arrows-out"></i> Lihat Detail
          </span>
        </div>
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-[11px] text-sky-400 font-medium mb-1">${escapeHTML(item.client || "Showcase Work")}</div>
          <h4 class="font-display font-bold text-white text-base leading-snug group-hover:text-sky-300 transition-colors">${escapeHTML(item.title)}</h4>
        </div>

        <div class="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1 items-center justify-between">
          <div class="flex flex-wrap gap-1">
            ${(item.tags || []).slice(0, 3).map(tag => `<span class="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">#${escapeHTML(tag)}</span>`).join(" ")}
          </div>
          <i class="ph-bold ph-arrow-up-right text-slate-500 group-hover:text-sky-400 transition-colors"></i>
        </div>
      </div>
    </div>
  `).join("");
}

// Lightbox Modal
window.openDetailModal = function(id) {
  const item = artworks.find(a => a.id === id);
  if (!item) return;

  document.getElementById("detailImage").src = item.image;
  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailCategory").textContent = item.category;
  document.getElementById("detailClient").textContent = item.client ? `• ${item.client}` : "";
  document.getElementById("detailDesc").textContent = item.desc || "Tidak ada deskripsi tambahan untuk karya ini.";

  const tagsContainer = document.getElementById("detailTags");
  tagsContainer.innerHTML = (item.tags || []).map(t => 
    `<span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">#${escapeHTML(t)}</span>`
  ).join(" ");

  const cleanPhone = settings.phone.replace(/[^0-9]/g, "");
  const orderMsg = `Halo ${settings.brandName}, saya sangat tertarik dengan karya poster "${item.title}" (${item.category}). Apakah saya bisa memesan jasa desain dengan konsep / estetika serupa?`;
  document.getElementById("btnOrderSimilarDesign").href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(orderMsg)}`;

  const modal = document.getElementById("detailModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

// Order Package Shortcut
window.orderService = function(packageName, price) {
  const cleanPhone = settings.phone.replace(/[^0-9]/g, "");
  const message = `Halo ${settings.brandName}! Saya ingin memesan jasa desain paket *${packageName}* (${price}). Mohon info ketersediaan jadwal pengerjaan dan detail selanjutnya. Terima kasih!`;
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// Event Listeners
function setupEventListeners() {
  document.getElementById("btnCloseDetailModal").addEventListener("click", closeDetailModal);

  // Tutup modal detail dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetailModal();
  });

  window.addEventListener("click", (e) => {
    const detailModal = document.getElementById("detailModal");
    if (e.target === detailModal) closeDetailModal();
  });

  // Mobile menu
  const btnMobile = document.getElementById("btnMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  if (btnMobile && mobileMenu) {
    btnMobile.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      btnMobile.setAttribute("aria-expanded", String(!isHidden));
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      btnMobile.setAttribute("aria-expanded", "false");
    }));
  }

  // Category filters
  const categoryContainer = document.getElementById("categoryFilterContainer");
  if (categoryContainer) {
    categoryContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-btn");
      if (!btn) return;
      categoryContainer.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.cat;
      renderGallery();
    });
  }

  // Search input
  const searchInput = document.getElementById("searchKarya");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim();
      renderGallery();
    });
  }

  // Order Form Submit
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("orderClientName").value.trim();
      const packageType = document.getElementById("orderPackageType").value;
      const deadline = document.getElementById("orderDeadline").value;
      const dimensions = document.getElementById("orderDimensions").value.trim();
      const brief = document.getElementById("orderBrief").value.trim();

      const cleanPhone = settings.phone.replace(/[^0-9]/g, "");

      let text = `*FORM PEMESANAN DESAIN - ${settings.brandName}*\n\n`;
      text += `👤 *Nama / Brand:* ${name}\n`;
      text += `📦 *Pilihan Paket:* ${packageType}\n`;
      if (deadline) text += `📅 *Target Deadline:* ${deadline}\n`;
      if (dimensions) text += `📐 *Ukuran Output:* ${dimensions}\n`;
      text += `\n📝 *Brief Desain:*\n${brief}\n\n`;
      text += `Mohon info ketersediaannya ya, terima kasih!`;

      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
