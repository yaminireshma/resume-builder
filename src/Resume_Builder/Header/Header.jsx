import React from "react";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = ({ currentStep, setCurrentStep, previewSubmit }) => {

  const { basicDetailSubmitted } = useSelector((state) => state.basicDetails || {});
  const { profileSubmitted } = useSelector((state) => state.profile || {});
  const { employmentSubmitted, employmentSkip } = useSelector((state) => state.employmentHistory || {});
  const { educationSubmitted } = useSelector((state) => state.educationDetails || {});
  const { internshipSubmitted, internshipSkip} = useSelector((state) => state.internships || {});
  const { projectSubmitted,  projectSkip} = useSelector((state) => state.projects || {});
  const { skillSubmitted } = useSelector((state) => state.skills || {});
  const { languageSubmitted } = useSelector((state) => state.languages || {});
  const { basicComplete, profileComplete, educationComplete, skillComplete, languageComplete } = useSelector((state) => state?.global || {});

  const sections = [
    {
      name: "Basic Details",
      flag: basicDetailSubmitted,
    },
    {
      name: "Profile",
      flag: profileSubmitted,
    },
    {
      name: "Employment",
      flag: employmentSubmitted || employmentSkip,
    },
    {
      name: "Education",
      flag: educationSubmitted,
    },
    {
      name: "Internships",
      flag: internshipSubmitted || internshipSkip,
    },
    {
      name: "Projects",
      flag: projectSubmitted || projectSkip,
    },
    {
      name: "Skills",
      flag: skillSubmitted,
    },
    {
      name: "Languages",
      flag: languageSubmitted,
    },
    {
      name: "Preview",
      flag: previewSubmit,
    },
    {
      name: "Resume",
      flag: false,
    },
  ];

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.heading}>Get My Resume</div>
      <div className={styles.headerBottom}>
        <div>
          <div className={styles.list}>
            <div className={styles.headerSections}>
              {sections.map((section, index) => {
                const { name, flag } = section;
                  return (
                  <>
                    <div key={index} className={styles.section}>
                      <div
                        className={`${
                          currentStep === index + 1
                            ? styles.numberBorder
                            : styles.numbers
                        } ${
                          index !== sections.length - 1
                            ? styles.beforeContent
                            : ""
                        } ${flag === true && styles.highLight}`}
                      >
                        {index + 1}
                      </div>
                      <div className={styles.infoWrapper}>
                        <div
                          className={`${styles.text} ${
                            flag === true && styles.pointer
                          }`}
                          onClick={() => {
                            if (flag === true) {
                              setCurrentStep(index + 1);
                            }
                          }}
                        >
                          {name}
                        </div>                       
                      </div>
                    </div>
                  </>
                );
              })}
              <div>
                <div className={styles.progressText}>Resume Completeness</div>

                <div className={styles.percentWrapper}>
                  <progress
                    id="file"
                    value={`${
                      basicComplete +
                      profileComplete +
                      educationComplete +
                      skillComplete +
                      languageComplete
                    }`}
                    max="100"
                    className={styles.progessBar}
                  />
                  <div className={styles.percent}>
                    {`${
                      basicComplete +
                      profileComplete +
                      educationComplete +
                      skillComplete +
                      languageComplete
                    }%`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
