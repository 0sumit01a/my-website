import React, { useRef, useState } from "react";
import style from "../styles/ElevenQuestionContainer.module.css";
import arrowDown from "../assets/down arrow.svg";
import arrowUp from "../assets/arrow up.svg";

const faqData = [
  {
    question: "What is My Online College and how can it assist you in your educational journey?",
    answer:
      "My Online College is a trusted platform that helps students compare top UGC-approved and NAAC-accredited online universities in India. It provides insights into online degree programs, including details on fees, accreditation, and admissions, to help you choose the best online college in India for your higher education journey.",
  },
  {
    question: "How does the website help me compare online graduate and postgraduate programs?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "What makes My Online College unique?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "What criteria does My Online College use to evaluate and rank online courses?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "Can I find information on a wide range of disciplines and fields of study on My Online College?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "Are the programs listed on the website accredited and recognized by relevant educational authorities?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "How frequently is the information on online programs updated to ensure accuracy?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    question: "Can there be errors on My Online College?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const ElevenQuestionContainer = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className={style.questionContainer}>
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className={style.faqItem}>
          <div className={style.faqQuestion} onClick={() => toggleAnswer(index)}>
            <div>{item.question}</div>
            <img
              src={openIndex === index ? arrowUp : arrowDown}
              alt="toggle icon"
              className={`${style.arrow} ${openIndex === index ? style.rotate : ""}`}
            />
          </div>

          <div
            ref={(el) => (answerRefs.current[index] = el)}
            className={style.faqAnswerWrapper}
            style={{
              maxHeight:
                openIndex === index
                  ? `${answerRefs.current[index]?.scrollHeight}px`
                  : "0px"
            }}
          >
            <div className={style.faqAnswer}>
              {item.answer}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default ElevenQuestionContainer;
