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

export const update = async (req, res) => {
    try {
        const { data: product } = await axios.patch(
            `${API_URI}/product/${req.params.id}`, req.body
        )
        if (!product) {
            return res.json({
                message: "Cap nhap khong  thanh cong"
            })
        }
        return res.json({
            message: "Cap nhap thanh cong",
            data: product
        })

    } catch (error) {
        return res.status(400).json({
            message: error
        })

    }
}
export const remove = async (req, res) => {
    try {
        await axios.delete(`${API_URI}/product/${req.params.id}`)
        res.json({
            message: "Xoa thanh cong"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })

    }
}