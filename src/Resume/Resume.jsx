import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Resume.module.css";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DOMPurify from "dompurify";

const Resume = ({
  currentStep,
  setCurrentStep,
}) => {
  
  const { basicDetail } = useSelector((state) => state.basicDetails || []);
  const { profile } = useSelector((state) => state.profile || []);
  const { employment } = useSelector((state) => state.employmentHistory || []);
  const { education } = useSelector((state) => state.educationDetails || []);
  const { internship } = useSelector((state) => state.internships || []);
  const { project } = useSelector((state) => state.projects || []);
  const { skills } = useSelector((state) => state.skills || []);
  const { languages } = useSelector((state) => state.languages || []);
  const { city, country, email, fullname, link, phone, pin } = basicDetail ?? {};
  const { description } = profile ?? {};

  const [image, setImage] = useState(basicDetail?.file?.target?.files[0]);
  const componentRef = useRef();

  useEffect(() => {
    setImage(basicDetail?.file?.target?.files[0]);
  }, [basicDetail]);

  const handleDownloadPdf = () => {
    const input = componentRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${fullname}_Resume.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  };

  return (
    <>
      <div className={styles.topHeading}>
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
        <h2>Your Resume</h2>
        <button onClick={handleDownloadPdf} className={styles.download}>
          Download
        </button>
      </div>
      <div ref={componentRef}>
        <div className={styles.mainWrapper}>
          <div className={styles.firstDiv}>
            <div className={styles.imageDiv}>
              {image && (
                <img
                  className={styles.image}
                  src={URL.createObjectURL(image)}
                />
              )}
            </div>

            <div className={styles.socialDetails}>
              {email !== "" && (
                <div className={styles.iconWrapper}>
                  <div>
                    <HiOutlineMailOpen className={styles.icon} />
                  </div>
                  <div className={styles.socialText}>{email}</div>
                </div>
              )}

              {phone !== "" && (
                <div className={styles.iconWrapper}>
                  <div>
                    <IoMdPhonePortrait className={styles.icon} />
                  </div>
                  <div className={styles.socialText}>{phone}</div>
                </div>
              )}

              <div className={styles.iconWrapper}>
                <div>
                  <FaLocationDot className={styles.icon} />
                </div>
                <div className={styles.socialText}>
                  {city},{country} {pin}
                </div>
              </div>

              {link !== "" && (
                <div className={styles.iconWrapper}>
                  <div>
                    <FaLinkedin className={styles.icon} />
                  </div>
                  <div className={styles.socialText}>{link}</div>
                </div>
              )}
            </div>

            {skills.length > 0 && (
              <div className={styles.skills}>
                <h2 className={styles.heading}>SKILLS</h2>
                <div className={styles.skillsNames}>
                  {skills &&
                    skills?.map((name) => {
                      return (
                        <>
                          {name !== "" && (
                            <div className={styles.skillName}>{name}</div>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className={styles.heading}>LANGUAGES</h2>
                <div className={styles.languages}>
                  {languages?.map((name) => {
                    return (
                      <>
                        {name !== "" && (
                          <div className={styles.languageName}>
                            <>
                              <FaArrowRight />
                            </>
                            <div className={styles.language}>{name}</div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className={styles.secondDiv}>
            <div className={styles.profile}>
              <div className={styles.profileFirstdiv}>
                <div className={styles.fullName}>{fullname}</div>
                <div className={styles.position}>
                  {employment[0]?.jobtitle}
                </div>
              </div>
              <div className={styles.profileFirstdiv}>
                <div className={styles.careerGoal}>{description} </div>
              </div>
            </div>

            <div className={styles.fromExperience}>
              {employment.length > 0 && (
                <div>
                  <h2 className={styles.heading}>WORK EXPERIENCE</h2>
                  <div className={styles.experience}>
                    {employment &&
                      employment?.map((val, index) => {
                        const {
                          description,
                          employer,
                          enddate,
                          jobtitle,
                          location,
                          startdate,
                        } = val;
                        const sanitizedHtmlString =
                          DOMPurify.sanitize(description);
                        return (
                          <div key={index} className={styles.experienceWrapper}>
                            <div className={styles.heading2}>{jobtitle}</div>
                            <div className={styles.heading3}>{employer}</div>
                            <div className={styles.location}>
                              <div>
                                {`${startdate} to ${
                                  enddate !== "" ? enddate : "Present"
                                }`}
                              </div>
                              <div>{location}</div>
                            </div>
                            <div
                              className={styles.description}
                              dangerouslySetInnerHTML={{
                                __html: sanitizedHtmlString,
                              }}
                            ></div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {education.length > 0 && (
                <div>
                  <h2 className={styles.heading}>EDUCATION</h2>
                  <div className={styles.educationDetails}>
                    {education?.map((val) => {
                      const {
                        degree,
                        enddate,
                        field,
                        name,
                        startdate,
                        location
                      } = val;
                      return (
                        <>
                          <div>
                            <div className={styles.heading2}>{degree}</div>
                            <div className={styles.heading3}>{name}</div>
                            <div className={styles.location}>
                              <div>
                              {`${startdate} ${
                                enddate !== "" ? "to " + enddate : ""
                              }`}
                              </div>
                              <div>{location}</div>
                            </div>
                            <div className={styles.field}>{field}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
              {internship.length > 0 && (
                <div>
                  <h2 className={styles.heading}>INTERNSHIPS</h2>
                  <div className={styles.internships}>
                    {internship?.map((val) => {
                      const {
                        company,
                        description,
                        enddate,
                        startdate,
                        techstack,
                      } = val;
                      return (
                        <div>
                          <div className={styles.heading2}>{company}</div>
                          <div className={styles.location}>
                            {`${startdate} ${
                              enddate !== "" ? "to " + enddate : ""
                            }`}
                          </div>
                          <div className={styles.technologies}>{techstack}</div>
                          <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(description),
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {project.length > 0 && (
                <div>
                  <h2 className={styles.heading}>PROJECTS</h2>
                  <div>
                    {project?.map((val) => {
                      const {
                        description,
                      } = val;
                      return (
                        <div>
                          <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(description),
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Resume;
