import React from "react";

const Footer = ({ ...rest }) => {
  return (
    <div {...rest}>
      <div>
        &copy; 2023 Rizki febriansyah ❤️{" "}
        <span className="text-blue-600">@</span>
      </div>
      <a
        href="https://www.instagram.com/iki_0011/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text-blue-600">instagram</span>
      </a>
    </div>
  );
};

export default Footer;
