(function () {
  const STORAGE_KEY = "lab-site-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  let faviconLink = document.getElementById("favicon");
  const faviconSrc = faviconLink ? faviconLink.getAttribute("href") : null;
  const faviconType = faviconLink ? faviconLink.getAttribute("type") : null;
  let invertedFaviconCache = null;

  // some browsers (Firefox, and often Chrome) won't refetch/redraw the tab
  // icon just because a <link rel="icon">'s href attribute mutated in place;
  // swapping in a brand-new link element reliably forces a repaint
  function setFaviconHref(href) {
    if (!faviconLink) return;
    const newLink = document.createElement("link");
    newLink.id = "favicon";
    newLink.rel = "icon";
    if (faviconType) newLink.type = faviconType;
    newLink.href = href;
    faviconLink.replaceWith(newLink);
    faviconLink = newLink;
  }

  function invertFavicon(callback) {
    if (invertedFaviconCache) {
      callback(invertedFaviconCache);
      return;
    }
    const img = new Image();
    img.onload = function () {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        ctx.putImageData(imageData, 0, 0);
        invertedFaviconCache = canvas.toDataURL("image/png");
        callback(invertedFaviconCache);
      } catch (e) {
        // canvas may be tainted (e.g. cross-origin logo); fall back to original
        callback(null);
      }
    };
    img.onerror = function () {
      callback(null);
    };
    img.src = faviconSrc;
  }

  // browser favicons aren't affected by CSS filters, so invert the pixels
  // via canvas to match the same color-flip applied to the on-page logo
  function updateFavicon(theme) {
    if (!faviconLink || !faviconSrc) return;
    if (theme === "dark") {
      invertFavicon(function (dataUrl) {
        setFaviconHref(dataUrl || faviconSrc);
      });
    } else {
      setFaviconHref(faviconSrc);
    }
  }

  // the favicon tracks the OS/browser color scheme directly and is
  // intentionally independent of the page's own light/dark toggle below,
  // since a tab icon should match the system chrome around it, not
  // whichever theme the user happens to have picked for the page content
  function updateFaviconForSystemTheme() {
    const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    updateFavicon(isDark ? "dark" : "light");
  }

  updateFaviconForSystemTheme();

  if (window.matchMedia) {
    const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (systemThemeQuery.addEventListener) {
      systemThemeQuery.addEventListener("change", updateFaviconForSystemTheme);
    } else if (systemThemeQuery.addListener) {
      systemThemeQuery.addListener(updateFaviconForSystemTheme); // Safari < 14
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    } else {
      applyTheme("light");
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    storeTheme(next);
  }

  initTheme();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
})();
