'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    ShoppingBag,
    MapPin,
    User,
    ChevronDown,
    Search,
    Star,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navLinks = [
    {
        label: 'Menu',
        href: '/menu',
        featured: true,
    },
    {
        label: 'Order Online',
        href: '/order',
        featured: true,
    },
    {
        label: 'Reservations',
        href: '/reservations',
    },
    {
        label: 'Locations',
        href: '/locations',
    },
    {
        label: 'Discover',
        href: '#',
        children: [
            { label: 'Our Story', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Private Dining', href: '/private-dining' },
            { label: 'Events', href: '/events' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        label: 'Loyalty',
        href: '/loyalty',
    },
];

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
};

const slideUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
        opacity: 0,
        y: -40,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [discoverOpen, setDiscoverOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? 'glass-effect border-b border-[var(--copper-500)]/5 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="group relative z-10">
                        <div className="flex items-baseline gap-1">
                            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream-100)] transition-colors group-hover:text-[var(--copper-400)]">
                                Bella
                            </span>
                            <span className="font-[family-name:var(--font-display)] text-2xl font-light italic text-[var(--copper-400)]">
                                Italia
                            </span>
                        </div>
                        <div className="mt-0.5 h-px w-0 bg-gradient-to-r from-[var(--copper-500)] to-transparent transition-all duration-500 group-hover:w-full" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative">
                                {link.children ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setDiscoverOpen(true)}
                                        onMouseLeave={() => setDiscoverOpen(false)}
                                    >
                                        <button className="flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium tracking-wide text-[var(--cream-300)] transition-colors hover:text-[var(--copper-400)]">
                                            {link.label}
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 transition-transform duration-300 ${discoverOpen ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {discoverOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{
                                                        duration: 0.2,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-[var(--copper-500)]/10 bg-[var(--obsidian-850)] p-2 shadow-2xl shadow-black/50"
                                                >
                                                    {link.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[var(--cream-300)] transition-all duration-200 hover:bg-[var(--copper-500)]/5 hover:text-[var(--copper-400)]"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${link.featured
                                            ? 'text-[var(--copper-400)] hover:text-[var(--copper-300)]'
                                            : 'text-[var(--cream-300)] hover:text-[var(--copper-400)]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--cream-400)] transition-colors hover:bg-[var(--obsidian-700)] hover:text-[var(--copper-400)]">
                            <Search className="h-4 w-4" />
                        </button>
                        <Link
                            href="/account"
                            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--cream-400)] transition-colors hover:bg-[var(--obsidian-700)] hover:text-[var(--copper-400)]"
                        >
                            <User className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/order"
                            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--cream-400)] transition-colors hover:bg-[var(--obsidian-700)] hover:text-[var(--copper-400)]"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--copper-500)] text-[9px] font-bold text-[var(--obsidian-950)]">
                                3
                            </span>
                        </Link>
                        <Link href="/reservations">
                            <Button variant="copper" size="sm" className="ml-2">
                                Book a Table
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-[var(--cream-100)] transition-colors hover:bg-[var(--obsidian-700)] lg:hidden"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </header>

            {/* ═══════════════════════════════════════
          FULL-SCREEN MOBILE MENU
          ═══════════════════════════════════════ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-[var(--obsidian-950)]/98 backdrop-blur-xl lg:hidden"
                    >
                        <motion.nav
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex h-full flex-col items-center justify-center gap-2"
                        >
                            {navLinks.map((link) =>
                                link.children ? (
                                    link.children.map((child) => (
                                        <motion.div key={child.href} variants={slideUp}>
                                            <Link
                                                href={child.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="block py-2 font-[family-name:var(--font-display)] text-lg text-[var(--cream-400)] transition-colors hover:text-[var(--copper-400)]"
                                            >
                                                {child.label}
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div key={link.href} variants={slideUp}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-3 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--cream-100)] transition-colors hover:text-[var(--copper-400)]"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                )
                            )}
                            <motion.div variants={slideUp} className="mt-8 flex flex-col items-center gap-4">
                                <Link href="/reservations" onClick={() => setMobileOpen(false)}>
                                    <Button variant="copper" size="lg">
                                        Book a Table
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-6 pt-4">
                                    <Link
                                        href="/order"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 text-sm text-[var(--cream-400)] transition-colors hover:text-[var(--copper-400)]"
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        Order Online
                                    </Link>
                                    <Link
                                        href="/account"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 text-sm text-[var(--cream-400)] transition-colors hover:text-[var(--copper-400)]"
                                    >
                                        <User className="h-4 w-4" />
                                        Account
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Decorative elements */}
                            <motion.div
                                variants={slideUp}
                                className="absolute bottom-12 flex flex-col items-center gap-3"
                            >
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-3 w-3 fill-[var(--copper-500)] text-[var(--copper-500)]"
                                        />
                                    ))}
                                </div>
                                <p className="text-xs tracking-[0.2em] text-[var(--cream-500)]">
                                    SINCE 2009 · NEW YORK
                                </p>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
