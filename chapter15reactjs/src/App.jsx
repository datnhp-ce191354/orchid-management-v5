import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListOfOrchids from "./components/ListOfOrchids";
import EditOrchid from "./components/EditOrchid";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<ListOfOrchids />} />
          <Route path="/orchids/new" element={<EditOrchid createMode={true} />} />
          <Route path="/orchids/:id/edit" element={<EditOrchid createMode={false} />} />
        </Routes>
      </div>
    </>
  );
}
