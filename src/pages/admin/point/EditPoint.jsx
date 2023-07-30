import React, { useState } from "react";
import { app, db } from "../../../config/firebase";
import { getDatabase, ref, onValue, update } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const EditPoint = ({ selectedItem, setOpenEditPoint }) => {
  const [long, setLong] = useState(selectedItem.value.long);
  const [lat, setLat] = useState(selectedItem.value.lat);
  const [image, setImage] = useState(null);

  const editPoint = async (e) => {
    try {
      e.preventDefault();

      const storageRef = refStorage(
        getStorage(app),
        `/images/${selectedItem.uuid}`
      );

      if (!image) {
        await update(ref(db, `/points/${selectedItem.key}`), {
          long,
          lat,
        });
        setOpenEditPoint(false);
      } else {
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);

        await update(ref(db, `/points/${selectedItem.key}`), {
          long,
          lat,
          imageUrl: imageUrl,
        });

        setOpenEditPoint(false);
      }
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
            onClick={() => setOpenEditPoint(false)}
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
        <form onSubmit={editPoint} className="mt-6">
          <div>
            <label className="text-lg font-semibold ">Longitude</label>
            <input
              type="text"
              placeholder="Type here"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              className="w-full mt-3 input input-bordered"
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold ">Latitude</label>
            <input
              type="text"
              placeholder="Type here"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full mt-3 input input-bordered"
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold ">Gambar</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full mt-3 file-input file-input-bordered"
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

export default EditPoint;
