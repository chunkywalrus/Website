"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useInteraction } from "../context/InteractionContext";

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const { isNavMerged, cursorOverride, hoveredEffectBounds } = useInteraction();

    // Snap cursor position if override is provided (e.g. from keyboard nav)
    useEffect(() => {
        if (cursorOverride) {
            cursorX.set(cursorOverride.x);
            cursorY.set(cursorOverride.y);
        }
    }, [cursorOverride, cursorX, cursorY]);

    // Update cursor position based on mouse or hover state
    useEffect(() => {
        if (hoveredEffectBounds) {
            // Snap to the center of the hovered element
            cursorX.set(hoveredEffectBounds.left + hoveredEffectBounds.width / 2);
            cursorY.set(hoveredEffectBounds.top + hoveredEffectBounds.height / 2);
        }
    }, [hoveredEffectBounds, cursorX, cursorY]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Only follow mouse if NOT hovering a special link
            if (!hoveredEffectBounds) {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            }
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY, hoveredEffectBounds]);

    return (
        <>
            <motion.div
                animate={{
                    opacity: isNavMerged ? 0 : 1,
                    scale: isNavMerged ? 0.5 : 1,
                    width: hoveredEffectBounds ? hoveredEffectBounds.width + 20 : 20,
                    height: hoveredEffectBounds ? hoveredEffectBounds.height + 10 : 20,
                    x: "-50%",
                    y: "-50%",
                    borderRadius: hoveredEffectBounds ? 30 : "50%",
                    background: hoveredEffectBounds
                        ? "rgba(238, 191, 91, 0.4)" // Navbar pill color
                        : "rgba(238, 191, 91, 0.5)",
                    backdropFilter: hoveredEffectBounds
                        ? "blur(12px) saturate(150%) contrast(1.1)" // Navbar pill blur
                        : "blur(0px) saturate(180%) contrast(1.2) url(#cursor-distortion)",
                    WebkitBackdropFilter: hoveredEffectBounds
                        ? "blur(12px) saturate(150%) contrast(1.1)"
                        : "blur(0px) saturate(180%) contrast(1.2)",
                    border: hoveredEffectBounds
                        ? "1px solid rgba(255, 255, 255, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: hoveredEffectBounds
                        ? "0 4px 15px rgba(238, 191, 91, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.3)"
                        : "inset 0 0 8px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(238, 191, 91, 0.3)",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    opacity: { duration: 0.2 }
                }}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
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
