import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from '../styles/ThirdContainer.module.css';
import { getUniversities } from "../api/api";
import { generateSlug } from "../utils/slug";

const IMAGE_BASE = "https://edunexsys.com/backend/";
const fallbackImage = "https://placehold.co/300x200?text=No+Image";

// Helper to split array into 2 halves
const splitImages = (arr) => {
  const midpoint = Math.ceil(arr.length / 2);
  return [arr.slice(0, midpoint), arr.slice(midpoint)];
};

const ThirdContainer = () => {
  const navigate = useNavigate();
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [showFirst, setShowFirst] = useState(true);
  const [animation, setAnimation] = useState({
    outerDiv1: style.slideInFromRight,
    outerDiv2: style.slideOutToRight
  });

  useEffect(() => {
    getUniversities().then((data) => {
      if (Array.isArray(data)) {
        const [first, second] = splitImages(data);
        setFirstHalf(first);
        setSecondHalf(second);
      } else {
        console.warn("⚠️ Invalid universities data", data);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => {
        const next = !prev;
        setAnimation({
          outerDiv1: next ? style.slideInFromRight : style.slideOutToLeft,
          outerDiv2: next ? style.slideOutToRight : style.slideInFromRight
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderUniversityImage = (uni) => {
    const rawImage = uni.u_image || uni.u_logo; // use whatever field has image
    const imageUrl = rawImage?.startsWith("http")
      ? rawImage
      : `${IMAGE_BASE}${rawImage?.replace(/^\/+/, "")}`;

    return (
      <img
        src={imageUrl || fallbackImage}
        alt={uni.u_name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
    );
  };

  return (
    <section className={style.thirdContainer}>
      <h1 className={style.heading1}>
        Explore Over 50+ UGC Recognised Universities With My Online College
      </h1>
      <p className={style.heading2}>
        Top Universities of India. Don’t get conned by fake university websites
      </p>

      <div className={style.sliderWrapper}>
        <div className={style.sliderContainer}>
          {/* First Half */}
          <div className={`${style.slider} ${animation.outerDiv1}`}>
            <div className={style.outerDiv1}>
              <div className={style.universityDiv}>
                {firstHalf.map((uni, idx) => (
                  <div
                    key={idx}
                    className={style.universityBox}
                    onClick={() =>
                      navigate(`/universities/${generateSlug(uni.u_name, uni.u_id)}`)
                    }
                  >
                    {renderUniversityImage(uni)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Half */}
          <div className={`${style.slider} ${animation.outerDiv2}`}>
            <div className={style.outerDiv2}>
              <div className={style.universityDiv}>
                {secondHalf.map((uni, idx) => (
                  <div
                    key={idx}
                    className={style.universityBox}
                    onClick={() =>
                      navigate(`/universities/${generateSlug(uni.u_name, uni.u_id)}`)
                    }
                  >
                    {renderUniversityImage(uni)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdContainer;
