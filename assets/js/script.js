'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    const itemCategories = filterItems[i].dataset.category.split(" ");

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (itemCategories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
      }
    }

    for (let i = 0; i < navigationLinks.length; i++) {
      if (navigationLinks[i] === this) {
        navigationLinks[i].classList.add("active");
      } else {
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// ===== PRODUCT MODAL FUNCTIONALITY =====

const productModalContainer = document.querySelector("[data-product-modal-container]");
const productOverlay = document.querySelector("[data-product-overlay]");
const productModalClose = document.querySelector("[data-product-modal-close]");
const productInfoBtns = document.querySelectorAll("[data-product-info]");

// Product modal elements
const productModalImg = document.querySelector("[data-product-modal-img]");
const productModalTitle = document.querySelector("[data-product-modal-title]");
const productModalCategory = document.querySelector("[data-product-modal-category]");
const productModalDescription = document.querySelector("[data-product-modal-description]");
const productModalDownloads = document.querySelector("[data-product-modal-downloads]");

// Product modal toggle function
const productModalToggle = function () {
  if (productModalContainer) {
    productModalContainer.classList.toggle("active");
    productOverlay.classList.toggle("active");
  }
}

// Add click event to product info icons
if (productInfoBtns.length > 0) {
  for (let i = 0; i < productInfoBtns.length; i++) {
    productInfoBtns[i].addEventListener("click", function (e) {
      e.stopPropagation();

      // Find the parent product card
      const productCard = this.closest("[data-product-item]");
      if (!productCard) return;

      // Get product data
      const img = productCard.querySelector(".project-img img");
      const title = productCard.querySelector(".project-title");
      const category = productCard.querySelector(".project-category");
      const details = productCard.querySelector(".product-details");

      // Populate modal
      if (productModalImg && img) {
        productModalImg.src = img.src;
        productModalImg.alt = img.alt;
      }
      if (productModalTitle && title) {
        productModalTitle.textContent = title.textContent;
      }
      if (productModalCategory && category) {
        productModalCategory.textContent = category.textContent;
      }

      // Populate description
      if (productModalDescription && details) {
        const desc = details.querySelector(".product-description");
        productModalDescription.innerHTML = desc ? '<p>' + desc.textContent + '</p>' : '';
      }

      // Populate downloads
      if (productModalDownloads && details) {
        const downloadsSection = details.querySelector(".product-downloads");
        if (downloadsSection) {
          productModalDownloads.innerHTML = downloadsSection.innerHTML;
          productModalDownloads.style.display = 'block';
        } else {
          productModalDownloads.innerHTML = '';
          productModalDownloads.style.display = 'none';
        }
      }

      // Open modal
      productModalToggle();
    });
  }
}

// Close product modal
if (productModalClose) {
  productModalClose.addEventListener("click", productModalToggle);
}
if (productOverlay) {
  productOverlay.addEventListener("click", productModalToggle);
}
