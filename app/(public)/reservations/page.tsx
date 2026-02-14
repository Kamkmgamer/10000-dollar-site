'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    Users,
    ChevronLeft,
    ChevronRight,
    Check,
    Sparkles,
    PartyPopper,
    MapPin,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

const occasions = [
    'Regular Dining', 'Birthday', 'Anniversary', 'Business Dinner',
    'Date Night', 'Family Gathering', 'Celebration', 'Other',
];

const locations = ['Downtown', 'Westside', 'Harbor View'];

export default function ReservationsPage() {
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState('Downtown');
    const [guests, setGuests] = useState(2);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [occasion, setOccasion] = useState('Regular Dining');
    const [confirmed, setConfirmed] = useState(false);

    const today = new Date();
    const daysInMonth: number[] = [];
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) daysInMonth.push(0);
    for (let i = 1; i <= totalDays; i++) daysInMonth.push(i);

    const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

    const isAvailable = (time: string) => {
        const unavailable = ['12:00 PM', '7:00 PM', '7:30 PM'];
        return !unavailable.includes(time);
    };

    if (confirmed) {
        return (
            <div className="min-h-screen bg-[var(--obsidian-950)] pb-32">
                <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="premium-card p-10 sm:p-14"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10"
                        >
                            <Check className="h-10 w-10 text-emerald-400" />
                        </motion.div>
                        <h2 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--cream-100)]">
                            Reservation Confirmed!
                        </h2>
                        <p className="mt-3 text-[var(--cream-400)]">
                            We&apos;ll send a confirmation to your email.
                        </p>
                        <div className="mt-8 space-y-3 text-left">
                            <div className="flex items-center gap-3 rounded-lg border border-[var(--obsidian-700)] bg-[var(--obsidian-800)] p-4 text-sm">
                                <MapPin className="h-4 w-4 text-[var(--copper-500)]" />
                                <span className="text-[var(--cream-200)]">{location} Location</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-[var(--obsidian-700)] bg-[var(--obsidian-800)] p-4 text-sm">
                                <Calendar className="h-4 w-4 text-[var(--copper-500)]" />
                                <span className="text-[var(--cream-200)]">{monthName.split(' ')[0]} {selectedDate}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-[var(--obsidian-700)] bg-[var(--obsidian-800)] p-4 text-sm">
                                <Clock className="h-4 w-4 text-[var(--copper-500)]" />
                                <span className="text-[var(--cream-200)]">{selectedTime}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-[var(--obsidian-700)] bg-[var(--obsidian-800)] p-4 text-sm">
                                <Users className="h-4 w-4 text-[var(--copper-500)]" />
                                <span className="text-[var(--cream-200)]">{guests} Guests</span>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Button variant="outline" onClick={() => { setConfirmed(false); setStep(1); }} className="flex-1">
                                New Reservation
                            </Button>
                            <Button variant="copper" className="flex-1 gap-1.5">
                                <PartyPopper className="h-4 w-4" /> View Details
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--obsidian-950)] pb-32">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--copper-500)]">
                        Reserve a Table
                    </span>
                    <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--cream-100)] sm:text-5xl">
                        Make a Reservation
                    </h1>
                    <p className="mt-3 text-[var(--cream-400)]">
                        Select your preferred location, date, and time
                    </p>
                </motion.div>

                {/* Step Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-10 flex items-center justify-center gap-3"
                >
                    {['Location', 'Date & Time', 'Details', 'Confirm'].map((s, i) => (
                        <div key={s} className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${step > i + 1
                                        ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)]'
                                        : step === i + 1
                                            ? 'border-2 border-[var(--copper-500)] text-[var(--copper-400)]'
                                            : 'border border-[var(--obsidian-600)] text-[var(--cream-500)]'
                                        }`}
                                >
                                    {step > i + 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
                                </div>
                                <span className={`hidden text-xs sm:block ${step >= i + 1 ? 'text-[var(--cream-200)]' : 'text-[var(--cream-500)]'}`}>
                                    {s}
                                </span>
                            </div>
                            {i < 3 && <div className="h-px w-6 bg-[var(--obsidian-700)]" />}
                        </div>
                    ))}
                </motion.div>

                {/* Step Content */}
                <div className="mt-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="premium-card p-8">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Select Location
                                    </h3>
                                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                        {locations.map((loc) => (
                                            <button
                                                key={loc}
                                                onClick={() => setLocation(loc)}
                                                className={`rounded-xl border p-5 text-center transition-all ${location === loc
                                                    ? 'border-[var(--copper-500)]/40 bg-[var(--copper-500)]/5'
                                                    : 'border-[var(--obsidian-600)] hover:border-[var(--copper-500)]/20'
                                                    }`}
                                            >
                                                <MapPin className={`mx-auto h-5 w-5 ${location === loc ? 'text-[var(--copper-400)]' : 'text-[var(--cream-500)]'}`} />
                                                <p className="mt-2 font-medium text-[var(--cream-100)]">{loc}</p>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                            Number of Guests
                                        </h3>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                                <button
                                                    key={n}
                                                    onClick={() => setGuests(n)}
                                                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium transition-all ${guests === n
                                                        ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)]'
                                                        : 'border border-[var(--obsidian-600)] text-[var(--cream-400)] hover:border-[var(--copper-500)]/20'
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setGuests(10)}
                                                className={`flex h-12 items-center justify-center rounded-full px-4 text-sm font-medium transition-all ${guests >= 9
                                                    ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)]'
                                                    : 'border border-[var(--obsidian-600)] text-[var(--cream-400)] hover:border-[var(--copper-500)]/20'
                                                    }`}
                                            >
                                                9+
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <Button variant="copper" onClick={() => setStep(2)} className="gap-2">
                                            Continue <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="premium-card p-8 space-y-8">
                                    {/* Calendar */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                                Select Date
                                            </h3>
                                            <span className="text-sm text-[var(--cream-200)]">{monthName}</span>
                                        </div>
                                        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                                                <div key={d} className="py-2 text-[10px] uppercase tracking-wider text-[var(--cream-500)]">
                                                    {d}
                                                </div>
                                            ))}
                                            {daysInMonth.map((day, i) => (
                                                <button
                                                    key={i}
                                                    disabled={day === 0 || day < today.getDate()}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`rounded-lg py-2.5 text-sm transition-all ${day === 0
                                                        ? ''
                                                        : day < today.getDate()
                                                            ? 'text-[var(--obsidian-500)] cursor-not-allowed'
                                                            : selectedDate === day
                                                                ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)] font-bold'
                                                                : day === today.getDate()
                                                                    ? 'border border-[var(--copper-500)]/30 text-[var(--copper-400)]'
                                                                    : 'text-[var(--cream-300)] hover:bg-[var(--obsidian-700)]'
                                                        }`}
                                                >
                                                    {day || ''}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                            <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                                Select Time
                                            </h3>
                                            <div className="mt-4 grid grid-cols-4 gap-2">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        disabled={!isAvailable(time)}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`rounded-lg py-2.5 text-sm transition-all ${!isAvailable(time)
                                                            ? 'text-[var(--obsidian-500)] line-through cursor-not-allowed'
                                                            : selectedTime === time
                                                                ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)] font-bold'
                                                                : 'border border-[var(--obsidian-600)] text-[var(--cream-300)] hover:border-[var(--copper-500)]/20'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                    <div className="flex justify-between">
                                        <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                                        <Button variant="copper" onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="gap-2">
                                            Continue <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="premium-card p-8 space-y-6">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Your Details
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Input label="First Name" placeholder="John" id="resFirstName" />
                                        <Input label="Last Name" placeholder="Doe" id="resLastName" />
                                    </div>
                                    <Input label="Email" placeholder="john@example.com" type="email" id="resEmail" />
                                    <Input label="Phone" placeholder="(212) 555-0000" type="tel" id="resPhone" />
                                    <div>
                                        <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--cream-400)]">Occasion</label>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {occasions.map((occ) => (
                                                <button
                                                    key={occ}
                                                    onClick={() => setOccasion(occ)}
                                                    className={`rounded-full px-4 py-2 text-xs transition-all ${occasion === occ
                                                        ? 'bg-[var(--copper-500)] text-[var(--obsidian-950)] font-medium'
                                                        : 'border border-[var(--obsidian-600)] text-[var(--cream-400)] hover:border-[var(--copper-500)]/20'
                                                        }`}
                                                >
                                                    {occ}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Input label="Special Requests" placeholder="Dietary requirements, seating preferences..." id="specialReq" />
                                    <div className="flex justify-between">
                                        <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                                        <Button variant="copper" onClick={() => setStep(4)} className="gap-2">
                                            Review <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="premium-card p-8 space-y-6">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--copper-400)]">
                                        Review Your Reservation
                                    </h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {[
                                            { icon: MapPin, label: 'Location', value: location },
                                            { icon: Calendar, label: 'Date', value: `${monthName.split(' ')[0]} ${selectedDate}` },
                                            { icon: Clock, label: 'Time', value: selectedTime ?? '' },
                                            { icon: Users, label: 'Guests', value: `${guests} people` },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-[var(--obsidian-700)] bg-[var(--obsidian-800)] p-4">
                                                <item.icon className="h-5 w-5 text-[var(--copper-500)]" />
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-[var(--cream-500)]">{item.label}</p>
                                                    <p className="text-sm font-medium text-[var(--cream-100)]">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {occasion !== 'Regular Dining' && (
                                        <Badge variant="copper">{occasion}</Badge>
                                    )}
                                    <div className="flex justify-between">
                                        <Button variant="ghost" onClick={() => setStep(3)}>← Back</Button>
                                        <Button variant="copper" size="lg" onClick={() => setConfirmed(true)} className="gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Confirm Reservation
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
