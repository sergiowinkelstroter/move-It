import "../styles/index.css";

import { SignGoogleProvider } from "../contexts/SignGoogleContext";

function MyApp({ Component, pageProps }) {
  return (
    <SignGoogleProvider>
      <Component {...pageProps} />
    </SignGoogleProvider>
  );
}

export default MyApp;
