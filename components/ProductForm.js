import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";

export default function ProductForm({_id, title: existingTitle, description: existingDescription, price: existingPrice}) { // Need to rename those variables since they can't have the same name as states
    const [title, setTitle] = useState(existingTitle || '') // Initialize title to existingTitle if it exists, otherwise set it to ''
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')

    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(event) {
        event.preventDefault(); // To prevent the page from reloading when the user clicks submit
        const data = {title, description, price}
        if (_id) {
            // Update product info
            await axios.put('/api/products', {...data, _id})
        }
        else {
            // Create new product
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input type="text" placeholder="product name" value={title} onChange={event => setTitle(event.target.value)}/>
            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>
            <label>Price (in USD)</label>
            <input type="number" placeholder="price" value={price} onChange={event => setPrice(event.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}