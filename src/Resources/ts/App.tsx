import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Docs from "./Pages/Docs";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/:name" element={<Docs />} />
        </Routes>
    );
}
