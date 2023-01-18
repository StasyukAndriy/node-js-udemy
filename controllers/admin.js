const Product = require('../models/product')
const path = require('path')
const dataFilePath = path.join(path.dirname(process.mainModule.filename),'data','producrs.json');
let editID;
function getIdFromUrl(reqUrl){

  return reqUrl.params.id

}
exports.showAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    })
}
exports.postNewProduct = (req, res, next) => {
    const {title, url, price, description} = req.body
    const product = new Product(title,url,price,description)
    product.save()
    res.redirect('/');
}
exports.deleteProduct = (req,res,next)=>{
  const id = getIdFromUrl(req)
  Product.delete(id)
  res.redirect('/admin/products')
}
exports.getProductsAdmin = (req,res,next) =>{
    Product.fetchAll(dataFilePath, products=>{
        
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
        })
      })
}

exports.getEditProduct = (req,res,next)=>{
  const id = getIdFromUrl(req)
  editID = Number(id);
  Product.fetchAll(dataFilePath,products=>{
    res.render('admin/edit-product', {
      product: products.find(product=>product.id==id),
      pageTitle: 'Edit Product',
      path: '/admin/products',
    })
  })
}

exports.postEditProduct = (req,res,next)=>{
  const {title, url, price, description} = req.body
  Product.edit(editID, title, url, price, description)
  res.redirect('/admin/products')

}
