import React from "react";
import { Button } from "../../atoms";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardItem, TabelBarangKeluar, TabelBarangMasuk } from "../../molecules";
import Footer from "../Footer";
const Dashboard = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  //state
  const [counter, setCounter] = useState(1);

  const [dataItem, setDataItem] = useState([]);
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //akhir state
  let totalPage = Math.ceil(page.total_data / page.per_page);

  let halaman = counter;

  useEffect(() => {
    setIsLoading(true); // set loading menjadi true saat permintaan data dimulai
    axios
      .get(
        `${Api}/v1/iventaris/items?page=${halaman}&perPage=10` ||
          `http://localhost:4000/v1/iventaris/items?page=${halaman}&perPage=10`
      )
      .then((response) => {
        const responseAPI = response.data;
        setDataItem(responseAPI.data);
        setPage(responseAPI);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading menjadi false ketika permintaan data selesai
      });
  }, [halaman]);

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1);
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-max mt-14 ml-80 ">
      <h1 className="text-3xl ml-24 mt-9 font-semibold z-10">Barang</h1>

      {isLoading ? (
        <div className="mx-auto -mt-10 grid grid-cols-2 gap-x-40 gap-y-5 relative">
          <CardItem />
          <CardItem />
        </div>
      ) : (
        <div className=" mx-auto -mt-10 grid grid-cols-2 gap-x-40 gap-y-5 relative">
          {dataItem.map((item) => {
            return (
              <CardItem
                key={item._id}
                nama_item={item.nama_item}
                total_stok={item.total_stok}
                id={item._id}
              />
            );
          })}
          <div className="flex  absolute -bottom-16 right-0">
            <Button
              label="Seblumnya"
              className="p-1 w-36 rounded-lg bg-custom-abu-tua hover:bg-gray-700 text-sm border-gray-600 hover:border-gray-800 border-2 text-white"
              onClick={previous}
            />
            <p className="text-xl px-6">
              {page.current_page} / {totalPage}
            </p>
            <Button
              label="Selanjutnya"
              className="p-1 w-36 rounded-lg bg-custom-hijau-muda hover:bg-green-600 text-sm border-custom-hijau-tua hover:border-green-900 border-2 text-white"
              onClick={next}
            />
          </div>
        </div>
      )}
      <div className=" flex justify-center gap-10 mr-28">
        <TabelBarangMasuk />
        <TabelBarangKeluar />
      </div>
      <Footer className="w-full bg-gray-400 flex text-white h-max  mt-32 py-6 justify-center items-center  " />
    </div>
  );
};

export default Dashboard;
