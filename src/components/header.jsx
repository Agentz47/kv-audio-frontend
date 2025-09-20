import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";


export default function Header(){
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    return(
        <header className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent">
            <img src="/logo.png" alt="logo" className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"/>
            <Link to="/" className="hidden text-[25px] font-bold m-1">Home</Link>
            <Link to="/contact" className="hidden text-[25px] font-bold m-1">Contact</Link>
            <Link to="/gallery" className="hidden text-[25px] font-bold m-1">Gallery</Link>
            <Link to="/items" className="hidden text-[25px] font-bold m-1">Items</Link>
            <Link to="/booking" className="hidden text-[25px] font-bold m-1 absolute right-3">
            <FaCartShopping/>
            </Link>
            <GiHamburgerMenu className="absolute right-8 text-[24px]" onClick={()=>{
                setNavPanelOpen(true)
            }}/>
            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen}/>
        </header>
    )
}