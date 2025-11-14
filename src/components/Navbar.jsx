import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="brand">Uncover Markets</div>
      <button className="burger" onClick={() => setOpen(!open)}>☰</button>
      <ul className={open ? "menu open" : "menu"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/market-updates">Market Updates</Link></li>
        <li><Link to="/newsletters">Newsletters</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
