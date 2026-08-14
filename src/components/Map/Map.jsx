'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

// Fix for default markers in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for different point types
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  town: createIcon('blue'),
  monument: createIcon('gold'),
  institution: createIcon('red'),
  business: createIcon('green')
};

export default function Map({ center = [37.223, -4.896], zoom = 15, markers = [] }) {
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={marker.coordinates}
            icon={icons[marker.type] || icons.town}
          >
            <Popup>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <strong style={{fontSize: '14px'}}>{marker.name}</strong>
                {marker.description && <p style={{margin: '0', fontSize: '12px'}}>{marker.description}</p>}
                {marker.id && (
                  <a 
                    href={`/perfil/${marker.id}`}
                    style={{
                      display: 'inline-block',
                      background: 'var(--color-primary)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginTop: '4px'
                    }}
                  >
                    Ver perfil
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
