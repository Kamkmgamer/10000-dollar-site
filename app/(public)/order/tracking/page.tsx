'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    ChefHat,
    Clock,
    MapPin,
    Package,
    Truck,
    Phone,
    Star,
    ShoppingBag,
    Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

const steps = [
    { id: 1, label: 'Order Placed', icon: ShoppingBag, time: '6:32 PM', description: 'Your order has been confirmed' },
    { id: 2, label: 'Preparing', icon: ChefHat, time: '6:35 PM', description: 'Chef Marco is preparing your meal' },
    { id: 3, label: 'Quality Check', icon: Check, time: '6:52 PM', description: 'Final quality inspection complete' },
    { id: 4, label: 'Out for Delivery', icon: Truck, time: '6:55 PM', description: 'Driver Alex is on the way' },
    { id: 5, label: 'Delivered', icon: Package, time: '~7:10 PM', description: 'Estimated arrival' },
];

const orderItems = [
    { name: 'Ossobuco alla Milanese', qty: 1, price: 48 },
    { name: 'Tagliatelle al Tartufo', qty: 2, price: 38 },
    { name: 'Tiramisu Classico', qty: 1, price: 16 },
    { name: 'Negroni Classico', qty: 2, price: 18 },
];

export default function OrderTrackingPage() {
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const timers = [
            setTimeout(() => setCurrentStep(2), 2000),
            setTimeout(() => setCurrentStep(3), 5000),
            setTimeout(() => setCurrentStep(4), 8000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pb-32">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <Badge variant="success" className="gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        Order Confirmed
                    </Badge>
                    <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--cream-100)] sm:text-5xl">
                        Tracking Your Order
                    </h1>
                    <p className="mt-3 text-[var(--cream-400)]">
                        Order #BEL-2847 · Estimated delivery by{' '}
                        <span className="font-medium text-[var(--copper-400)]">7:10 PM</span>
                    </p>
                </motion.div>

                {/* Progress Stepper */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-14"
                >
                    <div className="premium-card p-8 sm:p-10">
                        <div className="relative">
                            {steps.map((step, index) => (
                                <div key={step.id} className="relative flex gap-6 pb-10 last:pb-0">
                                    {/* Vertical Line */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-5 top-12 bottom-0 w-px">
                                            <div
                                                className="h-full w-full transition-all duration-1000"
                                                style={{
                                                    background:
                                                        currentStep > step.id
                                                            ? 'var(--copper-500)'
                                                            : 'var(--obsidian-700)',
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className="relative z-10 flex-shrink-0">
                                        <motion.div
                                            animate={{
                                                scale: currentStep === step.id ? [1, 1.15, 1] : 1,
                                                transition: { repeat: currentStep === step.id ? Infinity : 0, duration: 2 },
                                            }}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${currentStep > step.id
                                                ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)]'
                                                : currentStep === step.id
                                                    ? 'border-2 border-[var(--copper-500)] bg-[var(--copper-500)]/10 text-[var(--copper-400)] shadow-[0_0_20px_rgba(199,125,74,0.2)]'
                                                    : 'border border-[var(--obsidian-600)] text-[var(--cream-500)]'
                                                }`}
                                        >
                                            {currentStep > step.id ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                <step.icon className="h-5 w-5" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-1.5">
                                        <div className="flex items-center justify-between">
                                            <h3
                                                className={`font-medium ${currentStep >= step.id
                                                    ? 'text-[var(--cream-100)]'
                                                    : 'text-[var(--cream-500)]'
                                                    }`}
                                            >
                                                {step.label}
                                            </h3>
                                            <span className="text-xs text-[var(--cream-500)]">{step.time}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-[var(--cream-400)]">{step.description}</p>
                                        {currentStep === step.id && step.id === 4 && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-4 rounded-xl border border-[var(--copper-500)]/10 bg-[var(--copper-500)]/[0.03] p-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--copper-500)]/10">
                                                        <Truck className="h-5 w-5 text-[var(--copper-400)]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-[var(--cream-100)]">
                                                            Driver Alex
                                                        </p>
                                                        <p className="text-xs text-[var(--cream-400)]">
                                                            White Toyota Camry · 2 min away
                                                        </p>
                                                    </div>
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--copper-500)]/20 text-[var(--copper-400)]">
                                                        <Phone className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Order Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 grid gap-6 md:grid-cols-2"
                >
                    {/* Items */}
                    <div className="premium-card p-6">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                            Order Items
                        </h3>
                        <div className="mt-4 space-y-3">
                            {orderItems.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--cream-300)]">
                                        {item.qty}× {item.name}
                                    </span>
                                    <span className="text-[var(--cream-400)]">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-[var(--obsidian-700)] pt-3 flex justify-between font-medium">
                                <span className="text-[var(--cream-100)]">Total</span>
                                <span className="text-[var(--copper-400)]">$176.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="premium-card p-6 space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                            Delivery Details
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 text-[var(--copper-500)]/40" />
                                <div>
                                    <p className="text-[var(--cream-200)]">123 West 44th Street, Apt 22B</p>
                                    <p className="text-[var(--cream-500)]">New York, NY 10036</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Clock className="h-4 w-4 text-[var(--copper-500)]/40" />
                                <p className="text-[var(--cream-300)]">Estimated: 7:10 PM</p>
                            </div>
                        </div>
                        <div className="pt-2 flex gap-3">
                            <Link href="/menu" className="flex-1">
                                <Button variant="outline" size="sm" className="w-full gap-1.5">
                                    <ShoppingBag className="h-3.5 w-3.5" />
                                    Reorder
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="gap-1.5">
                                <Star className="h-3.5 w-3.5" />
                                Rate
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
