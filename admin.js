// ==========================================================================
// ADMIN / OWNER DASHBOARD - ASTHARIA LAB
// ==========================================================================

// TODO: Ganti PIN ini sebelum website dionlinekan, dan jangan tulis PIN baru di halaman mana pun.
const DEFAULT_PIN = "1234";
const STORAGE_ARTWORKS_KEY = "vexel_portfolio_artworks";
const STORAGE_SETTINGS_KEY = "astharia_lab_settings"; // harus sama dengan app.js
const SESSION_AUTH_KEY = "astharia_admin_authenticated";

// Default Initial Works
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
  phone: "6281234567890", // TODO: ganti dengan nomor WhatsApp asli Astharia Lab
  bio: "Hazukii adalah desainer grafis asal Kediri yang fokus membuat poster dan desain visual untuk media sosial. Karyanya menonjolkan tipografi yang berani dan tampilan yang estetik — saat ini membuka jasa desain poster acara, konten Instagram, dan promosi."
};

let artworks = [];
let settings = {};
let currentImageDataUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  loadData();
  setupAuth();
  setupTabs();
  setupUpload();
  setupSettings();
  renderAdminWorks();
  updateDashboardStats();
});

// Authentication Guard
function checkAuth() {
  const isAuth = sessionStorage.getItem(SESSION_AUTH_KEY) === "true";
  const loginModal = document.getElementById("loginModal");
  if (!isAuth) {
    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");
  } else {
    loginModal.classList.add("hidden");
    loginModal.classList.remove("flex");
  }
}

function setupAuth() {
  const loginForm = document.getElementById("loginForm");
  const pinInput = document.getElementById("pinInput");
  const btnLogout = document.getElementById("btnLogout");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (pinInput.value === DEFAULT_PIN) {
      sessionStorage.setItem(SESSION_AUTH_KEY, "true");
      checkAuth();
      showToast("Selamat datang di Dashboard Pemilik!", "check");
    } else {
      showToast("PIN salah, silakan coba lagi.", "warning");
      pinInput.value = "";
      pinInput.focus();
    }
  });

  btnLogout.addEventListener("click", () => {
    if (confirm("Kunci dashboard pemilik sekarang?")) {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
      checkAuth();
      showToast("Anda telah keluar.", "check");
    }
  });
}

// Load Data
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

function updateDashboardStats() {
  document.getElementById("statTotal").textContent = artworks.length;
  document.getElementById("tabCountWorks").textContent = artworks.length;
  document.getElementById("statPhone").textContent = settings.phone || "6281234567890";
  document.getElementById("statStudioName").textContent = settings.brandName || "Astharia Lab";
  document.getElementById("headerBrandSubtitle").textContent = `Kelola Portofolio • ${settings.brandName}`;
}

// Tab Switching
function setupTabs() {
  const tabUpload = document.getElementById("tabBtnUpload");
  const tabManage = document.getElementById("tabBtnManage");
  const tabSettings = document.getElementById("tabBtnSettings");

  tabUpload.addEventListener("click", () => switchTab("upload"));
  tabManage.addEventListener("click", () => switchTab("manage"));
  tabSettings.addEventListener("click", () => switchTab("settings"));
}

window.switchTab = function(tabName) {
  const tabs = {
    upload: { btn: document.getElementById("tabBtnUpload"), content: document.getElementById("tabContentUpload") },
    manage: { btn: document.getElementById("tabBtnManage"), content: document.getElementById("tabContentManage") },
    settings: { btn: document.getElementById("tabBtnSettings"), content: document.getElementById("tabContentSettings") },
  };

  Object.keys(tabs).forEach(k => {
    if (k === tabName) {
      tabs[k].btn.className = "admin-tab active px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 bg-sky-500 text-white shadow-lg shadow-sky-500/25";
      tabs[k].content.classList.remove("hidden");
    } else {
      tabs[k].btn.className = "admin-tab px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300";
      tabs[k].content.classList.add("hidden");
    }
  });

  if (tabName === "manage") {
    renderAdminWorks();
  }
};

// ==========================================================================
// Upload Logic
// ==========================================================================
function setupUpload() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const previewContainer = document.getElementById("previewContainer");
  const dropzoneContent = document.getElementById("dropzoneContent");
  const imagePreview = document.getElementById("imagePreview");
  const btnRemoveImage = document.getElementById("btnRemoveImage");
  const toggleUrlInput = document.getElementById("toggleUrlInput");
  const imageUrlInput = document.getElementById("imageUrlInput");

  dropzone.addEventListener("click", (e) => {
    if (e.target.closest("#btnRemoveImage")) return;
    fileInput.click();
  });

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) {
      showToast("Harap pilih file gambar (JPG, PNG, atau WEBP)", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      currentImageDataUrl = event.target.result;
      imagePreview.src = currentImageDataUrl;
      dropzoneContent.classList.add("hidden");
      previewContainer.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }

  btnRemoveImage.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageDataUrl = "";
    fileInput.value = "";
    imagePreview.src = "";
    previewContainer.classList.add("hidden");
    dropzoneContent.classList.remove("hidden");
  });

  toggleUrlInput.addEventListener("click", () => {
    imageUrlInput.classList.toggle("hidden");
    if (!imageUrlInput.classList.contains("hidden")) imageUrlInput.focus();
  });

  imageUrlInput.addEventListener("input", (e) => {
    if (e.target.value.trim().startsWith("http")) {
      currentImageDataUrl = e.target.value.trim();
      imagePreview.src = currentImageDataUrl;
      dropzoneContent.classList.add("hidden");
      previewContainer.classList.remove("hidden");
    }
  });

  const uploadForm = document.getElementById("ownerUploadForm");
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("artworkTitle").value.trim();
    const category = document.getElementById("artworkCategory").value;
    const client = document.getElementById("artworkClient").value.trim();
    const tagsInput = document.getElementById("artworkTags").value.trim();
    const desc = document.getElementById("artworkDesc").value.trim();
    const finalImage = currentImageDataUrl || imageUrlInput.value.trim();

    if (!finalImage) {
      showToast("Harap upload file gambar atau masukkan URL gambar poster!", "warning");
      return;
    }

    const tags = tagsInput ? tagsInput.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) : [category.toLowerCase()];

    const newArtwork = {
      id: "poster-" + Date.now(),
      title,
      category,
      client: client || "Client Commission",
      tags,
      desc,
      image: finalImage,
      date: new Date().toISOString().split("T")[0],
      isDefault: false
    };

    artworks.unshift(newArtwork);
    localStorage.setItem(STORAGE_ARTWORKS_KEY, JSON.stringify(artworks));
    updateDashboardStats();

    // Reset Form
    uploadForm.reset();
    currentImageDataUrl = "";
    previewContainer.classList.add("hidden");
    dropzoneContent.classList.remove("hidden");
    imageUrlInput.classList.add("hidden");

    showToast("Karya baru berhasil diterbitkan ke portofolio!", "check");
    switchTab("manage");
  });
}

