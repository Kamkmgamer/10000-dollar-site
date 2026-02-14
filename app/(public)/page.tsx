'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    ArrowRight,
    Star,
    MapPin,
    Clock,
    Phone,
    Crown,
    Award,
    Gift,
    Users,
    ChefHat,
    Utensils,
    ShoppingBag,
    Flame,
    Sparkles,
    TrendingUp,
    Heart,
    Truck,
    Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const featuredDishes = [
    {
        name: 'Ossobuco alla Milanese',
        description: 'Slow-braised veal shank, saffron risotto, gremolata',
        price: 48,
        category: 'Signature',
        popular: true,
        prepTime: '45 min',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop',
    },
    {
        name: 'Tagliatelle al Tartufo',
        description: 'Fresh egg pasta, black truffle shavings, parmigiano fonduta',
        price: 38,
        category: 'Pasta',
        popular: true,
        prepTime: '25 min',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop',
    },
    {
        name: 'Branzino al Cartoccio',
        description: 'Mediterranean sea bass, cherry tomatoes, olives, capers, in parchment',
        price: 42,
        category: 'Seafood',
        popular: false,
        prepTime: '30 min',
        image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&auto=format&fit=crop',
    },
    {
        name: 'Tiramisu Classico',
        description: 'Mascarpone cream, espresso-soaked savoiardi, cocoa',
        price: 16,
        category: 'Dolci',
        popular: true,
        prepTime: '15 min',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop',
    },
];

const testimonials = [
    {
        name: 'Sarah Mitchell',
        text: 'The online ordering experience is flawless — I can customize every dish, track my order in real-time, and the food arrives exactly as described. This is the future of dining.',
        rating: 5,
        location: 'Downtown',
        role: 'Loyalty Platinum Member',
    },
    {
        name: 'James Kowalski',
        text: 'From the reservation system to the loyalty rewards, everything feels premium. I\'ve earned over 2,000 points just by being a regular, and the personalized offers are incredible.',
        rating: 5,
        location: 'Westside',
        role: 'Food Critic',
    },
    {
        name: 'Emily Rodriguez',
        text: 'Ordered a gift card for my mother through the app — the presentation, the real-time tracking, the instant confirmation — it felt like a luxury experience from start to finish.',
        rating: 5,
        location: 'Harbor View',
        role: 'Regular Guest',
    },
];

const locationsList = [
    {
        name: 'Downtown',
        address: '123 Main Street, New York',
        phone: '(212) 555-0100',
        hours: '11am – 11pm',
        tagline: 'The Original',
        seats: 120,
        waitTime: '15 min',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    },
    {
        name: 'Westside',
        address: '456 Oak Avenue, New York',
        phone: '(212) 555-0200',
        hours: '11am – 10pm',
        tagline: 'Garden Retreat',
        seats: 80,
        waitTime: '5 min',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    },
    {
        name: 'Harbor View',
        address: '789 Waterfront Drive, New York',
        phone: '(212) 555-0300',
        hours: '10am – 12am',
        tagline: 'Waterfront Dining',
        seats: 200,
        waitTime: '25 min',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
    },
];

const experienceCards = [
    {
        icon: ShoppingBag,
        title: 'Order Online',
        desc: 'Full menu ordering with real-time tracking. Customize any dish, schedule deliveries, and pay seamlessly.',
        href: '/order',
        cta: 'Start Ordering',
        stat: '2,400+',
        statLabel: 'orders/week',
    },
    {
        icon: Award,
        title: 'Loyalty Rewards',
        desc: 'Earn points with every order and visit. Climb from Bronze to Platinum and unlock exclusive perks.',
        href: '/loyalty',
        cta: 'Join Free',
        stat: '18K+',
        statLabel: 'members',
    },
    {
        icon: Gift,
        title: 'Gift Cards',
        desc: 'Digital gift cards delivered instantly. Perfect for birthdays, holidays, or just because.',
        href: '/gift-cards',
        cta: 'Send a Gift',
        stat: '$120K+',
        statLabel: 'gifted',
    },
    {
        icon: Users,
        title: 'Private Dining',
        desc: 'Intimate wine rooms to grand event halls. Custom menus and dedicated service for your special occasions.',
        href: '/private-dining',
        cta: 'Explore Spaces',
        stat: '500+',
        statLabel: 'events/year',
    },
];

