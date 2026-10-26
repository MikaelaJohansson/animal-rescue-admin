import { doc, updateDoc } from "firebase/firestore";
import { auth, db, disableAnalytics } from "../../firebase";
import styles from "./Settings.module.css";

export default function Settings({ theme, setTheme }) {


  async function handleThemeChange(selectedTheme) {

    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    try {

      setTheme(selectedTheme);

      document.documentElement.setAttribute( "data-theme", selectedTheme );

      const userDocumentReference = doc(db, "users", currentUser.uid);

      await updateDoc(userDocumentReference, { theme: selectedTheme, });

    } catch (error) {

      console.error( "Failed to save theme:",  error);

    }

  }


  // Reopen the cookie consent banner
  function handleCookieSettings() {
    disableAnalytics();
    localStorage.removeItem("analytics-consent");
    window.dispatchEvent(new Event("analytics-consent-change"));
  }


  return (
    <main className={styles.settingsPage}>

      <div className={styles.settingsHeader}>
        <h1>Settings</h1>
        <p>Manage your application preferences.</p>
      </div>

      <section className={styles.settingsSection}>

        <div className={styles.settingRow}>

          <div className={styles.settingInfo}>
            <h2>Theme</h2>
            <p>Choose how the application looks.</p>
          </div>

          <div className={styles.themeButtons}>

            <button
              type="button"

              className={ theme === "light" ? styles.activeThemeButton: styles.themeButton}

              onClick={() => handleThemeChange("light") }

            >
              Light
            </button>

            <button
              type="button"

              className={ theme === "dark" ? styles.activeThemeButton : styles.themeButton }

              onClick={() => handleThemeChange("dark")}

            >
              Dark
            </button>

          </div>

        </div>

        {/* Analytics cookies */}
        <div className={styles.settingRow}>

          <div className={styles.settingInfo}>
            <h2>Analytics Cookies</h2>
            <p>Manage your Google Analytics consent preferences.</p>
          </div>

          <button
            type="button"
            className={styles.themeButton}
            onClick={handleCookieSettings}
          >
            Cookie Settings
          </button>

        </div>

      </section>

    </main>
  );
}
