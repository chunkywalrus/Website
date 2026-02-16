"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface InteractionContextType {
    isNavMerged: boolean;
    setNavMerged: (merged: boolean) => void;
    cursorOverride: { x: number, y: number } | null;
    setCursorOverride: (pos: { x: number, y: number } | null) => void;
    hoveredEffectBounds: DOMRect | null;
    setHoveredEffectBounds: (bounds: DOMRect | null) => void;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: ReactNode }) {
    const [isNavMerged, setNavMerged] = useState(false);
    const [cursorOverride, setCursorOverride] = useState<{ x: number, y: number } | null>(null);
    const [hoveredEffectBounds, setHoveredEffectBounds] = useState<DOMRect | null>(null);
    const pathname = usePathname();

    // Reset interaction state on navigation
    useEffect(() => {
        setHoveredEffectBounds(null);
        setCursorOverride(null);
    }, [pathname]);

    return (
        <InteractionContext.Provider value={{
            isNavMerged,
            setNavMerged,
            cursorOverride,
            setCursorOverride,
            hoveredEffectBounds,
            setHoveredEffectBounds
        }}>
            {children}
        </InteractionContext.Provider>
    );
}

export function useInteraction() {
    const context = useContext(InteractionContext);
    if (context === undefined) {
        throw new Error("useInteraction must be used within an InteractionProvider");
    }
    return context;
}
