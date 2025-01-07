// @ts-nocheck
"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import Image from 'next/image';
import { useState, useRef, memo, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

import {
    Star,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Quote,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

// Memoized components for better performance
const StarRating = memo(({ rating }: { rating: number }) => (
    <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-[#FF652F]" fill="currentColor" />
        ))}
    </div>
));
StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial }: { testimonial: typeof testimonialData[0] }) => (
    <Card className="group h-full bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 backdrop-blur-sm border-none shadow-lg hover:shadow-xl">
        <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
                <Quote className="w-10 h-10 text-[#fcba28] mb-6 opacity-80" />
                <StarRating rating={testimonial.rating} />
                <blockquote className="my-6 text-lg italic text-foreground/90 leading-relaxed">
                    &quot;{testimonial.review}&quot;
                </blockquote>
                <div className="flex items-center mt-auto pt-6 border-t border-foreground/10">
                    <div className="relative w-12 h-12 ring-2 ring-[#fcba28]/20 rounded-full">
                        <Image
                            fill
                            alt={testimonial.name}
                            src={testimonial.image}
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <p className="font-semibold text-foreground/90">{testimonial.name}</p>
                        <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
));
TestimonialCard.displayName = 'TestimonialCard';

// Optimized testimonial data
const testimonialData = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer at Google",
        review: "InterviewMaster.ai transformed my interview preparation. The AI-powered mock interviews and real-time feedback helped me land my dream job at Google.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Michael Chen",
        role: "Senior Developer at Microsoft",
        review: "The technical interview preparation on InterviewMaster.ai is outstanding. The platform's coding challenges and system design scenarios are incredibly realistic.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Emma Rodriguez",
        role: "Product Manager at Amazon",
        review: "From behavioral questions to case studies, InterviewMaster.ai covered everything I needed. The personalized feedback was instrumental in my interview success.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "David Patel",
        role: "Full Stack Developer at Meta",
        review: "The mock interviews and instant AI feedback helped me identify and improve my weak areas. I felt much more confident during my actual interviews.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Lisa Wang",
        role: "Data Scientist at Netflix",
        review: "InterviewMaster.ai's machine learning focused interview prep was exactly what I needed. The platform's comprehensive coverage helped me ace my technical rounds.",
        rating: 5,
        image: "/avatar.png"
    }
];

const VideoTestimonial = memo(({ isPlaying, isMuted, onPlayClick, onMuteClick }: {
    isPlaying: boolean;
    isMuted: boolean;
    onPlayClick: () => void;
    onMuteClick: () => void;
}) => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5">
        <video className="w-full h-full object-cover">
            <source src="/coming-soon-clip.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 hover:bg-black/30" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Button
                size="icon"
                variant="secondary"
                onClick={onPlayClick}
                className="bg-white/90 hover:bg-white transition-colors duration-300"
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
                size="icon"
                variant="secondary"
                onClick={onMuteClick}
                className="bg-white/90 hover:bg-white transition-colors duration-300"
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
        </div>
    </div>
));
VideoTestimonial.displayName = 'VideoTestimonial';

export const Testimonials = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented, handle silently
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isMuted;
        }
        return () => {
            if (video) {
                video.pause();
            }
        };
    }, [isMuted]);

    return (
        <section ref={sectionRef} className="relative py-24 sm:py-32 bg-gradient-to-b from-background to-background/95 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Animated Background Circles */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcba28]/20 rounded-full filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            
            <MaxWidthWrapper className="relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center mb-16"
                >
                    <ChipBanner text="SUCCESS STORIES" />
                    <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-[#fcba28] via-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto text-center leading-relaxed">
                        Join thousands of professionals who have transformed their careers with InterviewMaster.ai's AI-powered interview preparation
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Featured Video Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                        className="col-span-1 md:col-span-2 lg:col-span-1"
                    >
                        <Card className="h-full bg-[#fcba28]/10 hover:bg-[#fcba28]/20 transition-all duration-300 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/20 to-transparent rounded-xl" />
                                    <VideoTestimonial
                                        isPlaying={isPlaying}
                                        isMuted={isMuted}
                                        onPlayClick={togglePlay}
                                        onMuteClick={toggleMute}
                                    />
                                </div>
                                <div className="mt-8">
                                    <StarRating rating={5} />
                                    <blockquote className="my-6 text-lg italic text-foreground/90 leading-relaxed">
                                        &quot;InterviewMaster.ai's AI-powered mock interviews completely transformed our hiring process. The quality of candidates improved significantly.&quot;
                                    </blockquote>
                                    <div className="flex items-center">
                                        <div className="relative w-12 h-12 ring-2 ring-[#fcba28]/20 rounded-full">
                                            <Image
                                                fill
                                                alt="John Doe"
                                                src="/avatar.png"
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-semibold text-foreground/90">Alex Thompson</p>
                                            <p className="text-sm text-foreground/70">Technical Director, Apple</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Text Testimonials */}
                    {testimonialData.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>

                {/* Additional Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-2xl font-semibold text-foreground/90">
                        Join <span className="text-[#fcba28]">10,000+</span> successful candidates
                    </p>
                    <p className="mt-2 text-foreground/70">
                        who have improved their interview skills with InterviewMaster.ai
                    </p>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
};
