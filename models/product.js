
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(path.dirname(process.mainModule.filename),'data','producrs.json');
const getProducts = (path, cb)=>{
   fs.readFile(path, (err, content)=>{
      if(err){
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
      getProducts(dataFilePath,products=>{
         products.push(this)
         fs.writeFile(dataFilePath, JSON.stringify(products), err=>{
          console.log(err)
        })
      })
     }
     static delete(id){
        getProducts(dataFilePath, products=>{
          const newProds = products.filter(product=> product.id!=id)
          fs.writeFile(dataFilePath, JSON.stringify(newProds), err=>{
            console.log(err)
          })
        })
        
        
     }

     static edit(statusCart, id, title, url, price, description){
  

            const editedProduct = {id, title, url, price, description}
         
        
         getProducts(dataFilePath,products=>{
            const newProds = products.map(product=>{
               if(id==product.id){
                  if(statusCart){
                     return {...product, inCard: statusCart[0]}
                  }
                  return editedProduct
               } 
                  return product
            })
            fs.writeFile(dataFilePath, JSON.stringify(newProds), err=>{
               console.log(err)
            })
         })
        
     }

     static getProductById(id,cb) {
     
          Product.fetchAll(dataFilePath, products=>{
            cb(products.find(product=>product.id==id))
         })
     }
     static fetchAll(path, setProducts){
         getProducts(path, setProducts)
     }
}