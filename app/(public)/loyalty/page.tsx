'use client';

import { motion } from 'framer-motion';
import {
    Award,
    Star,
    Gift,
    Crown,
    Zap,
    ShoppingBag,
    Percent,
    ChefHat,
    PartyPopper,
    TrendingUp,
    ArrowRight,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

const tiers = [
    {
        name: 'Bronze',
        threshold: '0 pts',
        color: '#CD7F32',
        perks: ['5% back on all orders', 'Birthday dessert', 'Early access to seasonal menus'],
        icon: Star,
    },
    {
        name: 'Silver',
        threshold: '500 pts',
        color: '#C0C0C0',
        perks: ['10% back on all orders', 'Free dessert monthly', 'Priority reservations', 'Exclusive offers'],
        icon: Award,
    },
    {
        name: 'Gold',
        threshold: '1,500 pts',
        color: '#D4A54A',
        perks: ['15% back on all orders', 'Free appetizer monthly', 'Priority seating', 'VIP events access', 'Free delivery'],
        icon: Crown,
    },
    {
        name: 'Platinum',
        threshold: '5,000 pts',
        color: '#E5E4E2',
        perks: ['20% back on all orders', "Chef's table access", 'Complimentary wine pairing', 'Personal concierge', 'Annual private dinner'],
        icon: Zap,
    },
];

const demoUser = {
    name: 'Alex',
    tier: 'Silver',
    points: 847,
    nextTier: 'Gold',
    pointsNeeded: 653,
    totalEarned: 2340,
    lastActivity: 'Earned 48 pts — Ossobuco alla Milanese',
};

const howItWorks = [
    { icon: ShoppingBag, title: 'Order & Earn', desc: 'Earn 1 point per dollar spent on every order, dine-in or delivery.' },
    { icon: TrendingUp, title: 'Climb Tiers', desc: 'Accumulate points to unlock higher tiers with better rewards.' },
    { icon: Gift, title: 'Redeem Rewards', desc: 'Use points for free dishes, discounts, exclusive experiences, and more.' },
];

export default function LoyaltyPage() {
    const progress = (demoUser.points / (demoUser.points + demoUser.pointsNeeded)) * 100;

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pt-24 pb-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <Badge variant="copper" className="gap-1.5"><Award className="h-3 w-3" /> Rewards Program</Badge>
                    <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl lg:text-7xl">
                        Bella Italia
                        <br />
                        <span className="gradient-text">Inner Circle</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--cream-400)]">
                        Earn points with every order. Climb tiers. Unlock exclusive rewards.
                    </p>
                </motion.div>

                {/* User Dashboard Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto mt-14 max-w-2xl"
                >
                    <div className="premium-card-glow">
                        <div className="rounded-[calc(1rem-1px)] bg-[var(--obsidian-850)] p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[var(--cream-400)]">Welcome back, {demoUser.name}</p>
                                    <div className="mt-1 flex items-center gap-3">
                                        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                                            {demoUser.points.toLocaleString()} pts
                                        </h3>
                                        <Badge variant="copper">{demoUser.tier}</Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-[var(--cream-400)]">Lifetime</p>
                                    <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--copper-400)]">
                                        {demoUser.totalEarned.toLocaleString()} pts
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-8">
                                <div className="flex justify-between text-xs text-[var(--cream-500)]">
                                    <span>{demoUser.tier}</span>
                                    <span>{demoUser.nextTier} ({demoUser.pointsNeeded} pts to go)</span>
                                </div>
                                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--obsidian-700)]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full rounded-full bg-gradient-to-r from-[var(--copper-600)] to-[var(--copper-400)]"
                                    />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-[var(--cream-500)]">
                                Last activity: {demoUser.lastActivity}
                            </p>

                            <div className="mt-6 flex gap-3">
                                <Link href="/order" className="flex-1">
                                    <Button variant="copper" className="w-full gap-2">
                                        <ShoppingBag className="h-4 w-4" /> Earn Points
                                    </Button>
                                </Link>
                                <Button variant="outline" className="flex-1 gap-2">
                                    <Gift className="h-4 w-4" /> Redeem
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* How It Works */}
                <section className="mt-24">
                    <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                        How It Works
                    </h2>
                    <div className="mt-12 grid gap-6 sm:grid-cols-3">
                        {howItWorks.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="premium-card p-6 text-center flex flex-col items-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--copper-500)]/10 bg-[var(--copper-500)]/5">
                                    <item.icon className="h-6 w-6 text-[var(--copper-500)]" />
                                </div>
                                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream-100)]">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm text-[var(--cream-400)]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tiers */}
                <section className="mt-24">
                    <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                        Loyalty Tiers
                    </h2>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {tiers.map((tier, i) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="premium-card overflow-hidden flex flex-col"
                            >
                                <div className="p-1" style={{ background: `linear-gradient(135deg, ${tier.color}30, transparent)` }}>
                                    <div className="rounded-[calc(0.75rem-4px)] bg-[var(--obsidian-850)] p-6 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}>
                                                <tier.icon className="h-5 w-5" style={{ color: tier.color }} />
                                            </div>
                                            <span className="text-xs text-[var(--cream-500)]">{tier.threshold}</span>
                                        </div>
                                        <h3 className="mt-4 text-xl font-bold" style={{ color: tier.color }}>
                                            {tier.name}
                                        </h3>
                                        <ul className="mt-4 space-y-2">
                                            {tier.perks.map((perk) => (
                                                <li key={perk} className="flex items-start gap-2 text-sm text-[var(--cream-400)]">
                                                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: tier.color }} />
                                                    {perk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <Link href="/order">
                        <Button variant="copper" size="lg" className="gap-2">
                            <PartyPopper className="h-4.5 w-4.5" />
                            Start Earning Today
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
