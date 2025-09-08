'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Sample cities data
const cities = [
  { id: 1, name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { id: 2, name: 'New York', lat: 40.7128, lng: -74.0060 },
  { id: 3, name: 'London', lat: 51.5074, lng: -0.1278 },
  { id: 4, name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { id: 5, name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { id: 6, name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { id: 7, name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { id: 8, name: 'São Paulo', lat: -23.5558, lng: -46.6396 },
];

export default function MapComponent() {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {cities.map((city) => (
          <Marker key={city.id} position={[city.lat, city.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{city.name}</h3>
                <p className="text-sm text-gray-600">
                  Lat: {city.lat.toFixed(4)}, Lng: {city.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
