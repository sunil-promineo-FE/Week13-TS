// main.ts
import "./style.css";
import { Product } from './Product';
import { ProductService } from './ProductService';

const productService = new ProductService();

// Add Event Listener for Add Product Button
document.getElementById('addProductButton')!.addEventListener('click', async function() {
  const name: string = (document.getElementById('productNameInput') as HTMLInputElement).value;
  const details: string = (document.getElementById('productDetailsInput') as HTMLInputElement).value;
  const price: number = parseFloat((document.getElementById('productPriceInput') as HTMLInputElement).value);

  if (!name || !details || isNaN(price)) {
    alert('Please fill all fields.');
    return;
  }

  const product = { name, details, price };
  const savedProduct = await productService.addProduct(product);

  if (savedProduct) {
    addRowToProductTable(savedProduct);
    clearProductInputs();
  }
});

// Render HTML table by adding a new row
function addRowToProductTable(product: Product) {
  const tableBody = document.getElementById('productTableBody') as HTMLTableSectionElement | null;

  if (!tableBody) {
    console.error("Table body element not found");
    return;
  }

  const newRow: HTMLTableRowElement = document.createElement('tr');

  newRow.innerHTML = `
    <td>${product.name}</td>
    <td>${product.details}</td>
    <td>₹${product.price}</td>
    <td><button class="deleteButton" data-id="${product.id}">Delete</button></td>
  `;

  tableBody.appendChild(newRow);

  // Add event listener for delete button
  newRow.querySelector('.deleteButton')!.addEventListener('click', () => {
    deleteProduct(product.id);
  });
}

function clearProductInputs() {
  (document.getElementById('productNameInput') as HTMLInputElement).value = '';
  (document.getElementById('productDetailsInput') as HTMLInputElement).value = '';
  (document.getElementById('productPriceInput') as HTMLInputElement).value = '';
}

// Deletes an existing product via param {productId}
async function deleteProduct(productId: number) {
  await productService.deleteProduct(productId);
  renderProductTable();
}

function renderProductTable() {
  const tableBody = document.getElementById('productTableBody') as HTMLTableSectionElement | null;
  if (tableBody) {
    tableBody.innerHTML = '';
    productService.getProducts().forEach(addRowToProductTable);
  }
}

// Fetch and render products on page load
async function fetchAndRenderProducts() {
  await productService.fetchProducts();
  renderProductTable();
}

fetchAndRenderProducts();
