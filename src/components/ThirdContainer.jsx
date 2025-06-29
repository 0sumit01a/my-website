import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from '../styles/ThirdContainer.module.css';
import { getUniversities } from "../api/api";
import { generateSlug } from "../utils/slug";

// Split the logos into two halves
const splitLogos = (arr) => {
  const midpoint = Math.ceil(arr.length / 2);
  return [arr.slice(0, midpoint), arr.slice(midpoint)];
};

const ThirdContainer = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);

  const [showFirst, setShowFirst] = useState(true);
  const [animation, setAnimation] = useState({
    outerDiv1: style.slideInFromRight,
    outerDiv2: style.slideOutToRight
  });

  useEffect(() => {
    getUniversities().then(data => {
      setUniversities(data);
      const [first, second] = splitLogos(data);
      setFirstHalf(first);
      setSecondHalf(second);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => {
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
          {/* First half slider */}
          <div className={`${style.slider} ${animation.outerDiv1}`}>
            <div className={style.outerDiv1}>
              <div className={style.universityDiv}>
                {firstHalf.map((uni, idx) => (
                  <div
                    key={idx}
                    className={style.universityBox}
                    onClick={() => navigate(`/universities/${generateSlug(uni.u_name, uni.u_id)}`)}
                  >
                    <img
                      src={
                        uni.u_logo
                          ? `http://b4l.640.mytemp.website/backend/${uni.u_logo}`
                          : "https://via.placeholder.com/150?text=No+Logo"
                      }
                      alt={uni.u_name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second half slider */}
          <div className={`${style.slider} ${animation.outerDiv2}`}>
            <div className={style.outerDiv2}>
              <div className={style.universityDiv}>
                {secondHalf.map((uni, idx) => (
                  <div
                    key={idx}
                    className={style.universityBox}
                    onClick={() => navigate(`/universities/${generateSlug(uni.u_name, uni.u_id)}`)}
                  >
                    <img
                      src={
                        uni.u_logo
                          ? `http://b4l.640.mytemp.website/backend/${uni.u_logo}`
                          : "https://via.placeholder.com/150?text=No+Logo"
                      }
                      alt={uni.u_name}
                    />
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
