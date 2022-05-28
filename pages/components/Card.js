import React from "react";
import styles from "../../styles/styles.module.css";
import Image from "next/image";

function Card(props) {
  return (
    props.info != null && (
      <div className={styles.card}>
        <Image src={props.info.map_url} alt="map" width={296} height={148} />
        <div className={styles.rideDetails}>
          <h3 className={styles.detailField}>
            Ride Id: <span className={styles.detailEntry}>{props.info.id}</span>
          </h3>
          <h3 className={styles.detailField}>
            Origin Station:{" "}
            <span className={styles.detailEntry}>
              {props.info.origin_station_code}
            </span>
          </h3>
          <h3 className={styles.detailField}>
            Station Path:{" "}
            <span className={styles.detailEntry}>
              {props.info.station_path.toString()}
            </span>
          </h3>
          <h3 className={styles.detailField}>
            Date:{" "}
            <span className={styles.detailEntry}>
              {new Date(props.info.date).toLocaleString()}
            </span>
          </h3>
          <h3 className={styles.detailField}>
            Distance:{" "}
            <span className={styles.detailEntry}>{props.info.distance}</span>
          </h3>
        </div>
        <div className={styles.locationDetails}>
          <h3>{props.info.city + ",  "}</h3>
          <h3>{props.info.state}</h3>
        </div>
      </div>
    )
  );
}

export default Card;
