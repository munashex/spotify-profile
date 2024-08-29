import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Artists = () => {
  const [tab, setTab] = useState('tab1');
  const [loading, setLoading] = useState(true);
  const [shortTerm, setShortTerm] = useState([]);
  const [mediumTerm, setMediumTerm] = useState([]);
  const [longTerm, setLongTerm] = useState([]);

  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const fetchArtists = async (timeRange, setter) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setter(response.data.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!access_token) {
      navigate('/');
    } else {
      fetchArtists('short_term', setShortTerm);
      fetchArtists('medium_term', setMediumTerm);
      fetchArtists('long_term', setLongTerm);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const renderArtists = (artists) => (
    <div className="grid grid-cols-2 mt-20 md:grid-cols-3 lg:grid-cols-5 gap-x-2 md:gap-x-7 gap-y-14 justify-items-center">
      {artists.map((artist) => (
        <Link to={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-center gap-3">
          <img 
            src={artist.images && artist.images[2] ? artist.images[2].url : '/placeholder-image.jpg'} 
            alt={artist.name} 
            className="rounded-full w-48 h-48"
          />
          <h1 className="text-white text-lg">{artist.name}</h1>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-[#181818] w-full min-h-screen">
      <div className="mx-4 lg:mx-40 md:mx-9 py-16">
        <div className="flex flex-col lg:flex-row justify-around gap-y-6">
          <h1 className="text-white text-xl md:text-2xl font-bold text-center">Top Artists</h1>
          <div className="flex flex-row items-center justify-around lg:gap-x-11">
            <button
              onClick={() => setTab('tab1')}
              className={`text-[#aaa5a5] text-lg md:text-xl ${tab === 'tab1' ? 'font-bold border-b border-white' : ''}`}
            >
              All Time
            </button>
            <button
              onClick={() => setTab('tab2')}
              className={`text-[#aaa5a5] text-lg md:text-xl ${tab === 'tab2' ? 'font-bold border-b border-white' : ''}`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setTab('tab3')}
              className={`text-[#aaa5a5] text-lg md:text-xl ${tab === 'tab3' ? 'font-bold border-b border-white' : ''}`}
            >
              Last 4 Weeks
            </button>
          </div>
        </div>
        <div className="mt-8">
          {tab === 'tab1' && renderArtists(longTerm)}
          {tab === 'tab2' && renderArtists(mediumTerm)}
          {tab === 'tab3' && renderArtists(shortTerm)}
        </div>
      </div>
    </div>
  );
};

export default Artists;
