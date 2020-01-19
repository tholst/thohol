import React from "react";
// import { Link, NavLink } from "react-router-dom";
import emoji from "node-emoji";

const Header = () => (
    <footer className="hbox footer">
        <div className="flexitem footer-copyright">
            {`${emoji.get(":copyright:")} Thomas Holst ${new Date().getFullYear()}`}
        </div>
    </footer>
);

export default Header;
