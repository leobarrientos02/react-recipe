import React from "react";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Search />
      <Category />
      <Pages />
    </BrowserRouter>
  );
};

export default App;
