"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    value?: string;
    onChange: (value: string) => void;
    options: Option[] | string[];
    placeholder?: string;
    className?: string;
}

export function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Select an option…",
    className = "",
}: CustomSelectProps) {
    const normalizedOptions: Option[] = options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger
                className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-sm rounded-xl bg-white border border-slate-200 text-[#0d1b2e] shadow-sm hover:border-slate-400 focus:outline-none focus:border-[#185FA5] focus:ring-2 focus:ring-[#185FA5]/15 transition-all",
                    className
                )}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="text-slate-400">
                    <ChevronDown size={15} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={5}
                    className="z-50 min-w-[var(--radix-select-trigger-width)] max-h-72 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 animate-in fade-in-0 zoom-in-95"
                >
                    <Select.Viewport>
                        {normalizedOptions.map((opt) => (
                            <Select.Item
                                key={opt.value}
                                value={opt.value}
                                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#0d1b2e] focus:bg-slate-100 focus:text-[#0d1b2e] focus:outline-none cursor-pointer select-none transition-colors"
                            >
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <Select.ItemIndicator className="text-[#185FA5]">
                                    <Check size={14} />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
