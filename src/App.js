import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import fetchRealTimeData from "./services/apiService";
import BusDataTable from "./components/BusDataTable"; // Import the table component
import SearchCard from "./components/SearchCard";
import {NextUIProvider} from "@nextui-org/react";

function App() {
  const [busLocations, setBusLocations] = useState([]);
  const [error, setError] = useState(null);
  // const mapRef = useRef(null);
  const customIcon = new Icon({
    iconUrl: require("./img/bus.png"),
    iconSize: [38, 38],
  });

  const fetchData = async () => {
    try {
      const data = await fetchRealTimeData();
      const vehicleData = data.entity.map((entity) => {
        if (entity.vehicle && entity.vehicle.position) {
          return {
            id: entity.vehicle.vehicle.id,
            latitude: entity.vehicle.position.latitude,
            longitude: entity.vehicle.position.longitude,
            // licensePlate: entity.vehicle.vehicle.label,
            // speed: entity.vehicle.position.speed || 0,
            routeId: entity.vehicle.trip?.routeId || "N/A", // Add routeId
            tripId: entity.vehicle.trip?.tripId || "N/A",   // Add tripId
          };
        }
        return null;
      }).filter(vehicle => vehicle !== null);
      setBusLocations(vehicleData);
    } catch (error) {
      setError("Error fetching real-time data");
      console.error("Error fetching real-time data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NextUIProvider>
    <div style={{backgroundColor:'lightblue' , width:'100vw',height :'100vh', display:'grid',gridTemplateColumns:'60% 40%' }}>
   
      {error && <p>{error}</p>}
      <MapContainer center={[28.6139, 77.209]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MarkerClusterGroup chunkedLoading>
          {busLocations.map((bus) => (
            <Marker icon={customIcon} key={bus.id} position={[bus.latitude, bus.longitude]}>
              <Popup style={{boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'}}>
                <div style={{ maxWidth: '400px', maxHeight: '300px', overflow: 'auto', whiteSpace: 'nowrap',margin:0, }}>
                  <BusDataTable data={[bus]} />
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <SearchCard busData={busLocations}/>
    </div>
    </NextUIProvider>
  );
}

export default App;
