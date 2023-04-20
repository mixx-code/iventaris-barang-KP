import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BarangMasuk = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const navigate = useNavigate();
  const { id } = useParams();
  const [jumlahItemMasuk, setjumlahItemMasuk] = useState(0);
  const [barang, setbarang] = useState({});

  console.log("jumlah masuk: ", jumlahItemMasuk);
  console.log("jumlah lama: ", barang.total_stok);
  const jumlahStokBaru =
    parseInt(barang.total_stok) + parseInt(jumlahItemMasuk);
  console.log("jumlah baru : ", jumlahStokBaru);
  console.log("data barang : ", barang);
  console.log("ini barang masuk : ", barang.nama_item);

  useEffect(() => {
    axios
      .get(
        `${Api}/v1/iventaris/item/${id}` ||
          `http://localhost:4000/v1/iventaris/item/${id}`
      )
      .then((response) => {
        const responseAPI = response.data;
        setbarang(responseAPI.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${Api}/v1/iventaris/item/${id}` ||
          `http://localhost:4000/v1/iventaris/item/${id}`,
        {
          nama_item: barang.nama_item,
          total_stok: parseInt(jumlahStokBaru),
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
          nama_item_masuk: barang.nama_item,
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

  const handleJumlahItemMasukChange = (event) => {
    setjumlahItemMasuk(event.target.value);
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto mt-52">
        <h2 className="text-lg font-medium mb-4">Tambah Item</h2>
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
              value={barang.nama_item}
              readOnly
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
              onChange={handleJumlahItemMasukChange}
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

export default BarangMasuk;
