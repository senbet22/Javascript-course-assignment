import { PRODUCTS_URL } from './settings.js';

async function fetchProducts(url) {

  let data = await fetch(url);
  let products = await data.json();
  console.log(products);
  // let products = response;

  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);

    const product = products[i];

    const container = document.querySelector('.products');
    //     container.innerHTML = container.innerHTML + `<a href="3_specific_jacket.html" class="row">
    //     <img src="images/model9.jpg" alt="">
    //     <div class="product-text">
    //         <h2>${product.title}</h2>
    //     </div>

    //     <div class="detail">
    //         <h3><i class="fa-solid fa-check"></i> Waterproof and breathable</h3>
    //         <h3><i class="fa-solid fa-check"></i> Lightweight and packable</h3>
    //         <h3><i class="fa-solid fa-check"></i> advanced wind-resistant technology</h3>
    //         <div class="color color-white"></div>
    //         <div class="color color-grey"></div>
    //         <div class="color color-darkblue"></div>
    //         <p>$169.00</p>
    //     </div>
    // </a>`;

    const template = document.querySelector('#product');
    const pr = template.content.cloneNode(true);

    pr.querySelector('h2').textContent = product.title;
    if (product.onSale) {
      pr.querySelector('.detail p').innerHTML = `<del>${product.price}</del>${product.discountedPrice}`;
    } else {
      pr.querySelector('.detail p').textContent = product.price;

    }

    container.appendChild(pr);

  }


};
fetchProducts('https://api.noroff.dev/api/v1/rainy-days');

// i++
// i=i+1;
//fetchProducts(PRODUCTS_URL)




















