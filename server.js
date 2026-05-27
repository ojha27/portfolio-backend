const express = require('express')
const cors = require('cors')
require('dotenv').config()

const contactRoutes = require('./routes/contactRoutes')
const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://10.122.91.32:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }))
app.use(express.json())

app.use('/api/contact',contactRoutes)

app.get('/',(req,res)=>{
    res.json({message: 'Backend is running!'})
})

const PORT = process.env.PORT || 5003
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})