
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(path.dirname(process.mainModule.filename),'data','cart.json');
module.exports = class Cart {
   static addProduct(id, price) {
       fs.readFile(dataFilePath, (err,content)=>{
         let cart = {products:[], totalPrice:0}
         if(!err&&content[0]){
            cart = JSON.parse(content)
         }
         const existingProduct = cart.products.find(el=>el.id==id);
         const existingProductIndex =  cart.products.indexOf(existingProduct)
         let newCartProduct;
         if(existingProduct){
            newCartProduct = {...existingProduct}
            newCartProduct.qty += 1
            cart.products[existingProductIndex] = newCartProduct;

         } else{
            newCartProduct = {id: id, qty: 1}
            cart.products = [...cart.products, newCartProduct]
         }
         cart.totalPrice += Number(price)
         fs.writeFile(dataFilePath, JSON.stringify(cart), err=>{
            console.log(err)
         })
       })
   }
   
}