import React from "react";
import { Button } from "../../atoms";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardItem, TabelBarangKeluar, TabelBarangMasuk } from "../../molecules";
const Dashboard = () => {
  //state
  const [counter, setCounter] = useState(1);

  const [dataItem, setDataItem] = useState([]);
  const [page, setPage] = useState([]);
  //akhir state
  let totalPage = Math.ceil(page.total_data / page.per_page);
  console.log(page);
  let halaman = counter;
  //   console.log(halaman);

  useEffect(() => {
    axios
      .get(
        `https://zany-rose-butterfly-coat.cyclic.app/v1/iventaris/items?page=${halaman}&perPage=6` ||
          `http://localhost:4000/v1/iventaris/items?page=${halaman}&perPage=6`
      )
      .then((response) => {
        const responseAPI = response.data;
        setDataItem(responseAPI.data);
        setPage(responseAPI);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [halaman]);
  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };
  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1);
  };

  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <h1 className="text-3xl ml-24 mt-9 font-semibold">Barang</h1>
      <div className=" ml-24 -mt-10 grid grid-cols-3 gap-2 relative">
        {dataItem.map((item) => {
          console.log(item._id);
          return (
            <CardItem
              key={item._id}
              nama_item={item.nama_item}
              total_stok={item.total_stok}
              id={item._id}
            />
          );
        })}
        <div className="flex  absolute -bottom-16 right-28">
          <Button
            label="Seblumnya"
            className="p-1 w-36 rounded-lg bg-custom-abu-tua text-sm border-gray-600 border-2 text-white"
            onClick={previous}
          />
          <p className="text-xl px-6">
            {page.current_page} / {totalPage}
          </p>
          <Button
            label="Selanjutnya"
            className="p-1 w-36 rounded-lg bg-custom-hijau-muda text-sm border-custom-hijau-tua border-2 text-white"
            onClick={next}
          />
        </div>
      </div>
      <div className="flex justify-center gap-10 mr-56">
        <TabelBarangMasuk />
        <TabelBarangKeluar />
      </div>
    </div>
  );
};

export default Dashboard;
