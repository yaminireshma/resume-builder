import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import styles from "./InternshipHistory.module.css";
import InternshipHistoryCard from "./InternshipHistoryCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Internships = ({
  currentStep,
  setCurrentStep,
}) => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [displayErrors, setDisplayErrors] = useState({});
  const [skip, setSkip] = useState(false);
  const dispatch = useDispatch();

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
    if (!values.company) {
      errors.company = "Enter Company";
    }
    if (!values.techstack) {
      errors.techstack = "Enter Tech Stack";
    }
    if (!values.startdate) {
      errors.startdate = "Enter Start Date";
    }
    if (!values.enddate) {
      errors.enddate = "Enter End Date";
    }
    setDisplayErrors(errors);
    return errors;
  };
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      company: "",
      techstack: "",
      startdate: "",
      enddate: "",
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (editIndex != null) {
        setEditData(values);
        resetForm();
      } else {
        setData(values);
        resetForm();
      }
    },
    validate,
  });

  const handleNext = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      handleSubmit();
      setCurrentStep(currentStep + 1);
      dispatch({ type: "INTERNSHIP_SUBMIT", payload: true });
    } else {
      alert("Please fill the form or clear before going to next step");
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

  const handleEdit = (index, history) => {
    setEditIndex(index);
    setValues(history);
  };

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
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

      <div className={styles.addWrapper}>
        <h1>Let's fill out your Internship</h1>
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
              resetForm();
              setDisplayErrors({});
            }}
          >
            Clear
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.box}>
            <label className={styles.require}>COMPANY</label>
            <input
              type="text"
              name="company"
              value={values.company}
              onChange={(e) => {
                handleChange(e);
                clearError("company");
              }}
              className={displayErrors.company ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.company ? (
                <div className={styles.error}>{displayErrors.company}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>TECHSTACK</label>
            <input
              type="text"
              name="techstack"
              value={values.techstack}
              onChange={(e) => {
                handleChange(e);
                clearError("techstack");
              }}
              className={displayErrors.techstack ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.techstack ? (
                <div className={styles.error}>{displayErrors.techstack}</div>
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
              <input
                type="date"
                name="enddate"
                value={values.enddate}
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
            </div>
          </div>

          <div className={styles.box}>
            <label>DESCRIPTION</label>
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
      <InternshipSummary
        data={data}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setEditData={setEditData}
        editData={editData}
        handleEdit={handleEdit}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.nextText}
          onClick={() => {
            dispatch({ type: "INTERNSHIP_SKIP", payload: true });
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
              dispatch({ type: "INTERNSHIP_SUBMIT", payload: true });
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default Internships;

export const InternshipSummary = ({
  data,
  editIndex,
  setEditIndex,
  setEditData,
  editData,
  handleEdit,
}) => {
  const dispatch = useDispatch();
  const [internshipData, setInternshipData] = useState([]);

  useEffect(() => {
    dispatch({ type: "INTERNSHIPS", payload: internshipData });
  }, [internshipData]);

  const handleDelete = (index) => {
    const newData = internshipData.filter((val, id) => id !== index);
    setInternshipData(newData);
  };

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      const updatedData = [...internshipData];
      updatedData[editIndex] = editData;
      setInternshipData(updatedData);
      setEditIndex(null);
      setEditData({});
    }
  }, [editData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setInternshipData([...internshipData, data]);
    }
  }, [data]);

  return (
    <>
      {internshipData.length > 0 && (
        <h1 className={styles.summary}>Internships Summary</h1>
      )}
      <div className={styles.cards}>
        {internshipData.length > 0 &&
          internshipData.map((history, index) => (
            <div key={index}>
              <InternshipHistoryCard
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
