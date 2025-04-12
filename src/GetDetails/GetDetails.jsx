import React, { useState } from "react";
import styles from "./GetDetails.module.css";

import Header from "../Resume_Builder/Header/Header";
import BasicDetails from "../Resume_Builder/BasicDetails/BasicDetails";
import Profile from "../Resume_Builder/Profile/Profile";
import EmploymentHistory from "../Resume_Builder/EmploymentHistory/EmploymentHistory";
import EducationDetails from "../Resume_Builder/EducationDetails/EducationDetails";
import Internships from "../Resume_Builder/Internships/Internships";
import Languages from "../Resume_Builder/Languages/Languages";
import Skills from "../Resume_Builder/Skills/Skills";
import Resume from "../Resume/Resume";
import ResumePreview from "../Resume_Builder/ResumePreview/ResumePreview";
import Projects from "../Resume_Builder/Projects/Projects";

const GetDetails = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewSubmit, setPreviewSubmit] = useState(false);

  return (
    <div className={styles.getDetailsWrapper}>
      <div className={styles.one}>
        <Header
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          previewSubmit={previewSubmit}
        />
      </div>
      <div className={styles.two}>
        <div
          className={`${currentStep === 1 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}
        >
          <BasicDetails
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 2 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}
        >
          <Profile setCurrentStep={setCurrentStep} currentStep={currentStep} />
        </div>
        <div
          className={`${currentStep === 3 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}
        >
          <EmploymentHistory
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 4 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}
        >
          <EducationDetails
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 5 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}
        >
          <Internships
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 6 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}          
        >
          <Projects
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 7 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}          
        >
          <Skills setCurrentStep={setCurrentStep} currentStep={currentStep} />
        </div>
        <div
          className={`${currentStep === 8 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}   
        >
          <Languages
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </div>
        <div
          className={`${currentStep === 9 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}   
        >
          <ResumePreview
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            setPreviewSubmit={setPreviewSubmit}
          />
        </div>
        <div
          className={`${currentStep === 10 ? styles.stepVisible: styles.stepInvisible} ${styles.content}`}   
          
        >
          <Resume setCurrentStep={setCurrentStep} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};
export default GetDetails;
