import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => (
    <header className="header hbox">
        <div className="vbox flexitem">
            <Link to="/posts" className="noLinkStyling">
                <div className="header-title flexitem">{"Thomas Holst"}</div>
            </Link>
            <div className="header-subtitle flexitem">
                <Link to="/posts" className="noLinkStyling">
                    {"Software Development "}
                </Link>
                <a
                    className="noLinkStyling"
                    href="https://www.urbandictionary.com/define.php?term=and%20stuff"
                >
                    & stuff
                </a>
            </div>
        </div>
        <nav className="header-nav flexitem hbox">
            <NavLink exact className="noLinkStyling" to="/posts">
                Posts
            </NavLink>
            <NavLink className="noLinkStyling" to="/about">
                About
            </NavLink>
        </nav>
    </header>
);

export default Header;
