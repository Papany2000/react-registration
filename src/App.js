import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./Components/Page/appLayout";
import Home from "./Components/Page/home";
import Admin from "./Components/Page/admin";
import React from "react";
import { UserContext } from "./Components/context/contextAuth";


function App() {

  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuth(true);
    } else {
      setAuth(false)
    }
  }, [auth]);
  const value = { auth, setAuth };
  return (
    <div className="App">
      <UserContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Admin />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
