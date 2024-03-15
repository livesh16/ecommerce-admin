import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price: {type:Number, required:true},
    images: [String]
});

export const Product = models.Product || model('Product', ProductSchema); // If models.Product then we take that model, otherwise we ceate a new model
// The string in model(string) is what determines the name of the collection in mongodb. For eg, if 'Product' is used, the collection will
// be named 'products'