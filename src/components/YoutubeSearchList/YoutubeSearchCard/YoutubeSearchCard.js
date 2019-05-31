import React from 'react';
import styles from './YoutubeSearchCard.module.css';

const youtubeSearchCard = (props) => {
    return(
        <div className={styles.card} onClick={() => props.onClick(props.title, props.url, props.image)}>
            <div>
                <img src={props.image} alt="" className={styles.image}/>
            </div>
            <div className={styles.contentRight}>
                <h5>{props.title}</h5>
                <p>{props.summary}</p>
            </div>
        </div>
    )
}

export default youtubeSearchCard;