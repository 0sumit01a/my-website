import React from "react";
import styles from "../styles/FifthContainer.module.css";
import image from "../assets/learning-partner.png";

const FifthContainer = () => {
  return (
    <section className={styles.fifthContainer}>
      <div className={styles.left}>
        <img src={image} alt="Smiling girl pointing" />
      </div>
      <div className={styles.right}>
        <h2>Your Trusted Online Admissions Partner</h2>
        <p>
          Discover a world of accredited and internationally recognized graduate and postgraduate programs, all available online. Our platform connects you to top UGC recognised online universities in India, offering courses that take your career to the next level.
        </p>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <h4>Choose</h4>
            <p>Take a stride towards your ideal career by choosing the perfect course.</p>
            <span>1</span>
          </div>
          <div className={styles.step}>
            <h4>Select</h4>
            <p>Select one of the many specializations on offer that suits your goals and interests.</p>
            <span>2</span>
          </div>
          <div className={styles.step}>
            <h4>Compare</h4>
            <p>Consider the rankings, fees, infrastructure, etc. of leading universities that offer the program.</p>
            <span>3</span>
          </div>
          <div className={styles.step}>
            <h4>Apply</h4>
            <p>Assist us in getting to know you better by sharing basic details and answering a few questions.</p>
            <span>4</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthContainer;