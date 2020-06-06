import React, { Fragment } from "react";
import InputFishes from "./components/InputFishes";
import ListFishes from "./components/ListFishes";

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputFishes />
        <ListFishes />
      </div>
    </Fragment>
  );
}

export default App;
