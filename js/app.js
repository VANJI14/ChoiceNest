/* =========================================================
   CHOICENEST - PRODUCT DATA
========================================================= */

const PRODUCTS = [

  {
    id: 1,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 4999,
    old: 6999,
    rating: 4.8,
    icon: "⌚",
    shop: "https://www.amazon.in/"
  },

  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    old: 3999,
    rating: 4.6,
    icon: "🎧",
    shop: "https://www.amazon.in/"
  },

  {
    id: 3,
    name: "Minimal Sneakers",
    category: "Fashion",
    price: 1999,
    old: 2999,
    rating: 4.5,
    icon: "👟",
    shop: "https://www.myntra.com/"
  },

  {
    id: 4,
    name: "Everyday Handbag",
    category: "Accessories",
    price: 1599,
    old: 2499,
    rating: 4.7,
    icon: "👜",
    shop: "https://www.myntra.com/"
  },

  {
    id: 5,
    name: "Vitamin C Serum",
    category: "Beauty",
    price: 699,
    old: 999,
    rating: 4.4,
    icon: "🧴",
    shop: "https://www.nykaa.com/"
  },

  {
    id: 6,
    name: "Modern Desk Lamp",
    category: "Home",
    price: 899,
    old: 1299,
    rating: 4.3,
    icon: "💡",
    shop: "https://www.amazon.in/"
  },

  {
    id: 7,
    name: "Premium Yoga Mat",
    category: "Fitness",
    price: 799,
    old: 1199,
    rating: 4.6,
    icon: "🧘",
    shop: "https://www.amazon.in/"
  },

  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    old: 2499,
    rating: 4.5,
    icon: "🔊",
    shop: "https://www.amazon.in/"
  },

  {
    id: 9,
    name: "Premium Laptop",
    category: "Electronics",
    price: 54999,
    old: 64999,
    rating: 4.8,
    icon: "💻",
    shop: "https://www.amazon.in/"
  },

  {
    id: 10,
    name: "Running Shoes",
    category: "Sports",
    price: 2299,
    old: 3499,
    rating: 4.6,
    icon: "👟",
    shop: "https://www.myntra.com/"
  },

  {
    id: 11,
    name: "Wireless Gaming Controller",
    category: "Gaming",
    price: 1999,
    old: 2999,
    rating: 4.5,
    icon: "🎮",
    shop: "https://www.amazon.in/"
  },

  {
    id: 12,
    name: "Classic Backpack",
    category: "Accessories",
    price: 1299,
    old: 1999,
    rating: 4.4,
    icon: "🎒",
    shop: "https://www.myntra.com/"
  }
];


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getWishlist() {

  return JSON.parse(
    localStorage.getItem("cn_wishlist") || "[]"
  );

}


function setWishlist(value) {

  localStorage.setItem(
    "cn_wishlist",
    JSON.stringify(value)
  );

}


function getCart() {

  return JSON.parse(
    localStorage.getItem("cn_cart") || "[]"
  );

}


function setCart(value) {

  localStorage.setItem(
    "cn_cart",
    JSON.stringify(value)
  );

}


