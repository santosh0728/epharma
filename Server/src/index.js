const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const connection=require('./db/connection')
const Products=require('./models/products')
const Users=require('./models/users')
const cors=require('cors')
connection()

const app = express()
app.use(cors())
app.use(express.json())


app.post('/signup', async(req, res) => {
  await Users.create(req.body)
  res.json({
    msg: "you are successfully registered"
  })
})


// app.get('/products', async(req, res) => {
//  const data = await Products.find()
// })

// app.put('/products/:id', async(req, res) => {
//   await Products.findByIdAndUpdate(req.params.id, req.body)
//  })

//  app.delete('/products/:id', async(req, res) => {
//   await Products.findByIdAndDelete(req.params.id)
//  })

//  app.get('/products', async(req, res) => {
//   const data = await Products.find()
//  })

 app.listen(process.env.port, () => {
    console.log(`Example app listening on port ${process.env.port}`)
  })