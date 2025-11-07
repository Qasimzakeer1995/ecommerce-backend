const express = require('express');
require('./db/config');
const User = require('./model/user');
const Product = require('./model/product');
const Jwt = require('jsonwebtoken');
const jwtKey = 'learning';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', methods: ['POST','GET','DELETE','PUT'],credentials: true }));

app.post("/register", async (req,resp)=>{
    let newUser  = new User(req.body);
    let result = await newUser.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        Jwt.sign({ result }, jwtKey, {expiresIn: "30m" },(err, token)=>{
          if(err){
            resp.status(401).send({ result: "Some thing went wrong" });
          }else{
            resp.send({result, auth:token});
          }
        
      })
      
    } else {
      resp.status(404).send({ result: "No user found" });
    }
});

app.post("/add-product", verifyToken, async (req,resp)=>{
  let newProduct  = new Product(req.body);
  let result = await newProduct.save();
  resp.send(result);
});

app.get("/list-product", verifyToken, async (req,resp)=>{
  let product  = await Product.find();
    if(product.length > 0){
      resp.send(product);
    }else{
      resp.send({result:"No Product Found"});
    }
 
});

app.post("/login", async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).send({ error: "Email and password are required." });
    }
    let user = await User.findOne({ email, password }).select('-password');
    if (user) {
        Jwt.sign({ user }, jwtKey, {expiresIn: "30m" },(err, token)=>{
          if(err){
            resp.status(401).send({ result: "Some thing went wrong" });
          }else{
            resp.send({user, auth:token});
          }
        
      })
      
    } else {
      resp.status(404).send({ result: "No user found" });
    }
});

app.delete("/delete-product/:id", verifyToken, async (req, resp) => {
  
  const result =await Product.deleteOne({_id:req.params.id})

  resp.send(result);

});

const mongoose = require('mongoose');

app.get("/product/:id", verifyToken, async (req, resp) => {
  const productId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return resp.status(400).send({ result: "Invalid Product ID" });
  }

  try {
    // Find the product using the valid ObjectId
    let product = await Product.findOne({ _id: productId });

    if (product) {
      resp.send(product);
    } else {
      resp.send({ result: "No Product Found" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ result: "Error fetching product" });
  }
});


app.put("/product/:id", verifyToken, async (req,resp)=>{
  let result  = await Product.updateOne(
    {_id: req.params.id},
    {
      $set : req.body
    }
  )
  resp.send(result)

});

app.get("/search/:key", verifyToken, async (req,resp)=>{
  let result  = await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
  });
  resp.send(result)
});

function verifyToken(req, resp, next){
  let token = req.headers['authorization'];
  if(token){
      token = token.split(' ')[1];
      Jwt.verify(token, jwtKey, (err, valid)=>{
        if(err){
          resp.status(401).send({ result: "Please provide valid token" });
        }else{
          next();
        }
      })
  }else{
      resp.status(403).send({ result: "Please add token" });
  }
}

app.listen(5000);

