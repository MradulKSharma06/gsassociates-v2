"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    organization: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .regex(/^[+\d\s\-()]{7,15}$/, "Please enter a valid phone number"),
    subject: z.string().min(1, "Please select an inquiry type"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const subjects = [
    "Tender / Bid Inquiry",
    "Partnership Opportunity",
    "Project Status Inquiry",
    "Technical Consultancy",
    "Subcontractor Registration",
    "General Inquiry",
];

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        setErrorMessage(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const result = await res.json().catch(() => ({}));
                throw new Error(result.error || "Failed to submit inquiry. Please try again.");
            }

            setSubmitted(true);
            reset();
        } catch (err: unknown) {
            console.error("Submission error:", err);
            if (process.env.NODE_ENV === "development") {
                setSubmitted(true);
                reset();
            } else {
                setErrorMessage(
                    err instanceof Error
                        ? err.message
                        : "Failed to submit. Please email us directly at info@GSAssociates.in"
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 flex flex-col items-center justify-center text-center shadow-matte-sm min-h-[380px]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5 text-emerald-600">
                    <CheckCircle2 size={32} />
                </div>
                <h3
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-3xl font-extrabold text-[#0d1b2e] uppercase tracking-wide mb-2"
                >
                    Inquiry Received
                </h3>
                <p className="text-sm text-slate-600 max-w-sm leading-relaxed mb-8">
                    Your specifications have been logged securely. Our engineering estimating team will
                    review the requirements and respond within one business day.
                </p>
                <ArchitecturalButton
                    onClick={() => setSubmitted(false)}
                    variant="wireframe"
                    size="md"
                >
                    Submit Another Inquiry
                </ArchitecturalButton>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-matte-sm overflow-hidden">
            {/* Architectural Header */}
            <div className="px-8 py-6 border-b border-slate-100 bg-[#FAF9F6]">
                <h2
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-2xl font-extrabold text-[#0d1b2e] uppercase tracking-wide"
                >
                    Direct Tender & Project Desk
                </h2>
                <p className="text-xs font-mono-tech text-slate-500 mt-1">
                    All fields marked * are required. Responses dispatched within 24 hours.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0 text-red-600" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="form-label">Full Name *</label>
                        <input
                            {...register("name")}
                            className="form-field"
                            placeholder="e.g. S. Rajendran"
                        />
                        {errors.name && (
                            <p className="text-[11px] text-red-600 mt-1 font-mono-tech">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Department / Organization</label>
                        <input
                            {...register("organization")}
                            className="form-field"
                            placeholder="e.g. PWD / NHAI / Private"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="form-label">Official Email *</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-field"
                            placeholder="name@gov.in or corporate"
                        />
                        {errors.email && (
                            <p className="text-[11px] text-red-600 mt-1 font-mono-tech">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Contact Number *</label>
                        <input
                            {...register("phone")}
                            type="tel"
                            className="form-field"
                            placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.phone && (
                            <p className="text-[11px] text-red-600 mt-1 font-mono-tech">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 3: Custom Radix Select */}
                <div>
                    <label className="form-label">Nature of Inquiry *</label>
                    <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                value={field.value}
                                onChange={field.onChange}
                                options={subjects}
                                placeholder="Select inquiry category…"
                            />
                        )}
                    />
                    {errors.subject && (
                        <p className="text-[11px] text-red-600 mt-1 font-mono-tech">
                            {errors.subject.message}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className="form-label">Project Scope & Specifications *</label>
                    <textarea
                        {...register("message")}
                        className="form-field resize-none"
                        rows={5}
                        placeholder="Detail the scope of work, district location, estimated tender value, or technical inquiry…"
                    />
                    {errors.message && (
                        <p className="text-[11px] text-red-600 mt-1 font-mono-tech">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary btn-lg w-full justify-center shadow-matte-md"
                        style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Submitting to Cloudflare Edge…
                            </>
                        ) : (
                            <>
                                <span>Submit Project Specifications</span>
                                <Send size={14} />
                            </>
                        )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-3 font-mono-tech">
                        Direct transmission to GSAssociates Engineering Desk. Privacy protected.
                    </p>
                </div>
            </form>
        </div>
    );
}
