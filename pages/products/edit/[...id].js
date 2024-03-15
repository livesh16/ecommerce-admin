import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null) // of type {_id: "65ef50cd", title: "some title", description: "some desc", price: 23}
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data)
        })

    }, [id])

    return (
    <Layout>
        <h1>Edit Product</h1>
        {productInfo && (               
            <ProductForm {...productInfo}/> // We can pass in objects for props instead of individual variables like title=title description=description
        )} {/* Use ProductForm component only if productInfo is not null */}
        
    </Layout>
    )
}