import { NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  return (
    <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/stories">Patient Stories</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <div style={{ marginLeft: "auto" }}>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
