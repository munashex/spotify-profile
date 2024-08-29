import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Track = () => {
  const { id } = useParams();
  const access_token = localStorage.getItem('access_token');
  const [track, setTrack] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTrack = async (trackId) => {
    try {
      setLoading(true);
      const data = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setTrack(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!access_token) {
      navigate('/');
    }
    getTrack(id);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!track) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center text-white text-2xl">
        Track not found
      </div>
    );
  }

  return (
    <div className="bg-[#181818] min-h-screen w-full">
      <div className="container mx-auto px-4 py-16 ">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
          <div className="w-full md:w-auto flex justify-center">
            <img 
              src={track.album.images[0].url} 
              alt={track.name} 
              className="object-cover w-80 h-80 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{track.name}</h1>
            <p className="text-xl md:text-2xl text-[#8e8c8c] font-semibold">{track.artists.map(a => a.name).join(', ')}</p>
            <p className="text-lg text-[#8e8c8c]">
              {track.album.name} • {track.album.release_date.split('-')[0]}
            </p>
            <a 
              href={track.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-6 py-3 px-8 bg-[#1DB954] text-white font-bold rounded-full transition-all duration-300 hover:bg-[#1ed760] hover:shadow-lg transform hover:scale-105"
            >
              PLAY ON SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;