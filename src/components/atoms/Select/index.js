import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Select = ({ label }) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        data-te-select-init
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <FontAwesomeIcon icon={faCaretDown} className="absolute right-4 top-10" />
    </div>
  );
};

export default Select;
