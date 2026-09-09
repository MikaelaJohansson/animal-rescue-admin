import { useState } from "react";
import styles from "./Settings.module.css";

export default function Settings() {
  const [theme, setTheme] = useState("light");

  function handleThemeChange(selectedTheme) {
    setTheme(selectedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      selectedTheme
    );
  }

  return (
    <main className={styles.settingsPage}>

      <div>
        <h1>Settings</h1>
        <p>Manage your application preferences.</p>
      </div>

      <section>
        <h2>Appearance</h2>

        <div>
          <div>
            <h3>Theme</h3>
            <p>Choose how the application looks.</p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
            >
              Light
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </button>
          </div>
        </div>

      </section>

    </main>
  );
}