"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10); // Center the 20px cursor
            cursorY.set(e.clientY - 10);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",

                    // Orange Liquid Glass Effect
                    background: "rgba(238, 191, 91, 0.5)",
                    backdropFilter: "blur(0px) saturate(180%) contrast(1.2) url(#cursor-distortion)",
                    WebkitBackdropFilter: "blur(0px) saturate(180%) contrast(1.2)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: "inset 0 0 8px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(238, 191, 91, 0.3)",

                    pointerEvents: "none",
                    zIndex: 9999,
                    translateX: cursorX,
                    translateY: cursorY,
                }}
            />

            {/* SVG Filter for Cursor Distortion */}
            <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                <defs>
                    <filter id="cursor-distortion">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.1"
                            numOctaves="2"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.1; 0.15; 0.1"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                    </filter>
                </defs>
            </svg>
        </>
    );
}
