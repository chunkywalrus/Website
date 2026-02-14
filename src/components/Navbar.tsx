"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Navbar.module.css";


const navItems = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: "Projects", path: "/projects" },
    { name: "Run Log", path: "/run-log" },
    { name: "Movies", path: "/movies" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState(pathname);

    return (
        <div className={styles.navContainer}>
            <nav className={`${styles.nav} glass`}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(pathname)}
                        >
                            <span style={{ position: "relative", zIndex: 10 }}>
                                {item.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    className={styles.activeBackground}
                                    layoutId="navbar-active"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* SVG Filter for Liquid Distortion */}
            <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                <defs>
                    <filter id="liquid-glass-distortion">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.02 0.05"
                            numOctaves="2"
                            result="noise"
                            seed="1"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.02 0.05; 0.03 0.07; 0.02 0.05"
                                dur="10s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
