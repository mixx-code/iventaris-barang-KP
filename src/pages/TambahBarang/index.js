import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, IsLoading } from "../../components/atoms";
const TambahBarang = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const navigate = useNavigate();
  const [jumlahItemMasuk, setjumlahItemMasuk] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [barang, setbarang] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const userId = dataUser.id;
  console.log(userId);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    axios
      .post(
        `${Api}/v1/iventaris/item/` ||
          `http://localhost:4000/v1/iventaris/item/`,
        {
          nama_item: barang,
          total_stok: parseInt(jumlahItemMasuk),
          id_user: userId,
        }
      )
      .then((response) => {
        console.log("berhasil ditambahkan");
      })
      .catch((error) => {
        setIsLoading(false);
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
        setIsLoading(false);
        window.alert("Item Gagal ditambahkan!");
        console.log(error);
      });
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto mt-52">
        <h2 className="text-lg font-medium mb-4">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Nama Item"
              type="text"
              value={barang}
              onChange={(event) => setbarang(event.target.value)}
              placeholder="Masukkan nama item"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Jumlah Item"
              type="number"
              value={jumlahItemMasuk}
              onChange={(event) => setjumlahItemMasuk(event.target.value)}
              placeholder="Masukkan Jumlah Item"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              label={isLoading === true ? <IsLoading /> : "Submit"}
              type="submit"
              className=" flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center items-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahBarang;
