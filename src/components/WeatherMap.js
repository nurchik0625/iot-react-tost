import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const WeatherMap = () => {
  useEffect(() => {
    // Create a map instance
    const map = L.map('map').setView([42.8746, 74.5698], 13);

    // Add base tile layers
    const lightMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
    });
    const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
    });
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });
    const openStreetMapHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });
    const dgis = L.tileLayer('https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
        subdomains: '0123',
        attribution: '© 2GIS',
      });

    // Add base map layer
    dgis.addTo(map);

    // Add additional weather layers
    const windLayer = L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=e9cc91c43499eab0de3837377f52231d', {
      attribution: 'EldiyarMaps'
    });
    const pressureLayer = L.tileLayer('https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=e9cc91c43499eab0de3837377f52231d', {
        attribution: 'EldiyarMaps'
      });
    const precipitationLayer = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e9cc91c43499eab0de3837377f52231d', {
      attribution: 'EldiyarMaps'
    });
    const cloudsLayer = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=e9cc91c43499eab0de3837377f52231d', {
      attribution: 'EldiyarMaps'
    });
    const temperatureLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e9cc91c43499eab0de3837377f52231d', {
      attribution: 'EldiyarMaps'
    });

    const ligthingLayer = L.tileLayer('https://maps.aerisapi.com/6q4JnOGqD7MbBHO51hn0z_UF1Oy5KrQIPy7RTIo67WuRE2ilmBJTnc57jGYtRq/lightning-all/{z}/{x}/{y}/current.png ', {
        attribution: 'EldiyarMaps'
      });
  
      const air25Layer = L.tileLayer('https://maps.aerisapi.com/6q4JnOGqD7MbBHO51hn0z_UF1Oy5KrQIPy7RTIo67WuRE2ilmBJTnc57jGYtRq/air-quality-pm2p5/{z}/{x}/{y}/current.png', {
        attribution: 'EldiyarMaps'
      });
  
      const air10Layer = L.tileLayer('https://maps.aerisapi.com/6q4JnOGqD7MbBHO51hn0z_UF1Oy5KrQIPy7RTIo67WuRE2ilmBJTnc57jGYtRq/air-quality-pm10/{z}/{x}/{y}/current.png', {
          attribution: 'EldiyarMaps'
        });
    
        const airLayer = L.tileLayer('https://maps.aerisapi.com/6q4JnOGqD7MbBHO51hn0z_UF1Oy5KrQIPy7RTIo67WuRE2ilmBJTnc57jGYtRq/flat-dk,water-depth,radar,admin-cities-dk/{z}/{x}/{y}/current.png', {
            attribution: 'EldiyarMaps'
          });
      
    // Add control for switching layers
    const baseMaps = {
        'Светлая карта': lightMap,
        'Темная карта': darkMap,
        'OpenStreetMap карта': openStreetMap,
        'OpenStreetMap Hot карта': openStreetMapHot,
        '2GIS карта': dgis,
      };
    const overlayMaps = {
      'Давление': pressureLayer,
      'Загрязнение воздуха PM2.5': precipitationLayer,
      'Облака': cloudsLayer,
      'Температура': temperatureLayer,
      'Загрязнение воздуха PM10': windLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Return a cleanup function to remove the map instance when the component unmounts
    return () => {
      map.remove();
    };
  }, []); // Add an empty dependency array to ensure the effect runs only once

  return (
<div id="map" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 1 }}></div>
  );
};

export default WeatherMap;
