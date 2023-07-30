import React, { useState, useEffect } from "react";
import AddPoint from "./AddPoint";
import { db } from "../../../config/firebase";
import { ref, onValue, remove } from "firebase/database";
import ModalDelete from "../../../components/modal/ModalDelete";
import EditPoint from "./EditPoint";

const DataPoint = () => {
  const [openAddPoint, setOpenAddPoint] = useState(false);
  const [openEditPoint, setOpenEditPoint] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const getData = () => {
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
      console.log(data);
      setData(data);
    });
  };

  const handleDelete = () => {
    if (selectedItem) {
      const { key } = selectedItem;
      try {
        remove(ref(db, `points/${key}`)).then(() => {
          setOpenModalDelete(false);
          setSelectedItem(null);
        });
      } catch (error) {
        console.error("Error deleting alternative:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5">
        <h3 className="text-[#191635] font-bold text-xl">
          Daftar Titik Penangkapan Ikan
        </h3>
        <button
          onClick={() => setOpenAddPoint(true)}
          className="max-w-[200px] btn btn-primary"
        >
          Tambah Titik
        </button>
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Titik Koordinat</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index + 1}>
                  <td className="px-6 py-4">
                    {item.value.long}, {item.value.lat}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center px-6 py-4 space-x-4 text-right">
                      <button
                        className="btn w-28 btn-sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenEditPoint(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-28 btn btn-error btn-sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenModalDelete(true);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openAddPoint && <AddPoint setOpenAddPoint={setOpenAddPoint} />}
      {openEditPoint && (
        <EditPoint
          selectedItem={selectedItem}
          setOpenEditPoint={setOpenEditPoint}
        />
      )}
      {openModalDelete && (
        <ModalDelete
          title="Hapus Data"
          message="Apakah Anda yakin ingin menghapus Data ini?"
          onClose={() => {
            setOpenModalDelete(false);
            setSelectedItem(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default DataPoint;
