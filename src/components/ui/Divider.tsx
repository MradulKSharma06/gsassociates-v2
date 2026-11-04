import { cn } from "@/lib/utils";

interface DividerProps {
    className?: string;
    accent?: boolean; // 3-color gradient accent bar
}

export function Divider({ className, accent = false }: DividerProps) {
    if (accent) {
        return (
            <div className={cn("accent-bar my-8", className)} />
        );
    }

    return (
        <div
            className={cn("h-px my-8", className)}
            style={{
                background:
                    "linear-gradient(90deg, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
            }}
        />
    );
}