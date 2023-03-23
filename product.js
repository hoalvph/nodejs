import axios from "axios";
import joi from "joi"

import dotenv from "dotenv"
import Product from "../models/product.js"

dotenv.config();
const { API_URI } = process.env

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    descrption: joi.string()

})

export const getAll = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length === 0) {
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        return res.json(products)
    } catch (error) {
        return res.status(400).json({
            message: error
        })

    }
}

export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.json({
                message: "Khong co san pham nao"
            })

        }
        return res.json(product)
    } catch (error) {
        return res.status(400).json({
            message: error
        })


    }
}
export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        if (!product) {
            return res.json({
                message: "Khong them san pham nao"
            })
        }
        return res.json({
            message: "Them san pham thanh cong",
            data: product
        })

    } catch (error) {
        return res.status(400).json({
            message: error
        })

    }
}

export const update = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (updateProduct) {
            return res.json({
                message: "Cập nhật thành công",
                data: updateProduct
            })
        } else {
            return res.json({
                message: "Cập nhật không thành công"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const remove = async function (req, res) {
    try {
        const removeProduct = await Product.findByIdAndDelete(req.params.id, { $set: req.body }, { new: true })
        if (removeProduct) {
            return res.json({
                message: "Xóa thành công"
            })
        } else {
            return res.json({
                message: "Xóa không thành công"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}