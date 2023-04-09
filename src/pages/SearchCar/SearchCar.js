import DataTable from "react-data-table-component";
import "./SearchCar.css";
import { SearchBar } from "../../component/SearchBar/SearchBar";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { getDoc, collection } from "firebase/firestore";


const columns=[
  {
    name: 'Image',
    cell: row => <img src={row.image} alt={row.name}></img>,
    selector: row => row.image,
  },
  {
    name: 'Owner',
    selector: row => row.owner,
  },
  {
    name: 'Model',
    selector: row => row.model,
  },
  {
    name: 'Plate',
    selector: row => row.plate,
  },
  {
    name: 'Service',
    selector: row => row.service,
  },
  {
    name: 'Status',
    selector: row => row.status,
  },
  {
    name: 'Start Date',
    selector: row => row.startDate,
  },
  {
    name: 'Edit',
    selector: row => row.edit,
  }
]

const data = [
  {
    image: null,
    owner: "cus1",
    model: "Honda Civic Hatchback",
    plate: "79DVG",
    service: "เช็คระยะ",
    status: "ยังไม่เริ่ม",
    startDate: "-",
    edit: <><button>EDIT</button><button>DELETE</button></>,
  }
]
  


const SearchCar = () => {
  // const querySnapshot = await getDoc(collection(db, "cars"));
  const [result, setResult] = useState([]);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.cId);
  // });

  return (
    <>
      <div className="search-car">
        <div className="search-container">
          <SearchBar />
        </div>
        <div className="result-container">
          <DataTable columns={columns} data={data} className="DataTable"/>

        </div>
      </div>
    </>
  );
};

export default SearchCar;
