document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const description = params.get('description');
    const price = params.get('price');
    const image = params.get('image');

    document.querySelector('h1').textContent = title;
    document.querySelector('.product-details').textContent = description;
    document.querySelector('h2').textContent = `$${price}`;
    document.querySelector('.cart-item-img').src = image;

});

