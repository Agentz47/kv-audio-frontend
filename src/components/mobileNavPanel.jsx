import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel({ isOpen, setOpen }) {
  const navigate = useNavigate();

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  return (
    <>
      {/* Overlay + Panel */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#00000070] z-[1000] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`h-full bg-white w-[300px] transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
            <img
              src="/logo.png"
              className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
              alt="logo"
            />
            <IoMdClose
              className="absolute right-3 text-3xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Navigation Items */}
          <div
            onClick={() => goTo("/")}
            className="text-[20px] text-accent m-1 flex items-center gap-2 cursor-pointer"
          >
            <CiHome /> Home
          </div>
          <div
            onClick={() => goTo("/contact")}
            className="text-[20px] text-accent m-1 flex items-center gap-2 cursor-pointer"
          >
            <MdOutlineContactMail /> Contact
          </div>
          <div
            onClick={() => goTo("/gallery")}
            className="text-[20px] text-accent m-1 flex items-center gap-2 cursor-pointer"
          >
            <RiGalleryLine /> Gallery
          </div>
          <div
            onClick={() => goTo("/items")}
            className="text-[20px] text-accent m-1 flex items-center gap-2 cursor-pointer"
          >
            <CiSpeaker /> Items
          </div>
          <div
            onClick={() => goTo("/booking")}
            className="text-[20px] text-accent m-1 flex items-center gap-2 cursor-pointer"
          >
            <BsCalendar2Check /> Booking
          </div>
        </div>
      </div>
    </>
  );
}
