'use strict';

const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Product = require("../models/product")

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).exec().then(result => {
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: "No valid entry found for provided ID"
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: `${err}`,
        })
    })

})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(200).json({
            message: `${product.name} succesfully created`,
            createdProduct: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });

})


router.post('/:id', (req, res) => {
    Product.find({
        id: req.params.id,
    }, (err, product) => {
        if (err) {
            res.send(err);
        }
        if (!product) {
            res.send({
                message: 'product not found'
            });
        }

        product.value = req.body.value;
        product.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Updated '
            });

        });

    });
});
// router.patch('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const updateOperations = {}
//     for (const operations of req.body) {
//         updateOperations[operations.propName] = operations.value;
//     }
//     Product.findByIdAndUpdate({ _id: id },{
//         $set: {
//             updateOperations
//         }
//     }).exec()
//     .then(result=>{
//         res.status(200).json(result)
//     })
//     .catch(error =>{
//         console.log(error)
//         res.status(500).json(error)
//     })
// })


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error)
        })

})

console.log(Product.updateMany)


module.exports = router