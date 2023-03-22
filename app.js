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

// Mongoose middleware for saving data: pre / post 

productSchema.pre('save',function(next){
  console.log(' Before saving data');
  
  if(this.quantity == 0){
    this.status = 'out-of-stock'
  }

  next() 
})

// productSchema.post('save',function(doc,next){
//   console.log(' After saving data');

//   next();
// })

productSchema.methods.logger=function(){
  console.log(`Data saved for ${this.name}`);
}

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

app.get('/api/v1/product', async(req,res)=>{
  try {
    // const products = await  Product
    // .where('name').equals(/\w/)
    // .where("quantity").gt(100)
    // .limit(2).sort({quantity: -1})

    const product =await Product.findById("641a864356897c1e68628463")

    res.status(200).json({
      status:'success',
      data: product
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message:"can't get the data",
      error: error.message
    })
  }
})

module.exports = app;
