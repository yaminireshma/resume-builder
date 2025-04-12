import React from "react";
import styles from "./Projects.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";

const ProjectHistoryCard = ({
  history,
  handleDelete,
  handleEdit,
  index,
  editColor,
}) => {
  const { description } = history;
  return (
    <div
      className={`${styles.ProjectWrapper} ${editColor && styles.editColor}`}
    >
      <div className={styles.text}>
        <div></div>
        <div className={styles.desc}>
          <div className={styles.descriptionHeading}>Description</div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </div>
      </div>

      <div className={styles.icons}>
        <FaEdit
          className={styles.icon}
          onClick={() => handleEdit(index, history)}
        />
        <MdDelete className={styles.icon} onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};
export default ProjectHistoryCard;
