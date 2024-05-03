import { PRODUCTS_URL } from './settings.js';

async function fetchProducts(url) {

  try {
    showLoader()
    let response = await fetch(url);
    await delay(800);
    if (!response.ok) throw new Error("Failed to fetch data from the API");
    let products = await response.json();
    hideLoader()
    return products;
  } catch (err) {
    hideLoader()
    console.warn(err.message);
  }
}
function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'inline-block';
}
function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }






// Product display from API + creates a clone div using template.
function displayProducts(products) {
  const container = document.querySelector('.products');
  container.innerHTML = '';


  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const template = document.querySelector('#product');
    const pr = template.content.cloneNode(true);


    /* Imports Price from API and checks if a product is Discounted - Imports images from API to the clone div */
    pr.querySelector('h2').textContent = product.title;

    if (product.onSale) {
      pr.querySelector('.detail p').innerHTML = `<del>${product.price}</del> <span class="discounted-price">${product.discountedPrice}</span>`;
    } else {
      pr.querySelector('.detail p').textContent = product.price.toFixed(2);

    }
    pr.querySelector('#jacket-img').src = product.image;



    pr.querySelector('.btn-add-to-cart').onclick = () => {
      const cart = localStorage.getItem("cart")
      const parsedCart = cart ? JSON.parse(cart) : [];
      const productExists = parsedCart.findIndex(item => item.id === product.id);

      if (productExists !== -1) {
        parsedCart[productExists].price += parseFloat(product.price);
        parsedCart[productExists].discountedPrice += parseFloat(product.discountedPrice);
      } else {
        parsedCart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(parsedCart))

      renderShoppingCart()

      // Opens the cart everytime an Item is added.
      body.classList.add('showCart');
    }



    const productLink = pr.querySelector('#jacket-api');
    productLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevents default behavior of <a> tag.


      // Store product details in URL parameters
      const url = new URL('../Javascript-course-assignment/product/index.html', window.location.href);
      url.searchParams.append('title', product.title);
      url.searchParams.append('description', product.description);
      url.searchParams.append('price', product.price.toFixed(2));
      url.searchParams.append('image', product.image);

      // Links to the product page.
      window.location.href = url.href;
    });
    /* Appends alle the code above to HTML. */
    container.appendChild(pr);

  }
}


// The filtering interfered with the cart in product page so i mae this if statement to stop it from running on product page.
if (window.location.pathname == '/Javascript-course-assignment/index.html') {

  // This section filters what products are displayed based on gender.
  function filterAndDisplayProducts() {
    const selectElement = document.getElementById("list");
    const selectedValue = selectElement.value;

    // Fetch products based on the selected option
    fetchProducts(PRODUCTS_URL)
      .then(products => {
        let filteredProducts = products;

        if (selectedValue === "female") {
          filteredProducts = products.filter(product => product.gender === 'Female');
        } else if (selectedValue === "male") {
          filteredProducts = products.filter(product => product.gender === 'Male');
        }

        // Calls the function function displayProducts and passes the filtered products.
        displayProducts(filteredProducts);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }

  // event listener that is triggered based on change to the select: options.
  document.getElementById("list").addEventListener("change", filterAndDisplayProducts);
}






async function initializeProducts() {
  const products = await fetchProducts(PRODUCTS_URL);
  displayProducts(products)
}
initializeProducts();
renderShoppingCart() // Makes sure that the cart contents are displayed even when site is refreshed







// Shopping cart- Open and close cart.
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');

cartIcon.addEventListener('click', () => {
  body.classList.toggle('showCart')
});

closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})










// Api's jacket price, title and img rendered to the cart using localstorage.
function renderShoppingCart() {
  const cart = localStorage.getItem("cart")
  const cartItemContainer = document.querySelector('.cartItemContainer');
  const cartIconSpan = document.querySelector('.cart-icon span');
  cartItemContainer.innerHTML = '';


  let cartItemCount = 0;
  let totalPrice = 0;

  if (cart) {
    var parsedCart = JSON.parse(cart)
    for (const product of parsedCart) {
      const template = document.querySelector('#cart-item-template');
      const pr = template.content.cloneNode(true);

      pr.querySelector('.cart-item-title').textContent = product.title;
      pr.querySelector('.cart-item-img').src = product.image;

      const sizeSelect = pr.querySelector('.cart-item-sizes');
      sizeSelect.innerHTML = "";

      // Imports sizes from API and puts them inside 'option' list. 
      for (const size of product.sizes) {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      }
      if (product.selectedSize) {
        sizeSelect.value = product.selectedSize;
      }
      // Event listener that remmebers what size was selected.
      sizeSelect.addEventListener('change', (event) => {
        product.selectedSize = event.target.value;
        updateLocalStorage(parsedCart);
      });

      if (product.onSale) {
        pr.querySelector('.cart-item-price').innerHTML = `<del>${product.price.toFixed(2)}</del> <span class="discounted-price">${product.discountedPrice.toFixed(2)}</span>`;
      } else {
        pr.querySelector('.cart-item-price').textContent = product.price.toFixed(2);

      }



      // Remove button in cart
      const removeButton = pr.querySelector('.remove-btn');
      removeButton.addEventListener('click', () => {
        removeFromCart(product.id)
      })
      cartItemContainer.appendChild(pr);
      cartItemCount++; // adds +1 to the cart-number everytime a product is added.

      // Checks if the item in Cart is on discount
      if (!product.onSale) {
        totalPrice += parseFloat(product.price.toFixed(2));
      } else {
        totalPrice += parseFloat(product.discountedPrice.toFixed(2));
      }
    }
  }

  // Displays total price with two decimals.
  const cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = '$' + totalPrice.toFixed(2);

  cartIconSpan.textContent = cartItemCount;
}


// Removes items from cart/localStorage.
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderShoppingCart();
}


// If theres items in cart, takes you to checkout if not alert "Your cart i empty".
const checkoutButton = document.querySelector('.checkOut');

checkoutButton.addEventListener('click', () => {
  const cart = localStorage.getItem("cart");
  const parsedCart = cart ? JSON.parse(cart) : [];

  if (parsedCart.length > 0) {
    window.location.href = '../Javascript-course-assignment/checkout/index.html';
  } else {
    alert("Your Cart Is Empty");
  }
});





// Makes sure that cart data is always updated/remembered, f.eks if you select size.
function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}



