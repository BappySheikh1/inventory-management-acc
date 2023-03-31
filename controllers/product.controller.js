const Product = require("../models/Product")
const { getProductService, createProductService, updateProductByIdService, bulkUpdateProductByIdService, deleteProductByIdService, bulkDeleteProductByIdService } = require("../services/product.services")


exports.getProduct= async (req,res)=>{
    try {
      // const products = await  Product
      // .where('name').equals(/\w/)
      // .where("quantity").gt(100)
      // .limit(2).sort({quantity: -1})
      
      const queryObject= {...req.query};

      // sort, page - exclude
      const excludeFields =['sort',  'page', 'limit']
      excludeFields.forEach(field => delete queryObject[field])

      const product =await getProductService(queryObject)
  
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

    exports.updateProductById=async(req,res,next)=>{
      try {
       const {id} =req.params
        const result=await updateProductByIdService(id,req.body)
        
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

    exports.bulkUpdateProductById =async(req,res,next)=>{
      try {
        const result=await bulkUpdateProductByIdService(req.body)
        
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

    exports.bulkDeleteProductById =async(req,res,next)=>{
      try {
        const result=await bulkDeleteProductByIdService(req.body.ids)
        
        res.status(200).json({
          status: 'success',
          message:"successfully Deleted the given product",
          data: result,
        })
      } catch (error) {
        res
      .status(400)
      .json({
        status: "failed",
        message: "Couldn't delete the given product",
        error: error.message
      })
      } 
    }

    exports.deleteProductById =async(req,res,next)=>{
      try {
        const {id}=req.params

        const result =await deleteProductByIdService(id);

        if(!result.deletedCount){
          return res.status(400).json({
            status: 'fail',
            message:"Couldn't delete the product"
          })
        }

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