import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, Truck, Tag, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Financial calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.sneaker.price * item.quantity, 0);
  const discountAmount = discountApplied ? rawSubtotal * 0.2 : 0;
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingThreshold = 150;
  const shippingFee = subtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 15.00;
  const totalPrice = subtotal + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KICK20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid Promo Code. Try code "KICK20" for 20% off!');
    }
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setCheckoutModalOpen(false);
      onClose();
    }, 3000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
        
        {/* Backdrop overlay trigger */}
        <div className="flex-1 cursor-pointer" onClick={onClose} />

        {/* Drawer Container */}
        <div className="bg-[#0B0B0B] border-l border-[#1C1C1E] w-full max-w-md h-full flex flex-col justify-between shadow-2xl text-white relative animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#1C1C1E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF1E27]" />
              <h2 className="text-lg font-black uppercase tracking-wider">YOUR VAULT CART</h2>
              <span className="bg-[#FF1E27] text-white text-xs font-bold px-2 py-0.5 rounded-full font-mono">
                {cartItems.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              id="cart-drawer-close-btn"
              className="p-2 rounded-xl bg-[#1C1C1E] text-[#8E8E93] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#1C1C1E] px-5 py-3 border-b border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-white/90 font-bold">
                <Truck className="w-4 h-4 text-[#FF1E27]" />
                {rawSubtotal >= freeShippingThreshold
                  ? '🎉 UNLOCKED FREE EXPRESS SHIPPING!'
                  : `Add $${(freeShippingThreshold - rawSubtotal).toFixed(2)} more for Free Shipping`}
              </span>
            </div>
            <div className="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FF1E27] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4 text-[#8E8E93]">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#1C1C1E]" />
                <p className="text-sm font-bold text-white">Your Vault Cart is empty</p>
                <p className="text-xs max-w-xs mx-auto">Explore our fresh drops and secure your size before stock runs out.</p>
                <button
                  onClick={onClose}
                  className="bg-[#FF1E27] text-white font-bold text-xs py-2.5 px-5 rounded-xl uppercase tracking-wider"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.sneaker.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="bg-[#1C1C1E] border border-white/5 p-3.5 rounded-2xl flex gap-3 items-center relative group"
                >
                  <img
                    src={item.selectedColor.image || item.sneaker.mainImage}
                    alt={item.sneaker.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl bg-[#0B0B0B]"
                  />

                  <div className="flex-1 min-w-0 space-y-1 text-left">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white truncate pr-2">{item.sneaker.name}</h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#8E8E93] hover:text-[#FF1E27] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] text-[#8E8E93] font-mono flex items-center gap-2">
                      <span className="bg-[#0B0B0B] px-1.5 py-0.5 rounded text-white font-bold">
                        US {item.selectedSize}
                      </span>
                      <span>{item.selectedColor.name}</span>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs font-black text-[#FF1E27]">
                        ${(item.sneaker.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center bg-[#0B0B0B] rounded-lg border border-white/10 text-xs font-bold font-mono">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#8E8E93] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#8E8E93] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#1C1C1E] bg-[#0B0B0B] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                  <input
                    type="text"
                    placeholder="Promo Code (KICK20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase font-mono placeholder-[#8E8E93] focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1C1C1E] hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-3 rounded-xl uppercase font-mono transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl flex items-center justify-between font-mono">
                  <span>Code KICK20 Applied (-20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#8E8E93] font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white">
                    {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                  <span>TOTAL</span>
                  <span className="text-[#FF1E27]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                id="cart-checkout-btn"
                className="w-full bg-[#FF1E27] hover:bg-[#e01922] text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#FF1E27]/20 active:scale-95"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 relative shadow-2xl">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8E8E93] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black uppercase text-white">ORDER CONFIRMED!</h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed max-w-xs mx-auto">
                  Your authentic pairs are being authenticated and packed at Vault Hub #4. Tracking code will be sent to your email.
                </p>
                <div className="bg-[#0B0B0B] p-4 rounded-xl border border-white/10 text-xs font-mono text-[#8E8E93] space-y-1">
                  <div className="text-white font-bold">Receipt #KV-2026-98104</div>
                  <div>Total Charged: <span className="text-[#FF1E27] font-bold">${totalPrice.toFixed(2)}</span></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimulateCheckout} className="space-y-4 text-left">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <CreditCard className="w-5 h-5 text-[#FF1E27]" />
                  <h3 className="text-lg font-black uppercase">EXPRESS VAULT CHECKOUT</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#8E8E93] font-mono mb-1">Shipping Address</label>
                    <input
                      type="text"
                      required
                      defaultValue="742 Evergreen Terrace, Springfield, OR"
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl p-3 text-white focus:border-[#FF1E27] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#8E8E93] font-mono mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        defaultValue="Jordan Collector"
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl p-3 text-white focus:border-[#FF1E27] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E93] font-mono mb-1">Payment Method</label>
                      <select className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl p-3 text-white font-mono focus:border-[#FF1E27] focus:outline-none">
                        <option>Apple Pay (Instant)</option>
                        <option>Visa / Mastercard (•••• 8820)</option>
                        <option>PayPal Express</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/5 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-[#8E8E93]">
                    <span>Items ({cartItems.length})</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                    <span>Payable Amount</span>
                    <span className="text-[#FF1E27]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="checkout-confirm-btn"
                  className="w-full bg-[#FF1E27] hover:bg-[#e01922] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pay ${totalPrice.toFixed(2)} & Complete Order</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
