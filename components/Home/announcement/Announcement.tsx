import React from 'react';

const MESSAGE = 'We are pleased to announce that our online sales platform will be launched shortly.';

const Announcement = () => {
    return (
        <div
            role="region"
            aria-label="Site announcement"
            className="ln-announce relative w-full overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-y border-orange-500/30"
        >
            <div className="ln-announce-track flex w-max items-center py-2.5 sm:py-3">
                {/* First copy — read by screen readers */}
                <div className="ln-announce-group flex items-center shrink-0">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <React.Fragment key={`a-${i}`}>
                            <span className="px-4 sm:px-6 text-xs sm:text-sm md:text-base font-medium tracking-wide text-white whitespace-nowrap">
                                {MESSAGE}
                            </span>
                            <span aria-hidden="true" className="text-orange-400/70 text-xs sm:text-sm">
                                ✦
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                {/* Duplicate copy — hidden from assistive tech, exists only to complete the loop */}
                <div aria-hidden="true" className="ln-announce-group flex items-center shrink-0">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <React.Fragment key={`b-${i}`}>
                            <span className="px-4 sm:px-6 text-xs sm:text-sm md:text-base font-medium tracking-wide text-white whitespace-nowrap">
                                {MESSAGE}
                            </span>
                            <span className="text-orange-400/70 text-xs sm:text-sm">✦</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <style>{`
                .ln-announce {
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 6%,
                        black 94%,
                        transparent
                    );
                    mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 6%,
                        black 94%,
                        transparent
                    );
                }

                .ln-announce-track {
                    animation: ln-marquee 48s linear infinite;
                }

                .ln-announce:hover .ln-announce-track,
                .ln-announce:focus-within .ln-announce-track {
                    animation-play-state: paused;
                }

                @keyframes ln-marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ln-announce-track {
                        animation: none;
                    }
                    .ln-announce-group:last-of-type {
                        display: none;
                    }
                    .ln-announce {
                        overflow-x: auto;
                    }
                }
            `}</style>
        </div>
    );
};

export default Announcement;