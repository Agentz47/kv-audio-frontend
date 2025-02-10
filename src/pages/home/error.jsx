import { Link } from "react-router-dom";

export default function ErrorNotFound(){
    return(
        <div>
            <h1>404 Error: Page Not Found</h1>
            <Link to="/" className="bg-[#c00404] p-1">Go back to Home</Link>
        </div>
    )
}