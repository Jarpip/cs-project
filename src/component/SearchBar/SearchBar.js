import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  return (
    <form>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="พิมพ์ข้อมูลที่ต้องการจะค้นหา..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
};
