"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInteraction } from "../context/InteractionContext";
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
    const router = useRouter();
    const { isNavMerged, setNavMerged, setCursorOverride } = useInteraction();
    const navRef = useRef<HTMLElement>(null);
    const lastKeyboardNav = useRef(0);

    // Optimistic UI state for instant feedback
    const [activePath, setActivePath] = useState(pathname);

    // Sync state with router (e.g. back/forward button)
    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    // Handle Keyboard Navigation
    useEffect(() => {
        if (!isNavMerged) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const currentIndex = navItems.findIndex(item => item.path === activePath);
            if (currentIndex === -1) return;

            let nextIndex = -1;
            if (e.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % navItems.length;
            } else if (e.key === "ArrowLeft") {
                nextIndex = (currentIndex - 1 + navItems.length) % navItems.length;
            }

            if (nextIndex !== -1 && navRef.current) {
                lastKeyboardNav.current = Date.now();
                const nextPath = navItems[nextIndex].path;

                // Optimistic visual update
                setActivePath(nextPath);
                router.push(nextPath);

                // Snap cursor to the new item's location
                const targetLink = navRef.current.querySelector(`a[href="${nextPath}"]`);
                if (targetLink) {
                    const rect = targetLink.getBoundingClientRect();
                    setCursorOverride({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    });
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isNavMerged, activePath, router, setCursorOverride]);

    return (
        <div className={styles.navContainer}>
            <nav
                ref={navRef}
                className={`${styles.nav} glass`}
                onMouseLeave={() => setNavMerged(false)}
            >
                {navItems.map((item) => {
                    const isActive = activePath === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            onMouseEnter={() => {
                                // Prevent mouse hover from overriding keyboard navigation for 500ms
                                if (Date.now() - lastKeyboardNav.current < 500) return;

                                setNavMerged(true);

                                if (!isActive) {
                                    setActivePath(item.path);
                                    router.push(item.path);
                                }
                            }}
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
