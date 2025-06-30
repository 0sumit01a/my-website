// import React, { useState, useEffect } from "react";
// import styles from '../styles/TopContainer.module.css';
// import { getSliders } from "../api/api";

// const TopContainer = () => {
//   const [sliders, setSliders] = useState([]);
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     getSliders().then(setSliders).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (!sliders.length) return;
//     const id = setInterval(() => {
//       setCurrent((c) => (c + 1) % sliders.length);
//     }, 5000);
//     return () => clearInterval(id);
//   }, [sliders]);

//   if (!sliders.length) return <div>Loading…</div>;

//   return (
//     <section className={styles.topcon}>
//       <div className={styles.sliderContainer}>
//         <div
//           className={styles.sliderWrapper}
//           style={{ transform: `translateX(-${current * 100}vw)` }}
//         >
//           {sliders.map((s, i) => (
//             <section key={s.slider_id} className={styles.section1}>
//               <div className={styles.imageBox}>
//                 <img
//                   src={`http://b4l.640.mytemp.website/backend/${s.slider_image}`}
//                   alt={s.slider_t1}
//                 />
//               </div>
//               <div className={styles.textBox}>
//                 <div className={styles.heading1}>
//                   <h2>{s.slider_t1}</h2>
//                 </div>
//                 <div className={styles.heading2}>
//                   <h2 className={styles.online}>{s.slider_t2}</h2>
//                 </div>
//                 <p className={styles.description}>{s.slider_line}</p>
//               </div>
//             </section>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopContainer;
import React, { useState, useEffect } from "react";
import styles from "../styles/TopContainer.module.css";
import image1 from "../assets/slider image.png";
import image2 from "../assets/slider image2.svg";

const slides = [
  {
    id: 1,
    image: image1,
    title1: "COMPARE 500+",
    title2: "ONLINE",
    title3: "COURSES",
    description:
      "Make your dream of studying in India's top Universities come true with Edunexsys. Choose from Online Graduate & Postgraduate programs in your chosen stream with our course finder.",
  },
  {
    id: 2,
    image: image2,
    title1: "0% COMMISSION",
    title2: "100%",
    title3: "SAFE",
    description:
      "Edunexsys is an aggregator for Online Programs offered by Top Universities of India. Don’t get conned by fake university websites. You pay the fees directly at the official website of the university. Edunexsys does not charge students for its services.",
  },
];

const TopContainer = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.topcon}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide) => (
            <section key={slide.id} className={styles.section1}>
              <div className={styles.imageBox}>
                <img src={slide.image} alt={slide.title1} />
              </div>
              <div className={styles.textBox}>
                <div className={styles.heading1}>
                  <h2>{slide.title1}</h2>
                </div>
                <div className={styles.heading2}>
                  <h2 className={styles.online}>{slide.title2}</h2>
                  <h2 className={styles.courses}>{slide.title3}</h2>
                </div>
                <p className={styles.description}>{slide.description}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContainer;
