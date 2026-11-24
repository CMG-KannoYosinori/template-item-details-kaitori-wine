document.addEventListener("DOMContentLoaded", function () {
  var DURATION = 250;

  function slideUp(el) {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight; // reflow
    el.style.transition = "height " + DURATION + "ms ease, padding " + DURATION + "ms ease";
    el.style.height = "0";
    el.style.paddingTop = "0";
    el.style.paddingBottom = "0";

    window.setTimeout(function () {
      el.classList.remove("open");
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("transition");
    }, DURATION);
  }

  function slideDown(el) {
    el.classList.add("open");
    el.style.display = "block";
    var height = el.offsetHeight;
    el.style.height = "0";
    el.style.paddingTop = "0";
    el.style.paddingBottom = "0";
    el.offsetHeight; // reflow
    el.style.transition = "height " + DURATION + "ms ease, padding " + DURATION + "ms ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");

    window.setTimeout(function () {
      el.style.removeProperty("height");
      el.style.removeProperty("transition");
    }, DURATION);
  }

  // 初期状態の同期（.kaitori-wine-accordion_menu.open の有無に合わせる）
  document.querySelectorAll(".kaitori-wine-accordion_menu").forEach(function (menu) {
    var isOpen = menu.classList.contains("open");
    menu.style.display = isOpen ? "block" : "none";
    var accordion = menu.previousElementSibling;
    if (accordion && accordion.classList.contains("kaitori-wine-accordion")) {
      accordion.classList.toggle("is-open", isOpen);
    }
  });

  // クリック時の開閉
  document.querySelectorAll(".kaitori-wine-accordion").forEach(function (accordion) {
    accordion.addEventListener("click", function () {
      var menu = accordion.nextElementSibling;
      if (!menu || !menu.classList.contains("kaitori-wine-accordion_menu")) return;

      var isOpen = accordion.classList.toggle("is-open");
      if (isOpen) {
        slideDown(menu);
      } else {
        slideUp(menu);
      }
    });
  });
});
