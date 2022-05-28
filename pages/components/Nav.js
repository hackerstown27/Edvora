import React from "react";
import styles from "../../styles/styles.module.css";
import Image from "next/image";

function Nav(props) {
  console.log(props);
  return (
    <div className={styles.nav}>
      <h1 className={styles.title}>Edvora</h1>
      <div className={styles.userInfo}>
        <Image
          className={styles.avatar}
          src={props.userInfo.url}
          alt="Avatar"
          width={44}
          height={44}
        />
        <span className={styles.userName}>{props.userInfo.name}</span>
      </div>
    </div>
  );
}

export default Nav;
