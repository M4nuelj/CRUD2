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
    createProduct(productList) {
        const {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }= productList

        if(!title||!description||!price||!thumbnail||!code||!stock){
            console.log('Es necesario registrar todos los datos del producto')
            return

        }
        const id=Math.floor(Math.random()*9999);
        const product={
            id, 
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

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
    upDateProduct(){

        
    }
}

const productManager = new ProductManager();
productManager.createProduct({ title:'Mango', description:'Fruit', price:2000, thumbnail:'NA', code:'abd234', stock:45 });
productManager.createProduct({ title:'Apple', description:'Fruit', price:3000, thumbnail:'NA', code:'abd444', stock:48  });
productManager.createProduct({ title:'Glass', description:'Item', price:1200, thumbnail:'NA', code:'abd134', stock:23  });


console.log(productManager.getAllProducts());

console.log('Hola esto es una prueba')
