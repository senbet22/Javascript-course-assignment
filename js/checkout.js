const removeCartItemButton = document.getElementsByClassName('remove-btn');
console.log(removeCartItemButton);
for (let i = 0; i < removeCartItemButton.length; i++) {
    const button = removeCartItemButton[i];
    button.addEventListener('click', function (event) {
        const buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
    });
}

function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-item')
}


/* Add a if statement that if subtotal >= $100 shipping $00. else shipping = $15 */