'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import { useDiscountBar } from '../../../actions/get'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DiscountBar = () => {
  const { discount, error, loading } = useDiscountBar();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!discount || discount.length === 0) return <p>Kategori bulunamadı.</p>;

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative items-center justify-center w-full max-w-[1400px] mx-auto overflow-hidden p-6 from-black/40 to-black/0 mt-10 hidden sm:flex">
      {/* Geri Butonu */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white text-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scroll Alanı */}
      <div
        ref={scrollRef}
        className="flex sm:gap-4 gap-1 overflow-x-auto no-scrollbar sm:px-10 px-4 scroll-smooth items-center justify-center"
      >
        {discount.map((item) => (
          <Link key={item.id} href={`/category/${item.id}`}>
            <div className="whitespace-nowrap px-4 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black font-semibold transition text-sm">
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      {/* İleri Butonu */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white text-white"
      >
        <ChevronRight className="w-5 h-5 " />
      </button>
    </div>
  );
};

export default DiscountBar;
