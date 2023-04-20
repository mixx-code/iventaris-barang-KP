import React from "react";
import { Button, Input } from "../../components/atoms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (nama, email, konfirmasiPassword) => {
    try {
      const response = await axios.post(
        `${Api}/v1/iventaris/registrasi` ||
          "http://localhost:4000/v1/iventaris/registrasi",
        {
          nama,
          email,
          password: konfirmasiPassword,
        }
      );
      const data = response.data;

      // Login berhasil
      console.log(data.message);
      console.log(data.user);
      // tambahkan kode untuk pindah halaman ke halaman home atau redirect ke halaman lain
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Konfirmasi Password"
          type="password"
          value={konfirmasiPassword}
          onChange={(event) => setKonfirmasiPassword(event.target.value)}
        />
        {errorMessage && <div>{errorMessage}</div>}
        <Button
          label="Daftar"
          onClick={handleRegister}
          className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default Register;
