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
            console.log(`El artículo ${product.title} ya existe, por favor registre uno nuevo`)
            return
        }


    }
    getAllProducts() {
        return this.products
    }
    getProductById(id){
        let idProduct= this.products.find(product=>product.id===id)
        if(!idProduct){
            return  'Este id de producto no existe, por favor intenta otro'
        }
        return idProduct;
    }
    UpdateProduct(id, changes){
        this.products=this.getAllProducts();
        const indexProduct= this.products.findIndex((product)=>product.id===id);

        if(indexProduct===-1){
            return 'El artículo buscado no existe, por favor intente de nuevo'
        }
        
        let newProduct=this.products[indexProduct];
        let updateProduct={...newProduct, ...changes};
        this.products[indexProduct]=updateProduct;
        fs.writeFileSync('productManager.json',JSON.stringify(this.products, null,2));
        return updateProduct;
    }
    deleteProduct(id){
        let products=this.getAllProducts();
        let productToDelete = products.find(product=>product.id===id);
        if(!productToDelete){
            return 'El producto seleccionado no existe'; 
        }

        const productDeleted= products.filter((product)=>product.id!==id);
        fs.writeFileSync('productManager.json',JSON.stringify(productDeleted, null,2));
        return `El producto ${productToDelete.title} se elimino de forma exitosa`;
    }
}

// const productManager = new ProductManager();
// productManager.createProduct({ title:'Mango', description:'Fruit', price:2000, thumbnail:'NA', code:'abd234', stock:45 });
// productManager.createProduct({ title:'Apple', description:'Fruit', price:3000, thumbnail:'NA', code:'abd444', stock:48  });
// productManager.createProduct({ title:'Glass', description:'Item', price:1200, thumbnail:'NA', code:'abd134', stock:23  });

console.log("Bienvenidos al reto CRUD");
// console.log(productManager.getAllProducts());
// console.log(productManager.getProductById(1478));
// console.log(productManager.UpdateProduct(1478, {title:'pep10per'}));
// console.log(productManager.deleteProduct(7152));
console.log(productManager.getAllProducts());
