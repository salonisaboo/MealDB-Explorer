import React from "react";
import HomePage from "./pages/HomePage.jsx";
import "./styles/layout.css";


function App() {
    return (
        <div className="app-root">
            <header className="app-header">
                <h1>TheMealDB Explorer</h1>
                <p>Find recipes, browse categories, or get a random meal.</p>
            </header>
            <main className="app-main">
                <HomePage />
            </main>
        </div>
    );
}

export default App;
