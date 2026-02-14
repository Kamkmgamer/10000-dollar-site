import Link from 'next/link';
import {
    MapPin,
    Phone,
    Clock,
    Instagram,
    Facebook,
    Twitter,
    ArrowUpRight,
    Star,
    Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const locations = [
    { name: 'Downtown', address: '123 Main Street, NY', phone: '(212) 555-0100' },
    { name: 'Westside', address: '456 Oak Avenue, NY', phone: '(212) 555-0200' },
    { name: 'Harbor View', address: '789 Waterfront Dr, NY', phone: '(212) 555-0300' },
];

const quickLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Order Online', href: '/order' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Loyalty Program', href: '/loyalty' },
    { label: 'Private Dining', href: '/private-dining' },
];

const discoverLinks = [
    { label: 'Our Story', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
];

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-[var(--copper-500)]/5 bg-[var(--obsidian-950)]">
            {/* Decorative top glow */}
            <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--copper-500)]/20 to-transparent" />
            <div className="absolute left-1/2 top-0 h-40 w-[400px] -translate-x-1/2 rounded-full bg-[var(--copper-500)]/[0.02] blur-[80px]" />

            {/* Newsletter Section */}
            <div className="relative border-b border-[var(--obsidian-700)]/50">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
                    <div className="text-center lg:text-left">
                        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                            Stay Connected
                        </h3>
                        <p className="mt-2 max-w-md text-sm text-[var(--cream-400)]">
                            Exclusive offers, seasonal menus, and event invitations delivered
                            to your inbox.
                        </p>
                    </div>
                    <div className="flex w-full max-w-md gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-full border border-[var(--obsidian-600)] bg-[var(--obsidian-800)] px-5 py-3 text-sm text-[var(--cream-100)] placeholder:text-[var(--cream-500)]/50 transition-all focus:border-[var(--copper-500)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--copper-500)]/20"
                        />
                        <Button variant="copper">Subscribe</Button>
                    </div>
                </div>
            </div>

            {/* Main Footer Grid */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                                    Bella
                                </span>
                                <span className="font-[family-name:var(--font-display)] text-3xl font-light italic text-[var(--copper-400)]">
                                    Italia
                                </span>
                            </div>
                            <div className="mt-1 h-px w-16 bg-gradient-to-r from-[var(--copper-500)] to-transparent" />
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-[var(--cream-400)]">
                            Since 2009, crafting exceptional Italian dining experiences across
                            three iconic New York locations.
                        </p>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-3.5 w-3.5 fill-[var(--copper-500)] text-[var(--copper-500)]"
                                />
                            ))}
                            <span className="ml-2 text-xs text-[var(--cream-400)]">
                                4.9 on Google
                            </span>
                        </div>
                        <div className="flex gap-3">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--obsidian-600)] text-[var(--cream-400)] transition-all duration-300 hover:border-[var(--copper-500)]/30 hover:bg-[var(--copper-500)]/5 hover:text-[var(--copper-400)]"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--copper-400)]">
                            Quick Links
                        </h4>
                        <ul className="mt-6 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-sm text-[var(--cream-400)] transition-colors hover:text-[var(--copper-400)]"
                                    >
                                        <span className="h-px w-0 bg-[var(--copper-500)] transition-all duration-300 group-hover:w-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Discover */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--copper-400)]">
                            Discover
                        </h4>
                        <ul className="mt-6 space-y-3">
                            {discoverLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-sm text-[var(--cream-400)] transition-colors hover:text-[var(--copper-400)]"
                                    >
                                        <span className="h-px w-0 bg-[var(--copper-500)] transition-all duration-300 group-hover:w-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--copper-400)]">
                            Locations
                        </h4>
                        <div className="mt-6 space-y-5">
                            {locations.map((loc) => (
                                <div key={loc.name} className="space-y-1.5">
                                    <p className="text-sm font-medium text-[var(--cream-200)]">
                                        {loc.name}
                                    </p>
                                    <p className="flex items-center gap-2 text-xs text-[var(--cream-500)]">
                                        <MapPin className="h-3 w-3 text-[var(--copper-500)]/40" />
                                        {loc.address}
                                    </p>
                                    <p className="flex items-center gap-2 text-xs text-[var(--cream-500)]">
                                        <Phone className="h-3 w-3 text-[var(--copper-500)]/40" />
                                        {loc.phone}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--obsidian-700)]/50">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
                    <p className="text-xs text-[var(--cream-500)]">
                        © {new Date().getFullYear()} Bella Italia. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-[var(--cream-500)]">
                        <a href="#" className="transition-colors hover:text-[var(--copper-400)]">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-[var(--copper-400)]">
                            Terms of Service
                        </a>
                        <a href="#" className="transition-colors hover:text-[var(--copper-400)]">
                            Accessibility
                        </a>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-[var(--cream-500)]">
                        Made with{' '}
                        <Heart className="h-3 w-3 fill-[var(--copper-500)] text-[var(--copper-500)]" />{' '}
                        in New York
                    </p>
                </div>
            </div>
        </footer>
    );
}
