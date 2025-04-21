"use client";
import { useEffect } from "react";

export default function InstagramEmbed() {
    useEffect(() => {
        const script = document.createElement("script");
        script.setAttribute("src", "//www.instagram.com/embed.js");
        script.setAttribute("async", "true");
        document.body.appendChild(script);

        // Cleanup if needed
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="flex justify-center m-4">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/sunset.kimcare/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
                style={{ maxWidth: "540px", width: "100%" }}
            ></blockquote>
        </div>
    );
}

