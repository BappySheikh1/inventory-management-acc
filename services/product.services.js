const Product = require("../models/Product")

exports.getProductService= async(query)=>{
    const products= await Product.find(query)

    return products
}

exports.createProductService=async(data)=>{
    const product = await Product.create(data)
    return product
}

exports.updateProductByIdService=async(productId,data)=>{
    const result=await Product.updateOne({_id: productId},{$set:data},{
        runValidators: true,
    })
    return result;
}

exports.bulkUpdateProductByIdService=async(data)=>{
    // const result=await Product.updateMany({_id: data.ids }, data.data,{
    //     runValidators: true,
    // })

    const products = [];
    data.ids.forEach(product =>{
        products.push(Product.updateOne({_id: product.id },product.data));
    })
    
    const result =await Promise.all(products)
    return result

}

exports.bulkDeleteProductByIdService=async()=>{
    const result=await Product.deleteMany({})


    return result

}

exports.deleteProductByIdService=async (id)=>{
 const result =await Product.deleteOne({_id: id})

 return result;
}