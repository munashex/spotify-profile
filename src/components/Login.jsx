import {useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';


const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID; 
const redirects = import.meta.env.VITE_APP_SPOTIFY_REDIRECT_URI


const LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirects}&scope=user-read-private user-read-email`;


function Login() { 
 const access_token = localStorage.getItem('access_token') 
const navigate = useNavigate()

  useEffect(() => {
  if(access_token) {
   navigate('/profile')
  }
  }, [])



  return (
    <div className="bg-[#121212] w-full h-screen  py-44 flex flex-col items-center gap-9">
    <h1 className="text-white text-2xl font-bold lg:text-3xl">Login to Spotify</h1>
      <a href={LOGIN_URL} className="bg-[#3BE477] hover:bg-[#3BE458] font-bold  py-2 px-9 text-lg  lg:text-xl rounded-full">Login</a>
    </div>
  );
}

export default Login;
