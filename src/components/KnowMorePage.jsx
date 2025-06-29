import React from "react";
import styles from "../styles/KnowMorePage.module.css";
import glim from "../assets/GLIM.jpeg";

const KnowMorePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoCard}>
        <div className={styles.leftSection}>
          <img src={glim} alt="Great Lakes Logo" className={styles.logo} />
          <h2>Great Lake Institute Of Management (GLIM)</h2>
          <p>📍 Chennai, Tamil Nadu</p>
          <p>📌 2004</p>
          <p>⭐ Private</p>
        </div>

        <div className={styles.rightForm}>
          <h3>Choose this University</h3>
          <form>
            <input type="text" placeholder="Enter name" />
            <div className={styles.phoneInput}>
              <span>+91</span>
              <input type="tel" placeholder="Enter phone" />
            </div>
            <input type="email" placeholder="Enter email" />
            <select>
              <option>When do you want to start?</option>
            </select>
            <select>
              <option>Great Lake Institute Of Management (GLIM)</option>
            </select>
            <select>
              <option>Select program</option>
            </select>
            <div className={styles.checkbox}>
              <input type="checkbox" defaultChecked />
              <label>
                By submitting your contact details, you authorise MyOnlineCollege...
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KnowMorePage;
