import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import  universities  from "../data/universities.js";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.sectionOne}>
        <h3>All Universities</h3>
        <div className={styles.grid}>
          {universities.map((uni) => (
            <Link key={uni.slug} to={`/university/${uni.slug}`} className={styles.link}>
              {uni.name}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.sectionTwo}>
        <div className={styles.gridContainer}>
          <div>
            <h3>Post Graduate Programs</h3>
            <ul>
              <li><Link to="/post-graduate/mtech">M.Tech</Link></li>
              <li><Link to="/post-graduate/mca">Online M.C.A.</Link></li>
              <li><Link to="/post-graduate/mba">Online MBA</Link></li>
\            </ul>
          </div>

          <div>
            <h3>Under Graduate Programs</h3>
            <ul>
              <li><Link to="/under-graduate/btech">B.Tech</Link></li>
              <li><Link to="/under-graduate/bba">Online BBA</Link></li>
            </ul>
          </div>

          <div>
            <h3>Online & Distance MBA</h3>
            <ul>
              <li><Link to="/mba/agri-business">Agri-Business Management</Link></li>
              <li><Link to="/mba/finance">Finance</Link></li>
              <li><Link to="/mba/marketing">Marketing</Link></li>
            </ul>
          </div>
        </div>
      <div className={styles.footerBottom}>
  <div className={styles.footerBottomLeft}>
    © 2025 MyOnlineCollege. All rights reserved.
  </div>
  <div className={styles.footerBottomRight}>
    <Link to="/blog">Blog</Link>
    <Link to="/disclaimer">Disclaimer</Link>
    <Link to="/privacy-policy">Privacy Policy</Link>
    <Link to="/terms">Website Terms</Link>
  </div>
</div>

      </div>

      
    </footer>
  );
};

export default Footer;
