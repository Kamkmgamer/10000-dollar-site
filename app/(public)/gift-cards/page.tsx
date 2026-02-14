'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Gift,
    Mail,
    CreditCard,
    Heart,
    Check,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

const amounts = [25, 50, 75, 100, 150, 200];

const designs = [
    { id: 'classic', name: 'Classic Gold', gradient: 'from-[var(--copper-600)] to-[var(--copper-400)]' },
    { id: 'modern', name: 'Obsidian Night', gradient: 'from-[var(--obsidian-700)] to-[var(--obsidian-900)]' },
    { id: 'festive', name: 'Celebration', gradient: 'from-rose-600 to-amber-500' },
    { id: 'minimal', name: 'Minimal White', gradient: 'from-amber-100 to-cream-200' },
];

export default function GiftCardsPage() {
    const [amount, setAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');
    const [design, setDesign] = useState('classic');
    const [sent, setSent] = useState(false);

    if (sent) {
        return (
            <div className="min-h-screen bg-[var(--obsidian-950)] pt-24 pb-32">
                <div className="mx-auto max-w-lg px-4 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="premium-card p-12">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
                            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10"
                        >
                            <Check className="h-10 w-10 text-emerald-400" />
                        </motion.div>
                        <h2 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                            Gift Card Sent!
                        </h2>
                        <p className="mt-3 text-[var(--cream-400)]">
                            A ${amount} gift card has been sent successfully.
                        </p>
                        <Button variant="outline" onClick={() => setSent(false)} className="mt-8">
                            Send Another
                        </Button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pt-24 pb-32">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <Badge variant="copper" className="gap-1.5"><Gift className="h-3 w-3" /> Give the Gift of Flavor</Badge>
                    <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                        Gift Cards
                    </h1>
                    <p className="mt-3 text-[var(--cream-400)]">Digital gift cards, delivered instantly by email</p>
                </motion.div>

                <div className="mt-14 grid gap-8 lg:grid-cols-2">
                    {/* Card Preview */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${designs.find(d => d.id === design)?.gradient} p-8 shadow-2xl`}>
                            <div className="absolute inset-0 noise-bg opacity-30" />
                            <div className="relative flex h-full flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white/90">Bella</span>
                                        <span className="text-xl font-light italic text-white/70">Italia</span>
                                    </div>
                                    <Gift className="h-6 w-6 text-white/50" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/60">Gift Card Value</p>
                                    <p className="text-5xl font-bold text-white">${amount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Design Picker */}
                        <div className="mt-6">
                            <p className="text-xs font-medium uppercase tracking-wider text-[var(--copper-400)]">Card Design</p>
                            <div className="mt-3 flex gap-3">
                                {designs.map((d) => (
                                    <button
                                        key={d.id}
                                        onClick={() => setDesign(d.id)}
                                        className={`h-10 w-10 rounded-full bg-gradient-to-br ${d.gradient} ring-2 ring-offset-2 ring-offset-[var(--obsidian-950)] transition-all ${design === d.id ? 'ring-[var(--copper-500)]' : 'ring-transparent hover:ring-[var(--obsidian-600)]'
                                            }`}
                                        title={d.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="premium-card p-6 space-y-6">
                            {/* Amount */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-[var(--copper-400)]">Amount</p>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {amounts.map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => { setAmount(a); setCustomAmount(''); }}
                                            className={`rounded-lg border py-3 text-center font-medium transition-all ${amount === a && !customAmount
                                                    ? 'border-[var(--copper-500)]/40 bg-[var(--copper-500)]/10 text-[var(--copper-400)]'
                                                    : 'border-[var(--obsidian-600)] text-[var(--cream-400)] hover:border-[var(--copper-500)]/20'
                                                }`}
                                        >
                                            ${a}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Input
                                        label="Custom Amount"
                                        placeholder="Enter amount..."
                                        type="number"
                                        value={customAmount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setCustomAmount(e.target.value);
                                            if (e.target.value) setAmount(parseInt(e.target.value));
                                        }}
                                        id="customAmount"
                                    />
                                </div>
                            </div>

                            {/* Recipient */}
                            <Input label="Recipient Email" placeholder="friend@example.com" type="email" id="recipientEmail" />
                            <Input label="Recipient Name" placeholder="Jane Doe" id="recipientName" />
                            <Input label="Your Name" placeholder="John Doe" id="senderName" />
                            <div>
                                <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--cream-400)]">
                                    Personal Message
                                </label>
                                <textarea
                                    className="mt-1.5 w-full rounded-lg border border-[var(--obsidian-600)] bg-[var(--obsidian-800)] p-4 text-sm text-[var(--cream-100)] placeholder:text-[var(--cream-500)]/50 focus:border-[var(--copper-500)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--copper-500)]/20 h-24 resize-none"
                                    placeholder="Enjoy a wonderful meal at Bella Italia!"
                                />
                            </div>
                        </div>

                        <Button variant="copper" size="lg" className="w-full gap-2" onClick={() => setSent(true)}>
                            <CreditCard className="h-4 w-4" />
                            Purchase Gift Card — ${amount}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