function currentUser() {

  return JSON.parse(
    localStorage.getItem("cn_user") || "null"
  );

}


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

  const wishlistCount =
    document.getElementById("wishlistCount");

  const cartCount =
    document.getElementById("cartCount");

  const authButton =
    document.getElementById("authButton");


  const wishlist = getWishlist();

  const cart = getCart();

  const user = currentUser();


  if (wishlistCount) {

    wishlistCount.textContent =
      wishlist.length;

  }


  if (cartCount) {

    cartCount.textContent =
      cart.length;

  }


  if (authButton) {

    if (user) {

      const firstName =
        user.name
          ? user.name.split(" ")[0]
          : "Account";

      authButton.innerHTML = `
        <i class="fa-regular fa-user"></i>
        <span>Hi, ${firstName}</span>
        <i class="fa-solid fa-chevron-down account-arrow"></i>
      `;

      authButton.href =
        "pages/profile.html";

    }

  }

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const wishlist =
    getWishlist();

  const saved =
    wishlist.includes(product.id);


  const discount =
    Math.round(
      ((product.old - product.price) /
        product.old) * 100
    );


  return `

    <article class="product-card">

      <div class="discount-badge">
        ${discount}% OFF
      </div>


      <button
        class="heart-button ${saved ? "saved" : ""}"
        onclick="toggleWishlist(${product.id})"
        aria-label="Add to wishlist"
      >

        <i class="${
          saved
            ? "fa-solid"
            : "fa-regular"
        } fa-heart"></i>

      </button>


      <div class="product-image">

        <span class="product-emoji">
          ${product.icon}
        </span>

      </div>


      <div class="product-body">

        <small class="product-category">
          ${product.category}
        </small>


        <h3>
          ${product.name}
        </h3>


        <div class="rating">

          <span>
            ★
          </span>

          ${product.rating}

          <small>
            · Trusted pick
          </small>

        </div>


        <div class="price-row">

          <strong>
            ₹${product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹${product.old.toLocaleString("en-IN")}
          </del>

        </div>


        <div class="product-actions">

          <button
            class="view-button"
            onclick="saveRecent(${product.id})"
          >
            View
          </button>


          <a
            href="${product.shop}"
            target="_blank"
            rel="noopener noreferrer"
            class="shop-button"
            onclick="trackClick(${product.id})"
          >
            Shop
          </a>

        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function renderFeatured(
  list = PRODUCTS.slice(0, 4)
) {

  const element =
    document.getElementById(
      "featuredProducts"
    );


  if (!element) return;


  element.innerHTML =
    list.map(productCard).join("");

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

  let wishlist =
    getWishlist();


  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

  } else {

    wishlist.push(id);

  }


  setWishlist(wishlist);

  updateHeader();

  renderFeatured();

}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

  let cart =
    getCart();


  if (!cart.includes(id)) {

    cart.push(id);

  }


  setCart(cart);

  updateHeader();

}


/* =========================================================
   RECENT PRODUCTS
========================================================= */

function saveRecent(id) {

  let recent =
    JSON.parse(
      localStorage.getItem(
        "cn_recent"
      ) || "[]"
    );


  recent =
    recent.filter(
      item => item !== id
    );


  recent.unshift(id);


  localStorage.setItem(
    "cn_recent",
    JSON.stringify(
      recent.slice(0, 10)
    )
  );


  location.href =
    "pages/products.html";

}


/* =========================================================
   AFFILIATE CLICK TRACKING
========================================================= */

function trackClick(id) {

  const clicks =
    JSON.parse(
      localStorage.getItem(
        "cn_affiliate_clicks"
      ) || "[]"
    );


  clicks.push({

    productId: id,

    date:
      new Date().toISOString()

  });


  localStorage.setItem(
    "cn_affiliate_clicks",
    JSON.stringify(clicks)
  );

}


/* =========================================================
   SEARCH
========================================================= */

function performSearch(value) {

  const query =
    value.trim();


  if (!query) {

    goToProducts();

    return;

  }


  localStorage.setItem(
    "cn_search",
    query
  );


  window.location.href =
    "pages/products.html";

}


function setupSearch() {

  const headerSearch =
    document.getElementById(
      "headerSearch"
    );


  const headerButton =
    document.getElementById(
      "headerSearchBtn"
    );


  const heroSearch =
    document.getElementById(
      "heroSearch"
    );


  const heroButton =
    document.getElementById(
      "heroSearchBtn"
    );


  if (headerButton) {

    headerButton.addEventListener(
      "click",
      () => {

        performSearch(
          headerSearch.value
        );

      }
    );

  }


  if (headerSearch) {

    headerSearch.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          performSearch(
            headerSearch.value
          );

        }

      }
    );

  }


  if (heroButton) {

    heroButton.addEventListener(
      "click",
      () => {

        performSearch(
          heroSearch.value
        );

      }
    );

  }


  if (heroSearch) {

    heroSearch.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          performSearch(
            heroSearch.value
          );

        }

      }
    );

  }


  document
    .querySelectorAll(
      "[data-search]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          performSearch(
            button.dataset.search
          );

        }
      );

    });

}


/* =========================================================
   CATEGORY NAVIGATION
========================================================= */

function setupCategories() {

  document
    .querySelectorAll(
      ".category-card"
    )
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          const category =
            card.dataset.category;


          localStorage.setItem(
            "cn_category",
            category
          );


          window.location.href =
            "pages/products.html";

        }
      );

    });

}


/* =========================================================
   CATEGORY HORIZONTAL SCROLL
========================================================= */

function scrollCategories(direction) {

  const wrapper =
    document.getElementById(
      "categoriesWrapper"
    );


  if (!wrapper) return;


  wrapper.scrollBy({

    left:
      direction * 300,

    behavior:
      "smooth"

  });

}


/* =========================================================
   HERO SLIDER
========================================================= */

let currentSlide = 0;

let slideTimer;


function showSlide(index) {

  const slides =
    document.querySelectorAll(
      ".hero-slide"
    );


  const dots =
    document.querySelectorAll(
      ".hero-dot"
    );


  if (!slides.length) return;


  if (
    index >= slides.length
  ) {

    currentSlide = 0;

  } else if (
    index < 0
  ) {

    currentSlide =
      slides.length - 1;

  } else {

    currentSlide = index;

  }


  slides.forEach(
    (slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

    }
  );


  dots.forEach(
    (dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

    }
  );

}


function startHeroSlider() {

  clearInterval(
    slideTimer
  );


  slideTimer =
    setInterval(
      () => {

        showSlide(
          currentSlide + 1
        );

      },
      6000
    );

}


function setupHeroSlider() {

  const previous =
    document.getElementById(
      "heroPrev"
    );


  const next =
    document.getElementById(
      "heroNext"
    );


  if (previous) {

    previous.addEventListener(
      "click",
      () => {

        showSlide(
          currentSlide - 1
        );

        startHeroSlider();

      }
    );

  }


  if (next) {

    next.addEventListener(
      "click",
      () => {

        showSlide(
          currentSlide + 1
        );

        startHeroSlider();

      }
    );

  }


  document
    .querySelectorAll(
      ".hero-dot"
    )
    .forEach(dot => {

      dot.addEventListener(
        "click",
        () => {

          showSlide(
            Number(
              dot.dataset.slide
            )
          );

          startHeroSlider();

        }
      );

    });


  startHeroSlider();

}


/* =========================================================
   DEAL COUNTDOWN
========================================================= */

function startCountdown() {

  let totalSeconds =
    8 * 60 * 60 +
    45 * 60 +
    32;


  function updateCountdown() {

    if (
      totalSeconds <= 0
    ) {

      totalSeconds =
        24 * 60 * 60;

    }


    const hours =
      Math.floor(
        totalSeconds / 3600
      );


    const minutes =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    const seconds =
      totalSeconds % 60;


    const h =
      document.getElementById(
        "dealHours"
      );


    const m =
      document.getElementById(
        "dealMinutes"
      );


    const s =
      document.getElementById(
        "dealSeconds"
      );


    if (h) {

      h.textContent =
        String(hours)
          .padStart(2, "0");

    }


    if (m) {

      m.textContent =
        String(minutes)
          .padStart(2, "0");

    }


    if (s) {

      s.textContent =
        String(seconds)
          .padStart(2, "0");

    }


    totalSeconds--;

  }


  updateCountdown();


  setInterval(
    updateCountdown,
    1000
  );

}


/* =========================================================
   CHAT BUTTON
========================================================= */

function setupChat() {

  const chatButton =
    document.getElementById(
      "chatButton"
    );


  if (!chatButton) return;


  chatButton.addEventListener(
    "click",
    () => {

      alert(
        "Hi! 👋 ChoiceNest support is here to help."
      );

    }
  );

}


/* =========================================================
   PRODUCT PAGE SUPPORT
========================================================= */

function renderProducts() {

  const element =
    document.getElementById(
      "products"
    );


  if (!element) return;


  let products =
    [...PRODUCTS];


  const searchInput =
    document.getElementById(
      "searchProducts"
    );


  const categoryFilter =
    document.getElementById(
      "categoryFilter"
    );


  const query =
    searchInput
      ? searchInput.value
          .toLowerCase()
          .trim()
      : "";


  const category =
    categoryFilter
      ? categoryFilter.value
      : "all";


  if (query) {

    products =
      products.filter(
        product => {

          const text =
            (
              product.name +
              " " +
              product.category
            ).toLowerCase();


          return text.includes(
            query
          );

        }
      );

  }


  if (
    category &&
    category !== "all"
  ) {

    products =
      products.filter(
        product =>
          product.category ===
          category
      );

  }


  if (!products.length) {

    element.innerHTML = `
      <div class="empty">
        <i class="fa-solid fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;

  }


  element.innerHTML =
    products.map(
      productCard
    ).join("");

}


/* =========================================================
   PRODUCT PAGE FILTERS
========================================================= */

function setupProductFilters() {

  const search =
    document.getElementById(
      "searchProducts"
    );


  const category =
    document.getElementById(
      "categoryFilter"
    );


  if (search) {

    search.addEventListener(
      "input",
      renderProducts
    );

  }


  if (category) {

    category.addEventListener(
      "change",
      renderProducts
    );

  }


  const savedSearch =
    localStorage.getItem(
      "cn_search"
    );


  const savedCategory =
    localStorage.getItem(
      "cn_category"
    );


  if (
    search &&
    savedSearch
  ) {

    search.value =
      savedSearch;

    localStorage.removeItem(
      "cn_search"
    );

  }


  if (
    category &&
    savedCategory
  ) {

    category.value =
      savedCategory;

    localStorage.removeItem(
      "cn_category"
    );

  }


  renderProducts();

}


/* =========================================================
   NAVIGATION
========================================================= */

function goToProducts() {

  window.location.href =
    "pages/products.html";

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateHeader();

    renderFeatured();

    setupSearch();

    setupCategories();

    setupHeroSlider();

    startCountdown();

    setupChat();

    setupProductFilters();

  }
);