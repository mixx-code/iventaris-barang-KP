import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, IsLoading } from "../../components/atoms";
const BarangKeluar = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const navigate = useNavigate();
  const { id } = useParams();
  const [jumlahKeluar, setJumlahKeluar] = useState();
  const [barang, setbarang] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const jumlahStokBaru = parseInt(barang.total_stok) - parseInt(jumlahKeluar);

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
    setIsLoading(true);
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
        `${Api}/v1/iventaris/item-keluar` ||
          "http://localhost:4000/v1/iventaris/item-keluar",
        {
          nama_item_keluar: barang.nama_item,
          jumlah_item_keluar: parseInt(jumlahKeluar),
        }
      )
      .then((response) => {
        console.log(response.data);
        window.alert("Item berhasil diKeluarkan!");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleJumlahKeluarChange = (event) => {
    setJumlahKeluar(event.target.value);
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto mt-52">
        <h2 className="text-lg font-medium mb-4">Keluarkan Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Nama Item"
              type="text"
              value={barang.nama_item}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Input
              label="Jumlah Item"
              type="number"
              value={jumlahKeluar}
              onChange={handleJumlahKeluarChange}
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

export default BarangKeluar;
