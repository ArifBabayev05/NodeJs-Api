const express = require("express")
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"orders listed /get"
    })
})

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        message:`Order Num:${id}`,
        id:id
    })
})

router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        message:`Updated order ${id}`
    })
})

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        message:`Deleted order${id}`,
        id:id
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity,
    }
    res.status(200).json({
        message:"orders listed /post",
        createdOrder : order
    })
})

module.exports = router