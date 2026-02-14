'use client';

import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Music,
    Wine,
    Users,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

const events = [
    {
        title: 'Wine Tasting: Tuscan Treasures',
        date: 'Feb 22, 2026',
        time: '7:00 PM – 10:00 PM',
        location: 'Downtown — Wine Room',
        price: '$95/person',
        capacity: '20 spots left',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop',
        category: 'Wine',
        desc: 'Journey through Tuscany\'s finest vineyards with our sommelier. Six rare wines paired with artisanal cheese and charcuterie.',
    },
    {
        title: 'Live Jazz & Italian Supper Club',
        date: 'Every Friday',
        time: '8:00 PM – 11:00 PM',
        location: 'Harbor View — Rooftop',
        price: '$65/person',
        capacity: 'Limited seating',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
        category: 'Music',
        desc: 'Live jazz performances under the stars with a curated Italian supper menu and craft cocktails.',
    },
    {
        title: 'Pasta Making Masterclass',
        date: 'Mar 5, 2026',
        time: '2:00 PM – 5:00 PM',
        location: 'Westside — Kitchen',
        price: '$120/person',
        capacity: '8 spots left',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop',
        category: 'Class',
        desc: 'Learn to make fresh pasta from scratch with Chef Marco. Take home recipes, pasta tools, and the skills to impress.',
    },
    {
        title: 'Italian Brunch Festival',
        date: 'Mar 15, 2026',
        time: '10:00 AM – 3:00 PM',
        location: 'Westside — Garden',
        price: '$55/person',
        capacity: '40 spots left',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
        category: 'Dining',
        desc: 'A lavish Italian brunch spread featuring live cooking stations, mimosa bar, and acoustic performances in the garden.',
    },
    {
        title: 'Chef\'s Table: Multi-Course Journey',
        date: 'Monthly',
        time: '7:30 PM – 10:30 PM',
        location: 'Downtown — Chef\'s Table',
        price: '$200/person',
        capacity: 'By invitation',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
        category: 'Exclusive',
        desc: 'An intimate 8-course tasting journey crafted by Chef Marco, paired with rare wines and served tableside.',
    },
];

const categoryColors: Record<string, string> = {
    Wine: 'text-rose-400 bg-rose-500/5 border-rose-500/15',
    Music: 'text-blue-400 bg-blue-500/5 border-blue-500/15',
    Class: 'text-amber-400 bg-amber-500/5 border-amber-500/15',
    Dining: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/15',
    Exclusive: 'text-[var(--copper-400)] bg-[var(--copper-500)]/5 border-[var(--copper-500)]/15',
};

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pt-24 pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">What&apos;s On</span>
                    <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                        Upcoming Events
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-[var(--cream-400)]">
                        From wine tastings to chef's table experiences — elevate your dining.
                    </p>
                </motion.div>

                <div className="mt-16 space-y-6">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group premium-card grid overflow-hidden md:grid-cols-3"
                        >
                            <div className="relative h-56 overflow-hidden md:h-auto">
                                <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--obsidian-850)] hidden md:block" />
                            </div>
                            <div className="col-span-2 p-6 sm:p-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${categoryColors[event.category]}`}>
                                        {event.category}
                                    </span>
                                    <Badge variant="outline">{event.capacity}</Badge>
                                </div>
                                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream-100)]">
                                    {event.title}
                                </h3>
                                <p className="mt-2 text-sm text-[var(--cream-400)]">{event.desc}</p>
                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--cream-400)]">
                                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[var(--copper-500)]/50" />{event.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[var(--copper-500)]/50" />{event.time}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--copper-500)]/50" />{event.location}</span>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--copper-400)]">{event.price}</p>
                                    <Link href="/contact">
                                        <Button variant="copper" className="gap-2">
                                            Reserve Spot <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
