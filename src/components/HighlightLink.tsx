"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode, ComponentProps, useState, useRef, useLayoutEffect } from "react";
import { useInteraction } from "../context/InteractionContext";

interface HighlightLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
}

export default function HighlightLink({ children, className, ...props }: HighlightLinkProps & ComponentProps<'a'>) {
    const { setHoveredEffectBounds } = useInteraction();
    const [isHovered, setIsHovered] = useState(false);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        if (isHovered && linkRef.current) {
            setHoveredEffectBounds(linkRef.current.getBoundingClientRect());
        }
    }, [isHovered, setHoveredEffectBounds]);

    return (
        <Link
            {...props}
            ref={linkRef}
            className={className}
            style={{
                position: "relative",
                zIndex: isHovered ? 10000 : 1, // Elevate above cursor (9999) when hovered
                color: isHovered ? "black" : undefined,
                fontWeight: isHovered ? 400 : undefined,
                textDecoration: "none", // Ensure no underline conflicts
                ...props.style
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setHoveredEffectBounds(null);
            }}
        >
            {children}
        </Link>
    );
}
