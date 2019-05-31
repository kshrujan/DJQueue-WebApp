import React from 'react';
import styles from './NavigationBar.module.css';
import {NavLink} from 'react-router-dom';

const navigationBar = () => {
    return(
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h2 className={styles.removeMargin}>DJ Queue</h2>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/select">Add</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default navigationBar;
