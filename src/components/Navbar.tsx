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
    const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

    // Sync state with router (e.g. back/forward button)
    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    // Update pill position whenever active path changes
    useEffect(() => {
        if (!navRef.current) return;

        const target = navRef.current.querySelector<HTMLAnchorElement>(`a[href="${activePath}"]`);
        if (target) {
            setPillStyle({
                left: target.offsetLeft,
                top: target.offsetTop,
                width: target.offsetWidth,
                height: target.offsetHeight,
                opacity: 1
            });
        } else {
            setPillStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [activePath]);

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
                {/* Navbar Glass Background */}
                <div className={styles.navBackground} />

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
                        </Link>
                    );
                })}
                {/* Active Pill (Manual Positioning) */}
                <motion.div
                    className={styles.activeBackground}
                    animate={pillStyle}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                />
            </nav>

            {/* SVG Filter for Liquid Distortion */}
            <svg style={{ position: "absolute", width: "1px", height: "1px", left: "-9999px", pointerEvents: "none" }}>
                <defs>
                    <filter id="liquid-glass-distortion">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.1"
                            numOctaves="2"
                            result="noise"
                            seed="1"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.1; 0.15; 0.1"
                                dur="10s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
