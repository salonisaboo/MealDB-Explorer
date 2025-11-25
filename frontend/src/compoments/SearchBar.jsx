import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSearch(value.trim());
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search meals by name..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
        </form>
    );
};

export default SearchBar;
