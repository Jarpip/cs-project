import DataTable from "react-data-table-component";
import { SearchBar } from "../../../component/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const columns = [
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Model",
    selector: (row) => row.model,
  },
  {
    name: "Color",
    selector: (row) => row.color,
  },
  {
    name: "Plate",
    selector: (row) => row.plate,
  },
  {
    name: "Edit",
    selector: (row) => row.edit,
  },
];

const data = [
  {
    email: "cus1@gmail.com",
    contact: "0943325618",
    name: "cus1",
    model: "Honda Civic Hatchback",
    color: "red",
    plate: "79DVG",
    edit: <><button>EDIT</button><button>DELETE</button></>,
  },
];
const Customer = () => {
  //const [items, setItems] = useState([]);

  const nav = useNavigate();
  const toAdd = () => {
    nav("/addCustomer");
  };

  // const FetchData = () => {
  //   db.collection("users").get().then((data)=>{
  //     data.forEach(element => {
  //       var data = element.data();
  //       setItems(arr=>[...arr, data]);
  //     });
  //   })
  //   console.log(items);
  // }

  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  return (
    <>
      <div className="search-car">
        <div className="search-container">
          <SearchBar />
          <br></br>
          <button onClick={toAdd}>Add Customer</button>
        </div>
        <div className="result-container">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};
export default Customer;
