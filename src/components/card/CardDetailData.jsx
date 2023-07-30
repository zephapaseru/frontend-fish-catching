import React from "react";

const CardDetailData = ({ marker }) => {
  return (
    <div>
      <img src={marker.imageLink} alt="" />
      <ul className="mt-4 ml-6 space-y-2 list-disc">
        <li>
          <h3 className="text-xl font-bold">
            {marker.geocode[0]}, {marker.geocode[1]}
          </h3>
          <p className="text-sm">Tinggi Gelombang: {marker.waveHeight}</p>
          <p className="text-sm">Kecepatan Angin: {marker.windSpeed}</p>
          <p className="text-sm">Kecepatan Arus: {marker.currentSpeed}</p>
          <p className="text-sm">
            Suhu Permukaan: {marker["surface temperature"]}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CardDetailData;
