import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

type Data = {
  videoCount: string;
  lastScraped: string;
};

const Sub2: NextPage = () => {
  const [data, setData] = useState<Data>({
    videoCount: "",
    lastScraped: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("api/bookworm-s3")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          Data: {data.videoCount !== "" ? data.videoCount : "Loading..."}
        </div>
        <div>
          Last scraped:{" "}
          {data.lastScraped !== "" ? data.lastScraped : "Loading..."}
        </div>
      </main>
    </div>
  );
};

export default Sub2;