const loyaltyTiers = [
    { name: 'Bronze', threshold: 0, color: '#cd7f32', perks: '5% back on orders' },
    { name: 'Silver', threshold: 500, color: '#c0c0c0', perks: '10% back + free dessert' },
    { name: 'Gold', threshold: 1500, color: '#d4a54a', perks: '15% back + priority seating' },
    { name: 'Platinum', threshold: 5000, color: '#e5e4e2', perks: '20% back + chef\'s table access' },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)]">
            {/* ═══════════════════════════════════════════
          HERO — Cinematic Full-Screen with Video
          ═══════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative flex min-h-screen items-center justify-center overflow-hidden"
            >
                {/* Video / Image Background */}
                <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
                    <img
                        src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=3870&auto=format&fit=crop"
                        alt="Bella Italia restaurant ambiance"
                        className="h-full w-full object-cover"
                    />
                    {/* Multi-layer gradient overlay for depth */}
                    <div className="absolute inset-0 bg-[var(--obsidian-950)]/65 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian-950)]/50 via-transparent to-[var(--obsidian-950)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--obsidian-950)]/40 via-transparent to-[var(--obsidian-950)]/40" />
                </motion.div>

                {/* Radial glow accents */}
                <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--copper-500)]/[0.06] blur-[150px]" />
                <div className="absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full bg-[var(--copper-700)]/[0.03] blur-[120px]" />

                {/* Floating decorative lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        style={{ y: heroY }}
                        className="absolute top-24 left-[12%] h-[1px] w-40 bg-gradient-to-r from-transparent via-[var(--copper-500)]/15 to-transparent animate-float-slow"
                    />
                    <motion.div
                        style={{ y: heroY }}
                        className="absolute top-48 right-[18%] h-[1px] w-56 bg-gradient-to-r from-transparent via-[var(--copper-500)]/10 to-transparent animate-float"
                    />
                    <motion.div
                        style={{ y: heroY }}
                        className="absolute bottom-48 left-[8%] h-32 w-[1px] bg-gradient-to-b from-[var(--copper-500)]/8 to-transparent"
                    />
                    {/* Copper diamond accents */}
                    <div
                        className="absolute top-[28%] right-[10%] h-3 w-3 rotate-45 border border-[var(--copper-500)]/12 animate-float-slow"
                        style={{ animationDelay: '2s' }}
                    />
                    <div
                        className="absolute bottom-[30%] left-[6%] h-2 w-2 rotate-45 bg-[var(--copper-500)]/8 animate-float"
                        style={{ animationDelay: '1s' }}
                    />
                    <div
                        className="absolute top-[60%] right-[25%] h-4 w-4 rotate-45 border border-[var(--copper-500)]/6 animate-breathe"
                        style={{ animationDelay: '3s' }}
                    />
                </div>

                {/* Noise texture */}
                <div className="noise-bg absolute inset-0" />

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--obsidian-950)] to-transparent" />

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
                >
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Top badge */}
                        <motion.div variants={fadeUp}>
                            <Badge variant="copper" className="gap-2 px-5 py-2.5">
                                <Flame className="h-3.5 w-3.5" />
                                Now Accepting Online Orders
                            </Badge>
                        </motion.div>

                        {/* Heading */}
                        <motion.div variants={fadeUp} className="overflow-hidden">
                            <h1 className="font-[family-name:var(--font-display)] text-6xl font-bold leading-[1.02] tracking-tight text-[var(--cream-100)] sm:text-7xl lg:text-[6.5rem]">
                                The Complete
                                <br />
                                <span className="gradient-text">Italian Dining</span>
                                <br />
                                <span className="text-[var(--cream-400)] font-light italic text-[0.6em]">
                                    experience, reimagined
                                </span>
                            </h1>
                        </motion.div>

                        {/* Sub-heading */}
                        <motion.p
                            variants={fadeUp}
                            className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--cream-400)] sm:text-xl"
                        >
                            Order online. Track in real-time. Earn rewards with every bite.
                            Three iconic locations, one seamless platform.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row"
                        >
                            <Link href="/order">
                                <Button variant="copper" size="lg" className="gap-2.5 px-10">
                                    <ShoppingBag className="h-4.5 w-4.5" />
                                    Order Now
                                </Button>
                            </Link>
                            <Link href="/reservations">
                                <Button variant="outline" size="lg" className="gap-2">
                                    Book a Table
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/menu">
                                <Button variant="ghost" size="lg" className="gap-2 text-[var(--cream-400)]">
                                    View Menu
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Live stats strip */}
                        <motion.div variants={fadeUp} className="pt-12">
                            <div className="copper-line mx-auto max-w-sm" />
                            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                                {[
                                    { value: '3', label: 'Locations', icon: MapPin },
                                    { value: '15+', label: 'Years', icon: Crown },
                                    { value: '50K+', label: 'Orders / Year', icon: TrendingUp },
                                    { value: '4.9', label: 'Rating', icon: Star },
                                ].map((stat) => (
                                    <div key={stat.label} className="group text-center">
                                        <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--copper-500)]/5 transition-colors group-hover:bg-[var(--copper-500)]/10">
                                            <stat.icon className="h-3.5 w-3.5 text-[var(--copper-500)]/60" />
                                        </div>
                                        <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--copper-400)] sm:text-4xl">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--cream-500)]">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--cream-500)]/60">
                            Scroll
                        </span>
                        <div className="h-10 w-[1px] bg-gradient-to-b from-[var(--copper-500)]/40 to-transparent animate-breathe" />
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
          ORDER ONLINE MARQUEE — Animated Ticker
          ═══════════════════════════════════════════ */}
            <section className="relative overflow-hidden border-y border-[var(--copper-500)]/5 bg-[var(--obsidian-900)] py-4">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 px-6">
                            {[
                                'Online Ordering Available',
                                '★',
                                'Free Delivery Over $50',
                                '★',
                                'Loyalty Points on Every Order',
                                '★',
                                'Gift Cards Available',
                                '★',
                                'Book Private Dining',
                                '★',
                                '3 Locations in NYC',
                                '★',
                            ].map((text, j) => (
                                <span
                                    key={j}
                                    className={`text-xs font-medium uppercase tracking-[0.2em] ${text === '★' ? 'text-[var(--copper-500)]' : 'text-[var(--cream-400)]'
                                        }`}
                                >
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          FEATURED DISHES — Editorial Grid with Order CTAs
          ═══════════════════════════════════════════ */}
            <section className="relative py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian-950)] via-[var(--obsidian-900)]/40 to-[var(--obsidian-950)]" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-20"
                    >
                        <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
                            <div>
                                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                                    From Our Kitchen
                                </span>
                                <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl lg:text-7xl">
                                    Featured Dishes
                                </h2>
                                <div className="section-divider mx-auto mt-6 max-w-xs lg:mx-0 lg:justify-start">
                                    <span className="h-1.5 w-1.5 rotate-45 bg-[var(--copper-500)]" />
                                </div>
                            </div>
                            <Link href="/menu" className="mt-8 lg:mt-0">
                                <Button variant="outline" className="gap-2">
                                    Full Menu
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Asymmetric Dish Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
                        {featuredDishes.map((dish, index) => {
                            const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
                            return (
                                <motion.div
                                    key={dish.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={`group premium-card overflow-hidden flex flex-col ${spans[index]}`}
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[var(--obsidian-800)] to-[var(--obsidian-900)] sm:h-72">
                                        <img
                                            src={dish.image}
                                            alt={dish.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-900)] via-transparent to-transparent opacity-80" />
                                        {/* Overlay badges */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {dish.popular && (
                                                <Badge variant="copper">
                                                    <Flame className="h-3 w-3" /> Popular
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="rounded-full bg-[var(--obsidian-950)]/70 px-3 py-1 text-xs text-[var(--cream-300)] backdrop-blur-sm">
                                                <Timer className="mr-1 inline h-3 w-3" />
                                                {dish.prepTime}
                                            </span>
                                        </div>
                                        {/* Hover CTA */}
                                        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                                            <Link href="/order">
                                                <Button variant="copper" className="w-full gap-2">
                                                    <ShoppingBag className="h-4 w-4" />
                                                    Add to Order — ${dish.price}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--copper-500)]">
                                                    {dish.category}
                                                </span>
                                                <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream-100)]">
                                                    {dish.name}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-[var(--cream-400)]">
                                                    {dish.description}
                                                </p>
                                            </div>
                                            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--copper-400)]">
                                                ${dish.price}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          EXPERIENCE — What Makes Us a $10K Platform
          ═══════════════════════════════════════════ */}
            <section className="relative py-32">
                <div className="absolute inset-0 noise-bg" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                            The Platform
                        </span>
                        <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                            More Than a Restaurant
                        </h2>
                        <div className="section-divider mx-auto mt-6 max-w-xs">
                            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--copper-500)]" />
                        </div>
                        <p className="mx-auto mt-6 max-w-xl text-[var(--cream-400)]">
                            A full digital ecosystem — order, track, earn rewards, book events,
                            and send gifts, all from one seamless experience.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {experienceCards.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={item.href} className="group block h-full flex flex-col">
                                    <div className="premium-card-glow h-full">
                                        <div className="relative h-full rounded-[calc(1rem-1px)] bg-[var(--obsidian-850)] p-8 sm:p-10 flex flex-col">
                                            <div className="flex items-start justify-between">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--copper-500)]/10 bg-[var(--copper-500)]/5 transition-all duration-500 group-hover:border-[var(--copper-500)]/25 group-hover:bg-[var(--copper-500)]/10 group-hover:shadow-[0_0_40px_rgba(199,125,74,0.1)]">
                                                    <item.icon className="h-6 w-6 text-[var(--copper-500)]" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--copper-400)]">
                                                        {item.stat}
                                                    </p>
                                                    <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--cream-500)]">
                                                        {item.statLabel}
                                                    </p>
                                                </div>
                                            </div>
                                            <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream-100)]">
                                                {item.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-[var(--cream-400)]">
                                                {item.desc}
                                            </p>
                                            <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-medium text-[var(--copper-400)] transition-all duration-300 group-hover:gap-3">
                                                {item.cta}
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          LOCATIONS — Immersive Cards with Live Data
          ═══════════════════════════════════════════ */}
            <section className="relative py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian-950)] via-[var(--obsidian-900)]/30 to-[var(--obsidian-950)]" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                            Visit Us
                        </span>
                        <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                            Our Locations
                        </h2>
                        <div className="section-divider mx-auto mt-6 max-w-xs">
                            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--copper-500)]" />
                        </div>
                        <p className="mx-auto mt-6 max-w-xl text-[var(--cream-400)]">
                            Three distinct dining experiences across New York City. Each
                            location with its own character, all with the same exceptional
                            quality.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {locationsList.map((location, index) => (
                            <motion.div
                                key={location.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="group premium-card overflow-hidden flex flex-col"
                            >
                                {/* Image area */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-900)] via-[var(--obsidian-900)]/20 to-transparent" />
                                    <div className="absolute bottom-4 left-6">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--copper-400)]">
                                            {location.tagline}
                                        </span>
                                        <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream-100)]">
                                            {location.name}
                                        </h3>
                                    </div>
                                    {/* Live wait time badge */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-[var(--copper-500)]/15 bg-[var(--obsidian-950)]/70 px-3 py-1 backdrop-blur-sm">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                        </span>
                                        <span className="text-[10px] font-medium text-[var(--cream-300)]">
                                            ~{location.waitTime} wait
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 right-6 rounded-full border border-[var(--copper-500)]/15 bg-[var(--obsidian-950)]/60 px-3 py-1 backdrop-blur-sm">
                                        <span className="text-xs text-[var(--copper-400)]">
                                            {location.seats} seats
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="relative z-10 -mt-px p-6 flex-1 flex flex-col bg-gradient-to-b from-[var(--obsidian-900)] to-transparent">
                                    <div className="space-y-3 text-sm">
                                        <p className="flex items-center gap-3 text-[var(--cream-400)]">
                                            <MapPin className="h-4 w-4 text-[var(--copper-500)]/40" />
                                            {location.address}
                                        </p>
                                        <p className="flex items-center gap-3 text-[var(--cream-400)]">
                                            <Phone className="h-4 w-4 text-[var(--copper-500)]/40" />
                                            {location.phone}
                                        </p>
                                        <p className="flex items-center gap-3 text-[var(--cream-400)]">
                                            <Clock className="h-4 w-4 text-[var(--copper-500)]/40" />
                                            {location.hours}
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-6 flex gap-3">
                                        <Link href="/order" className="flex-1">
                                            <Button variant="copper" className="w-full gap-1.5 text-xs">
                                                <ShoppingBag className="h-3.5 w-3.5" />
                                                Order
                                            </Button>
                                        </Link>
                                        <Link href="/reservations" className="flex-1">
                                            <Button variant="outline" className="w-full text-xs">
                                                Reserve
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          HOW IT WORKS — Ordering Flow
          ═══════════════════════════════════════════ */}
            <section className="relative py-32">
                <div className="absolute inset-0 noise-bg" />
                <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                            Seamless Experience
                        </span>
                        <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                            How It Works
                        </h2>
                        <div className="section-divider mx-auto mt-6 max-w-xs">
                            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--copper-500)]" />
                        </div>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                step: '01',
                                icon: Utensils,
                                title: 'Browse & Customize',
                                desc: 'Explore our full menu with allergen filters, customize any dish with modifiers, and add to your cart.',
                            },
                            {
                                step: '02',
                                icon: Truck,
                                title: 'Order & Track',
                                desc: 'Choose pickup, delivery, or dine-in. Pay securely and track your order in real-time from kitchen to table.',
                            },
                            {
                                step: '03',
                                icon: Sparkles,
                                title: 'Earn & Enjoy',
                                desc: 'Earn loyalty points on every order. Unlock tiers, exclusive rewards, and personalized offers along the way.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative text-center flex flex-col items-center"
                            >
                                {/* Step number */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-8xl font-bold text-[var(--copper-500)]/[0.05]">
                                    {item.step}
                                </div>
                                <div className="relative">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--copper-500)]/10 bg-[var(--copper-500)]/5 transition-all duration-500 group-hover:border-[var(--copper-500)]/25 group-hover:bg-[var(--copper-500)]/10">
                                        <item.icon className="h-7 w-7 text-[var(--copper-500)]" />
                                    </div>
                                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream-100)]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-[var(--cream-400)]">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link href="/order">
                            <Button variant="copper" size="lg" className="gap-2.5">
                                <ShoppingBag className="h-4.5 w-4.5" />
                                Start Your Order
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          TESTIMONIALS — Editorial Quote Design
          ═══════════════════════════════════════════ */}
            <section className="relative py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian-950)] via-[var(--obsidian-900)]/30 to-[var(--obsidian-950)]" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                            What Guests Say
                        </span>
                        <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                            Guest Stories
                        </h2>
                        <div className="section-divider mx-auto mt-6 max-w-xs">
                            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--copper-500)]" />
                        </div>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="premium-card relative p-8 sm:p-10 flex flex-col"
                            >
                                {/* Decorative quote */}
                                <div className="absolute -top-3 left-6 font-[family-name:var(--font-display)] text-8xl leading-none text-[var(--copper-500)]/10">
                                    &ldquo;
                                </div>

                                <div className="relative">
                                    <div className="flex gap-0.5">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-[var(--copper-500)] text-[var(--copper-500)]"
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-5 font-[family-name:var(--font-display)] text-lg font-light italic leading-relaxed text-[var(--cream-200)]">
                                        {testimonial.text}
                                    </p>
                                    <div className="mt-auto pt-8 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-[var(--cream-200)]">
                                                {testimonial.name}
                                            </p>
                                            <p className="mt-0.5 text-xs text-[var(--cream-500)]">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                        <Badge variant="outline">{testimonial.location}</Badge>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          LOYALTY CTA — Join the Program
          ═══════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-32">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0a] via-[#14110d] to-[#0f0d0a]" />
                <div className="absolute inset-0 noise-bg" />
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--copper-500)]/[0.03] blur-[120px]" />

                {/* Decorative border */}
                <div className="absolute inset-x-6 inset-y-6 rounded-2xl border border-[var(--copper-500)]/8 sm:inset-x-16 sm:inset-y-10" />

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                            Rewards & Loyalty
                        </span>
                        <h2 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl lg:text-7xl">
                            Join Our
                            <br />
                            <span className="gradient-text">Inner Circle</span>
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--cream-400)]">
                            Earn points with every order. Climb from Bronze to Platinum and
                            unlock exclusive rewards, priority seating, and chef&apos;s table
                            access.
                        </p>

                        {/* Tier Preview */}
                        <div className="mx-auto mt-12 flex max-w-lg items-center justify-between gap-4">
                            {loyaltyTiers.map((tier, i) => (
                                <div key={tier.name} className="text-center">
                                    <div
                                        className="mx-auto h-10 w-10 rounded-full border-2 transition-transform duration-300 hover:scale-110"
                                        style={{ borderColor: tier.color, boxShadow: `0 0 20px ${tier.color}15` }}
                                    />
                                    <p className="mt-2 text-xs font-medium text-[var(--cream-300)]">
                                        {tier.name}
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-[var(--cream-500)]">
                                        {tier.perks}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/loyalty">
                                <Button variant="copper" size="lg" className="gap-2">
                                    <Award className="h-4.5 w-4.5" />
                                    Join Now — It&apos;s Free
                                </Button>
                            </Link>
                            <Link href="/gift-cards">
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Gift className="h-4 w-4" />
                                    Send a Gift Card
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
