"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import styles from "./research.module.css";

const researchItems = [
    {
        title: "Commodity Trading Strategies",
        date: "Dec 2024",
        description: "Exploring mean reversion strategies in energy markets using high-frequency order book data.",
        tags: ["Quant", "Commodities", "Python"],
        slug: "commodity-trading",
    },
    {
        title: "Weather Pattern Analysis",
        date: "Nov 2024",
        description: "Statistical modeling of El Niño effects on global crop yields and pricing volatility.",
        tags: ["Data Science", "Weather", "R"],
        slug: "weather-research",
    },
    {
        title: "Quant Finance Methods",
        date: "Oct 2024",
        description: "A deep dive into stochastic calculus applications for option pricing in volatile markets.",
        tags: ["Math", "Finance", "Stochastic Calculus"],
        slug: "quant-finance",
    },
];

export default function Research() {
    return (
        <PageWrapper className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Research</h1>
                <p className={styles.subtitle}>
                    Notes, papers, and explorations in quantitative finance.
                </p>
            </header>

            <div className={styles.grid}>
                {researchItems.map((item) => (
                    <Link href={`/research/${item.slug}`} key={item.slug} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>{item.title}</h2>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <p className={styles.cardDescription}>{item.description}</p>
                        <div className={styles.tags}>
                            {item.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </PageWrapper>
    );
}
