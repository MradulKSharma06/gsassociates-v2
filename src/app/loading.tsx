export default function Loading() {
    return (
        <div
            className="min-h-[60vh] flex items-center justify-center"
            style={{ background: "var(--color-page-bg)" }}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Animated dots */}
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                                background: "var(--color-blue-primary)",
                                animation: `loadingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>
                <span
                    className="text-[10px] font-bold tracking-[3px] uppercase"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    Loading
                </span>
            </div>

            <style>{`
        @keyframes loadingDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
        </div>
    );
}