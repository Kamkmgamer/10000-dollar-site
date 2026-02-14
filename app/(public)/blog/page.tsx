'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const posts = [
    {
        title: 'The Art of Handmade Pasta: A Disappearing Craft',
        excerpt: 'In an age of mass production, our kitchen preserves the centuries-old tradition of hand-rolling every single sheet of pasta. Here\'s why it matters.',
        author: 'Chef Marco Bellini',
        date: 'Feb 10, 2026',
        readTime: '6 min read',
        category: 'Behind the Scenes',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
        slug: 'art-of-handmade-pasta',
        featured: true,
    },
    {
        title: 'Seasonal Menu Preview: Spring 2026',
        excerpt: 'As the first asparagus shoots emerge and fresh peas return to the market, we unveil our most vibrant seasonal menu yet.',
        author: 'Sofia Marchetti',
        date: 'Feb 5, 2026',
        readTime: '4 min read',
        category: 'Seasonal',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
        slug: 'spring-2026-menu',
        featured: false,
    },
    {
        title: 'Why We Source Directly from Italian Artisans',
        excerpt: 'From DOP olive oil in Puglia to aged balsamic in Modena — every ingredient tells a story. Meet the families behind our pantry.',
        author: 'Marco Bellini',
        date: 'Jan 28, 2026',
        readTime: '8 min read',
        category: 'Origins',
        image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&auto=format&fit=crop',
        slug: 'sourcing-italian-artisans',
        featured: false,
    },
    {
        title: 'Inside Our Zero-Waste Kitchen Initiative',
        excerpt: 'How we reduced food waste by 94% and turned our sustainability goals into daily kitchen practice across all three locations.',
        author: 'Alex Torres',
        date: 'Jan 15, 2026',
        readTime: '5 min read',
        category: 'Sustainability',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop',
        slug: 'zero-waste-kitchen',
        featured: false,
    },
    {
        title: 'The Perfect Negroni: Our House Recipe Revealed',
        excerpt: 'Our head bartender shares the Bella Italia twist on the classic Negroni — plus tips for crafting the perfect aperitivo at home.',
        author: 'Alessandro Vitale',
        date: 'Jan 8, 2026',
        readTime: '3 min read',
        category: 'Recipes',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop',
        slug: 'perfect-negroni',
        featured: false,
    },
];

export default function BlogPage() {
    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pt-24 pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">Stories & Insights</span>
                    <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--cream-100)] sm:text-6xl">
                        The Bella Blog
                    </h1>
                </motion.div>

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-12"
                >
                    <div className="group premium-card grid overflow-hidden lg:grid-cols-2">
                        <div className="relative h-64 overflow-hidden lg:h-auto">
                            <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--obsidian-850)] hidden lg:block" />
                        </div>
                        <div className="flex flex-col justify-center p-8 lg:p-12">
                            <Badge variant="copper">{featured.category}</Badge>
                            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)] lg:text-4xl">
                                {featured.title}
                            </h2>
                            <p className="mt-4 leading-relaxed text-[var(--cream-400)]">{featured.excerpt}</p>
                            <div className="mt-6 flex items-center gap-4 text-sm text-[var(--cream-500)]">
                                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                                <span>{featured.date}</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                            </div>
                            <div className="mt-6">
                                <Button variant="outline" className="gap-2">Read Article <ArrowRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rest */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {rest.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group premium-card overflow-hidden flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-900)]/80 to-transparent" />
                                <Badge variant="outline" className="absolute top-3 left-3">{post.category}</Badge>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream-100)] line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="mt-2 text-xs text-[var(--cream-400)] line-clamp-2">{post.excerpt}</p>
                                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[var(--cream-500)]">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
