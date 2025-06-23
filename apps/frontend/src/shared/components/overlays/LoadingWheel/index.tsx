import { FC } from "react";
import styles from "./index.module.css";

export const LoadingWheel: FC = () => {
  return (
    <main className="flex min-h-screen min-w-screen justify-center items-center">
      <div className="flex flex-col min-h-1/2 min-w-1/2 items-center gap-10">
        <h1 className="text-display-small">Content is loading...</h1>
        <span className={styles.loader} />
      </div>
    </main>
  );
};
