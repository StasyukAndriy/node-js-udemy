
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(path.dirname(process.mainModule.filename),'data','producrs.json');
const getProducts = (cb)=>{
   fs.readFile(dataFilePath, (err, content)=>{
      if(err||!content[0]){
          return cb([]);
      }
     
       cb(JSON.parse(content));
  })
}
let id;
fs.readFile(dataFilePath, (err, content)=>{
   if(err||!content[0]||JSON.parse(content).length==0){
      id = 1
   } 
   else{
      const lastElement = JSON.parse(content)[JSON.parse(content).length-1]
      id = Number(lastElement.id)+1
   }
   
})
module.exports = class Product{
     constructor(title, imageUrl, price, description){
        this.id = id
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
     }
     save(){
      getProducts(products=>{
         products.push(this)
         fs.writeFile(dataFilePath, JSON.stringify(products), err=>{
          console.log(err)
        })
      })
     }
     static delete(id){
        getProducts(products=>{
         const newProds = products.filter(product=> product.id!=id)
         fs.writeFile(dataFilePath, JSON.stringify(newProds), err=>{
            console.log(err)
          })
        })
     }

     static edit(id, title, url, price, description){
         const editedProduct = {id, title, url, price, description}
         getProducts(products=>{
            const newProds = products.map(product=>{
               console.log(id, product.id)
               if(id==product.id){
                  return editedProduct
               } else{
                  return product
               }
            })
            fs.writeFile(dataFilePath, JSON.stringify(newProds), err=>{
               console.log(err)
            })
         })
        
     }


     static fetchAll(setProducts){
         getProducts(setProducts)
     }
}