'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    CreditCard,
    MapPin,
    Clock,
    Truck,
    Store,
    Utensils,
    Plus,
    Minus,
    Trash2,
    Shield,
    Gift,
    Tag,
    ArrowRight,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

const demoCart = [
    { name: 'Ossobuco alla Milanese', price: 48, quantity: 1 },
    { name: 'Tagliatelle al Tartufo', price: 38, quantity: 2 },
    { name: 'Tiramisu Classico', price: 16, quantity: 1 },
    { name: 'Negroni Classico', price: 18, quantity: 2 },
];

const orderTypes = [
    { id: 'delivery', label: 'Delivery', icon: Truck, time: '35-45 min', fee: '$4.99' },
    { id: 'pickup', label: 'Pickup', icon: Store, time: '20-25 min', fee: 'Free' },
    { id: 'dine-in', label: 'Dine-In', icon: Utensils, time: '15-20 min', fee: 'Free' },
];

export default function OrderPage() {
    const [cart, setCart] = useState(demoCart);
    const [orderType, setOrderType] = useState('delivery');
    const [step, setStep] = useState(1);
    const [promoCode, setPromoCode] = useState('');
    const [tipPercent, setTipPercent] = useState(18);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = orderType === 'delivery' ? 4.99 : 0;
    const tax = subtotal * 0.08875;
    const tip = subtotal * (tipPercent / 100);
    const total = subtotal + deliveryFee + tax + tip;

    const updateQty = (name: string, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pb-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                        Checkout
                    </span>
                    <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--cream-100)] sm:text-5xl">
                        Your Order
                    </h1>
                </motion.div>

                {/* Step Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 flex items-center gap-3"
                >
                    {['Cart', 'Details', 'Payment'].map((s, i) => (
                        <button key={s} onClick={() => setStep(i + 1)} className="flex items-center gap-2">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${step >= i + 1
                                    ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)]'
                                    : 'border border-[var(--obsidian-600)] text-[var(--cream-500)]'
                                    }`}
                            >
                                {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                            </div>
                            <span className={`text-sm ${step >= i + 1 ? 'text-[var(--cream-100)]' : 'text-[var(--cream-500)]'}`}>
                                {s}
                            </span>
                            {i < 2 && <div className="mx-2 h-px w-8 bg-[var(--obsidian-600)]" />}
                        </button>
                    ))}
                </motion.div>

                <div className="mt-10 grid gap-8 lg:grid-cols-5">
                    {/* Left: Cart / Form */}
                    <div className="lg:col-span-3 space-y-6">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                {/* Order Type */}
                                <div className="premium-card p-6">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Order Type
                                    </h3>
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {orderTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setOrderType(type.id)}
                                                className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${orderType === type.id
                                                    ? 'border-[var(--copper-500)]/40 bg-[var(--copper-500)]/5'
                                                    : 'border-[var(--obsidian-600)] hover:border-[var(--copper-500)]/20'
                                                    }`}
                                            >
                                                <type.icon
                                                    className={`h-5 w-5 ${orderType === type.id ? 'text-[var(--copper-400)]' : 'text-[var(--cream-400)]'
                                                        }`}
                                                />
                                                <span className="text-sm font-medium text-[var(--cream-100)]">{type.label}</span>
                                                <div className="flex items-center gap-2 text-[10px] text-[var(--cream-500)]">
                                                    <Clock className="h-3 w-3" /> {type.time}
                                                </div>
                                                <span className="text-[10px] text-[var(--copper-400)]">{type.fee}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Cart Items */}
                                <div className="premium-card divide-y divide-[var(--obsidian-700)]">
                                    <div className="p-6">
                                        <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                            Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                                        </h3>
                                    </div>
                                    {cart.map((item) => (
                                        <div key={item.name} className="flex items-center gap-4 p-6">
                                            <div className="flex-1">
                                                <p className="font-medium text-[var(--cream-100)]">{item.name}</p>
                                                <p className="mt-0.5 text-sm text-[var(--cream-500)]">${item.price} each</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQty(item.name, -1)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--obsidian-600)] text-[var(--cream-400)] hover:border-[var(--copper-500)]/30"
                                                >
                                                    {item.quantity === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                                                </button>
                                                <span className="w-6 text-center text-[var(--cream-100)]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQty(item.name, 1)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--copper-500)]/10 text-[var(--copper-400)] hover:bg-[var(--copper-500)]/20"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <p className="w-20 text-right font-medium text-[var(--cream-100)]">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/menu">
                                    <Button variant="ghost" className="gap-2 text-[var(--cream-400)]">
                                        <Plus className="h-4 w-4" /> Add More Items
                                    </Button>
                                </Link>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <div className="premium-card p-6 space-y-5">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        {orderType === 'delivery' ? 'Delivery Details' : 'Your Details'}
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Input label="First Name" placeholder="John" id="firstName" />
                                        <Input label="Last Name" placeholder="Doe" id="lastName" />
                                    </div>
                                    <Input label="Email" placeholder="john@example.com" type="email" id="email" />
                                    <Input label="Phone" placeholder="(212) 555-0000" type="tel" id="phone" />
                                    {orderType === 'delivery' && (
                                        <>
                                            <Input label="Delivery Address" placeholder="123 Main Street, Apt 4B" id="address" />
                                            <div className="grid gap-4 sm:grid-cols-3">
                                                <Input label="City" placeholder="New York" id="city" />
                                                <Input label="State" placeholder="NY" id="state" />
                                                <Input label="ZIP" placeholder="10001" id="zip" />
                                            </div>
                                            <Input label="Delivery Instructions" placeholder="Ring doorbell twice, leave at door..." id="instructions" />
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <div className="premium-card p-6 space-y-5">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Payment Method
                                    </h3>
                                    <div className="rounded-xl border border-[var(--copper-500)]/20 bg-[var(--copper-500)]/[0.03] p-5 space-y-4">
                                        <Input label="Card Number" placeholder="4242 4242 4242 4242" id="cardNumber" />
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <Input label="Expiry" placeholder="MM/YY" id="expiry" />
                                            <Input label="CVC" placeholder="123" id="cvc" />
                                            <Input label="ZIP" placeholder="10001" id="billingZip" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[var(--cream-500)]">
                                        <Shield className="h-4 w-4 text-emerald-400" />
                                        Secured with 256-bit SSL encryption. We never store your card details.
                                    </div>
                                </div>

                                {/* Tip */}
                                <div className="premium-card p-6">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Add a Tip
                                    </h3>
                                    <div className="mt-4 grid grid-cols-4 gap-2">
                                        {[15, 18, 20, 25].map((pct) => (
                                            <button
                                                key={pct}
                                                onClick={() => setTipPercent(pct)}
                                                className={`rounded-lg border p-3 text-center transition-all ${tipPercent === pct
                                                    ? 'border-[var(--copper-500)]/40 bg-[var(--copper-500)]/10 text-[var(--copper-400)]'
                                                    : 'border-[var(--obsidian-600)] text-[var(--cream-400)]'
                                                    }`}
                                            >
                                                <p className="text-lg font-bold">{pct}%</p>
                                                <p className="text-[10px] text-[var(--cream-500)]">${(subtotal * pct / 100).toFixed(2)}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28">
                            <div className="premium-card p-6 space-y-5">
                                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream-100)]">
                                    Order Summary
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-[var(--cream-400)]">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {orderType === 'delivery' && (
                                        <div className="flex justify-between text-[var(--cream-400)]">
                                            <span>Delivery Fee</span>
                                            <span>${deliveryFee.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[var(--cream-400)]">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    {step === 3 && (
                                        <div className="flex justify-between text-[var(--cream-400)]">
                                            <span>Tip ({tipPercent}%)</span>
                                            <span>${tip.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-[var(--obsidian-700)] pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-[var(--cream-100)]">Total</span>
                                            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--copper-400)]">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="flex gap-2">
                                    <input
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 rounded-lg border border-[var(--obsidian-600)] bg-[var(--obsidian-800)] px-3 py-2 text-sm text-[var(--cream-100)] placeholder:text-[var(--cream-500)]/50 focus:outline-none focus:border-[var(--copper-500)]/30"
                                    />
                                    <Button variant="outline" size="sm">
                                        <Tag className="h-3.5 w-3.5" />
                                    </Button>
                                </div>

                                {/* Loyalty Points */}
                                <div className="flex items-center gap-3 rounded-xl border border-[var(--copper-500)]/10 bg-[var(--copper-500)]/[0.03] p-4">
                                    <Gift className="h-5 w-5 text-[var(--copper-400)]" />
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-[var(--cream-200)]">
                                            Earn {Math.floor(subtotal)} loyalty points
                                        </p>
                                        <p className="text-[10px] text-[var(--cream-500)]">
                                            You&apos;re 230 pts from Gold tier!
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                {step < 3 ? (
                                    <Button variant="copper" size="lg" className="w-full gap-2" onClick={() => setStep(step + 1)}>
                                        Continue
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Link href="/order/tracking">
                                        <Button variant="copper" size="lg" className="w-full gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Place Order — ${total.toFixed(2)}
                                        </Button>
                                    </Link>
                                )}

                                {step > 1 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="w-full text-center text-sm text-[var(--cream-400)] hover:text-[var(--copper-400)]"
                                    >
                                        ← Back to {step === 2 ? 'Cart' : 'Details'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
