import React from 'react';
import styles from './PlaylistCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const playlistCard = (props) => {
    return(
        <div className={styles.card}>
            <h4>{props.title}</h4>
            <div className={styles.actions} onClick={props.clicked}>
                <FontAwesomeIcon icon={'thumbs-up'} className={styles.icon}/>
                <p className={styles.count}>{props.count}</p>
            </div>
        </div>
    )
}

export default playlistCard;