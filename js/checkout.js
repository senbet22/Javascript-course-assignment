
// function renderCheckoutItems() {
//     const cart = localStorage.getItem("cart");
//     const checkoutTableBody = document.querySelector('.checkout-page table tbody');
//     checkoutTableBody.innerHTML = '';

//     let subtotal = 0;

//     if (cart) {
//         const parsedCart = JSON.parse(cart);
//         parsedCart.forEach(product => {
//             const productSubtotal = product.onSale ? parseFloat(product.discountedPrice) : parseFloat(product.price);
//             subtotal += productSubtotal;

//             const cartItemTemplate = document.querySelector('#cart-item-template');
//             const row = cartItemTemplate.content.cloneNode(true);

//             const cartInfo = row.querySelector('.cart-info');
//             cartInfo.querySelector('.cart-item-img').src = product.image;
//             cartInfo.querySelector('.cart-item-title').textContent = product.title;

//             const removeButton = row.querySelector('.remove-btn');
//             removeButton.addEventListener('click', () => removeFromCart(product.id));

//             const quantityInput = row.querySelector('.cart-quantity-input');
//             quantityInput.value = "1";

//             const priceCell = row.querySelector('.cart-item-price');
//             priceCell.textContent = `$${productSubtotal.toFixed(2)}`;

//             checkoutTableBody.appendChild(row);
//         });
//     }

//     let shipping = 15;
//     if (subtotal > 200) {
//         shipping = 0;
//     }


//     const subtotalElement = document.querySelector('.checkout-page .total-price table tr:nth-child(1) td:nth-child(2)');
//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

//     const shippingElement = document.querySelector('.checkout-page .total-price table tr:nth-child(2) td:nth-child(2)');
//     shippingElement.textContent = `$${shipping.toFixed(2)}`;

//     const totalElement = document.querySelector('.checkout-page .total-price table tr:nth-child(3) td:nth-child(2)');
//     const total = subtotal + shipping;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// renderCheckoutItems();
