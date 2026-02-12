"use client";

import { Mail, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import styles from "./Socials.module.css";

const socials = [
    {
        name: "Email",
        icon: <Mail size={24} />,
        href: "mailto:your.email@example.com",
    },
    {
        name: "LinkedIn",
        icon: <Linkedin size={24} />,
        href: "https://linkedin.com/in/yourprofile",
    },
    {
        name: "X (Twitter)",
        icon: <Twitter size={24} />,
        href: "https://x.com/yourhandle",
    },
];

export default function Socials() {
    return (
        <div className={styles.container}>
            {socials.map((social) => (
                <Magnetic key={social.name}>
                    <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.link} glass`}
                    >
                        {social.icon}
                    </Link>
                </Magnetic>
            ))}
        </div>
    );
}
