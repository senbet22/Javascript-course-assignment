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




// Product display from API
function displayProducts(products) {
  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const template = document.querySelector('#product');
    const pr = template.content.cloneNode(true);

    /* Imports Price from API and checks if a product is Discounted. */
    pr.querySelector('h2').textContent = product.title;
    if (product.onSale) {
      pr.querySelector('.detail p').innerHTML = `<del>${product.price}</del> <span class="discounted-price">${product.discountedPrice}</span>`;
    } else {
      pr.querySelector('.detail p').textContent = product.price;

    }

    /* Imports images from API to the clone div*/
    pr.querySelector('#jacket-img').src = product.image;


    // pr.querySelector('h3').textContent = product.description;

    /* Appends alle the code above to HTML. */
    container.appendChild(pr);

  }
}



const addToCartButtons = document.getElementsByClassName('btn-add-to-cart')
for (var i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
  console.log('click')
}

async function initializeProducts() {
  const products = await fetchProducts(PRODUCTS_URL);
  displayProducts(products)
}










initializeProducts();



// Shopping cart section  - Open and close cart.
let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

cartIcon.addEventListener('click', () => {
  body.classList.toggle('showCart')
});
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})





// Removes item from cart
const removeCartItemButton = document.getElementsByClassName('remove-btn');
console.log(removeCartItemButton)
for (let i = 0; i < removeCartItemButton.length; i++) {
  const button = removeCartItemButton[i];
  button.addEventListener('click', function (event) {
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
  })
}

function updateCartTotal() {
  const cartItemContainer = document.querySelector('.list-cart');
  const cartTables = cartItemContainer.querySelectorAll('.cart-table');

  cartTables.forEach(cartTable => {
    const cartItems = cartTable.querySelectorAll('.cart-item');

    cartItems.forEach(cartItem => {
      const priceElement = cartItem.querySelector('.cart-item-price');
      const quantityElement = cartItem.querySelector('.cart-quantity-input');

      const price = parseFloat(priceElement.innerText.replace('$', ''))
      const quantity = quantityElement.value
      console.log(price * quantity)
    });
  });
}



