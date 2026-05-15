document.addEventListener("DOMContentLoaded", function () {

  // ================= PRODUCTS DATA =================
  const productsData = [
    {
      id: 1,
      name: "Samsung Galaxy S23",
      category: "mobile",
      price: 998,
      img: "images/tech/mobile.jpg",
      description: "Latest Samsung smartphone"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "mobile",
      price: 1099,
      img: "images/tech/mobile2.jpg",
      description: "Apple latest iPhone"
    },
    {
      id: 3,
      name: "MacBook Pro",
      category: "laptop",
      price: 1999,
      img: "images/tech/laptop.jpg",
      description: "Apple powerful laptop"
    },
    {
      id: 4,
      name: "Dell XPS",
      category: "laptop",
      price: 1500,
      img: "images/tech/laptop.jpg",
      description: "Dell premium laptop"
    },
    {
      id: 5,
      name: "Sony Headphones",
      category: "headphones",
      price: 399,
      img: "images/tech/headphone.jpg",
      description: "Noise cancelling headphones"
    },
    {
      id: 6,
      name: "Canon Camera",
      category: "camera",
      price: 799,
      img: "images/tech/camera.jpg",
      description: "Professional DSLR camera"
    }
  ];


  // ================= LOCAL STORAGE =================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const productListing = document.getElementById("product-listing");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items-list");
  const totalPriceElement = document.getElementById("total-price");


  // ================= UPDATE CART COUNT =================
  function updateCartCount() {
    if (cartCount) {
      let total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.innerText = total;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }


  // ================= ADD TO CART =================
  function addToCart(product) {
    let existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert("Product added to cart");
  }


  // ================= ADD TO WISHLIST =================
  function addToWishlist(product) {
    let exists = wishlist.find(item => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist");
    }
  }


  // ================= RENDER PRODUCTS =================
  function renderProducts(products) {
    if (!productListing) return;

    productListing.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <div class="product-image">
          <img src="${product.img}" alt="${product.name}">
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>

          <div class="price-row">
            <span class="new-price">$${product.price}</span>
            <span class="old-price">$${product.price + 200}</span>
          </div>

          <div class="rating-row">
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>

            <span class="rating-value">8.2</span>
            <span class="dot">•</span>
            <span class="orders">154 orders</span>
            <span class="dot">•</span>
            <span class="shipping">Free Shipping</span>
          </div>

          <p class="product-desc">${product.description}</p>

          <a href="javascript:void(0)" class="view-details">
            View details
          </a>
        </div>

        <div class="wishlist-box">
          <i class="fa-regular fa-heart"></i>
        </div>

        <button class="add-to-cart-btn">Add to Cart</button>
      `;


      // Open details page
      card.addEventListener("click", function (e) {
        if (
          e.target.closest(".add-to-cart-btn") ||
          e.target.closest(".wishlist-box")
        ) {
          return;
        }

        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(product)
        );

        window.location.href = "product-details.html";
      });


      // Add to cart
      card.querySelector(".add-to-cart-btn")
        .addEventListener("click", function (e) {
          e.stopPropagation();
          addToCart(product);
        });


      // Wishlist
      card.querySelector(".wishlist-box")
        .addEventListener("click", function (e) {
          e.stopPropagation();
          addToWishlist(product);
        });

      productListing.appendChild(card);
    });
  }


  // ================= SIDEBAR FILTER =================
  function setupFilters() {
    const checkboxes = document.querySelectorAll(".filter-checkbox");

    if (!checkboxes.length) return;

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        let selectedCategories = [];

        checkboxes.forEach((cb) => {
          if (cb.checked) {
            selectedCategories.push(cb.value);
          }
        });

        let filteredProducts;

        if (selectedCategories.length > 0) {
          filteredProducts = productsData.filter(product =>
            selectedCategories.includes(product.category)
          );
        } else {
          filteredProducts = productsData;
        }

        renderProducts(filteredProducts);
      });
    });
  }


  // ================= NAVBAR CATEGORY FILTER =================
  function filterProductsByURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    let filteredProducts = productsData;

    if (category) {
      filteredProducts = productsData.filter(
        product => product.category === category
      );

      const checkbox = document.querySelector(
        `.filter-checkbox[value="${category}"]`
      );

      if (checkbox) {
        checkbox.checked = true;
      }
    }

    renderProducts(filteredProducts);
  }


  // ================= NAVBAR SEARCH BUTTON =================
  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const category =
        document.getElementById("categorySelect").value;

      if (category !== "") {
        window.location.href =
          `product-listing-page.html?category=${category}`;
      } else {
        window.location.href =
          "product-listing-page.html";
      }
    });
  }


  // ================= PRODUCT DETAILS PAGE =================
  const productTitle = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");
  const productDesc = document.getElementById("product-description");

  let selectedProduct =
    JSON.parse(localStorage.getItem("selectedProduct"));

  if (selectedProduct) {
    if (productTitle) productTitle.innerText = selectedProduct.name;
    if (productPrice) productPrice.innerText = "$" + selectedProduct.price;
    if (productImage) productImage.src = selectedProduct.img;
    if (productDesc) productDesc.innerText = selectedProduct.description;
  }


  // ================= CART PAGE =================
  function renderCartItems() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        "<h2>Your cart is empty</h2>";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.img}" width="100">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <p>Qty: ${item.quantity}</p>
        <button class="remove-btn">Remove</button>
      `;

      div.querySelector(".remove-btn")
        .addEventListener("click", function () {
          cart.splice(index, 1);

          localStorage.setItem(
            "cart",
            JSON.stringify(cart)
          );

          renderCartItems();
          updateCartCount();
        });

      cartItemsContainer.appendChild(div);
    });

    if (totalPriceElement) {
      totalPriceElement.innerText = "$" + total;
    }
  }


  // ================= CART ICON =================
  const cartIcon = document.getElementById("cart-icon");

  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }


  // ================= HOME PAGE RECOMMENDED ITEMS =================
  const homeCards = document.querySelectorAll(".cards");

  homeCards.forEach((card) => {
    card.addEventListener("click", function () {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.image,
        description:
          this.querySelector(".info").innerText
      };

      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(product)
      );

      window.location.href =
        "product-details.html";
    });
  });


  // ================= INIT =================
  updateCartCount();
  filterProductsByURL();
  renderCartItems();
  setupFilters();

});