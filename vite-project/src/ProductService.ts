// ProductService.ts
import { Product } from './Product';

export class ProductService {
  private products: Product[] = [];

  async fetchProducts(): Promise<void> {
    try {
      const response: Response = await fetch('http://localhost:4000/products');
      const fetchedProducts: Product[] = await response.json();    
      this.products.push(...fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const response: Response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedProduct: Product = await response.json();
      this.products.push(savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      const response: Response = await fetch(`http://localhost:4000/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productIndex: number = this.products.findIndex((p: Product) => p.id === productId);
      if (productIndex > -1) {
        this.products.splice(productIndex, 1);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  getProducts(): Product[] {
    return this.products;
  }
}
