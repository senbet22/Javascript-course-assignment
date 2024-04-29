import { PRODUCTS_URL } from './settings.js';

async function fetchProducts(url) {

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data from the API");
    let products = await response.json();
    console.log(products);
    return products;
  } catch (err) {
    console.warn(err.message);
  }
}






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

        const doublePrice = product.onSale ? parseFloat(product.discountedPrice) : parseFloat(product.price);
        parsedCart[productExists].price += doublePrice;
      } else {
        parsedCart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(parsedCart))

      renderShoppingCart()
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

      if (product.onSale) {
        pr.querySelector('.cart-item-price').innerHTML = `<del>${product.price}</del> <span class="discounted-price">${product.discountedPrice}</span>`;
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
