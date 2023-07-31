import React, { useState, useEffect } from "react";
import AddPoint from "./AddResult";
import { db } from "../../../config/firebase";
import { ref, onValue, remove } from "firebase/database";
import ModalDelete from "../../../components/modal/ModalDelete";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import AddResult from "./AddResult";
import EditResult from "./EditResult";

const DataResult = () => {
  const [openAddResult, setOpenAddResult] = useState(false);
  const [openEditResult, setOpenEditResult] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const getData = () => {
    const dbRef = ref(db, "result");
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
        remove(ref(db, `result/${key}`)).then(() => {
          setOpenModalDelete(false);
          setSelectedItem(null);
        });
      } catch (error) {
        console.error("Error deleting alternative:", error);
      }
    }
  };

  // Function to calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to get the current items to display based on the current page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <h3 className="text-[#191635] font-bold text-xl">
          Daftar Hasil Penangkapan Ikan
        </h3>
        <button
          onClick={() => setOpenAddResult(true)}
          className="max-w-[200px] btn btn-primary"
        >
          Tambah
        </button>
        {data.length !== 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nama Ikan</th>
                  <th>Hasil Tangkapan (kg)</th>
                  <th>Kedalaman Air</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={index + 1}>
                    <td className="px-6 py-4">{item.value.nameFish}</td>
                    <td className="px-6 py-4">{item.value.resultCatch}</td>
                    <td className="px-6 py-4">{item.value.waterDepth}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center px-6 py-4 space-x-4 text-right">
                        <button
                          className="btn w-28 btn-sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setOpenEditResult(true);
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
        ) : (
          <p className="p-4 text-center border shadow">Belum Ada Data</p>
        )}
      </div>
      {data.length > itemsPerPage && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            className="btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <span>
            {currentPage} dari {totalPages}
          </span>
          <button
            className="btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      )}
      {openAddResult && <AddResult setOpenAddResult={setOpenAddResult} />}
      {openEditResult && (
        <EditResult
          selectedItem={selectedItem}
          setOpenEditResult={setOpenEditResult}
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

export default DataResult;
