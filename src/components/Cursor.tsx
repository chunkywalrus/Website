"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 50, stiffness: 1000 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

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
                backgroundColor: "var(--highlight)", // Orange from globals
                pointerEvents: "none",
                zIndex: 9999,
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        />
    );
}
