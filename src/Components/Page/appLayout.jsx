import { Outlet } from "react-router-dom";
import Heder from "./heder";

const AppLayout = () => {
  return (
    <>
      <Heder />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default AppLayout;
