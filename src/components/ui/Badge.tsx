import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "navy" | "gold" | "outline" | "green";

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
    blue: "badge-blue",
    navy: "badge-navy",
    gold: "badge-gold",
    outline: "badge-outline",
    green: "badge-green",
};

export function Badge({ children, variant = "blue", className }: BadgeProps) {
    return (
        <span className={cn("badge", variantMap[variant], className)}>
            {children}
        </span>
    );
}