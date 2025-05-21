import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between  py-5 px-9 ">
      <div className="flex flex-col   ">
        <Link href="/about" className="text-gray-600 hover:underline">
          Hakkımızda
        </Link>
        <Link href="/gift" className="text-gray-600 hover:underline">
          Ödüllerimiz
        </Link>
        <Link href="/about" className="text-gray-600 hover:underline">
          Reklam
        </Link>
        <Link href="/about" className="text-gray-600 hover:underline">
          Kurumsal Kimlik
        </Link>
        <Link href="/about" className="text-gray-600 hover:underline">
          Konut Değerleme
        </Link>
        <Link href="/about" className="text-gray-600 hover:underline">
          Emlak Yaşam
        </Link>
        <Link href="/contact" className="text-gray-600 hover:underline">
          Bize Ulaşın
        </Link>
      </div>
      <div className="flex flex-col ">
        <Link href="/warning" className="text-gray-600 hover:underline">
          Yasal Uyarı
        </Link>
        <Link href="/warning" className="text-gray-600 hover:underline">
          Kullanım Koşulları
        </Link>
        <Link href="/warning" className="text-gray-600 hover:underline">
          Aydınlatma Metni
        </Link>
        <Link href="/warning" className="text-gray-600 hover:underline">
          Çerez Politikası
        </Link>
        <Link href="/warning" className="text-gray-600 hover:underline">
          Üyelik Sözleşmesi
        </Link>
        <Link href="/warning" className="text-gray-600 hover:underline">
          İlan Yayınlama Kuralları
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-md text-semibold text-gray-700">Sosyal Medya Hesaplarımızı Takip Edin</h2>
        <div className="flex gap-4 p-2 ">
          <Link
            href="https://www.instagram.com/hepsiemlak/"
            className="text-gray-600 hover:underline border-1 border-gray-400 p-3 rounded-md"
          >
            <Image src="/ins.png" alt="instagram" width={20} height={20} />
          </Link>
          <Link
            href="https://www.facebook.com/hepsiemlak/"
            className="text-gray-600 hover:underline border-1 border-gray-400 p-3 rounded-md"
          >
            <Image src="/facebook.png" alt="facebook" width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedlin.com/hepsiemlak/"
            className="text-gray-600 hover:underline border-1 border-gray-400 p-3 rounded-md"
          >
            <Image src="/lin.png" alt="linkedlin" width={20} height={20} />
          </Link>
          <Link
            href="https://www.youtube.com/@hepsiemlak"
            className="text-gray-600 hover:underline border-1 border-gray-400 p-3 rounded-md"
          >
            <Image src="/you.png" alt="youtube" width={20} height={20} />
          </Link>

          <Link
            href="https://twitter.com/hepsiemlak"
            className="text-gray-600 hover:underline border-1 border-gray-400 p-3 rounded-md"
          >
            <Image src="/x.png" alt="x" width={20} height={20} />
          </Link>
        </div>
      </div>
      <div>4</div>
      <div>5</div>
    </div>
  );
};

export default Footer;
