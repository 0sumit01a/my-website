import React from "react";
import styles from "../styles/SpecialisationCard.module.css";
import { useNavigate } from "react-router-dom";

const SpecialisationCard = ({ data, showButtons = true }) => {
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div className={styles.card}>
      <div className={styles.badge}>{data.universities} Universities</div>
      <p className={styles.fee}>{data.fee}</p>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.description}>{data.description}</p>

      {showButtons && (
        <div className={styles.btnContainer}>
          <button className={styles.btnOutline} onClick={() => navigate("/know-more")}>Know More</button>
          <button className={styles.btnFill}>Apply Now</button>
        </div>
      )}
    </div>
  );
};

export default SpecialisationCard;
