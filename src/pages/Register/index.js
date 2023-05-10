import React from "react";
import { Button, Input, IsLoading } from "../../components/atoms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Register = () => {
  const Api = "https://iventaris-barang-api.cyclic.app";
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  console.log(isPasswordMatch);
  const registerUser = async (nama, email, konfirmasiPassword) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Api}/v1/iventaris/registrasi` ||
          "http://localhost:4000/v1/iventaris/registrasi",
        {
          nama,
          email,
          role,
          password: konfirmasiPassword,
        }
      );
      const data = response.data;
      console.log(response);
      // Login berhasil
      console.log(data.message);
      console.log(data.user);
      // tambahkan kode untuk pindah halaman ke halaman home atau redirect ke halaman lain
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      console.log(errorMessage);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== konfirmasiPassword) {
      setIsPasswordMatch(false);
      setErrorMessage("Konfirmasi password tidak sesuai.");
    } else {
      setIsPasswordMatch(true);
      registerUser(nama, email, konfirmasiPassword);
    }
  };
  const handleKembali = () => {
    navigate("/home");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-80">
        <h1 className="flex text-lg justify-center font-semibold">Register</h1>
        <Input
          label="Nama"
          type="text"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            data-te-select-init
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="absolute right-4 top-10"
          />
        </div>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Konfirmasi Password"
          type="password"
          minLength={8}
          value={konfirmasiPassword}
          onChange={(event) => setKonfirmasiPassword(event.target.value)}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="grid gap-y-3">
          <Button
            label={isLoading === true ? <IsLoading /> : "Daftar"}
            onClick={handleRegister}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center items-center"
          />
          <Button
            label="Kembali"
            onClick={handleKembali}
            className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
