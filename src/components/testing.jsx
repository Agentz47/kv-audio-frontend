import { useState } from "react"

export default function Testing(){
    const [count,setCount] = useState(0)
    //coconut, banana, apple, other
    const [itemName, setItemName] = useState("coconut");
    
    return(
        <div className="w-full h-screen  flex flex-col justify-center items-center">
            <h1 className="text-9xl">{count} {itemName}s</h1>
            <button className="w-[200px] h-[60px] bg-green-900 rounded-lg text-3xl text-white" onClick={
                ()=>{
                    const newCount = count + 1;
                    setCount(newCount)
                }
                }>
                    Count
            </button>
            <div className="w-full flex justify-evenly items-center p-4">
                <button className="w-[200px] h-[60px] bg-green-900 rounded-lg text-3xl text-white" onClick={()=>{
                    setItemName("Coconut")
                }}>
                Coconut</button>

                <button className="w-[200px] h-[60px] bg-green-900 rounded-lg text-3xl text-white" onClick={()=>{
                    setItemName("Banana")
                }}>
                Banana</button>

                <button className="w-[200px] h-[60px] bg-green-900 rounded-lg text-3xl text-white" onClick={()=>{
                    setItemName("Apple")
                }}>
                Apple</button>

                <button className="w-[200px] h-[60px] bg-green-900 rounded-lg text-3xl text-white" onClick={()=>{
                    setItemName("Other")
                }}>
                Other</button>
            </div>
        </div>
    )
}