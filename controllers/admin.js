const Product = require('../models/product')
const url = require('url');
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
exports.getProductsAdmin = (req,res,next) =>{
    Product.fetchAll(products=>{
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
        })
      })
}
exports.deleteProduct = (req,res,next)=>{
  const id = getIdFromUrl(req)
  Product.delete(id)
  res.redirect('/admin/products')
}
exports.getEditProduct = (req,res,next)=>{
  const id = getIdFromUrl(req)
  editID = id;
  console.log(id)
  Product.fetchAll(products=>{
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
