import React from "react";
import ClusterOne from "../../assets/cluster_1.png";
import ClusterTwo from "../../assets/cluster_2.png";

const Legend = () => {
  return (
    <div className="p-4 text-black bg-white legend w-max h-max">
      <h6 className="font-bold ">Legenda</h6>
      <div className="flex items-center mt-6 space-x-4 legend-item">
        <img src={ClusterOne} alt="" className="h-12" />
        <p>Cluster Banyak Ikan</p>
      </div>
      <div className="flex items-center mt-6 space-x-4 legend-item">
        <img src={ClusterTwo} alt="" className="h-12" />
        <p>Cluster Sedikit Ikan</p>
      </div>
    </div>
  );
};

export default Legend;
