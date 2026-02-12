import Link from "next/link";
import styles from "./page.module.css";
import PageWrapper from "@/components/PageWrapper";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <PageWrapper className={styles.main}>
      <div className={styles.intro}>
        <span className={`cursive ${styles.greeting}`}>Hi, I&apos;m</span>
        <h1 className={styles.name}>Krish Gupta</h1>
      </div>

      <p className={styles.bio}>
        I&apos;m currently at Claremont McKenna doubling down on Econ and Math.
        Most of my brain space is occupied by the world of quant and commodity
        trading, but I&apos;m also a big fan of building random, fun CS side{" "}
        <Link href="/projects" className="highlight hover:underline">
          projects
        </Link>
        .
      </p>

      <p className={styles.bio}>
        When I&apos;m not staring at a terminal or a spreadsheet, I&apos;m
        probably out on a long{" "}
        <Link href="/run-log" className="highlight hover:underline">
          run
        </Link>
        . I&apos;m a big marathon junkie and constantly in a cycle of training
        for the next 26.2. To cool down, I&apos;m usually deep-diving into{" "}
        <Link href="/movies" className="highlight hover:underline">
          movies
        </Link>
        ; I&apos;ll watch anything from obscure A24 indies to the classics.
      </p>

      <Socials />
    </PageWrapper>
  );
}
