import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../atoms";

const TabelBarang = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const [counter, setCounter] = useState(1);
  const [halaman, setHalaman] = useState([]);
  const [barang, setBarang] = useState([]);
  console.log("list barang : ", barang);
  console.log("halaman list barang : ", halaman);
  let totalPage = Math.ceil(halaman.total_data / halaman.per_page);
  let page = counter;
  useEffect(() => {
    axios
      .get(
        `${Api}/v1/iventaris/items?sort=updatedAt:desc&page=${page}&perPage=7`
      )
      .then((response) => {
        const responAPI = response.data;
        setBarang(responAPI.data);
        setHalaman(responAPI);
      });
  }, [page]);
  const sortedListBarang = barang.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };
  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1);
  };
  return (
    <div className="flex flex-col mx-auto relative">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold my-5">List Barang</h1>
          <div className="overflow-hidden re">
            <table className="w-[1000px] border text-center text-sm font-light dark:border-neutral-500">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Nama Barang
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Stok
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedListBarang.map((item) => {
                  const id = item._id;
                  return (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={item._id}
                    >
                      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                        {item.nama_item}
                      </td>
                      <td className="whitespace-nowrap border-r px-6  dark:border-neutral-500">
                        {item.total_stok}
                      </td>
                      <td className="flex whitespace-nowrap py-4 items-center justify-center">
                        <Button
                          label="hapus"
                          className="w-14 rounded-lg p-1 bg-red-600 hover:bg-custom-merah-muda text-sm border-red-900 hover:border-custom-merah-tua border-2 text-white"
                          onClick={() => {
                            if (
                              window.confirm(
                                "apa anda mau menghapus barang ini?"
                              )
                            ) {
                              axios.delete(`${Api}/v1/iventaris/item/${id}`);
                              alert("barang berhasil di hapus.");
                              window.location.reload();
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex absolute right-0 -bottom-7">
              <div
                className="bg-custom-abu-tua hover:bg-gray-700  border-gray-600 hover:border-gray-800 p-1 px-2 mr-5 rounded-lg text-white cursor-pointer"
                onClick={previous}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div
                className="bg-custom-hijau-muda hover:bg-green-600 border-custom-hijau-tua hover:border-green-900a p-1 px-2 rounded-lg text-white cursor-pointer"
                onClick={next}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelBarang;
