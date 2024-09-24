import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import heartIcon from "../../../public/Vector 26.svg";

const Card = ({ share }) => {
  return (
    <div className={styles.share}>
      <div className={styles.share__img}>
        <img src={share.image} alt={share.description} />
      </div>
      <div className={styles.share__desc}>
        <div className={styles.share__price}>
          <h4>{share.price}</h4>
          <img
            src={heartIcon}
            className={styles.heart__icon}
            alt="heart-icon"
          />
        </div>
        <div className={styles.share__info}>
          <p>{share.description}</p>
        </div>
        <div className={styles.share__author}>
          <img src={share.image} alt={share.author} />
          <p>{share.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
