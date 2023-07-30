import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import CardDetailData from "../../components/card/CardDetailData";
import Legend from "../../components/legend/Legend";

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// create custom icon for cluster 1
const customIconCluster1 = new Icon({
  iconUrl: require("../../assets/cluster_1.png"),
  iconSize: [38, 38],
});

// create custom icon for cluster 2
const customIconCluster2 = new Icon({
  iconUrl: require("../../assets/cluster_2.png"),
  iconSize: [38, 38],
});

const markers = [
  {
    geocode: [4.63525, 126.948433],
    popUp: "Hello, I am pop up 1",
    cluster: 1,
    waveHeight: "0.66m",
    windSpeed: "4.18 m/s",
    currentSpeed: "2.30m",
    "surface temperature": "25C",
  },
  {
    geocode: [4.627083, 126.82275],
    popUp: "Hello, I am pop up 2",
    cluster: 1,
    waveHeight: "0.70m",
    windSpeed: "3.90 m/s",
    currentSpeed: "2.15m",
    "surface temperature": "24C",
  },
  {
    geocode: [4.553778, 126.980111],
    popUp: "Hello, I am pop up 3",
    cluster: 1,
    waveHeight: "0.72m",
    windSpeed: "3.75 m/s",
    currentSpeed: "2.25m",
    "surface temperature": "23C",
  },
  {
    geocode: [4.74725, 126.912889],
    popUp: "Hello, I am pop up 4",
    cluster: 1,
    waveHeight: "0.69m",
    windSpeed: "4.05 m/s",
    currentSpeed: "2.35m",
    "surface temperature": "26C",
  },
  {
    geocode: [4.790694, 126.79975],
    popUp: "Hello, I am pop up 5",
    cluster: 1,
    waveHeight: "0.68m",
    windSpeed: "4.12 m/s",
    currentSpeed: "2.40m",
    "surface temperature": "27C",
  },
  {
    geocode: [4.738056, 126.698056],
    popUp: "Hello, I am pop up 6",
    cluster: 2,
    waveHeight: "0.85m",
    windSpeed: "3.50 m/s",
    currentSpeed: "2.20m",
    "surface temperature": "22C",
  },
  {
    geocode: [4.377028, 126.521111],
    popUp: "Hello, I am pop up 7",
    cluster: 2,
    waveHeight: "0.80m",
    windSpeed: "3.65 m/s",
    currentSpeed: "2.10m",
    "surface temperature": "21C",
  },
  {
    geocode: [4.047222, 126.461083],
    popUp: "Hello, I am pop up 8",
    cluster: 2,
    waveHeight: "0.78m",
    windSpeed: "3.80 m/s",
    currentSpeed: "2.05m",
    "surface temperature": "20C",
  },
  {
    geocode: [4.166944, 126.511583],
    popUp: "Hello, I am pop up 9",
    cluster: 2,
    waveHeight: "0.75m",
    windSpeed: "3.95 m/s",
    currentSpeed: "2.08m",
    "surface temperature": "19C",
  },
  {
    geocode: [4.561944, 126.625],
    popUp: "Hello, I am pop up 10",
    cluster: 2,
    waveHeight: "0.77m",
    windSpeed: "3.85 m/s",
    currentSpeed: "2.12m",
    "surface temperature": "18C",
  },
  {
    geocode: [4.491806, 126.564583],
    popUp: "Hello, I am pop up 11",
    cluster: 2,
    waveHeight: "0.79m",
    windSpeed: "3.75 m/s",
    currentSpeed: "2.15m",
    "surface temperature": "18C",
  },
  {
    geocode: [4.674583, 126.665472],
    popUp: "Hello, I am pop up 12",
    cluster: 2,
    waveHeight: "0.82m",
    windSpeed: "3.60 m/s",
    currentSpeed: "2.18m",
    "surface temperature": "19C",
  },
  {
    geocode: [4.469167, 126.512],
    popUp: "Hello, I am pop up 13",
    cluster: 2,
    waveHeight: "0.85m",
    windSpeed: "3.50 m/s",
    currentSpeed: "2.20m",
    "surface temperature": "20C",
  },
  {
    geocode: [4.356944, 126.548861],
    popUp: "Hello, I am pop up 14",
    cluster: 2,
    waveHeight: "0.88m",
    windSpeed: "3.45 m/s",
    currentSpeed: "2.22m",
    "surface temperature": "21C",
  },
  {
    geocode: [4.214722, 126.572222],
    popUp: "Hello, I am pop up 15",
    cluster: 2,
    waveHeight: "0.90m",
    windSpeed: "3.40 m/s",
    currentSpeed: "2.25m",
    "surface temperature": "22C",
  },
];

const imageLink =
  "https://firebasestorage.googleapis.com/v0/b/fish-catching-9a420.appspot.com/o/images%2F155392e7bd8?alt=media&token=fdb03b44-70ab-48a8-a9d7-5dacde71a2af";

const markersWithImageLink = markers.map((marker) => ({
  ...marker,
  imageLink: imageLink,
}));

const northIndonesiaCenter = [0.7893, 113.9213];
const indonesiaZoom = 6; // Adjust the zoom level as needed
const MainUser = () => {
  return (
    <>
      <MapContainer center={northIndonesiaCenter} zoom={indonesiaZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markersWithImageLink.map((marker) => (
            <Marker
              position={marker.geocode}
              icon={
                marker.cluster === 1 ? customIconCluster1 : customIconCluster2
              }
            >
              <Popup>
                <CardDetailData marker={marker} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Legend />
      </MapContainer>
    </>
  );
};

export default MainUser;
