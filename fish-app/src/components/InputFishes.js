import React, { Fragment, useState } from "react";

export const InputFishes = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type };
      const response = await fetch("http://localhost:3040/fishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-centre mt-5'>Fishes List</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input
          type='text'
          className='form-control'
          value={name}
          placeholder='name of fish..'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          className='form-control'
          value={type}
          placeholder='type of fish..'
          onChange={(e) => setType(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </Fragment>
  );
};

export default InputFishes;
