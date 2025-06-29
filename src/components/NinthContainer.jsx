import React from "react";
import style from "../styles/NinthContainer.module.css";
import community from '../assets/community.svg'
import guide from '../assets/guide.svg'
import tick from '../assets/tick.svg'

const NinthContainer = () => {
  return (
    <section className={style.ninthContainer}>
      <div className={style.topText}>
        <h1>For Parents and Guardians</h1>
        <p>
          We understand that as a parent you want to help choose the right online
          program for your child. If you are on this journey with your kid, we support
          you at every step. Our platform offers expert guidance to help you make
          informed choices, ensuring your wards academic and career success.
        </p>
      </div>

      <div className={style.cardSection}>
        {/* Parent Community Card */}
        <div className={style.card}>
          <div className={style.cardIcon}>
            <img src={community} alt="Community Icon" />
          </div>
          <h3>Parent Community</h3>
          <ul>
            <li>
              <img src={tick} alt="tick" />
              <span>Talk to our counselling and admissions experts</span>
            </li>
            <li>
              <img src={tick} alt="tick" />
              <span>Attend our expert sessions</span>
            </li>
            <li>
              <img src={tick} alt="tick" />
              <span>Understand the details of the best online courses available</span>
            </li>
            <li>
              <img src={tick} alt="tick" />
              <span>Get your questions answered</span>
            </li>
          </ul>
        </div>

        {/* Quick Guide Card */}
        <div className={style.card}>
          <div className={style.cardIcon}>
            <img src={guide} alt="Guide Icon" />
          </div>
          <h3>Quick Guide</h3>
          <ul>
            <li>
              <img src={tick} alt="tick" />
              <span>Surf through our latest articles and blogs</span>
            </li>
            <li>
              <img src={tick} alt="tick" />
              <span>Ready cost and financial information on courses</span>
            </li>
            <li>
              <img src={tick} alt="tick" />
              <span>
                Personalised recommendations based on your child’s interest and
                career goals
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NinthContainer;
