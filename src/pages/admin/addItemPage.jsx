import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimension, setProductDimension] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([]);
    const navigate = useNavigate()

    async function handleAddItem() {
        //promise all for image upload
        console.log(productImages)
        const promises = []
        for (let i = 0; i < productImages.length; i++) {
            console.log(productImages[i])
            const promise = mediaUpload(productImages[i])
            promises.push(promise);
            // if(i==5){
            //     toast.error("You can only upload 5 images at a time");
            //     break;
            // }
        }


        // Add item to the backend
        console.log(productKey, productName, productPrice, productCategory, productDimension, productDescription);

        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Promise.all(promises).then((result) => {
                //     console.log(result)
                // }).catch((err) => {
                //     toast.error(err)
                // })

                const imageUrls = await Promise.all(promises);

                const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                    key: productKey,
                    name: productName,
                    price: Number(productPrice),
                    category: productCategory,
                    dimensions: productDimension,
                    description: productDescription,
                    image: imageUrls,
                }, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
                );
                toast.success(result.data.message);
                navigate("/admin/items")
            } catch (err) {
                toast.error(err.response.data.error);
            }
        } else {
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
                <input type="file" multiple onChange={(e) => { setProductImages(e.target.files) }} className="w-full p-2 border rounded" />
                <button onClick={handleAddItem} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                <button onClick={() => { navigate("/admin/items") }} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>

            </div>
        </div>
    );
}
