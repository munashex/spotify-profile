import { FaUser } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { FaMusic } from "react-icons/fa"; 
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { BiSolidPlaylist } from "react-icons/bi";  
import {useLocation} from 'react-router-dom' 
import { FaSpotify } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";


const navLinks = [ 
    {
     name: "Profile", 
     icon: <FaUser size={17}/>, 
     link: '/profile'
    }, 
    {
    name: "Top Artists", 
    icon: <TbMicrophone2 size={17}/>, 
    link: "artists"
    }, 
    {
    name: "Top Tracks", 
    icon: <FaMusic size={17}/>, 
    link: "tracks"
    }, 
    {
    name: "Recent", 
    icon: <GiAnticlockwiseRotation size={17}/>, 
    link: "recent"
    },
    {
    name: "Playlists",
    icon: <BiSolidPlaylist size={17}/>,
    link: "playlist"
    }
]


const Navbar = () => {

const location = useLocation()

  return (
   
   <div> 
    {/* only on small screens */}
    <div className="lg:hidden">
  <div className="fixed bottom-0 left-0 right-0 bg-[#040306]">
    <div className="flex justify-between items-center w-full max-w-screen-sm mx-auto py-2 px-4 border-t border-gray-800">
      {navLinks.map((item) => (
        <div
          key={item.link}
          className={`flex flex-col items-center justify-center py-2 ${
            location.pathname === item.link
              ? 'border-t-4 border-[#3BE477] text-white'
              : 'text-gray-300 hover:text-white'
          } transition-colors duration-300`}
        >
          <span>{item.icon}</span>
          <h1 className="text-xs mt-1">{item.name}</h1>
        </div>
      ))}
    </div>
  </div>
</div>


    {/* side navbar on lg screens */} 
    <div className="fixed top-0 bottom-0 left-0">
  <div className="hidden lg:flex justify-between items-center flex-col bg-[#040306] h-screen py-9 w-32"> {/* Added fixed width */}
    <Link href="/profile">
      <FaSpotify size={54} color="#3BE477" />
    </Link>

    <div className="flex flex-col w-full">
      {navLinks.map((item) => (
        <div
          key={item.link}
          className={`${
            location.pathname === item.link
              ? 'border-l-4 py-4 px-6 text-white border-[#3BE477] bg-[#181818]'
              : 'hover:bg-[#181818] hover:border-l-4 hover:border-[#3BE477] py-4 px-6 text-gray-300'
          } hover:text-white flex flex-col items-center gap-y-1 transition-all`} 
        >
          <span>{item.icon}</span>
          <h1 className="text-sm">{item.name}</h1>
        </div>
      ))}
    </div>

    <a className="text-gray-300" href="https://github.com/munashex/spotify-profile">
      <FaGithub size={34} />
    </a>
  </div>
</div>




    </div>


  );
}

export default Navbar;
