import './App.css'
import ProductCard from './components/productCard'
import { SiAudiomack } from "react-icons/si";
import { TbGraphFilled } from "react-icons/tb";
import { MdBookmarkAdded } from "react-icons/md";
import { BsSpeakerFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
function App() {


  return (
    <div className="w-full h-screen flex">
      <div className='w-[400px] h-full bg-gray-400'>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center
        " >
          <TbGraphFilled/>
          Dashboard
        </button>

        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center" >
          <MdBookmarkAdded/>
          Bookings
        </button>

        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center" >
          <BsSpeakerFill/>
          Items
        </button>

        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaPeopleGroup/>
          Users
        </button>
      
      </div>
      <div className='w-full bg-blue-900'>
        <SiAudiomack className="text-[300px]"/>
      
      </div>
    </div>
    
  );
}

export default App
