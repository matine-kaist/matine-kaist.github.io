function swapToDefaultPhoto(img) {
  img.onerror = null;
  var d = document.createElement('div');
  d.className = img.className + ' member-photo--default';
  d.setAttribute('role', 'img');
  d.setAttribute('aria-label', img.alt);
  img.parentNode.replaceChild(d, img);
}

function swapToDefaultNewsImage(img) {
  img.onerror = null;
  var d = document.createElement('div');
  d.className = 'news-card-image-default';
  d.setAttribute('role', 'img');
  d.setAttribute('aria-label', img.alt);
  img.parentNode.replaceChild(d, img);
}

(function () {
  // Mobile hamburger toggle
  var toggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("nav-links--open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("nav-links--open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Wordmark → icon crossfade on scroll
  var header = document.querySelector(".site-header");
  var THRESHOLD = 72; // px scrolled before switching to icon

  if (header) {
    function onScroll() {
      if (window.scrollY > THRESHOLD) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // apply correct state on page load
  }
})();
