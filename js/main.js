document.addEventListener("DOMContentLoaded", function () {
  var currentSection = 0;
  var sections = document.querySelectorAll(".section");
  var navItems = document.querySelectorAll(".asideItem");
  var totalSections = sections.length;
  var isScrolling = false;

  function showSection(index) {
    sections.forEach((section, idx) => {
      if (idx === index) {
        section.style.opacity = 1
        section.style.zIndex = 1
      } else {
        section.style.opacity = 0
        section.style.zIndex = 0
      }
    });

    navItems.forEach((item, idx) => {
      if (idx === index) {
        item.style.backgroundColor = 'red'
      } else {
        item.style.backgroundColor = 'gray'
      }
    });
  }

  function handleScroll(event) {
    if (isScrolling) return;

    if (event.deltaY > 0 && currentSection < totalSections - 1) {
      isScrolling = true;
      currentSection++;
    } else if (event.deltaY < 0 && currentSection > 0) {
      isScrolling = true;
      currentSection--;
    }

    showSection(currentSection);

    setTimeout(() => {
      isScrolling = false;
    }, 600);
  }

  function handvarouch() {
    var startY = 0;

    window.addEventListener("touchstart", function (e) {
      startY = e.touches[0].clientY;
    });

    window.addEventListener("touchend", function (e) {
      const endY = e.changedTouches[0].clientY;
      if (isScrolling) return;

      if (startY > endY + 50 && currentSection < totalSections - 1) {
        isScrolling = true;
        currentSection++;
      } else if (startY < endY - 50 && currentSection > 0) {
        isScrolling = true;
        currentSection--;
      }

      showSection(currentSection);

      setTimeout(() => {
        isScrolling = false;
      }, 5000);
    });
  }

  navItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentSection = index;
      showSection(currentSection);
    });
  });

  window.addEventListener("wheel", handleScroll);
  handvarouch();

  showSection(currentSection);
  return () => window.removeEventListener("wheel", handleScroll);
});
