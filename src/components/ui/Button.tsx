import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost" | "gold" | "outline-white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    external?: boolean;
}

const variantMap: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    gold: "btn-gold",
    "outline-white": "btn-outline-white",
};

const sizeMap: Record<ButtonSize, string> = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    href,
    onClick,
    disabled,
    type = "button",
    external,
}: ButtonProps) {
    const classes = cn("btn", variantMap[variant], sizeMap[size], className);

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            style={{ opacity: disabled ? 0.45 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
        >
            {children}
        </button>
    );
}