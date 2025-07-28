import { useState } from "react"
import { loadCart } from "../../utils/cart"
import Items from "./items";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());

    function reloadCart(){
        setCart(loadCart());
    }


    return(
        <div className="w-full h-full flex flex-col items-center">
            <h1>Create Booking</h1>
            <div className="w-full flex flex-col items-center bg-red-900">
                {
                    cart.orderedItems.map((Item)=>{
                        return<div key={Item.key}>
                            <span>{Item.key}</span>
                            <span> X {Item.qty}</span>
                        </div>
                    })
                }
            
            </div>
        </div>
    )
}