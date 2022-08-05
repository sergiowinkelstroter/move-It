import Head from "next/head";

import { useContext } from "react";

import { GoogleLogo } from "phosphor-react";

import LogoIcon from "../components/LogoIcon";
import SimboloIcon from "../components/SimboloIcon";

import styles from "../styles/pages/Login.module.css";
import { SignGoogleContext } from "../contexts/SignGoogleContext";

export default function Login() {
  const { handleGoogleSignIn } = useContext(SignGoogleContext);

  return (
    <div className={styles.content}>
      <Head>
        <title>Login | Moveit</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.simbolo}>
          <SimboloIcon />
        </div>
        <div className={styles.login}>
          <LogoIcon />
          <h2>Bem-vindo</h2>

          <button onClick={handleGoogleSignIn}>
            <GoogleLogo size={32} />
            <span>Faça login com a sua conta Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
