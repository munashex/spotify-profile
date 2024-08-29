import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";

const Tracks = () => {
  const [tab, setTab] = useState('tab1');
  const [loading, setLoading] = useState(true);
  const [shortTerm, setShortTerm] = useState([]);
  const [mediumTerm, setMediumTerm] = useState([]);
  const [longTerm, setLongTerm] = useState([]);  

  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const fetchTracks = async (timeRange, setter) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setter(data.items);
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
    fetchTracks('short_term', setShortTerm);
    fetchTracks('medium_term', setMediumTerm);
    fetchTracks('long_term', setLongTerm);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const renderTrack = (track) => (
    <Link to={`/track/${track.id}`} key={track.id} className="flex items-center space-x-4 group">
      <img 
        src={track.album.images[2]?.url} 
        alt={track.name} 
        className="w-16 h-16 rounded-lg group-hover:rounded-full transition-all duration-300 ease-in-out shadow-md"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white group-hover:underline transition-all duration-300 ease-in-out">{track.name}</h3>
        <p className="text-[#8e8c8c] text-sm">{track.artists.map(a => a.name).join(', ')}</p>
      </div>
      <div className="text-[#8e8c8c] text-sm">
        {formatDuration(track.duration_ms)}
      </div>
    </Link>
  );

  return (
    <div className="bg-[#181818] w-full min-h-screen">
      <div className="mx-4 lg:mx-56 md:mx-9 py-16">
        <div className="flex flex-col lg:flex-row justify-around gap-y-6 mb-12">
          <h1 className="text-white text-xl md:text-2xl font-bold text-center">Top Tracks</h1>
          <div className="flex flex-row items-center justify-around lg:gap-x-11">
            <button
              onClick={() => setTab('tab1')}
              className={`text-[#aaa5a5] lg:text-lg ${tab === 'tab1' ? 'font-bold border-b border-white' : ''}`}
            >
              All Time
            </button>
            <button
              onClick={() => setTab('tab2')}
              className={`text-[#aaa5a5] lg:text-lg ${tab === 'tab2' ? 'font-bold border-b border-white' : ''}`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setTab('tab3')}
              className={`text-[#aaa5a5] lg:text-lg ${tab === 'tab3' ? 'font-bold border-b border-white' : ''}`}
            >
              Last 4 Weeks
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-16">
          {tab === 'tab1' && (
            <Section
              title="All Time Favorites"
              data={longTerm}
              renderItem={renderTrack}
            />
          )}
          {tab === 'tab2' && (
            <Section
              title="Last 6 Months Hits"
              data={mediumTerm}
              renderItem={renderTrack}
            />
          )}
          {tab === 'tab3' && (
            <Section
              title="Recent 4 Weeks Jams"
              data={shortTerm}
              renderItem={renderTrack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, renderItem }) => (
  <section className="space-y-8">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
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

export default Tracks;

