"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    organization: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .regex(/^[+\d\s\-()]{7,15}$/, "Please enter a valid phone number"),
    subject: z.string().min(1, "Please select a subject"),
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
            // In local static development where Cloudflare Pages Functions are not running:
            if (process.env.NODE_ENV === "development") {
                console.info("Dev fallback: recording submission locally");
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
            <div
                className="rounded-card border p-12 flex flex-col items-center justify-center text-center"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", minHeight: "360px" }}
            >
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "var(--color-blue-pale)" }}
                >
                    <CheckCircle2 size={32} style={{ color: "var(--color-blue-primary)" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "10px",
                    }}
                >
                    Inquiry Received
                </h3>
                <p className="text-[14px] leading-relaxed max-w-[380px]" style={{ color: "var(--color-text-muted)" }}>
                    Thank you for reaching out. Your details have been logged into our
                    system and our engineering team will respond within one business day.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline mt-8"
                >
                    Send Another Inquiry
                </button>
            </div>
        );
    }

    return (
        <div
            className="rounded-card border"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
            {/* Form header */}
            <div
                className="px-7 py-5 border-b"
                style={{ borderColor: "var(--color-border)" }}
            >
                <h2
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                    }}
                >
                    Send an Inquiry
                </h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--color-text-faint)" }}>
                    All fields marked * are required. We respond within 1 business day.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-7">
                {errorMessage && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0 text-red-600" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="form-label">Full Name *</label>
                        <input
                            {...register("name")}
                            className="form-field"
                            placeholder="Your full name"
                        />
                        {errors.name && (
                            <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Organization</label>
                        <input
                            {...register("organization")}
                            className="form-field"
                            placeholder="Department / Company (optional)"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="form-label">Email Address *</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-field"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Phone Number *</label>
                        <input
                            {...register("phone")}
                            type="tel"
                            className="form-field"
                            placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.phone && (
                            <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subject */}
                <div className="mb-5">
                    <label className="form-label">Nature of Inquiry *</label>
                    <select {...register("subject")} className="form-field">
                        <option value="">Select inquiry type…</option>
                        {subjects.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.subject && (
                        <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
                            {errors.subject.message}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div className="mb-7">
                    <label className="form-label">Message *</label>
                    <textarea
                        {...register("message")}
                        className="form-field resize-none"
                        rows={5}
                        placeholder="Describe your project, requirement, or inquiry in detail…"
                    />
                    {errors.message && (
                        <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary btn-lg w-full justify-center"
                    style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                >
                    {submitting ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Submitting to Cloudflare Edge…
                        </>
                    ) : (
                        <>
                            Submit Inquiry
                            <Send size={15} />
                        </>
                    )}
                </button>

                <p className="text-[11px] text-center mt-4" style={{ color: "var(--color-text-faint)" }}>
                    Inquiries are securely encrypted and logged directly to our infrastructure team.
                </p>
            </form>
        </div>
    );
}
