import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
    <header className="header hbox">
        <div className="vbox flexitem">
            <div className="header-title flexitem">Thomas Holst</div>
            <div className="header-subtitle flexitem">keeps notes</div>
        </div>
        <nav className="header-nav flexitem">
            <ul className="nolist">
                <li className="">
                    <NavLink to="/posts">Posts</NavLink>
                </li>
                <li className="">
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
