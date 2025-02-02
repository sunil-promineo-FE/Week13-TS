// Product.ts
export class Product {
    id: number;
    name: string;
    details: string;
    price: number;
  
    constructor(id: number, name: string, details: string, price: number) {
      this.id = id;
      this.name = name;
      this.details = details;
      this.price = price;
    }
  }
  