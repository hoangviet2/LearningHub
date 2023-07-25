import styles from "./loadingmodules.css"
export const Loading = () => {
  return (
    <div className={styles.loader-container}>
        <div className={styles.spinner}></div>
    </div>    
  );
};
