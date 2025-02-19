import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimension, setProductDimension] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const navigate = useNavigate()

    async function handleAddItem(){
        // Add item to the backend
        console.log(productKey, productName, productPrice, productCategory,productDimension, productDescription);

        const token = localStorage.getItem("token");
        if(token){
            try{
            const result = await axios.post("http://localhost:3000/api/products",{
                key : productKey,
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
            <h1 className="text-xl font-bold mb-4">Add Items</h1>
            <div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
                <input 
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
                <input 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    value={productDescription} 
                    type="text" 
                    placeholder="Product Description" 
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleAddItem} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                <button onClick={()=>{navigate("/admin/items")}} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Cancel</button>

            </div>
        </div>
    );
}
