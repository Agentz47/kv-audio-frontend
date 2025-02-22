import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {
    const location = useLocation()

    console.log(location);

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price);
    const [productCategory, setProductCategory] = useState(location.state.category);
    const [productDimension, setProductDimension] = useState(location.state.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.description);
    const navigate = useNavigate()
    

    async function handleAddItem(){
        // Add item to the backend
        console.log(productKey, productName, productPrice, productCategory,productDimension, productDescription);

        const token = localStorage.getItem("token");
        if(token){
            try{
            const result = await axios.put("http://localhost:3000/api/products/"+productKey,
            {
                name : productName,
                price : Number(productPrice),
                category : productCategory,
                dimensions : productDimension,
                description : productDescription
        },{
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
        toast.success(result.data.message);
        navigate("/admin/items")
        }catch(err){
            toast.error(err.response.data.error);
        }
        }else{
            toast.error("You are not authorized to access this");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Update Item</h1>
            <div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
                <input 
                    disabled
                    onChange={(e) => setProductKey(e.target.value)} 
                    value={productKey} 
                    type="text" 
                    placeholder="Product Key" 
                    className="w-full p-2 border rounded"
                />
                <input 
                    onChange={(e) => setProductName(e.target.value)} 
                    value={productName} 
                    type="text" 
                    placeholder="Product Name" 
                    className="w-full p-2 border rounded"
                />
                <input 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    value={productPrice} 
                    type="number" 
                    placeholder="Product Price" 
                    className="w-full p-2 border rounded"
                />
                <select 
                    onChange={(e) => setProductCategory(e.target.value)} 
                    value={productCategory} 
                    className="w-full p-2 border rounded"
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input 
                    onChange={(e) => setProductDimension(e.target.value)} 
                    value={productDimension} 
                    type="text" 
                    placeholder="Product Dimension" 
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    value={productDescription} 
                    type="text" 
                    placeholder="Product Description" 
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleAddItem} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">Update</button>
                <button onClick={()=>{navigate("/admin/items")}} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Cancel</button>

            </div>
        </div>
    );
}
