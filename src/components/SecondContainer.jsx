// import React from "react";
// import style from '../styles/SecondContainer.module.css'

// const SecondContainer = () => {
//     return(
//         <section className={style.secondContainer}>

//             <div>
//                 <div></div>
//                 <div>50+</div>
//                 <div>UGC-DEB approved Indian universities to accomplish your future goals</div>
//             </div>

//             <div>
//                 <div></div>
//                 <div>500+</div>
//                 <div>Diverse online programs to choose from for a dynamic career path</div>
//             </div>

//             <div>
//                 <div></div>
//                 <div>2000+</div>
//                 <div>Satisfied students on the path of academic success</div>
//             </div>

//             <div>
//                 <div></div>
//                 <div>100+</div>
//                 <div>Industry endorsed specialisations that will boost your salary growth.</div>
//             </div>

//         </section>
//     )
// }

// export default SecondContainer;









import React from "react";
import style from '../styles/SecondContainer.module.css';
import { FaShieldAlt, FaProjectDiagram, FaGraduationCap, FaIndustry } from "react-icons/fa";

const SecondContainer = () => {
    return (
        <section className={style.secondContainer}>
            <div className={style.box}>
                <FaShieldAlt className={style.icon} />
                <div className={style.count}>50+</div>
                <div className={style.text}>UGC-DEB approved Indian universities to accomplish your future goals</div>
            </div>

            <div className={style.box}>
                <FaProjectDiagram className={style.icon} />
                <div className={style.count}>500+</div>
                <div className={style.text}>Diverse online programs to choose from for a dynamic career path</div>
            </div>

            <div className={style.box}>
                <FaGraduationCap className={style.icon} />
                <div className={style.count}>2000+</div>
                <div className={style.text}>Satisfied students on the path of academic success</div>
            </div>

            <div className={style.box}>
                <FaIndustry className={style.icon} />
                <div className={style.count}>100+</div>
                <div className={style.text}>Industry endorsed specialisations that will boost your salary growth.</div>
            </div>
        </section>
    );
};

export default SecondContainer;
