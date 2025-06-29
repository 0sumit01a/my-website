// pages/SpecialisationPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { programs } from "../data/program";
import SpecialisationCard from "../reuse/SpecialisationCard";
import styles from "../styles/SpecialisationCard.module.css";

const SpecialisationPage = () => {
  const { category, programId } = useParams();

  if (programId) {
    const program = programs?.[category]?.[programId];
    if (!program) {
      return <div style={{ padding: "2rem", color: "red" }}>Program not found.</div>;
    }

    return (
      <div className={styles.grid}>
        {program.specialisations?.map((spec, index) => (
          <SpecialisationCard key={index} data={spec} showButtons={true} />
        ))}
      </div>
    );
  }

  const categoryPrograms = programs?.[category];
  if (!categoryPrograms) {
    return <div style={{ padding: "2rem" }}>Category not found</div>;
  }

  return (
    <div className={styles.grid}>
      {Object.entries(categoryPrograms).map(([slug, program]) => (
        <SpecialisationCard
          key={slug}
          data={program}
          showButtons={true}
        />
      ))}
    </div>
  );
};

export default SpecialisationPage;
