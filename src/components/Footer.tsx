import React, { useState } from 'react';
import { Send, ShieldCheck, Truck, RefreshCw, Award, CheckCircle2, Flame } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#1C1C1E] text-white pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-[#1C1C1E] rounded-3xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF1E27]/10 text-[#FF1E27] rounded-2xl border border-[#FF1E27]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase">100% Authentic</h4>
              <p className="text-[11px] text-[#8E8E93]">Double-verified by human experts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF1E27]/10 text-[#FF1E27] rounded-2xl border border-[#FF1E27]/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase">Express Shipping</h4>
              <p className="text-[11px] text-[#8E8E93]">Free on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF1E27]/10 text-[#FF1E27] rounded-2xl border border-[#FF1E27]/20">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase">30-Day Easy Returns</h4>
              <p className="text-[11px] text-[#8E8E93]">Hassle-free vault exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF1E27]/10 text-[#FF1E27] rounded-2xl border border-[#FF1E27]/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase">VIP Rewards</h4>
              <p className="text-[11px] text-[#8E8E93]">Earn points on every drop</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF1E27] flex items-center justify-center font-black">
                KV
              </div>
              <span className="text-xl font-black tracking-wider text-white uppercase">
                KICK<span className="text-[#FF1E27]">VAULT</span>
              </span>
            </div>

            <p className="text-xs text-[#8E8E93] leading-relaxed max-w-sm">
              The premier online destination for authentic deadstock sneakers, high-profile drops, and iconic retro silhouettes from Nike, Adidas, Jordan, Puma, and Reebok.
            </p>

            <div className="text-xs font-mono text-[#8E8E93]">
              <span>CUSTOMER HELPLINE: </span>
              <span className="text-white font-bold">+1 (800) 555-KICK</span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#FF1E27] font-mono tracking-wider">STORE BRANDS</h4>
            <ul className="space-y-2 text-xs text-[#8E8E93]">
              <li><a href="#nike" className="hover:text-white transition-colors">Nike Sportswear</a></li>
              <li><a href="#adidas" className="hover:text-white transition-colors">Adidas Originals</a></li>
              <li><a href="#jordan" className="hover:text-white transition-colors">Air Jordan Retro</a></li>
              <li><a href="#puma" className="hover:text-white transition-colors">Puma Hoops</a></li>
              <li><a href="#reebok" className="hover:text-white transition-colors">Reebok Heritage</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#FF1E27] font-mono tracking-wider">SUPPORT</h4>
            <ul className="space-y-2 text-xs text-[#8E8E93]">
              <li><a href="#order-status" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#size-guide" className="hover:text-white transition-colors">Sizing Chart</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#authenticity" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3 bg-[#1C1C1E] p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-2 text-xs font-black text-[#FF1E27] uppercase font-mono">
              <Flame className="w-4 h-4 fill-current" />
              <span>EARLY DROP ACCESS</span>
            </div>
            <h4 className="text-sm font-bold text-white uppercase">Subscribe for Secret Drops & Codes</h4>
            <p className="text-xs text-[#8E8E93]">Get notified 15 minutes before high-heat Air Jordan and Yeezy style drops release.</p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#FF1E27]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF1E27] hover:bg-[#e01922] text-white px-4 rounded-lg font-bold text-xs uppercase transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </div>

              {subscribed && (
                <div className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded-xl flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the KICKVAULT VIP Drop List!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 border-t border-[#1C1C1E] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8E8E93]">
          <div>
            © 2026 KICKVAULT Inc. All rights reserved. High-Contrast Athletic E-Commerce UI.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold">
            <span className="bg-[#1C1C1E] px-2.5 py-1 rounded border border-white/5 text-white">VISA</span>
            <span className="bg-[#1C1C1E] px-2.5 py-1 rounded border border-white/5 text-white">MASTERCARD</span>
            <span className="bg-[#1C1C1E] px-2.5 py-1 rounded border border-white/5 text-[#FF1E27]">APPLE PAY</span>
            <span className="bg-[#1C1C1E] px-2.5 py-1 rounded border border-white/5 text-blue-400">PAYPAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
