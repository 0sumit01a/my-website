// import React from "react";
// import style from '../styles/TwelveContainer.module.css';
// import logo from '../assets/logo.png';
// import fbicon from '../assets/fb icon.svg';
// import instaicon from '../assets/insta icon.svg';
// import twittercon from '../assets/twitter icon.svg';
// import linkedinicon from '../assets/linkedin icon.svg';

// const TwelveContainer = () => {
//     return(
//         <section className={style.twelveContainer}>
//             <div className={style.leftSection}>
//                 <div className={style.logoWrapper}>
//                     <img src={logo} alt="Edunexsys Logo" className={style.logo} />
//                 </div>
//                 <div className={style.socialIcons}>
//                     <a href="https://www.facebook.com/myonlinecollegeofficial/">
//                         <img src={fbicon} alt="Facebook" />
//                     </a>
//                     <a href="https://www.instagram.com/myonlinecollege/">
//                         <img src={instaicon} alt="Instagram" />
//                     </a>
//                     <a href="https://twitter.com/MOC_orginial">
//                         <img src={twittercon} alt="Twitter" />
//                     </a>
//                     <a href="https://www.linkedin.com/company/my-online-college/">
//                         <img src={linkedinicon} alt="LinkedIn" />
//                     </a>
//                 </div>
//             </div>

//             <div className={style.rightSection}>
//                 <h1 className={style.heading}>Compare 500+ Online Programs</h1>
//                 <p className={style.description}>
//                     MyOnlineCollege is India’s youngest aggregator for online education programs offered by India’s best universities. Our unique approach to presenting each universities’ offerings makes it easier for students and parents to make informed decisions. We provide end-to-end services from admission guidance, university selection, admissions and post admission services so that you can focus on what matters to you – Quality Education.
//                 </p>
//                 <div className={style.applyButton}>Apply Now</div>
//             </div>
//         </section>
//     );
// };

// export default TwelveContainer;




   import React, { useState } from "react";
import style from '../styles/TwelveContainer.module.css';
import logo from '../assets/logo.png';
import fbicon from '../assets/fb icon.svg';
import instaicon from '../assets/insta icon.svg';
import twittercon from '../assets/twitter icon.svg';
import linkedinicon from '../assets/linkedin icon.svg';
// import PopupForm from "./GetInTouchPage"; 
import ApplyForm from "../reuse/Applyform"; 

const TwelveContainer = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <section className={style.twelveContainer}>
                <div className={style.leftSection}>
                    <div className={style.logoWrapper}>
                        <img src={logo} alt="Edunexsys Logo" className={style.logo} />
                    </div>
                    <div className={style.socialIcons}>
                        <a href="https://www.facebook.com/myonlinecollegeofficial/">
                            <img src={fbicon} alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/myonlinecollege/">
                            <img src={instaicon} alt="Instagram" />
                        </a>
                        <a href="https://twitter.com/MOC_orginial">
                            <img src={twittercon} alt="Twitter" />
                        </a>
                        <a href="https://www.linkedin.com/company/my-online-college/">
                            <img src={linkedinicon} alt="LinkedIn" />
                        </a>
                    </div>
                </div>

                <div className={style.rightSection}>
                    <h1 className={style.heading}>Compare 500+ Online Programs</h1>
                    <p className={style.description}>
                        MyOnlineCollege is India’s youngest aggregator for online education programs offered by India’s best universities. Our unique approach to presenting each universities’ offerings makes it easier for students and parents to make informed decisions. We provide end-to-end services from admission guidance, university selection, admissions and post admission services so that you can focus on what matters to you – Quality Education.
                    </p>
                    <div className={style.applyButton} onClick={() => setShowModal(true)}>
                        Apply Now
                    </div>
                </div>
            </section>

            {showModal && <ApplyForm  heading="Get in Touch" onClose={() => setShowModal(false)} />}
        </>
    );
};

export default TwelveContainer;
