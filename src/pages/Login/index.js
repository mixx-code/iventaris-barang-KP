import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/atoms";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://zany-rose-butterfly-coat.cyclic.app/v1/iventaris/login" ||
          "http://localhost:4000/v1/iventaris/login",
        {
          email,
          password,
        }
      );
      const data = response.data;

      // Login berhasil
      sessionStorage.setItem("isLogin", true);
      localStorage.setItem("dataUser", JSON.stringify(data.user));
      console.log(data.message);
      console.log(data.user);
      console.log(sessionStorage.getItem("isLogin"));
      console.log(localStorage.getItem("dataUser"));
      // tambahkan kode untuk pindah halaman ke halaman home atau redirect ke halaman lain
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-80">
        <h1 className="flex text-lg justify-center font-semibold">
          Login Form
        </h1>
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
        {errorMessage && <div>{errorMessage}</div>}
        <Button
          label="Login"
          onClick={handleLogin}
          className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default Login;
