const express = require("express");
const app = express();
const cors = require("cors");
const mongoose =require('mongoose');

// middleware
app.use(express.json());
app.use(cors());

// Schema design
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    unique: [true, "Name must be unique"],
    minLength: [3, "Name must be at least 3 characters."],
    macLength: [100, "Name is too large"]
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
    min:[0,"Price can't be negative"],
  },

  unit:{
    type: String,
    required: true,
    enum: {
      values: ["kg", "liter", "pcs"],
      message: "unit value can't be {VALUE}, must be kg/liter/pcs",
    } 
  },

  quantity:{
    type: Number,
    required: true,
    min:[0, "Quantity can't be negative"],
    //custom validation 
    validate:{
      validator:(value)=>{
        const isInteger =Number.isInteger(value);
        if(isInteger){
          return true
        }else{
          return false 
        }
      }
    },
   message: "Quantity must be an integer"
  },
  status:{
    type: String,
    required: true,
    enum: {
      values:["in-stock", "out-off-stock", "discontinued"],
      message: "status can't be {VALUE}"
    }
  },

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default:Date.now,
  // }

  // supplier:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Supplier",
  // },
  // categories:[{
  //   name:{
  //     type:String,
  //     required:true
  //   },
  //   _id: mongoose.Schema.Types.ObjectId
  // }]
},{
  // etar hocche mongoose automatically time gule update kore rakhbe proyojon onujayi 
  timestamps: true,
  
})

// SCHEMA - MODEL - QUERY

//model design
const Product =mongoose.model('Product', productSchema)


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting database
app.post('/api/v1/product',async (req,res,next)=>{
try {
  //  save or create
  // Save method
// const product = new Product(req.body)
// const result =await product.save()

//Create Method 
const result = await Product.create(req.body)

res.status(200).json({
  status: 'success',
  message: 'Data inserted successfully!',
  data: result,
})
} catch (error) {
  res
  .status(400)
  .json({
    status: "failed",
    message: "Data is not inserted",
    error: error.message
  })
}
})

module.exports = app;
