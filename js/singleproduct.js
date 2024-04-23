import { displayProducts } from '../script';

async function
    fetchDisplaySingleProduct() {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days/b8b528fc-6c60-41f6-a5a9-9a8b27a9482a");
        if (!response.ok) throw new Error("Failed to fetch data from the API");
        let product = await response.json();
        console.log(product);
        return product;
    } catch (err) {
        console.warn(err.message);
    }
}
fetchDisplaySingleProduct();


function displaySingleProduct(response) {
    const container = document.querySelector('.detail-col');
    constainer.innerHTML = '';
}

for (let i = 0; i < response.length; i++) {
    const singleProduct = response[i];
    const template = document.querySelector('#singleProduct');
    const pr = template.content.cloneNode(true);
}




