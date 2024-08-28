import axios from 'axios' 
import {useEffect, useState} from 'react'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => { 
const [user, setUser] = useState({})  
const [loading, setLoading] = useState(true)   
const [artists, setArtists] = useState([])
const navigate = useNavigate() 

const access_token = localStorage.getItem('access_token')

const getCurrentUser = async() => {
  setLoading(true)
  try {
  const data = await axios.get('https://api.spotify.com/v1/me', {
    headers : {
     Authorization: `Bearer ${access_token}`
    }
  })
  setUser(data.data) 
  setLoading(false) 
  }catch(err) {
  console.log(err) 
  setLoading(false)
  }
}

const getArtists = async() => {
  try {
  const data = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term', {
    headers : {
      Authorization: `Bearer ${access_token}`
     }
  }) 
  setArtists(data.data.items)
  }catch(err) {
    console.log(err)
  }
}

useEffect(() => {
 if(!access_token) {
  navigate('/')
 }
getCurrentUser()
 getArtists()
}, []) 

const Logout = () => {
  localStorage.removeItem("access_token") 
  navigate('/')
}

console.log(artists)


  return (
    <div className="bg-[#181818] w-full h-full"> 

    <div className="mx-2 lg:mx-36 pt-12 overflow-x-auto"> 
      {/* profile bio type thing here */}
      {loading ? 
      <div className="flex justify-center"> 
      <Loader/> 
      </div> : (
        <a  className="space-y-4 flex flex-col items-center">
          <img src={user?.images[1]?.url} className="rounded-full w-44"/>
          <h1 className="text-white font-bold text-3xl ">{user.display_name}</h1>
          <button onClick={Logout} className="border border-white hover:bg-white hover:text-black text-white py-2 px-4 font-bold  rounded-full">LOGOUT</button>
        </a>  
      )}


    {/* top artists and top music  */} 
    <div className="flex flex-col lg:flex-row justify-between my-16 lg:my-24 mx-2 gap-y-16 lg:gap-x-8">
  {/* top artists of all time */}
  <div className="flex-1 min-w-[300px]">
    <div className="flex flex-row items-center justify-between mb-6">
      <h2 className="text-white font-bold text-xl">Top Artists</h2>
      <button className="text-white py-1 px-5 rounded-full border hover:bg-white hover:text-black transition-colors duration-300">
        SEE MORE
      </button>
    </div>
    {/* Add your content for top artists here */}
    <div className="">
     {artists?.map((artist) => (
     <div key={artist.name}> 
       <img src={artists?.images}/>
       <h1 className="text-white text-lg">{artist?.name}</h1> 
     </div> 
     ))}
    </div>
  </div>

  {/* top tracks of all time */}
  <div className="flex-1 min-w-[300px]">
    <div className="flex flex-row items-center justify-between mb-6">
      <h2 className="text-white font-bold text-xl">Top Tracks</h2>
      <button className="text-white py-1 px-5 rounded-full border hover:bg-white hover:text-black transition-colors duration-300">
        SEE MORE
      </button>
    </div>
    {/* Add your content for top tracks here */}
    <div className="bg-gray-800 p-4 rounded-md">
      <p className="text-gray-400">Top tracks content goes here</p>
    </div>
  </div>
</div>

    </div>
       
   

    </div>
  )
}

export default UserProfile