import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/contextAuth";

function Heder() {

  const { src } = React.useContext(UserContext); // Используем контекст

  return (
    <div className="heder">
      <div><img src={src} alt="avatar" /></div>
      <Link to={"/"}>
        <span>Home</span>
      </Link>
      <Link to={"/registration"}>
        <span>Advin</span>
      </Link>
    </div>
  );
}

export default Heder;
