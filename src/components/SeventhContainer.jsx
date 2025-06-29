




import React from "react";
import style from "../styles/SeventhContainer.module.css";
import loanLogo1 from "../assets/loanLogo1.svg";
import loanLogo2 from "../assets/loanLogo2.svg";
import loanLogo3 from "../assets/loanLogo3.svg";
import loanLogo4 from "../assets/loanLogo4.svg";
import loanLogo5 from "../assets/loanLogo5.svg";

const SeventhContainer = () => {
  return (
    <section className={style.seventhContainer}>
      <div className={style.topSection}>
        <h1>Finance Your Education</h1>
        <p>
          MyOnlineCollege has brought multiple loan partners on one platform to
          make it easier for you to finance your education. With multiple loan
          partner options, You can choose interest rate, duration, payment
          terms, etc. to make your higher education dream easier. Begin your
          journey by quickly filling out this form to learn more about your
          financing options.
        </p>
      </div>

      <div className={style.bottomSection}>
        <div className={style.loanPartners}>
          <p className={style.loanTitle}>Our Loan Partners</p>
          <ul className={style.partnerLogos}>
            <li><img src={loanLogo1} alt="Loan Partner 1" /></li>
            <li><img src={loanLogo2} alt="Loan Partner 2" /></li>
            <li><img src={loanLogo3} alt="Loan Partner 3" /></li>
            <li><img src={loanLogo4} alt="Loan Partner 4" /></li>
            <li><img src={loanLogo5} alt="Loan Partner 5" /></li>
          </ul>
        </div>

        <div className={style.cards}>
          <div className={`${style.card} ${style.card1}`}>
            <h3>Education Loan</h3>
            <p>
              We are committed to helping you access financial assistance tailored to your educational needs.
              Our streamlined application process and flexible repayment options make securing a loan for online education a hassle-free experience.
            </p>
          </div>
          <div className={`${style.card} ${style.card2}`}>
            <h3>Low Cost EMI</h3>
            <p>
              Our affordable EMI plans ensure that the cost of education doesn't become a barrier to your aspirations.
              With our student-friendly EMI options, you can conveniently spread the cost of your education over manageable monthly payments.
            </p>
          </div>
          <div className={`${style.card} ${style.card3}`}>
            <h3>No Cost EMI</h3>
            <p>
              Many partner institutions allow you to enroll in their programs without incurring any additional charges on your monthly payments.
              This means you can invest in your education without worrying about interest costs, making quality learning a budget-friendly choice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeventhContainer;
