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
      pr.querySelector('.detail p').textContent = product.price;

    }
    pr.querySelector('#jacket-img').src = product.image;

    pr.querySelector('#cart-button-id').onclick = () => {
      const cart = localStorage.getItem("cart")
      if (cart == null) {
        localStorage.setItem("cart", JSON.stringify([product]))
      } else {
        var parsedCart = JSON.parse(cart)
        parsedCart = [...parsedCart, product]
        localStorage.setItem("cart", JSON.stringify(parsedCart))

      }

      renderShoppingCart()
    }
    /* Appends alle the code above to HTML. */
    container.appendChild(pr);

  }
}

async function initializeProducts() {
  const products = await fetchProducts(PRODUCTS_URL);
  displayProducts(products)
}

initializeProducts();



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
  cartItemContainer.innerHTML = '';


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
        pr.querySelector('.cart-item-price').textContent = product.price;

      }
      // Remove button in cart
      const removeButton = pr.querySelector('.remove-btn');
      removeButton.addEventListener('click', () => {
        removeFromCart(product.id)
      })
      cartItemContainer.appendChild(pr);
    }
  } else {
    cartItemContainer.innerHTML = '<p>Your cart is empty.</p>';
  }
}
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderShoppingCart();
}


let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

if (cartItems != null) {
  if (cartItems[product.id] === undefined) {
    cartItems[product.id] = { ...product, inCart: 1 };
  } else {
    cartItems[product.id].inCart += 1;
  }
} else {
  product.inCart = 1;
  cartItems = {
    [product.id]: { ...product, inCart: 1 }
  };
}

localStorage.setItem("productsInCart", JSON.stringify(cartItems));












// function updateCartTotal() {
//   const cartItemContainer = document.querySelector('.list-cart');
//   const cartTables = cartItemContainer.querySelectorAll('.cart-table');

//   cartTables.forEach(cartTable => {
//     const cartItems = cartTable.querySelectorAll('.cart-item');

//     cartItems.forEach(cartItem => {
//       const priceElement = cartItem.querySelector('.cart-item-price');
//       const quantityElement = cartItem.querySelector('.cart-quantity-input');

//       const price = parseFloat(priceElement.innerText.replace('$', ''))
//       const quantity = quantityElement.value
//       console.log(price * quantity)
//     });
//   });
// }



