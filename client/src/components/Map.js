import React, { useEffect, useRef } from "react";

function Map({ onCoordinatesChange, coordinates }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polygonRef = useRef(null);

  useEffect(() => {
    // Initialize map only if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = window.L.map(mapRef.current).setView([37.7749, -122.4194], 15);

      // Add OpenStreetMap tiles (default)
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(mapInstanceRef.current);

      // Initialize an editable polygon
      polygonRef.current = window.L.polygon([], { color: "red", weight: 2 }).addTo(mapInstanceRef.current);

      // Enable drawing by clicking on the map
      mapInstanceRef.current.on("click", (e) => {
        polygonRef.current.addLatLng(e.latlng);
        const coords = polygonRef.current.getLatLngs()[0].map((latlng) => ({
          lat: latlng.lat,
          lng: latlng.lng,
        }));
        onCoordinatesChange(coords);
      });
    }

    // If coordinates are provided (e.g., from GovDashboard), display them
    if (coordinates && coordinates.length > 0) {
      polygonRef.current.setLatLngs(coordinates);
      mapInstanceRef.current.fitBounds(polygonRef.current.getBounds());
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onCoordinatesChange, coordinates]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default Map;