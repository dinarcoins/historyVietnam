document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll("aside li");
  const totalSections = sections.length;
  let isScrolling = false;

  function showSection(index) {
    sections.forEach((section, idx) => {
      if (idx === index) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    navItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
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

  function handleTouch() {
    let startY = 0;

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
  handleTouch();

  showSection(currentSection);
});