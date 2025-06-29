import React from "react";
import styles from "../styles/GetInTouchPage.module.css";

const PopupForm = ({ onClose }) => {
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                <h2>Get in Touch</h2>
                <form>
                    <input type="text" placeholder="Enter name" required />
                    <div className={styles.phoneInput}>
                        <span>+91</span>
                        <input type="tel" placeholder="Enter phone" required />
                    </div>
                    <input type="email" placeholder="Enter email" required />
                    <select required>
                        <option value="">When do you want to start?</option>
                        <option>Immediately</option>
                        <option>Next Month</option>
                    </select>
                    <select required>
                        <option value="">Select university</option>
                        <option>University A</option>
                    </select>
                    <select required>
                        <option value="">Select program</option>
                        <option>Program A</option>
                    </select>
                    <div className={styles.checkboxRow}>
                        <input type="checkbox" id="consent" defaultChecked />
                        <label htmlFor="consent" className={styles.consent}>
                            By submitting your contact details, you authorise Edunexsys to contact you via email, text, WhatsApp or call even though you may be registered on DND.
                        </label>
                    </div>
                    <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default PopupForm;
