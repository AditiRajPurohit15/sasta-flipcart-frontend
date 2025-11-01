import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send search text to parent
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="🔍 Search products..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
};

export default SearchBar;
