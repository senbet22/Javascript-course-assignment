document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const description = params.get('description');
    const price = params.get('price');
    const image = params.get('image');

    document.querySelector('h1').textContent = title;
    document.querySelector('.product-details').textContent = description;
    document.querySelector('h2').textContent = `$${price}`;
    document.querySelector('#MainImg').src = image;

    document.querySelector('#cart-button-id').addEventListener('click', () => {
        const product = {
            title: title,
            description: description,
            price: parseFloat(price),
            image: image
        };
        // Adds the product to the cart
        addToCart(product);
    });
});

function addToCart(product) {
    // You need to implement this function to add the product to the cart
    // This could involve updating the cart UI, saving the product to local storage, etc.
    // For now, let's just log the product to the console
    console.log('Product added to cart:', product);
}
