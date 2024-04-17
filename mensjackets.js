import { PRODUCTS_URL } from './settings.js';

async function fetchProducts(url) {

    let data = await fetch(url);
    let products = await data.json();
    console.log(products);


    const container = document.querySelector('.products');
    container.innerHTML = '';

    for (let i = 0; i < products.length; i++) {

        const product = products[i];

        if (products[i].gender === 'Male') {
            const container = document.querySelector('.products');

            const template = document.querySelector('#product');
            const pr = template.content.cloneNode(true);

            pr.querySelector('h2').textContent = product.title;
            if (product.onSale) {
                pr.querySelector('.detail p').innerHTML = `<del>${product.price}</del> ${product.discountedPrice}`;
            } else {
                pr.querySelector('.detail p').textContent = product.price;

            }

            /* Add a function changeColor that makes new price Red */

            /* Imports images from API to the clone div*/
            pr.querySelector('#mensImg').src = product.image;

            pr.querySelector('h5').textContent = product.description;
            /*   Appends alle the code above to HTML. */
            container.appendChild(pr);
        }

    }
};
fetchProducts('https://api.noroff.dev/api/v1/rainy-days');