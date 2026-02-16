import Link from "next/link";
import styles from "./page.module.css";
import PageWrapper from "@/components/PageWrapper";
import Socials from "@/components/Socials";
import HighlightLink from "@/components/HighlightLink";

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
        <HighlightLink href="/projects" className="highlight">
          projects
        </HighlightLink>
        .
      </p>

      <p className={styles.bio}>
        When I&apos;m not staring at a terminal or a spreadsheet, I&apos;m
        probably out on a long{" "}
        <HighlightLink href="/run-log" className="highlight">
          run
        </HighlightLink>
        . I&apos;m a big marathon junkie and constantly in a cycle of training
        for the next 26.2. To cool down, I&apos;m usually deep-diving into{" "}
        <HighlightLink href="/movies" className="highlight">
          movies
        </HighlightLink>
        ; I&apos;ll watch anything from obscure A24 indies to the classics.
      </p>

      <Socials />
    </PageWrapper>
  );
}
