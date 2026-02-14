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
    {
        title: "High Frequency Trading Latency",
        date: "Sep 2024",
        description: "Analyzing network latency impact on HFT strategies and infrastructure optimization.",
        tags: ["HFT", "Networking", "C++"],
        slug: "hft-latency",
    },
    {
        title: "Crypto Market Microstructure",
        date: "Aug 2024",
        description: "Market microstructure analysis of major cryptocurrency exchanges during high volatility events.",
        tags: ["Crypto", "Market Microstructure", "Data Analysis"],
        slug: "crypto-microstructure",
    },
    {
        title: "Machine Learning in Asset Pricing",
        date: "Jul 2024",
        description: "Applying deep learning models to predict asset returns and comparing with traditional factor models.",
        tags: ["ML", "Asset Pricing", "Python"],
        slug: "ml-asset-pricing",
    },
    {
        title: "Behavioral Finance Anomalies",
        date: "Jun 2024",
        description: "Investigating behavioral biases in retail trading patterns and their impact on stock prices.",
        tags: ["Behavioral Finance", "Psychology", "Economics"],
        slug: "behavioral-finance",
    },
    {
        title: "Algorithmic Execution Strategies",
        date: "May 2024",
        description: "Optimizing execution algorithms to minimize market impact and slippage.",
        tags: ["Algo Trading", "Execution", "Optimization"],
        slug: "algo-execution",
    },
    {
        title: "Risk Management in DeFi",
        date: "Apr 2024",
        description: "Assessing smart contract risks and liquidity protocols in decentralized finance.",
        tags: ["DeFi", "Risk Management", "Blockchain"],
        slug: "defi-risk",
    },
    {
        title: "Sentiment Analysis on Earnings Calls",
        date: "Mar 2024",
        description: "Using NLP to extract sentiment signals from quarterly earnings call transcripts.",
        tags: ["NLP", "Sentiment Analysis", "Earnings"],
        slug: "earnings-sentiment",
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