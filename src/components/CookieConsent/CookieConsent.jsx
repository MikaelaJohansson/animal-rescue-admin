
import { useState, useEffect } from "react";
import { initializeAnalytics, disableAnalytics } from "../../firebase";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [consent, setConsent] = useState(
    () => localStorage.getItem("analytics-consent")
  );

  // Apply the saved analytics consent
  useEffect(() => {
    if (consent === "accepted") {
      initializeAnalytics();
    } else {
      disableAnalytics();
    }
  }, [consent]);

  // Listen for requests to reopen cookie settings
  useEffect(() => {
    const handleConsentChange = () => {
      setConsent(localStorage.getItem("analytics-consent"));
    };

    window.addEventListener("analytics-consent-change", handleConsentChange);

    return () => {
      window.removeEventListener("analytics-consent-change", handleConsentChange);
    };
  }, []);

  const saveConsent = (choice) => {
    localStorage.setItem("analytics-consent", choice);
    setConsent(choice);
  };

  if (consent !== null) return null;

  return (
    <div
      className={styles.cookieBanner}
      role="dialog"
      aria-label="Analytics cookies"
    >
      <p>
        We use Google Analytics to understand how this application is used.
        You can accept or reject analytics cookies.
      </p>

      <div className={styles.actions}>
        <button onClick={() => saveConsent("rejected")}>
          Reject
        </button>

        <button onClick={() => saveConsent("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
