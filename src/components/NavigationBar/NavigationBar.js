import React from 'react';
import styles from './NavigationBar.module.css';
import {NavLink} from 'react-router-dom';

const navigationBar = (props) => {
    return(
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h2 className={styles.removeMargin}>DJ Queue</h2>
            </div>
            <nav>
                <ul>
                    <li><a className={styles.navButton} onClick={props.navHome}>Home</a></li>
                    <li><a className={styles.navButton} onClick={props.navSearch}>Add</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default navigationBar;