// ==========================================================================
// Manage Works (Render & Delete)
// ==========================================================================
function renderAdminWorks() {
  const container = document.getElementById("adminWorksGrid");
  if (!container) return;

  if (artworks.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400">
        <p>Belum ada karya yang diunggah.</p>
        <button onclick="switchTab('upload')" class="mt-3 px-4 py-2 bg-sky-500 text-white rounded-xl text-xs font-semibold">Upload Sekarang</button>
      </div>
    `;
    return;
  }

  container.innerHTML = artworks.map(item => `
    <div class="bg-dark-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div>
        <div class="relative aspect-[3/4] overflow-hidden bg-dark-900">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="w-full h-full object-cover">
          <div class="absolute top-2.5 left-2.5 bg-dark-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-sky-400 border border-sky-500/20">
            ${escapeHTML(item.category)}
          </div>
        </div>
        <div class="p-4">
          <span class="text-[11px] text-slate-400">${escapeHTML(item.client || item.date)}</span>
          <h4 class="font-display font-bold text-white text-sm mt-0.5 line-clamp-1">${escapeHTML(item.title)}</h4>
          <p class="text-xs text-slate-400 mt-1 line-clamp-2">${escapeHTML(item.desc || "Tidak ada deskripsi.")}</p>
        </div>
      </div>
      <div class="p-3 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
        <span class="text-[10px] text-slate-500 font-mono">ID: ${item.id.slice(-6)}</span>
        <button onclick="deleteArtwork('${item.id}')" class="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-semibold transition flex items-center gap-1">
          <i class="ph-bold ph-trash"></i> Hapus
        </button>
      </div>
    </div>
  `).join("");
}

window.deleteArtwork = function(id) {
  if (confirm("Yakin ingin menghapus karya ini dari galeri portofolio?")) {
    artworks = artworks.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_ARTWORKS_KEY, JSON.stringify(artworks));
    updateDashboardStats();
    renderAdminWorks();
    showToast("Karya berhasil dihapus.", "check");
  }
};

// ==========================================================================
// Settings Form
// ==========================================================================
function setupSettings() {
  document.getElementById("settingsBrandName").value = settings.brandName || DEFAULT_SETTINGS.brandName;
  document.getElementById("settingsDesignerName").value = settings.designerName || DEFAULT_SETTINGS.designerName;
  document.getElementById("settingsPhone").value = settings.phone || DEFAULT_SETTINGS.phone;
  document.getElementById("settingsBio").value = settings.bio || DEFAULT_SETTINGS.bio;

  const form = document.getElementById("adminSettingsForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    settings.brandName = document.getElementById("settingsBrandName").value.trim() || DEFAULT_SETTINGS.brandName;
    settings.designerName = document.getElementById("settingsDesignerName").value.trim() || DEFAULT_SETTINGS.designerName;
    settings.phone = document.getElementById("settingsPhone").value.trim() || DEFAULT_SETTINGS.phone;
    settings.bio = document.getElementById("settingsBio").value.trim() || DEFAULT_SETTINGS.bio;

    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    updateDashboardStats();
    showToast("Pengaturan profil & kontak berhasil diperbarui!", "check");
  });

  document.getElementById("btnResetData").addEventListener("click", () => {
    if (confirm("Kembalikan seluruh data galeri dan pengaturan ke sampel awal?")) {
      artworks = [...INITIAL_ARTWORKS];
      settings = { ...DEFAULT_SETTINGS };
      localStorage.setItem(STORAGE_ARTWORKS_KEY, JSON.stringify(artworks));
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
      updateDashboardStats();
      setupSettings();
      renderAdminWorks();
      showToast("Data telah direset ke bawaan awal.", "check");
    }
  });
}

// Helpers
function showToast(message, type = "check") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMessage");
  const iconEl = document.getElementById("toastIcon");

  msgEl.textContent = message;
  if (type === "warning") {
    iconEl.className = "w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg";
    iconEl.innerHTML = '<i class="ph-bold ph-warning"></i>';
  } else {
    iconEl.className = "w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg";
    iconEl.innerHTML = '<i class="ph-bold ph-check"></i>';
  }

  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 3500);
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
