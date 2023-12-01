import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

let map: any;
let searchBox: any;
let markers: any[] = [];
let count: number = 1;

function initMap() {
  // Init map
  map = new window.google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 48.856614, lng: 2.3522219 },
      zoom: 12,
    }
  );

  // Init search box
  searchBox = new window.google.maps.places.SearchBox(
    document.getElementById("search") as HTMLInputElement
  );

  // Listens to changes on search box
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Get first place
    const place = places[0];

    // Centers map on selected place
    map.setCenter(place.geometry.location);
    map.setZoom(16);
  });

  // Add click listener on map to add a marker on click
  map.addListener("click", (event: any) => {
    addMarker(event.latLng);
  });
}

function addMarker(location: any) {
  // Create new marker
  const marker = new window.google.maps.Marker({
    position: location,
    map,
    title: `Marker ${count}`,
    label: `${count}`,
  });

  // Add marker to "markers" array
  markers.push(marker);

  // Increment markers count
  count++;

  // Add click listener on marker to open modal
  marker.addListener('click', () => {
    const infowindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <p>Latitude: ${location.lat()}</p>
          <p>Longitude: ${location.lng()}</p>
        </div>
      `,
    });

    // Open info window
    infowindow.open(map, marker);

    // Add click listener on close button to close modal
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        infowindow.close();
      });
    }
  });
}

function clearMarkers() {
  // Clear all markers
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  // Empty"markers" array
  markers = [];

  // Reset markers count
  count = 1;
}

function MapArchive() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAP_API_KEY
      }&libraries=places`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        setLoaded(true);
        initMap();
      };

      document.body.appendChild(script);
    }
  }, [loaded]);

  return (
    <div className="flex h-screen">
      <div ref={mapRef} className="flex-1" id="map" />
      <div className="absolute top-0 left-40 mt-3 ml-20 z-10">
        <input
          id="search"
          className="w-64 px-4 py-2 align text-lg font-semibold rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          placeholder="Search place"
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-500"
          onClick={clearMarkers}
        >
          Clear Markers
        </button>
      </div>
    </div>
  );
}

export default MapArchive;
