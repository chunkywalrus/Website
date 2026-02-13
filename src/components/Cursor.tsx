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
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "20px",
                height: "20px",
                borderRadius: "50%",

                // Orange Liquid Glass Effect
                background: "rgba(238, 191, 91, 0.2)", // More transparent
                backdropFilter: "blur(0px) saturate(180%)",
                WebkitBackdropFilter: "blur(0px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(238, 191, 91, 0.3)",

                pointerEvents: "none",
                zIndex: 9999,
                translateX: cursorX,
                translateY: cursorY,
            }}
        />
    );
}
