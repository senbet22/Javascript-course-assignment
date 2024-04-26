import { PRODUCTS_URL } from '../settings.js';

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

function displayProducts(products) {
    const container = document.querySelector('.products');
    container.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        /* Added an if statement to filter only Male jackets. */
        if (product.gender === 'Female') {
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

            // pr.querySelector('h5').textContent = product.description;
            /* Appends alle the code above to HTML. */
            container.appendChild(pr);

        }
    }



}
async function initializeProducts() {
    const products = await fetchProducts(PRODUCTS_URL);
    displayProducts(products)
}

initializeProducts();


