import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
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
          {data.videoCount !== ""
            ? data.videoCount === "10"
              ? "Asendance of Bookworm S3 is complete! You can watch it here: https://www.youtube.com/playlist?list=PLwLSw1_eDZl1pGYxuxFAg3A4Y5rDCugXg"
              : "Asendance of Bookworm S3 is not complete yet. Don't watch it yet or you will think it while you sleep."
            : "Loading..."}
        </div>
        <div>
          Last updated:{" "}
          {data.lastScraped !== "" ? data.lastScraped : "Loading..."}
        </div>
      </main>
    </div>
  );
};

export default Sub2;
