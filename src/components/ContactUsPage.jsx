import React from 'react';
import styles from '../styles/ContactUsPage.module.css';
import TwelveContainer from './TwelveContainer';

const ContactUsPage = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.topSection}>
        <div className={styles.leftText}>
          <h1>CONTACT US</h1>
          <p>
            Don’t hesitate to reach out! Our team is here to answer your questions and provide all support that you need.
          </p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.leftInfo}>
          <h2>Get in touch</h2>
          <p>Reach out for any queries about the fees, admission process, course duration, etc.</p>
          <div>
            <strong>📧 E-mail</strong>
            <p>enquiries@myonlinecollegegmail.in</p>
          </div>
          <div>
            <strong>📞 Call</strong>
            <p>+919990005082</p>
          </div>
          <div>
            <strong>📍 Address</strong>
            <p>E-15 First Floor, Sector 3 Noida, Uttar Pradesh 201301</p>
          </div>
        </div>

        <div className={styles.rightForm}>
          <h3>Leave us a Message</h3>
          <form>
            <input type="text" placeholder="Enter name" />
            <input type="text" placeholder="+91    Enter phone" />
            <input type="email" placeholder="Enter email" />
            <input type="text" placeholder="When do you want to start?" />
            <select>
              <option>Select university</option>
            </select>
            <select>
              <option>Select program</option>
            </select>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" defaultChecked />
              <small>
                By submitting your contact details, you authorise MyOnlineCollege to contact you via email, text, WhatsApp or call even though you may be registered on DND.
              </small>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <TwelveContainer/>
    </div>
  );
};

export default ContactUsPage;
