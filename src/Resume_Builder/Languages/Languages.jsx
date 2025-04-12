import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Languages.module.css";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";

const Languages = ({
  currentStep,
  setCurrentStep,
}) => {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [maxLanguages, setMaxLanguages] = useState(false);

  useEffect(() => {
    dispatch({ type: "LANGUAGE", payload: languages });
  }, [languages]);

  const addHandle = () => {
    if (languages.length < 7) {
      if(currentLanguage!==''){
        setLanguages([...languages, currentLanguage]);
      }
      setCurrentLanguage("");
    } else {
      setMaxLanguages(true);
    }
  };

  useEffect(() => {
    if (languages.length < 7) {
      setMaxLanguages(false);
    }
  }, [languages]);

  const handleDelete = (index) => {
    const newData = languages.filter((_, id) => id !== index);
    setLanguages(newData);
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
          {"Go Back"}
        </div>
      </div>

      <h1>Let's fill the Languages</h1>

      <div className={styles.alert}>
        {maxLanguages && (
          <div className={styles.error}>
            You can select up to seven languages.
          </div>
        )}
      </div>
      <div className={styles.lang}>
        <div className={styles.alertWrapper}>
          <select
            value={currentLanguage}
            className={styles.select}
            onChange={(e) => setCurrentLanguage(e.target.value)}
          >
            <option value="">Select a language</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="French">French</option>
          </select>
          <button
            onClick={() => {
              addHandle();
              setCurrentLanguage("");
            }}
            className={styles.add}
            disabled={maxLanguages}
          >
            Add
          </button>
        </div>
        <div className={styles.languageContainer}>
          <div className={styles.languageWrapper}>
            {languages?.map((lang, index) => (
              <LanguageCard
                language={lang}
                handleDelete={handleDelete}
                index={index}
              />
            ))}
          </div>
        </div>
        <button
          className={styles.next}
          onClick={() => {
            dispatch({ type: "LANGUAGE_SUBMIT", payload: true });
            if(languages.length > 0){
              setCurrentStep(currentStep + 1);
              dispatch({ type: "LANGUAGE_COMPLETENESS", payload: 20 });
            }
            else{
              alert("Please add atleast one langugage")
              dispatch({ type: "LANGUAGE_COMPLETENESS", payload: 0 });
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Languages;

const LanguageCard = ({
  language,
  handleDelete,
  index,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{language}</div>
      <ImCross
        className={styles.cross}
        onClick={() => {
          handleDelete(index);
        }}
      />
    </div>
  );
};
