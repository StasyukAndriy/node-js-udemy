const Product = require('../models/product')


exports.showProducts = (req, res, next) => {
     Product.fetchAll(products=>{
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/product-list',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      })
    })
    ;
  }

exports.getIndex = (req,res,next) =>{
    Product.fetchAll(products=>{
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Index',
          path: '/',
        })
      })
}

exports.getCart = (req,res,next)=>{
        res.render('shop/cart', {
          pageTitle: 'Cart',
          path: '/cart',
        })
     
}
exports.postCart = (res,req,next)=>{
  console.log(12131)
  res.redirect('/')
}
exports.getCheckout= (req,res,next)=>{
    res.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout',
    })
}

exports.getProduct = (req,res,next)=>{

  Product.fetchAll(products=>{
    res.render('shop/product-details', {
      pageTitle: 'Product Details',
      product: products.find(product=>product.id==req.params.id),
      path: "/"
    })
  })
  
}