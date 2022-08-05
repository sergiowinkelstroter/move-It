import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengeContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SignGoogleContext } from "../contexts/SignGoogleContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {
  const router = useRouter();
  const { user } = useContext(SignGoogleContext);

  if (!user) {
    return router.push("/");
  } else {
    return (
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengeCompleted={props.challengeCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Inicio | Moveit</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <section className={styles.section__home}>
              <div>
                <Profile />
                <CompletedChallenges />
                <CountDown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted, photo, name } =
    ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
      photo: String(photo),
      name: String(name),
    },
  };
};
