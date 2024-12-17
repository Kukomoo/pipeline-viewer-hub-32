import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef } from "react";
import type { MapContainer as LeafletMap } from 'leaflet';
import { locationCoordinates } from '../utils/locationData';
import MapContainer from './MapContainer';
import AdvisorMarker from './AdvisorMarker';
import type { Advisor } from '../types/advisor';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  if (isLoading) {
    return <div className="h-[500px] bg-white p-6 rounded-lg shadow-sm animate-pulse" />;
  }

  // Filter out advisors without valid locations
  const validAdvisors = advisors.filter(advisor => 
    advisor.Location && locationCoordinates[advisor.Location]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Advisor Locations</h2>
      <MapContainer ref={mapRef}>
        {validAdvisors.map((advisor, index) => (
          <AdvisorMarker
            key={index}
            advisor={advisor}
            position={locationCoordinates[advisor.Location!]}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default AdvisorsMap;