import { cn } from "@/lib/utils";

interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
    light?: boolean; // for use on dark backgrounds
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
    return (
        <div
            className={cn(
                "section-label",
                light && "!text-blue-light before:!bg-blue-light",
                className
            )}
        >
            {children}
        </div>
    );
}