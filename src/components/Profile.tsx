import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import { SignGoogleContext } from "../contexts/SignGoogleContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengeContext);
  const { user } = useContext(SignGoogleContext);

  return (
    <div className={styles.profileContainer}>
      <img src={user.photoURL} alt="" />
      <div>
        <strong>{user.displayName}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
