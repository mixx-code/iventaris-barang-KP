import React from "react";
import { Button, Input } from "../../atoms";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardItem, TabelBarangKeluar, TabelBarangMasuk } from "../../molecules";
import Footer from "../Footer";
const Dashboard = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  //state
  const [counter, setCounter] = useState(1);
  const [dataItem, setDataItem] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("ini query", query);
  //akhir state
  let totalPage = 0;
  if (page && page.total_data && page.per_page) {
    totalPage = Math.ceil(page.total_data / page.per_page);
  }

  let halaman = counter;

  useEffect(() => {
    setIsLoading(true); // set loading menjadi true saat permintaan data dimulai

    const fetchData = async () => {
      try {
        setIsLoading(true); // set loading menjadi true saat permintaan data dimulai

        let apiUrl = `${Api}/v1/iventaris/items?page=${halaman}&perPage=10`;

        if (query) {
          apiUrl =
            `${Api}/v1/iventaris/search?query=${encodeURIComponent(
              query
            )}&page=${halaman}&perPage=10` ||
            `http://localhost:4000/v1/iventaris/search?query=${encodeURIComponent(
              query
            )}&page=${halaman}&perPage=10`;
        }

        // Jeda selama 2 detik sebelum permintaan ke API dilakukan

        const response = await axios.get(apiUrl);
        const responseAPI = response.data;
        setDataItem(responseAPI.data);
        setPage(responseAPI);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // set loading menjadi false ketika permintaan data selesai
      }
    };

    fetchData();
  }, [halaman, query]);

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1);
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-max mt-14 ml-80 ">
      <div className="flex justify-between mr-24">
        <h1 className="text-3xl ml-24 mt-9 font-semibold z-10">Barang</h1>
        <div className="w-80 flex justify-center items-center box-border">
          <label className="text-lg mr-2 text-gray-700">Search</label>
          <Input
            type="text"
            value={query}
            placeholder="Search Barang"
            onChange={(e) => setQuery(e.target.value)}
            className=" shadow appearance-none border rounded-r-none w-80 py-2 px-4 text-gray-700 leading-tight hover:cursor-text focus:outline-none focus:shadow-outline mt-2"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="mx-auto -mt-10 grid grid-cols-2 gap-x-40 gap-y-5 relative">
          <CardItem nama_item="loading . . ." total_stok="loading . . ." />
          <CardItem nama_item="loading . . ." total_stok="loading . . ." />
        </div>
      ) : (
        <div className=" mx-auto -mt-10 grid grid-cols-2 gap-x-40 gap-y-5 relative">
          {dataItem.length > 0 ? (
            dataItem.map((item) => (
              <CardItem
                key={item._id}
                nama_item={item.nama_item}
                total_stok={item.total_stok}
                id={item._id}
              />
            ))
          ) : (
            <h1 className="text-2xl mt-10 mx-auto">Data tidak ditemukan</h1>
          )}
          <div className="flex  absolute -bottom-16 right-0">
            <Button
              label="Seblumnya"
              className="p-1 w-36 rounded-lg bg-custom-abu-tua hover:bg-gray-700 text-sm border-gray-600 hover:border-gray-800 border-2 text-white"
              onClick={previous}
            />
            <p className="text-xl px-6">
              {page && page.current_page
                ? `${page.current_page} / ${totalPage}`
                : ""}
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
