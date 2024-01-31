import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from './Components/Hero/Hero';
import Add_Property from './Components/Add_Property/Add_Property';
import Predict from "./Components/Predict/Predict";
import Properties from "./Components/Properties/Properties";
import My_Properties from "./Components/My_Properties/My_Properties";
import Transactions from "./Components/Transactions/Transactions";
import Footer from "./Components/Footer/Footer";

import { useState } from "react";

function App() {

  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const saveState = (state) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      <BrowserRouter>
      <Navbar saveState={saveState}/>
      <Routes>
        <Route path="/" element={<Hero state={state} />} />
        <Route path="/add" element={<Add_Property state={state} />} />
        <Route path="transactions">
          <Route path=":userId" element={<Transactions state={state} />} />
        </Route>
        <Route path="/properties" element={<Properties state={state} />} />
        <Route path="/my_properties" element={<My_Properties state={state} />} />
        <Route path="/predict" element={<Predict state={state} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App;