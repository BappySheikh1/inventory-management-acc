const Product = require("../models/Product")
const { getProductService, createProductService, updateProductService, bulkUpdateProductService } = require("../services/product.services")


exports.getProduct= async (req,res)=>{
    try {
      // const products = await  Product
      // .where('name').equals(/\w/)
      // .where("quantity").gt(100)
      // .limit(2).sort({quantity: -1})
  
      const product =await getProductService()
  
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
  }

  exports.createProduct=async (req,res,next)=>{
    try {
    
    //Create Method 
    const result = await createProductService(req.body)
    
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
    }

    exports.updateProduct=async(req,res,next)=>{
      try {
       const {id} =req.params
        const result=await updateProductService(id,req.body)
        
        res.status(200).json({
          status: 'success',
          message:"successfully updated the product",
          data: result,
        })
      } catch (error) {
        res
      .status(400)
      .json({
        status: "failed",
        message: "Couldn't update the product",
        error: error.message
      })
      } 
    }

    exports.bulkUpdateProduct=async(req,res,next)=>{
      try {
        const result=await bulkUpdateProductService(req.body)
        
        res.status(200).json({
          status: 'success',
          message:"successfully updated the product",
          data: result,
        })
      } catch (error) {
        res
      .status(400)
      .json({
        status: "failed",
        message: "Couldn't update the product",
        error: error.message
      })
      } 
    }