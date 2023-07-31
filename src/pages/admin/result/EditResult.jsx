import React, { useState } from "react";
import { app, db } from "../../../config/firebase";
import { getDatabase, ref, onValue, update } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const EditResult = ({ selectedItem, setOpenEditResult }) => {
  const [nameFish, setNameFish] = useState(selectedItem.value.nameFish);
  const [resultCatch, setResultCatch] = useState(
    selectedItem.value.resultCatch
  );
  const [waterDepth, setWaterDepth] = useState(selectedItem.value.waterDepth);

  const editResult = async (e) => {
    try {
      e.preventDefault();

      await update(ref(db, `/result/${selectedItem.key}`), {
        nameFish,
        resultCatch,
        waterDepth,
      });
      setOpenEditResult(false);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // Optionally, you can display an error message to the user or perform any other actions as needed.
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-md shadow-lg ">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenEditResult(false)}
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
        <form onSubmit={editResult} className="mt-6">
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

export default EditResult;
