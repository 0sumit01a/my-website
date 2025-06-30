import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import aiLogo from '../assets/aiLogo.svg';
import style from '../styles/Header.module.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Login from "./LoginPage.jsx";
import Register from "./RegistrationPage.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);



  useEffect(() => {
    const handleScroll = () => {
      const threshold = 10;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className={`${style.navBar} ${scrolled ? style.shrink : ''}`}>
        <Link to="/">
  <img src={logo} alt="Logo" className={style.headerlogo} />
</Link>
        
        <div className={style.hamburger} onClick={toggleMenu}>
          {menuOpen ? <IoMdClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>

        <div className={`${style.headerInfo} ${menuOpen ? style.openMenu : ''}`}>
          <Link to="/compare" className={style.compare}>Compare</Link>
          <Link to="/top-universities" className={style.topuniversity}>Top Universities</Link>
          <div className={style.aiVector}>
            <img src={aiLogo} alt="AI Logo" />
            Powered Course Finder
          </div>
          <Link to="/contact" className={style.contact}>Contact us</Link>
          {/* <div className={style.login} onClick={handleLoginClick}>Login</div> */}
        </div>
      </section>

      {/* {showLogin && (
        <Login
          onClose={handleCloseLogin}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={handleCloseRegister}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )} */}
    </>
  );
};

export default Header;
