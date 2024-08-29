import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Artist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!access_token) {
      navigate('/');
      return;
    }

    const fetchArtistData = async (artistId) => {
      try {
        const [artistData, tracksData, albumsData] = await Promise.all([
          axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { Authorization: `Bearer ${access_token}` }
          }),
          axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            headers: { Authorization: `Bearer ${access_token}` }
          }),
          axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=6`, {
            headers: { Authorization: `Bearer ${access_token}` }
          })
        ]);

        setArtist(artistData.data);
        setTopTracks(tracksData.data.tracks.slice(0, 5));
        setAlbums(albumsData.data.items);
      } catch (err) {
        console.error('Error fetching artist data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData(id);
  }, [id, access_token, navigate]);

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center text-white text-2xl">
        Artist not found
      </div>
    );
  }

  return (
    <div className="bg-[#181818] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:mx-32 mx-auto">
        <div className="flex flex-col md:flex-row items-center  gap-8 mb-16">
          <img 
            src={artist.images[0]?.url} 
            alt={artist.name} 
            className="w-64 h-64 rounded-full shadow-lg object-cover"
          />
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{artist.name}</h1>
            <div className="flex gap-12">
              <Stat label="Followers" value={artist.followers.total.toLocaleString()} />
              <Stat label="Popularity" value={`${artist.popularity}%`} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <TopTracks tracks={topTracks} />
          <Albums albums={albums} />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-sm uppercase text-gray-400 mb-1">{label}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const TopTracks = ({ tracks }) => (
  <div className="bg-[#282828] p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Top Tracks</h2>
    <ul className="space-y-6">
      {tracks.map((track, index) => (
        <li key={track.id} className="flex items-center gap-4">
          <span className="text-2xl font-bold text-gray-500 w-8">{index + 1}</span>
          <img src={track.album.images[2].url} alt={track.name} className="w-12 h-12 rounded-md" />
          <div>
            <p className="font-semibold text-lg">{track.name}</p>
            <p className="text-sm text-gray-400">{track.album.name}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Albums = ({ albums }) => (
  <div className="bg-[#282828] p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Albums</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {albums.map((album) => (
        <div key={album.id} className="text-center">
          <img src={album.images[1].url} alt={album.name} className="w-full rounded-md mb-3 shadow-md" />
          <p className="font-semibold text-lg truncate">{album.name}</p>
          <p className="text-sm text-gray-400">{new Date(album.release_date).getFullYear()}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Artist;