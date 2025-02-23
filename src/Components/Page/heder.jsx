import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/contextAuth";

function Heder() {
 const { auth } = React.useContext(UserContext); // Используем контекст

  return (
    <div className="heder">
      <Link to={"/"}>
        <span>home</span>
      </Link>
      <Link to={"/registration"}>
        <span>{!auth ? 'Регистрация' : 'Выход' }</span>
      </Link>
    </div>
  );
}

export default Heder;
