import { FaUser } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { FaMusic } from "react-icons/fa"; 
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { BiSolidPlaylist } from "react-icons/bi";  
import {useLocation} from 'react-router-dom' 
import { FaSpotify } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const navLinks = [ 
    {
     name: "Profile", 
     icon: <FaUser size={20}/>, 
     link: '/profile'
    }, 
    {
    name: "Top Artists", 
    icon: <TbMicrophone2 size={20}/>, 
    link: "artists"
    }, 
    {
    name: "Top Tracks", 
    icon: <FaMusic size={20}/>, 
    link: "tracks"
    }, 
    {
    name: "Recent", 
    icon: <GiAnticlockwiseRotation size={20}/>, 
    link: "recent"
    },
    {
    name: "Playlists",
    icon: <BiSolidPlaylist/>,
    link: "playlist"
    }
]


const Navbar = () => {

const location = useLocation()

  return (
   
   <div> 
    {/* only on small screens */}
    <div className="flex lg:hidden">
    <div className="fixed bottom-0 left-0 right-0">
      <div className=" bg-[#040306] flex justify-between">
      {navLinks.map((item) => (
        <div className={`${location.pathname === item.link ? 'border-t-4 py-4 px-3 text-white   border-[#3BE477] bg-[#040306]  text-red-white' : 'py-4 px-2 text-gray-300'} hover:text-white  flex flex-col items-center gap-y-1`}> 
        <span>{item.icon}</span> 
        <h1 className="text-sm">{item.name}</h1>
        </div>
      ))} 
      </div>
    </div>
    </div> 


    {/* side navbar on lg screens */} 
    <div className="fixed top-0 bottom-0"> 
    <div className="hidden lg:flex justify-between flex-col  bg-[#040306] h-screen px-8">

    <Link href="/">   
    <FaSpotify size={54} color="#3BE477"/>
    </Link>

    <div className="flex flex-col">
    {navLinks.map((item) => (
        <div className={`${location.pathname === item.link ? 'border-l-8  py-6 px-6 text-white   border-[#3BE477] bg-[#181818]  text-red-white' : 'hover:bg-[#181818] hover:border-l-8 hover:border-[#3BE477] py-6 px-6 text-gray-300'} hover:text-white  flex flex-col items-center gap-y-1`}> 
        <span>{item.icon}</span> 
        <h1 className="text-sm">{item.name}</h1>
        </div>
      ))} 
    </div>
       
    </div>  

    </div>


    </div>


  );
}

export default Navbar;
