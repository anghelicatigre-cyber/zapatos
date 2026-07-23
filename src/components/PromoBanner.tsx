import React, { useState, useEffect } from 'react';
import { Timer, Zap, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { Sneaker, ColorVariant } from '../types';

interface PromoBannerProps {
  dropSneaker: Sneaker;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant) => void;
  onQuickView: (sneaker: Sneaker) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  dropSneaker,
  onAddToCart,
  onQuickView,
}) => {
  // Ticking countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#FF1E27] via-red-900 to-[#0B0B0B] rounded-3xl p-6 sm:p-10 border border-[#FF1E27]/50 shadow-2xl relative overflow-hidden text-white">
        
        {/* Background glow & subtle pattern */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF1E27]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl pointer-events-none select-none tracking-tighter hidden lg:block">
          JORDAN
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text & Live Timer */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 bg-[#0B0B0B]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest text-[#FF1E27] uppercase border border-[#FF1E27]/40">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>LIMITED VAULT DROP • 25% OFF</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans leading-none">
                AIR JORDAN 1 RETRO <br />
                <span className="text-white drop-shadow-md">'CHICAGO OG EDITION'</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed pt-1">
                The grail of all grails. Premium varsity red full-grain leather, padded collar, and encapsulated Nike Air cushioning. Extremely limited stock remaining.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-[#0B0B0B]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-md">
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#8E8E93]">
                <span className="flex items-center gap-1.5 font-bold text-white uppercase">
                  <Timer className="w-4 h-4 text-[#FF1E27]" />
                  <span>DROP CLOSES IN:</span>
                </span>
                <span className="text-[#FF1E27] font-bold animate-pulse">LIVE COUNTDOWN</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#1C1C1E] p-2.5 rounded-xl border border-white/5">
                  <span className="text-2xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-[#8E8E93] block font-mono">HOURS</span>
                </div>
                <div className="bg-[#1C1C1E] p-2.5 rounded-xl border border-white/5">
                  <span className="text-2xl font-black text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-[#8E8E93] block font-mono">MINUTES</span>
                </div>
                <div className="bg-[#1C1C1E] p-2.5 rounded-xl border border-white/5">
                  <span className="text-2xl font-black text-[#FF1E27] font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-[#8E8E93] block font-mono">SECONDS</span>
                </div>
              </div>

              {/* Allocation stock bar */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-white/80">Vault Allocation Claimed</span>
                  <span className="text-[#FF1E27]">86% Claimed</span>
                </div>
                <div className="w-full bg-[#1C1C1E] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FF1E27] h-full w-[86%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onAddToCart(dropSneaker, 10, dropSneaker.colorVariants[0])}
                id="promo-claim-drop-btn"
                className="bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
              >
                <Zap className="w-4 h-4 fill-current text-[#FF1E27]" />
                <span>Claim Drop — ${dropSneaker.price.toFixed(2)}</span>
              </button>

              <button
                onClick={() => onQuickView(dropSneaker)}
                className="bg-black/50 hover:bg-black/70 text-white font-bold text-xs py-3.5 px-5 rounded-xl border border-white/20 uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>Inspect Specs</span>
                <ArrowRight className="w-4 h-4 text-[#FF1E27]" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/70 font-mono pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Includes Certificate of Authenticity & Original Vault Box</span>
            </div>

          </div>

          {/* Right Showcase Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-[#0B0B0B] p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
              <img
                src={dropSneaker.mainImage}
                alt={dropSneaker.name}
                referrerPolicy="no-referrer"
                className="w-full aspect-4/3 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#1C1C1E]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#8E8E93] block font-mono text-[9px]">ORIGINAL PRICE</span>
                  <span className="text-white line-through font-mono">${dropSneaker.originalPrice?.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#FF1E27] font-extrabold block">DROP DEAL</span>
                  <span className="text-lg font-black text-white">${dropSneaker.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
