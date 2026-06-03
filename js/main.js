/**
 * Extendura — Site config
 * Ubah URL sosial media di bawah (kosongkan url "" untuk menyembunyikan platform)
 */
const SITE_CONFIG = {
  whatsapp: "628976549508", // Format: kode negara tanpa +, contoh 62812...
  whatsappDisplay: "+62 897-6549-508", // Teks yang tampil di halaman (bebas format)
  email: "extendura@gmail.com",
  location: "Pekanbaru, Indonesia",
  social: [
    {
      id: "instagram",
      label: "Instagram",
      short: "IG",
      url: "https://www.instagram.com/extendura",
    },
    {
      id: "tiktok",
      label: "TikTok",
      short: "TT",
      url: "https://www.tiktok.com/@extendura",
    },
    {
      id: "youtube",
      label: "YouTube",
      short: "YT",
      url: "https://www.youtube.com/@extendura",
    },
    {
      id: "facebook",
      label: "Facebook",
      short: "FB",
      url: "https://www.facebook.com/extendura",
    },
    // Tambah platform lain — contoh LinkedIn (hapus // jika dipakai):
    // { id: "linkedin", label: "LinkedIn", short: "IN", url: "https://www.linkedin.com/company/extendura" },
    // { id: "threads", label: "Threads", short: "TH", url: "https://www.threads.net/@extendura" },
  ],
};

function renderSocialLinks(container, useFullLabel) {
  if (!container) return;
  const items = SITE_CONFIG.social.filter((s) => s.url && s.url.trim());
  container.innerHTML = items
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link social-link--${s.id}" aria-label="${s.label}">${useFullLabel ? s.label : s.short}</a>`
    )
    .join("");
}

(function () {
  "use strict";

  const waBase = `https://wa.me/${SITE_CONFIG.whatsapp}`;

  // Social media links (contact + footer + semua [data-social-mount])
  document.querySelectorAll("[data-social-mount]").forEach((el) => {
    const fullLabel = el.dataset.socialMount === "footer";
    renderSocialLinks(el, fullLabel);
  });

  // Email dari config
  document.querySelectorAll("[data-email-link]").forEach((el) => {
    if (SITE_CONFIG.email) {
      el.href = `mailto:${SITE_CONFIG.email}`;
      if (el.dataset.emailLink === "text") el.textContent = SITE_CONFIG.email;
    }
  });

  // Lokasi dari config
  const locationEl = document.getElementById("contactLocation");
  if (locationEl && SITE_CONFIG.location) {
    locationEl.textContent = SITE_CONFIG.location;
  }

  // Apply WhatsApp links + teks nomor
  const whatsappLink = document.getElementById("whatsappLink");
  if (whatsappLink) {
    whatsappLink.href = waBase;
    if (SITE_CONFIG.whatsappDisplay) {
      whatsappLink.textContent = SITE_CONFIG.whatsappDisplay;
    }
  }

  document.querySelectorAll("#whatsappFloat").forEach((el) => {
    el.href =
      waBase +
      "?text=" +
      encodeURIComponent("Halo Extendura, saya ingin konsultasi project video editing.");
  });

  // Header scroll state
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Hero video: hide if no source loads
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      portfolioItems.forEach((item) => {
        const platform = item.dataset.platform;
        const show = filter === "all" || platform === filter;
        item.classList.toggle("hidden", !show);
      });
    });
  });

  // Testimonial slider
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;
  let slideInterval;

  if (slides.length && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Testimoni ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
      dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
    }

    function next() {
      goToSlide(currentSlide + 1);
    }

    prevBtn?.addEventListener("click", () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener("click", () => next());

    slideInterval = setInterval(next, 6000);

    const slider = document.getElementById("testimonialSlider");
    slider?.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slider?.addEventListener("mouseleave", () => {
      slideInterval = setInterval(next, 6000);
    });
  }

  // Contact form → WhatsApp
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("email").value.trim();
    const platform = document.getElementById("platform").value;
    const message = document.getElementById("message").value.trim();

    const text = [
      "Halo Extendura! 👋",
      "",
      `Nama: ${name}`,
      `Kontak: ${contact}`,
      platform ? `Platform: ${platform}` : "",
      "",
      "Pesan:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${waBase}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // AOS init
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  // Lazy load images when added
  if ("IntersectionObserver" in window) {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              obs.unobserve(img);
            }
          });
        },
        { rootMargin: "100px" }
      );
      obs.observe(img);
    });
  }
})();
