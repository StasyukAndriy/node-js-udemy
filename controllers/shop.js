const Cart = require('../models/cart');
const Product = require('../models/product')
const path = require('path')
const dataFilePath = path.join(path.dirname(process.mainModule.filename),'data','producrs.json');
const cartFilePath = path.join(path.dirname(process.mainModule.filename),'data','cart.json')
exports.showProducts = (req, res, next) => {
     Product.fetchAll(dataFilePath,products=>{
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
    Product.fetchAll(dataFilePath, products=>{
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Index',
          path: '/',
        })
      })
}

exports.getCart = (req,res,next)=>{
  Product.fetchAll(dataFilePath, products=>{
    res.render('shop/cart', {
      prods: products.filter(product=>product.inCard),
      pageTitle: 'Cart',
      path: '/cart',
    })
  })
        
     
}
exports.postCart = (req,res,next)=>{
  const id = req.body.productId
  Product.getProductById(id,product=>{
    Cart.addProduct(id,  product.price)
  })
  
  res.redirect('/')
}
exports.getCheckout= (req,res,next)=>{
    res.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout',
    })
}

exports.getProduct = (req,res,next)=>{

  Product.fetchAll(dataFilePath, products=>{
    res.render('shop/product-details', {
      pageTitle: 'Product Details',
      product: products.find(product=>product.id==req.params.id),
      path: "/"
    })
  })
  
}

exports.deleteFromCart = (req,res,next)=>{
  const id = req.body.cardId;
  Product.getProductById(id,product=>{
    console.log(product,id)
    Cart.delete(id,  product.price)
  })
  res.redirect('/cart')
}