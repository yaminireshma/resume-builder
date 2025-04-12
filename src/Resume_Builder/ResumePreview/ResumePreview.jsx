import React from "react";
import styles from "./ResumePreview.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

const ResumePreview = ({ currentStep, setCurrentStep, setPreviewSubmit }) => {

  const { educationSubmitted, education=[] } = useSelector((state) => state.educationDetails || {});
  const { skillSubmitted, skills=[] } = useSelector((state) => state.skills || {});
  const { languageSubmitted, languages=[] } = useSelector((state) => state.languages || {});

  const createResumeHandle = () => {
    if (
      (education.length === 0 && educationSubmitted) ||
      (skills.length === 0 && skillSubmitted) ||
      (languages.length === 0 && languageSubmitted)
    ) {
      alert("Please fill missing information");
    } else {
      setCurrentStep(currentStep + 1);
      setPreviewSubmit(true);
    }
  };
  return (
    <>
      <div className={styles.gobackWrapper}>
        <IoMdArrowRoundBack className={styles.gobackIcon} />
        <div
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
          className={styles.goback}
        >
          {"Go Back"}
        </div>
      </div>
      <h1>Let's Preview the Resume</h1>

      <button
        className={styles.createButton}
        onClick={() => {
          createResumeHandle();
        }}
      >
        Create Resume
      </button>
    </>
  );
};
export default ResumePreview;
