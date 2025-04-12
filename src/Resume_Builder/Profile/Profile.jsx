import React, { useState } from "react";
import { useFormik } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";

const Profile = ({
  setCurrentStep,
  currentStep,
}) => {
  const [displayErrors, setDisplayErrors] = useState({});
  const dispatch = useDispatch();

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      dispatch({ type: "PROFILE", payload: values });
      dispatch({ type: "PROFILE_COMPLETENESS", payload: 20 });
      dispatch({ type: "PROFILE_SUBMIT", payload: true });
      setCurrentStep(currentStep + 1);
    },
    validate: (values) => {
      let errors = {};
      if (!values.description) {
        errors.description = "Enter Career Goal";
      }
      setDisplayErrors(errors);
      return errors;
    },
  });

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = formik;
  
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
      <h1>Let's fill out your Career Goals: Profile Section</h1>
      <div className={styles.alert}>* indicates a required field</div>

      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label className={styles.require}>CAREER GOAL</label>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              resetForm();
              setDisplayErrors({});
            }}
          >
            Clear
          </button>
          <textarea
            name="description"
            value={values.description}
            onChange={(e) => {
              setFieldValue("description", e.target.value);
              clearError("description");
            }}
            className={`${displayErrors.description ? styles.errorInput : ""} ${
              styles.textArea
            }`}
          />
        </div>
        <div className={styles.errorContainer}>
          {displayErrors.description ? (
            <div className={styles.error}>{displayErrors.description}</div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className={styles.nextText}>
          Next
        </button>
      </form>
    </>
  );
};
export default Profile;
