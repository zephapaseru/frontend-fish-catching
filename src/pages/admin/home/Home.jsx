import React, { useEffect, useState } from "react";
import CardInformation from "../../../components/card/CardInformation";
import IconInformation1 from "../../../assets/ic_information_1.png";
import IconInformation2 from "../../../assets/ic_information_2.png";
import IconInformation3 from "../../../assets/ic_information_3.png";
import { db } from "../../../config/firebase";
import { ref, onValue, remove } from "firebase/database";

const Home = () => {
  const [lengthPoints, setLengthPoints] = useState(0);

  const getDataPoints = () => {
    const dbRef = ref(db, "points");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });

      setLengthPoints(data.length);
    });
  };

  useEffect(() => {
    getDataPoints();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <CardInformation
          title="Jumlah Titik Penangkapan"
          count={lengthPoints}
          img={IconInformation1}
        />
        <CardInformation
          count="7"
          title="Jumlah Hasil Tangkapan"
          img={IconInformation2}
        />
        <CardInformation
          count="6"
          img={IconInformation3}
          title="Jumlah Data Variabel"
        />
      </div>
    </>
  );
};

export default Home;
