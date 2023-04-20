import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Sidebar = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const userId = dataUser.id;
  useEffect(() => {
    axios
      .get(
        `${Api}/v1/iventaris/user/${userId}` ||
          `http://localhost:4000/v1/iventaris/user/${userId}`
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userId]);
  function handleLogout() {
    sessionStorage.setItem("isLogin", false);
    // tambahkan kode untuk pindah halaman ke halaman home atau redirect ke halaman lain
    navigate("/login");
  }
  return (
    <div className="w-80 bg-white flex flex-col fixed h-screen top-14">
      <div className="flex bg-blue-300 w-full justify-center items-center h-16  ">
        <h1 className="text-2xl font-semibold text-gray-700  ">{data.nama}</h1>
      </div>
      <ul className="flex flex-col mx-auto">
        <li className="text-xl text-gray-700  mt-10">
          <NavLink to="/home" relative="path" activeClassName="text-blue-500">
            Dashboard
          </NavLink>
        </li>
        <li className="text-xl text-gray-700  mt-10">
          <NavLink
            to="/home/tambahBarang"
            relative="path"
            activeClassName="text-blue-500"
          >
            Tambah Barang
          </NavLink>
        </li>
        <li className="text-xl text-gray-700  mt-10">
          <NavLink
            to="/register"
            relative="path"
            activeClassName="text-blue-500"
          >
            Tambah Akun
          </NavLink>
        </li>
        <li className="text-xl text-red-500  mt-10 ">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
