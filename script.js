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

export function displayProducts(products) {
  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const template = document.querySelector('#product');
    const pr = template.content.cloneNode(true);

    /* Imports Price from API and checks if a product is Discounted. */
    pr.querySelector('h2').textContent = product.title;
    if (product.onSale) {
      pr.querySelector('.detail p').innerHTML = `<del>${product.price}</del> ${product.discountedPrice}`;
    } else {
      pr.querySelector('.detail p').textContent = product.price;

    }

    /* Imports images from API to the clone div*/
    pr.querySelector('#jacket-img').src = product.image;

    // pr.querySelector('h3').textContent = product.description;
    /* Appends alle the code above to HTML. */
    container.appendChild(pr);

  }

  // // Create product links
  // for (let i = 0; i < products.length; i++) {
  //   const product = products[i];
  //   const productLink = document.createElement('a');
  //   productLink.href = `../Javascript-course-assignment/product/index.html?id=${product.id}`;
  //   productLink.textContent = product.title; // Assuming 'title' is the correct property
  //   container.appendChild(productLink);
  // }
}
async function initializeProducts() {
  const products = await fetchProducts(PRODUCTS_URL);
  displayProducts(products)
}

initializeProducts();


















