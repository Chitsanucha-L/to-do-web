import { SquareCheckBig } from "lucide-react";
import "./navbar.css";
import Sidebar from "./sidebar";

const Navbar = ({ name }) => {
  return (
    <nav className="header">
      <div className="container">
        <div className="logo">
          <SquareCheckBig
            color="#3b82f6"
            size={28}
            style={{ marginTop: "-2px" }}
          />
          <span>ToDo App</span>
        </div>
        {name === "" ? (
          <div className="animate-pulse name">
            <div className="box"></div>
          </div>
        ) : (
          <span className="name">สวัสดี, {name}</span>
        )}
        <Sidebar />
      </div>
    </nav>
  );
};
export default Navbar;
