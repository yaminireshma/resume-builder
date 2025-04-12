import React, { useRef, useState } from "react";
import styles from "./BasicsDetails.module.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

const BasicDetails = ({ setCurrentStep, currentStep }) => {
  const [displayErrors, setDisplayErrors] = useState({});
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: false,
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      pin: "",
      link: "",
      file: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch({ type: "BASIC_DETAILS", payload: values });
      setCurrentStep(currentStep + 1);
      dispatch({ type: "BASIC_COMPLETENESS", payload: 20 });
      dispatch({ type: "BASIC_SUBMIT", payload: true });
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullname) {
        errors.fullname = "Enter Full Name";
      }
      if (!values.email) {
        errors.email = "Enter Email";
      }
      if (!values.phone) {
        errors.phone = "Enter Phone Number";
      }
      if (!values.city) {
        errors.city = "Enter City";
      }
      if (!values.country) {
        errors.country = "Enter Country";
      }
      if (!values.file) {
        errors.file = "Upload Image";
      }
      setDisplayErrors(errors);
      return errors;
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    formik;

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <>
      <h1>Tell us about your Basic Details</h1>
      <div className={styles.alert}>* indicates a required field</div>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            resetForm();
            setDisplayErrors({});
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          Clear
        </button>
        <div className={styles.container}>
          <div className={styles.box}>
            <label className={styles.require}>FULL NAME</label>
            <input
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={(e) => {
                setFieldValue("fullname", e.target.value);
                clearError("fullname");
              }}
              className={displayErrors.fullname ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.fullname ? (
                <div className={styles.error}>{displayErrors.fullname}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>EMAIL</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
                clearError("email");
              }}
              className={displayErrors.email ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.email ? (
                <div className={styles.error}>{displayErrors.email}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>PHONE NUMBER</label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={(e) => {
                handleChange(e);
                clearError("phone");
              }}
              className={displayErrors.phone ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.phone ? (
                <div className={styles.error}>{displayErrors.phone}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>CITY</label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={(e) => {
                handleChange(e);
                clearError("city");
              }}
              className={displayErrors.city ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.city ? (
                <div className={styles.error}>{displayErrors.city}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label className={styles.require}>COUNTRY</label>
            <input
              type="text"
              name="country"
              value={values.country}
              onChange={(e) => {
                handleChange(e);
                clearError("country");
              }}
              className={displayErrors.country ? styles.errorInput : ""}
            />
            <div className={styles.errorContainer}>
              {displayErrors.country ? (
                <div className={styles.error}>{displayErrors.country}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.box}>
            <label>PINCODE</label>
            <input
              type="text"
              name="pin"
              value={values.pin}
              onChange={handleChange}
            />
          </div>

          <div className={styles.box}>
            <label>LINKEDIN LINK</label>
            <input
              type="text"
              name="link"
              value={values.link}
              onChange={handleChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.require}>UPLOAD PHOTO</label>
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={(event) => {
                const file = event;
                setFieldValue("file", file);
                clearError("file");
              }}
              className={styles.fileInputInvisible}
            />

            <div className={styles.fileButtonWrapper}>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current.click();
                }}
                className={styles.fileButton}
              >
                Choose file
              </button>
              <div>{fileInputRef?.current?.files[0]?.name}</div>
            </div>
            <div className={styles.errorContainer}>
              {displayErrors.file ? (
                <div className={styles.error}>{displayErrors.file}</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <button type="submit" className={styles.nextText}>
          Next
        </button>
      </form>
    </>
  );
};
export default BasicDetails;
