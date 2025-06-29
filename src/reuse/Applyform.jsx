import React from "react";
import styles from "../styles/Applyform.module.css";

const ApplyForm = ({ heading = "Choose the University", university, onClose, showClose = true }) => {
  const programs = university?.programs?.split(",").map((p) => p.trim()) || [];

  return (
    <div className={styles.overlayOne}>
      <div className={styles.formWrapperOne}>
        {showClose && (
          <button className={styles.closeBtnOne} onClick={onClose}>×</button>
        )}

        <h3 className={styles.heading}>{heading}</h3>
        <form className={styles.formOne}>
          <input
            type="text"
            placeholder="Enter name"
            required
            className={styles.inputOne}
          />

          <div className={styles.phoneWrapper}>
            <span className={styles.countryCode}>+91</span>
            <input
              type="tel"
              placeholder="Enter phone"
              required
              className={styles.inputOne}
            />
          </div>

          <input
            type="email"
            placeholder="Enter email"
            required
            className={styles.inputOne}
          />

          <select required className={styles.selectOne}>
            <option value="">When do you want to start?</option>
            <option>July 2025</option>
            <option>August 2025</option>
          </select>

          <select required className={styles.selectOne}>
            <option>{university?.name || "Select university"}</option>
          </select>

          <select required className={styles.selectOne}>
            <option>Select program</option>
            {programs.map((prog, idx) => (
              <option key={idx}>{prog}</option>
            ))}
          </select>

          <div className={styles.checkboxWrapperOne}>
            <input type="checkbox" id="consent" defaultChecked />
            <label htmlFor="consent">
              By submitting your contact details, you authorise MyOnlineCollege
              to contact you via email, text, WhatsApp or call even though you
              may be registered on DND.
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
