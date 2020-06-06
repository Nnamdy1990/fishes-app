import React, { Fragment, useState } from "react";

export const EditFishes = ({ fish }) => {
  const [name, setName] = useState(fish.name);
  const [type, setType] = useState(fish.type);

  //edit name
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type };
      const response = await fetch(`http://localhost:3040/fishes/${fish.id}`, {
        method: "PUT",
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
      <button
        type='button'
        class='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${fish.id}`}
      >
        Edit
      </button>

      <div
        class='modal'
        id={`id${fish.id}`}
        onClick={(e) => setName(fish.name)}
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h4 class='modal-title'>Edit Fish</h4>
              <button
                type='button'
                class='close'
                onClick={(e) => setName(fish.name)}
                data-dismiss='modal'
              >
                &times;
              </button>
            </div>

            <div class='modal-body'>
              <input
                type='text'
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class='modal-body'>
              <input
                type='text'
                className='form-control'
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-warning'
                data-dismiss='modal'
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick={(e) => setName(fish.name)}
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditFishes;
