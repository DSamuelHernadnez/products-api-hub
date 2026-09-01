import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

const Nav = () => {
   return (
      <header className={styles.navContainer}>
         <div className={styles.brandWrapper}>
            <span className={styles.brandLogo}>WorderMark</span>
         </div>

         <nav className={styles.linksGroup}>
            <NavLink to="/home" className={({ isActive }) => isActive ? styles.activeLink : ""}>
               <button className={styles.navBtn}>INICIO</button>
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => isActive ? styles.activeLink : ""}>
               <button className={styles.navBtn}>CREAR PRODUCTO</button>
            </NavLink>
         </nav>

         <div className={styles.searchWrapper}>
            <SearchBar />
         </div>

         <button className={styles.logoutBtn}>SALIR</button>
      </header>
   );
};

export default Nav;

