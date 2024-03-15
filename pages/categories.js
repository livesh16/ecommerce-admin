import Layout from "@/components/Layout";

export default function Categories() {
    function saveCategory() {

    }
    
    return (
        <Layout>
            <h1>Categories</h1>
            <label>New category name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input className="mb-0" type="text" placeholder="Category name"/>
                <button type="submit" className="btn-primary py-1">Save</button>
            </form>
        </Layout>
    )
}