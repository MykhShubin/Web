import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.log('Error fetching albums:', error);
    }
  };

  const fetchPhotos = async (albumId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.log('Error fetching photos:', error);
    }
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    fetchPhotos(album.id);
  };

  const closePopup = () => {
    setSelectedAlbum(null);
    setPhotos([]);
  };

  return (
    <div className="App">
      <h1>Albums</h1>
      <div className="album-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card" onClick={() => handleAlbumClick(album)}>
            <h3>{album.title}</h3>
          </div>
        ))}
      </div>

      {selectedAlbum && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedAlbum.title}</h2>
            <button onClick={closePopup}>Close</button>

            <div className="photo-grid">
              {photos.map((photo) => (
                <div key={photo.id} className="photo-card">
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
