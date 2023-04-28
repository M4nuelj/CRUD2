//CRUD 
const fs = require('fs');

class ProductManager {

    constructor() {
        this.products = [];

        if (!fs.existsSync('productManager.json')) {
            fs.writeFileSync('productManager.json', '[]');
            const stringFile = fs.readFileSync('productManager.json', 'utf-8');
            this.products = JSON.parse(stringFile);

        } else {
            const stringFile = fs.readFileSync('productManager.json', 'utf-8');
            fs.writeFileSync('productManager.json', stringFile)
            this.products = JSON.parse(stringFile);
        }

    }
    createProduct(product) {
        const codeProduct = this.products.find(p => p.code === product.code);
        if (!codeProduct) {
            this.products.push(product)
            const stringFile = JSON.stringify(this.products, null, 2);
            fs.writeFileSync('productManager.json', stringFile);
        } else {
            console.log(`The item ${product.title} already exist, plase registera new item`)
            return
        }

    }
    getAllProducts() {
        return this.products
    }
}

const productManager = new ProductManager();
productManager.createProduct({ code: 123, title: 'Apple', tipe: 'fruit', price: 1200 });
productManager.createProduct({ code: 124, title: 'Icream', tipe: 'Candy', price: 3000 });
productManager.createProduct({ code: 224, title: 'Glass', tipe: 'Ktchen', price: 7000 });
productManager.createProduct({ code: 224, title: 'Book', tipe: 'Scholar articule', price: 12000 });

console.log(productManager.createProduct());
console.log(productManager.getAllProducts());
