import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => (
    <header className="header hbox">
        <Link to="/posts" className="noLinkStyling">
            <div className="vbox flexitem">
                <div className="header-title flexitem">{"Thomas'"}</div>
                <div className="header-subtitle flexitem">{"Notes"}</div>
            </div>
        </Link>
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
