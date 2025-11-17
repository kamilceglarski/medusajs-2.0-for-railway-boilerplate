import Link from "next/link"
import ContactForm from "@modules/contact/components/contact-form"

export default function ContactPage() {
    return (
        <div className="content-container py-10 sm:py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0E3E4D" }}>
                    Kontakt
                </h1>
                <p className="text-ui-fg-subtle mb-10 text-base sm:text-lg">
                    Masz pytania lub chcesz wycenę? Napisz do nas – odpowiemy jak najszybciej.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-lg border p-6 bg-white">
                        <h2 className="font-semibold text-2xl mb-6" style={{ color: "#0E3E4D" }}>Dane kontaktowe</h2>
                        <div className="space-y-6 text-base">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-ui-fg-muted" aria-hidden="true">
                                    {/* Mail icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16v16H4z" />
                                        <path d="m22 6-10 7L2 6" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-ui-fg-muted">Email</div>
                                    <a href="mailto:kontakt@lumoria-studio.pl" className="text-ui-fg-interactive underline break-all text-lg">
                                        kontakt@lumoria-studio.pl
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-ui-fg-muted" aria-hidden="true">
                                    {/* Phone icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.14a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-ui-fg-muted">Telefon</div>
                                    <a href="tel:+48737268975" className="text-ui-fg-interactive underline text-lg">+48 737 268 975</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-ui-fg-muted" aria-hidden="true">
                                    {/* Share icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <path d="M8.59 13.51 15.42 17.49" />
                                        <path d="M15.41 6.51 8.59 10.49" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-ui-fg-muted">Social</div>
                                    <div className="flex items-center gap-5">
                                        <Link href="https://www.facebook.com/lumoriastudio" target="_blank" rel="noreferrer" aria-label="Facebook Lumoria Studio" className="inline-flex items-center gap-2 hover:opacity-80">
                                            {/* Facebook icon */}
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#1877F2]"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.64 9.13 8.4 9.93v-7.02H7.9V12.1h2.36V9.83c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.94h2.59l-.41 2.88h-2.18V22c4.76-.8 8.4-4.94 8.4-9.93z" /></svg>
                                            <span className="underline text-lg">Facebook</span>
                                        </Link>
                                        <Link href="https://www.instagram.com/lumoria_studio/" target="_blank" rel="noreferrer" aria-label="Instagram Lumoria Studio" className="inline-flex items-center gap-2 hover:opacity-80">
                                            {/* Instagram icon */}
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E1306C]"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
                                            <span className="underline text-lg">Instagram</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </div>
    )
}


