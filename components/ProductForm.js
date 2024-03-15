import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({_id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages}) { // Need to rename those variables since they can't have the same name as states
    
    const [title, setTitle] = useState(existingTitle || '') // Initialize title to existingTitle if it exists, otherwise set it to ''
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])

    const [isUploading, setIsUploading] = useState(false)

    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(event) {
        event.preventDefault(); // To prevent the page from reloading when the user clicks submit
        const data = {title, description, price, images}
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

    async function uploadImages(event) {
        const files = event.target.files
        //console.log("yep", files)

        if (files?.length > 0) {
            setIsUploading(true)

            const data = new FormData()
            
            /*
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => [...oldImages, ...res.data.links])
            */
            
            data.append('file', files[0])
            const res = await axios.post('/api/upload', data)
            console.log("here", res.data.link)
            setImages(oldImages => [...oldImages, res.data.link])
            console.log(images)

            setIsUploading(false)
        }
    }

    function updateImagesOrder(images) {
        console.log("images", images)
        setImages(images)
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input type="text" placeholder="product name" value={title} onChange={event => setTitle(event.target.value)}/>

            <label>Images</label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                    {images?.length>0 && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-lg"/>
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                    <input type="file" className="hidden" onChange={uploadImages}/>
                </label>
            </div>

            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>

            <label>Price (in USD)</label>
            <input type="number" placeholder="price" value={price} onChange={event => setPrice(event.target.value)}/>

            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}