import React, { useEffect, useRef } from "react";

function Map({ onCoordinatesChange }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 15,
      mapTypeId: "satellite",
    });

    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      polygonOptions: { editable: true },
    });
    drawingManager.setMap(map);

    window.google.maps.event.addListener(drawingManager, "polygoncomplete", (polygon) => {
      const coordinates = polygon.getPath().getArray().map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));
      onCoordinatesChange(coordinates);
    });
  }, [onCoordinatesChange]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default Map;