import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, IsLoading } from "../../components/atoms";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EditAkun = () => {
  const navigate = useNavigate();
  const Api = "https://iventaris-barang-api.cyclic.app/";
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${Api}/v1/iventaris/user/${id}` ||
          `http://localhost:4000/v1/iventaris/user/${id}`
      )
      .then((response) => {
        const responseAPI = response.data;
        setUser(responseAPI.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [Api, id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .put(
        `${Api}/v1/iventaris/user/${id}` ||
          `http://localhost:4000/v1/iventaris/user/${id}`,
        {
          nama,
          email,
          role,
          password,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNama = (event) => {
    setNama(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="w-full bg-custom-putih flex flex-col  h-screen mt-14 ml-80 ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto mt-52">
        <h2 className="text-lg font-medium mb-4">Keluarkan Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Nama"
              type="text"
              value={nama}
              onChange={handleNama}
              placeholder={user.nama}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder={user.email}
              required
            />
          </div>

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
          <div className="mb-4">
            <Input
              label="Passowrd"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="masukkan password baru"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              label={isLoading === true ? <IsLoading /> : "Submit"}
              onclick={() =>
                window.confirm("apa anda yakin merubah user ini ?")
              }
              type="submit"
              className=" flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center items-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAkun;
