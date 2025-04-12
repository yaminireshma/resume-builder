import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import EmploymentHistoryCard from "./EmploymentHistoryCard";
import styles from "./Employmenthistory.module.css";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmploymentHistory = ({
  currentStep,
  setCurrentStep,
}) => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentCheck, setCurrentcheck] = useState(false);
  const [displayErrors, setDisplayErrors] = useState({});
  const [skip, setSkip] = useState(false);
  const dispatch = useDispatch();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    setDisplayErrors({});
  }, [currentStep]);

  useEffect(() => {
    if (skip) {
      setCurrentStep(currentStep + 1);
      setSkip(false);
    }
  }, [skip, currentStep]);

  const validate = (values) => {
    let errors = {};

    if (!values.jobtitle) {
      errors.jobtitle = "Enter Job Title";
    }
    if (!values.location) {
      errors.location = "Enter Location";
    }
    if (!values.employer) {
      errors.employer = "Enter Employer";
    }
    if (!values.startdate) {
      errors.startdate = "Enter Start Date";
    }
    if (!values.enddate && !values.current) {
      errors.enddate = "Enter End Date";
    }
    setDisplayErrors(errors);
    return errors;
  };

  const initialValues = {
    jobtitle: "",
    location: "",
    employer: "",
    startdate: "",
    enddate: "",
    description: "",
    current: false,
  };

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues,
    onSubmit: (values, { resetForm }) => {
      if (editIndex != null) {
        setEditData(values);
      } else {
        setData(values);
      }
      resetForm();
      setCurrentcheck(false);
    },
    validate,
  });

  const handleNext = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      handleSubmit();
      setCurrentStep(currentStep + 1);
      dispatch({ type: "EMPLOYMENT_SUBMIT", payload: true });
    } else {
      alert("Please fill or clear the form before going to next step");
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
    setFieldValue,
    dirty,
  } = formik;

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  useEffect(() => {
    if (currentCheck === true) {
      clearError("enddate");
    }
  }, [currentCheck]);

  const handleEdit = (index, history) => {
    window.scrollBy(0, 0);
    setEditIndex(index);
    setValues(history);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      return "Changes you made may not be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
      <div className={styles.addWrapper}>
        <h1>Let's fill out your Employment History</h1>
        <div className={styles.alert}>* indicates a required field</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.buttons}>
          <button type="submit" className={styles.add}>
            {editIndex !== null ? "Edit" : "Add"}
          </button>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setCurrentcheck(false);
              resetForm();
              setDisplayErrors({});
            }}
          >
            Clear
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.box}>
            <label className={styles.require}>JOB TITLE</label>
            <input
              type="text"
              name="jobtitle"
              value={values.jobtitle}
              onChange={(e) => {
                handleChange(e);
                clearError("jobtitle");
              }}
              className={displayErrors.jobtitle ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.jobtitle ? (
                <div className={styles.error}>{displayErrors.jobtitle}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>LOCATION</label>
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={(e) => {
                handleChange(e);
                clearError("location");
              }}
              className={displayErrors.location ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.location ? (
                <div className={styles.error}>{displayErrors.location}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>EMPLOYER</label>
            <input
              type="text"
              name="employer"
              value={values.employer}
              onChange={(e) => {
                handleChange(e);
                clearError("employer");
              }}
              className={displayErrors.employer ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.employer ? (
                <div className={styles.error}>{displayErrors.employer}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.boxDate}>
            <div className={styles.date}>
              <label className={styles.require}>START DATE</label>
              <input
                type="date"
                name="startdate"
                value={values.startdate}
                onChange={(e) => {
                  handleChange(e);
                  clearError("startdate");
                }}
                max={currentDate}
                className={displayErrors.startdate ? styles.errorInput : ""}
              />
              <div className={styles.errorContainer}>
                {displayErrors.startdate ? (
                  <div className={styles.error}>{displayErrors.startdate}</div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className={styles.date}>
              <label className={styles.require}>END DATE</label>
              <div className={styles.endWrapper}>
                <input
                  type="date"
                  name="enddate"
                  value={values.enddate}
                  disabled={formik.values.current === true}
                  onChange={(e) => {
                    handleChange(e);
                    clearError("enddate");
                  }}
                  className={displayErrors.enddate ? styles.errorInput : ""}
                />
                <div className={styles.errorContainer}>
                  {displayErrors.enddate ? (
                    <div className={styles.error}>{displayErrors.enddate}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className={styles.currentlyBox}>
                    <input
                      type="checkbox"
                      name="current"
                      checked={formik.values.current}
                      onChange={(e) => {
                        setCurrentcheck(e.target.checked);
                        setFieldValue("current", e.target.checked);
                        if (e.target.checked) {
                          setFieldValue("enddate", "");
                        }
                      }}
                    />
                    <label>I currently work here</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.box}>
            <label>JOB DESCRIPTION</label>
            <div className={styles.textarea}>
              <ReactQuill
                value={values.description}
                onChange={(content) => {
                  setFieldValue("description", content);
                }}
                className={`${styles.quillTextarea}`}
              />
            </div>
          </div>
        </div>
      </form>
      <EmploymentSummary
        data={data}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setEditData={setEditData}
        editData={editData}
        handleEdit={handleEdit}
        currentCheck={currentCheck}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.nextText}
          onClick={() => {
            dispatch({ type: "EMPLOYMENT_SKIP", payload: true });
            setSkip(true);
          }}
        >
          Skip
        </button>
        <button
          className={styles.nextText}
          onClick={() => {
            if (dirty && values.description!=='<p><br></p>') {
              handleNext();
            } else {
              setCurrentStep(currentStep + 1);
              dispatch({ type: "EMPLOYMENT_SUBMIT", payload: true });
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EmploymentHistory;

export const EmploymentSummary = ({
  data,
  editIndex,
  setEditIndex,
  setEditData,
  editData,
  handleEdit,
}) => {
  const dispatch = useDispatch();

  const [employmentData, setEmploymentData] = useState([]);

  useEffect(() => {
    dispatch({ type: "EMPLOYMENT", payload: employmentData });
  }, [employmentData]);

  const handleDelete = (index) => {
    const newData = employmentData.filter((val, id) => id !== index);
    setEmploymentData(newData);
  };

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      const updatedData = [...employmentData];
      updatedData[editIndex] = editData;
      setEmploymentData(updatedData);
      setEditIndex(null);
      setEditData({});
    }
  }, [editData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setEmploymentData([...employmentData, data]);
    }
  }, [data]);

  return (
    <>
      {employmentData.length > 0 && <h1>Employment Summary</h1>}
      <div className={styles.cards}>
        {employmentData.length > 0 &&
          employmentData.map((history, index) => (
            <div key={index}>
              <EmploymentHistoryCard
                history={history}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                index={index}
                editColor={editIndex === index}
              />
            </div>
          ))}
      </div>
    </>
  );
};
