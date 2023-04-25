import React from "react";
import { TabelBarang } from "../../components/molecules";

const listBarang = () => {
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <TabelBarang />
    </div>
  );
};

export default listBarang;
