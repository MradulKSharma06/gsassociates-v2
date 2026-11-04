/**
 * Cloudflare Pages Function — /api/contact
 * Handles contact form and tender inquiry submissions at the Cloudflare Edge.
 * Persists submissions to Cloudflare D1 SQL database when bound, with fallback support.
 */

interface Env {
    DB?: {
        prepare: (query: string) => {
            bind: (...params: unknown[]) => {
                run: () => Promise<{ success: boolean; meta?: unknown }>;
            };
        };
    };
    ADMIN_EMAIL?: string;
    RESEND_API_KEY?: string;
}

interface ContactPayload {
    name: string;
    organization?: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const onRequestPost = async ({
    request,
    env,
}: {
    request: Request;
    env: Env;
}): Promise<Response> => {
    try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return new Response(
                JSON.stringify({ error: "Content-Type must be application/json" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = (await request.json()) as Partial<ContactPayload>;

        // Basic validation
        if (!body.name || !body.email || !body.phone || !body.message || !body.subject) {
            return new Response(
                JSON.stringify({ error: "Please fill in all required fields." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return new Response(
                JSON.stringify({ error: "Please provide a valid email address." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";

        // Persist to Cloudflare D1 Database if bound
        if (env.DB) {
            await env.DB.prepare(
                `INSERT INTO inquiries (name, organization, email, phone, subject, message, ip_address, user_agent)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            )
                .bind(
                    body.name.trim(),
                    body.organization ? body.organization.trim() : null,
                    body.email.trim().toLowerCase(),
                    body.phone.trim(),
                    body.subject.trim(),
                    body.message.trim(),
                    clientIp,
                    userAgent
                )
                .run();
        } else {
            console.warn(
                "Cloudflare D1 DB binding not detected. Form submitted successfully in stateless mode."
            );
        }

        // Optional Resend email dispatch if RESEND_API_KEY is configured in Cloudflare Pages
        if (env.RESEND_API_KEY && env.ADMIN_EMAIL) {
            try {
                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${env.RESEND_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: "GSAssociates Website <onboarding@resend.dev>",
                        to: env.ADMIN_EMAIL,
                        subject: `New Inquiry: ${body.subject} — ${body.name}`,
                        text: `Name: ${body.name}\nOrganization: ${body.organization || "N/A"}\nEmail: ${body.email}\nPhone: ${body.phone}\nSubject: ${body.subject}\n\nMessage:\n${body.message}`,
                    }),
                });
            } catch (emailErr) {
                console.error("Failed to trigger email notification:", emailErr);
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Thank you for reaching out. Your inquiry has been received by GSAssociates.",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    } catch (err: unknown) {
        console.error("Error processing contact submission:", err);
        return new Response(
            JSON.stringify({
                error: "An unexpected error occurred while submitting your message. Please try again or contact us directly.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

export const onRequestOptions = async (): Promise<Response> => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};
