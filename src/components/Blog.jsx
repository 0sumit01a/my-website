import React from "react";
import styles from "../styles/Blog.module.css";

export default function CareerComparison() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navGap}></div>

      {/* Section 1: Hero */}
      <section className={`${styles.section} ${styles.section1}`}>
        <div className={styles.container}>
          <h1>BCA VS BTech: Which Online Program Is Right For Your Career?</h1>
          <p className={styles.date}>Online Education | June 12, 2025</p>
          <button>Read More</button>
        </div>
      </section>

      {/* Section 3: Main Content */}
      <section className={`${styles.section} ${styles.section3}`}>
        <div className={styles.cardWrapper}>
          {/* Left Side */}
          <div className={styles.left}>
            <p>
              Deciding on the ideal career direction holds significant importance, especially...
            </p>
            <p>
              So, which is better BCA or BTech when it comes to <strong>Online Education</strong>...
            </p>

            <h2>Understanding BCA and BTech</h2>
            <h3>What is BCA?</h3>
            <p>
              The <strong>Online BCA</strong> is a three-year undergraduate program...
            </p>
            <h3>What is BTech?</h3>
            <p>BTech is a four-year program in Computer Science...</p>
          </div>

          {/* Right Side */}
          <div className={styles.right}>
            <h3>Featured Posts</h3>
            <ul>
              <li><a href="#">BCA VS BTech: Which Online Program Is Right For Your Career?</a></li>
              <li><a href="#">Do Online MBA Programs Offer Placements?</a></li>
              <li><a href="#">Which Online MBA Specialisation Is In Demand?</a></li>
              <li><a href="#">Your Path to Success: Exploring DY Patil MBA</a></li>
              <li><a href="#">UGC Entitled Universities List 2025</a></li>
            </ul>
          </div>
        </div>
      </section>

  
    </div>
  );
}
