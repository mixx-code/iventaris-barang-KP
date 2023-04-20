import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, IsLoading } from "../../components/atoms";

const Login = () => {
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); // Menampilkan indikator loading
      const response = await axios.post(
        `${Api}/v1/iventaris/login` ||
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

      // Redirect ke halaman /home
      window.location.href = "/home";
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
          label={isLoading === true ? <IsLoading /> : "Login"}
          onClick={handleLogin}
          className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center items-center"
        />
      </div>
    </div>
  );
};

export default Login;
