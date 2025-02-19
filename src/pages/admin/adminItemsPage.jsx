const sampleArr = [
    {
        key: "spk001",
        name: "Bluetooth Speaker",
        price: 49.99,
        category: "Speakers",
        dimensions: "10cm x 10cm x 5cm",
        description: "Portable Bluetooth speaker with deep bass and long battery life.",
        availability: true,
        image: ["https://example.com/bluetooth_speaker.jpg"]
    },
    {
        key: "hph002",
        name: "Wireless Headphones",
        price: 89.99,
        category: "Headphones",
        dimensions: "Adjustable",
        description: "Noise-canceling wireless headphones with high-fidelity sound.",
        availability: true,
        image: ["https://example.com/wireless_headphones.jpg"]
    },
    {
        key: "ear003",
        name: "True Wireless Earbuds",
        price: 69.99,
        category: "Earbuds",
        dimensions: "Compact",
        description: "Compact true wireless earbuds with superior sound and touch controls.",
        availability: true,
        image: ["https://example.com/true_wireless_earbuds.jpg"]
    },
    {
        key: "mic004",
        name: "USB Microphone",
        price: 59.99,
        category: "Microphones",
        dimensions: "15cm x 5cm x 5cm",
        description: "Professional-grade USB microphone for streaming and recording.",
        availability: true,
        image: ["https://example.com/usb_microphone.jpg"]
    },
    {
        key: "snd005",
        name: "Soundbar",
        price: 129.99,
        category: "Speakers",
        dimensions: "80cm x 10cm x 8cm",
        description: "Powerful soundbar with immersive surround sound and deep bass.",
        availability: true,
        image: ["https://example.com/soundbar.jpg"]
    },
    {
        key: "mix006",
        name: "Audio Mixer",
        price: 149.99,
        category: "Audio Equipment",
        dimensions: "30cm x 20cm x 5cm",
        description: "Professional audio mixer with multiple input channels for live streaming and recording.",
        availability: true,
        image: ["https://example.com/audio_mixer.jpg"]
    }
];
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function AdminItemsPage(){
    const [items, setItems] = useState(sampleArr)
    
    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    
                        <th>Key</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Dimensions</th>
                        <th>Availability</th>
                    
                </thead>
                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product)
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability? "Available" : "Out of Stock"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/items/add">
                <FaCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-green-900"/>
            </Link>
        </div>
    )
}