import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./NavBar.module.css";
import navBarClosed from "../../../assets/img/navbarClosed.svg";

const NavBar = () => {
    const { data } = useData();

    if (!data) return null;

    return (
        <div className="navbar-element">
            <img src={navBarClosed} alt="navBarClosed" className={styles.navBarClosed}/>
        </div>
    );
};

export default NavBar;