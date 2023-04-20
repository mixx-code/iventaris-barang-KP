import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const TambahBarang = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const navigate = useNavigate();
  const [jumlahItemMasuk, setjumlahItemMasuk] = useState();
  const [barang, setbarang] = useState("");

  console.log("jumlah masuk: ", jumlahItemMasuk);
  console.log("jumlah lama: ", barang.total_stok);
  console.log("data barang : ", barang);
  console.log("ini barang masuk : ", barang.nama_item);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${Api}/v1/iventaris/item/` ||
          `http://localhost:4000/v1/iventaris/item/`,
        {
          nama_item: barang,
          total_stok: parseInt(jumlahItemMasuk),
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        `${Api}/v1/iventaris/item-masuk` ||
          "http://localhost:4000/v1/iventaris/item-masuk",
        {
          nama_item_masuk: barang,
          jumlah_item_masuk: parseInt(jumlahItemMasuk),
        }
      )
      .then((response) => {
        console.log(response.data);
        window.alert("Item berhasil ditambahkan!");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto mt-52">
        <h2 className="text-lg font-medium mb-4">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nama-item"
            >
              Nama Item
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nama-item"
              type="text"
              placeholder="Masukkan nama item"
              value={barang}
              onChange={(event) => setbarang(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="jumlah-item"
            >
              Jumlah Item
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="jumlah-item"
              type="number"
              placeholder="Masukkan jumlah item"
              value={jumlahItemMasuk}
              onChange={(event) => setjumlahItemMasuk(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahBarang;
