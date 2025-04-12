import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Skills.module.css";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";

const Skills = ({
  currentStep,
  setCurrentStep,
}) => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");

  useEffect(() => {
    dispatch({ type: "SKILLS", payload: skills });
  }, [skills, dispatch]);

  const handleDelete = (index) => {
    const newData = skills.filter((_, id) => id !== index);
    setSkills(newData);
  };

  return (
    <>
      <div className={styles.gobackWrapper}>
        <IoMdArrowRoundBack className={styles.gobackIcon} />
        <div
          className={styles.goback}
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
          Go Back
        </div>
      </div>
      <h1>Let's Add your Skills</h1>
      <form>
        <div className={styles.search}>
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => {
              setCurrentSkill(e.target.value);
            }}
          />
          <button
            type="submit"
            className={styles.add}
            onClick={(e) => {
              e.preventDefault();
              if (currentSkill !== "") {
                setSkills([...skills, currentSkill]);
                setCurrentSkill("");
              }
            }}
          >
            Add
          </button>
        </div>
      </form>
      <div className={styles.skillContainer}>
        <div className={styles.skillWrapper}>
          {skills.map((skill, index) => (
            <SkillsCard
              skillname={skill}
              handleDelete={handleDelete}
              index={index}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.next}
        onClick={() => {
          dispatch({ type: "Skill_SUBMIT", payload: true });
          if(skills.length>0){
            setCurrentStep(currentStep + 1);
            dispatch({ type: "SKILL_COMPLETENESS", payload: 20 });
          }
          else{
            alert("Please add atleast one skill")
            dispatch({ type: "SKILL_COMPLETENESS", payload: 0 });
          }
        }}
      >
        Next
      </button>
    </>
  );
};

export default Skills;

const SkillsCard = ({ skillname, handleDelete, index }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{skillname}</div>
      <ImCross
        className={styles.cross}
        onClick={() => {
          handleDelete(index);
        }}
      />
    </div>
  );
};
