import React from "react";
import { Button } from "../../atoms";
import { useNavigate } from "react-router-dom";

function CardItem(props) {
  const navigate = useNavigate();
  const { nama_item, total_stok, id } = props;

  const handleClickBarangMasuk = () => {
    navigate(`/home/barangMasuk/${id}`);
  };

  return (
    <div className="mt-20 w-100 h-auto bg-custom-gray p-4 rounded-lg">
      <div className="flex justify-between">
        <h1 className="font-semibold ml-4 mb-4 text-xl uppercase">
          {nama_item}
        </h1>
        <h1 className="flex items-center mr-4 mb-4 text-sm">
          Stok <span className="font-medium text-xl mx-1">{total_stok}</span>{" "}
          Pcs
        </h1>
      </div>
      <hr className="border-black w-11/12 mx-auto"></hr>
      <div className="flex justify-around mt-5">
        <Button
          label="Barang Masuk"
          className="p-1 w-36 rounded-lg bg-custom-hijau-muda hover:bg-green-600 text-sm border-custom-hijau-tua hover:border-green-900 border-2 text-white"
          onClick={handleClickBarangMasuk}
        />
        <Button
          label="Barang Keluar"
          className="p-1 w-36 rounded-lg bg-custom-merah-muda hover:bg-red-600 text-sm border-custom-merah-tua hover:border-red-900 border-2 text-white"
          onClick={() => navigate(`/home/barangKeluar/${id}`)}
        />
      </div>
    </div>
  );
}

export default CardItem;
