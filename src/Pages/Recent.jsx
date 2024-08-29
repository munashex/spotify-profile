import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";

const Recent = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const getRecentSongs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setRecent(data.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!access_token) {
      navigate('/');
      return;
    }
    getRecentSongs();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const renderTrack = (item) => (
    <Link to={`/track/${item.track.id}`} key={item.track.id} className="flex items-center space-x-4 group">
      <img 
        src={item.track.album.images[2]?.url} 
        alt={item.track.name} 
        className="w-16 h-16 rounded-lg group-hover:rounded-full transition-all duration-300 ease-in-out shadow-md"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white group-hover:underline transition-all duration-300 ease-in-out">{item.track.name}</h3>
        <p className="text-[#8e8c8c] text-sm">{item.track.artists.map(a => a.name).join(', ')}</p>
      </div>
      <div className="text-[#8e8c8c] text-sm">
        {formatDuration(item.track.duration_ms)}
      </div>
    </Link>
  );

  return (
    <div className="bg-[#181818] w-full min-h-screen">
      <div className="mx-4 lg:mx-56 md:mx-9 py-16">
        <h1 className="text-white text-xl md:text-2xl font-bold mb-12">Recently Played Tracks</h1>
        <div className="grid grid-cols-1 gap-16">
          <Section
            data={recent}
            renderItem={renderTrack}
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ data, renderItem }) => (
  <section className="space-y-8">
    <div className="flex justify-between items-center">
    </div>
    <div className="space-y-6">
      {data.map(renderItem)}
    </div>
  </section>
);

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Recent;