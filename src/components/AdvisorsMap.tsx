import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { MapContainer as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from "react";
import AdvisorPopup from "./AdvisorPopup";
import { createRoot } from 'react-dom/client';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Advisor {
  Name: string;
  Location: string | null;
  Picture: string | null;
  Industry: string | null;
  Duration: number | null;
  LinkedIn: string | null;
}

// Map of country/location names to their coordinates
const locationCoordinates: { [key: string]: L.LatLngExpression } = {
  'Portugal': [39.3999, -8.2245],
  'Bangladesh': [23.6850, 90.3563],
  'Brazil': [-14.2350, -51.9253],
  'Dubai': [25.2048, 55.2708],
  'Namibia': [-22.9576, 18.4904]
};

const AdvisorsMap = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  
  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ['advisors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Advisors')
        .select('*');
      if (error) throw error;
      return data as Advisor[];
    }
  });

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Clear existing overlays
      map.eachLayer((layer) => {
        if (layer instanceof L.Popup) {
          map.removeLayer(layer);
        }
      });

      // Add card overlays for each advisor
      advisors
        .filter(advisor => advisor.Location && locationCoordinates[advisor.Location])
        .forEach((advisor) => {
          const position = locationCoordinates[advisor.Location!];
          const cardContent = document.createElement('div');
          const root = createRoot(cardContent);
          
          root.render(
            <AdvisorPopup
              name={advisor.Name}
              location={advisor.Location!}
              picture={advisor.Picture}
              industry={advisor.Industry}
              duration={advisor.Duration}
              linkedIn={advisor.LinkedIn}
            />
          );

          L.popup({
            closeButton: false,
            closeOnClick: false,
            autoClose: false,
            className: 'custom-popup',
            offset: [0, -30]
          })
            .setLatLng(position as L.LatLngExpression)
            .setContent(cardContent)
            .addTo(map);
        });
    }
  }, [advisors, mapRef.current]);

  if (isLoading) {
    return <div className="h-[400px] bg-white p-6 rounded-lg shadow-sm animate-pulse" />;
  }

  // Filter out advisors without valid locations
  const validAdvisors = advisors.filter(advisor => 
    advisor.Location && locationCoordinates[advisor.Location]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Advisors Locations</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          ref={mapRef}
          className="h-full w-full"
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          minZoom={1}
          maxBounds={[[-90, -180], [90, 180]]}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {validAdvisors.map((advisor, index) => {
            const position = locationCoordinates[advisor.Location!];
            return (
              <Marker key={index} position={position}>
                <Popup>
                  <AdvisorPopup
                    name={advisor.Name}
                    location={advisor.Location!}
                    picture={advisor.Picture}
                    industry={advisor.Industry}
                    duration={advisor.Duration}
                    linkedIn={advisor.LinkedIn}
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdvisorsMap;