import React from "react";
import Icon from "../../assets/ic_information_1.png";

const CardInformation = ({ title, count, img }) => {
  return (
    <div className="p-4 shadow rounded-xl">
      <h5 className="bg-[#071952] text-white text-center rounded-2xl p-2 font-bold">
        {title}
      </h5>
      <p className="text-6xl font-bold text-center p-4 text-[#071952]">
        {count}
      </p>
      <img src={img} alt="" />
    </div>
  );
};

export default CardInformation;
