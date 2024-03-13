import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null)
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
            <ProductForm {...productInfo}/> 
        )} {/* Use ProductForm component only if productInfo is not null */}
        
    </Layout>
    )
}