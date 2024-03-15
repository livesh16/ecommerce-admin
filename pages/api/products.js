import { mongooseConnect } from "@/lib/mongoose"
import {Product} from "@/models/Product"

export default async function handler(req, res){
    const method = req.method
    await mongooseConnect()

    if (method === 'GET') {
        if (req.query?.id) { // If the url contains ?id=
            res.json(await Product.findOne({_id: req.query.id}))
        }
        else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const {title, description, price, images} = req.body
        const productDoc = await Product.create({ // create is what creates the document and saves it to the database
            title, description, price, images
        })
        //console.log(productDoc)
        res.json(productDoc) // res means response
    }

    if (method === 'PUT') {
        const {_id, title, description, price, images} = req.body
        await Product.updateOne({_id}, {title, description, price, images}) // Or Product.updateOne({_id:_id}, {title: title, description: description, price: price})
        res.json(true) // Everything is fine  
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id: req.query.id})
            res.json(true)
        }
    }
}