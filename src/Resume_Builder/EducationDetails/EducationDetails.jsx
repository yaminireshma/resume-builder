import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import EducationHistoryCard from "./EducationHistoryCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Educationhistory.module.css";
import { useDispatch, useSelector } from "react-redux";

const EducationDetails = ({
  currentStep,
  setCurrentStep,
}) => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [displayErrors, setDisplayErrors] = useState({});
  const dispatch = useDispatch();
  const { education } = useSelector((state) => state.educationDetails || []);

  useEffect(() => {
    setDisplayErrors({});
  }, [currentStep]);

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Enter Name";
    }
    if (!values.location) {
      errors.location = "Enter Location";
    }
    if (!values.degree) {
      errors.degree = "Enter Degree";
    }
    if (!values.startdate) {
      errors.startdate = "Enter Start Date";
    }
    if (!values.enddate) {
      errors.enddate = "Enter End Date";
    }
    if (!values.field) {
      errors.field = "Enter Field";
    }
    setDisplayErrors(errors);
    return errors;
  };

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      name: "",
      location: "",
      degree: "",
      startdate: "",
      enddate: "",
      field: "",
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

  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
    dirty,
  } = formik;

  const handleNext = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      handleSubmit();
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill the form before going to next step");
    }
  };

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleEdit = (index, history) => {
    setEditIndex(index);
    setValues(history);
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
        <h1>Let's fill out your Education</h1>
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
            <label className={styles.require}>SCHOOL NAME</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => {
                handleChange(e);
                clearError("name");
              }}
              className={displayErrors.name ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.name ? (
                <div className={styles.error}>{displayErrors.name}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>SCHOOL LOCATION</label>
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
            <label className={styles.require}>DEGREE</label>
            <input
              type="text"
              name="degree"
              value={values.degree}
              onChange={(e) => {
                handleChange(e);
                clearError("degree");
              }}
              className={displayErrors.degree ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.degree ? (
                <div className={styles.error}>{displayErrors.degree}</div>
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
            <label className={styles.require}>FIELD OF STUDY</label>
            <input
              name="field"
              type="text"
              value={values.field}
              onChange={(e) => {
                handleChange(e);
                clearError("field");
              }}
              className={displayErrors.field ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.field ? (
                <div className={styles.error}>{displayErrors.field}</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
      <EducationDetailsSummary
        data={data}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setEditData={setEditData}
        editData={editData}
        handleEdit={handleEdit}
      />
      <button
        className={styles.nextText}
        onClick={() => {
          dispatch({ type: "EDUCATION_SUBMIT", payload: true });
          if (dirty) {
            handleNext();
          } 
          else{
            if(education.length===0){
              alert("Please add atleast one education detail")
            }
            else{
              setCurrentStep(currentStep+1)
            }
          }
        }}
      >
        Next
      </button>
    </>
  );
};
export default EducationDetails;

export const EducationDetailsSummary = ({
  data,
  editIndex,
  setEditIndex,
  setEditData,
  editData,
  handleEdit,
}) => {
  const dispatch = useDispatch();
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    dispatch({ type: "EDUCATION", payload: educationData });

    if (educationData.length > 0) {
      dispatch({ type: "EDUCATION_COMPLETENESS", payload: 20 });
    } else {
      dispatch({ type: "EDUCATION_COMPLETENESS", payload: 0 });
    }
  }, [educationData]);

  const handleDelete = (index) => {
    const newData = educationData.filter((val, id) => id !== index);
    setEducationData(newData);
  };

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      const updatedData = [...educationData];
      updatedData[editIndex] = editData;
      setEducationData(updatedData);
      setEditIndex(null);
      setEditData({});
    }
  }, [editData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setEducationData([...educationData, data]);
    }
  }, [data]);

  return (
    <>
      {educationData.length > 0 && <h1>Education Summary</h1>}
      <div className={styles.cards}>
        {educationData.length > 0 &&
          educationData.map((history, index) => (
            <div key={index}>
              <EducationHistoryCard
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
