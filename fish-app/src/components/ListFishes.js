import React, { Fragment, useState, useEffect } from "react";
import EditFishes from "./EditFishes";

export const ListFishes = () => {
  const [fish, setFish] = useState([]);
  const getAllFishes = async () => {
    try {
      const response = await fetch("http://localhost:3040/fishes");
      const jsonData = await response.json();
      setFish(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteFish = async (id) => {
    try {
      const deleteFish = await fetch(`http://localhost:3040/fishes/${id}`, {
        method: "DELETE",
      });
      setFish(fish.filter((fish) => fish.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllFishes();
  }, []);
  const listFishes = fish.length ? (
    <table className='table mt-5 text-center'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {fish.map((fish) => (
          <tr key={fish.id}>
            <td>{fish.name}</td>
            <td>{fish.type}</td>
            <td>
              <EditFishes fish={fish} />
            </td>
            <td>
              <button
                className='btn btn-danger'
                onClick={() => deleteFish(fish.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className='center mt-5'>No Fish List!!!</div>
  );
  return <Fragment>{listFishes}</Fragment>;
};

export default ListFishes;
