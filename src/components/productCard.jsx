import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const item = props.item;

    return (
        <div className="max-w-sm h-fit rounded overflow-hidden shadow-lg p-4 bg-red-100 m-4">
            <img className="w-full h-48 object-cover" src={item.image[0]} alt={item.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base mb-4">
                    {item.description}
                </p>
                <div className="mt-4">
                    <span className="text-gray-600 text-sm">{item.category}</span><br /><br />
                    <span className="text-green-500 font-bold text-wrap">{item.price}</span>
                    
                </div>
                <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${item.availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {item.availability ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    <p>Dimensions: {item.dimensions}</p>
                </div>
            </div>
            <div className="px-6 py-4">
                <Link to={"/product/"+item.key} className="text-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    View Details
                </Link>
            </div>
        </div>
    );
}
