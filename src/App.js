import React from "react";
import styles from "./DynamicBackgorund.module.css";
import Layout from "./components/layout/layout";
import Stream from "./components/Stream /Stream";

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <header className={styles.AppHeader}></header>
          <Stream></Stream>
      </Layout>
    </div>
  );
}

export default App;
