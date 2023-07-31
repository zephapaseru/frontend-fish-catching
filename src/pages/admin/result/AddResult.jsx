import React, { useState } from "react";
import { uid } from "uid";
import { db } from "../../../config/firebase";
import { set, ref } from "firebase/database";

const AddResult = ({ setOpenAddResult }) => {
  const [nameFish, setNameFish] = useState("");
  const [resultCatch, setResultCatch] = useState(0);
  const [waterDepth, setWaterDepth] = useState(0);

  const AddResult = async (e) => {
    e.preventDefault();
    const uuid = uid();
    try {
      await set(ref(db, `/result/${uuid}`), {
        nameFish,
        resultCatch,
        waterDepth,
      });

      setOpenAddResult(false);
    } catch (error) {
      console.error("Error adding point:", error);
    }
  };
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-md shadow-lg ">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenAddResult(false)}
            className="w-12 h-12 text-xl bg-white rounded-full btn text-primary "
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={AddResult} className="mt-6">
          <div className="mt-4">
            <label className="text-lg font-semibold ">Nama Ikan</label>
            <input
              type="text"
              placeholder=""
              value={nameFish}
              onChange={(e) => setNameFish(e.target.value)}
              className="w-full mt-3 input input-bordered"
            />
          </div>
          <div>
            <label className="text-lg font-semibold ">
              Hasil Tangkapan (kg)
            </label>
            <input
              type="number"
              placeholder=""
              value={resultCatch}
              onChange={(e) => setResultCatch(e.target.value)}
              className="w-full mt-3 input input-bordered"
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold ">Kedalaman Air</label>
            <input
              type="number"
              value={waterDepth}
              onChange={(e) => setWaterDepth(e.target.value)}
              className="w-full mt-3 input input-bordered"
            />
          </div>
          <button type="submit" className="w-full mt-6 btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
