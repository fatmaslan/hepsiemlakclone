"use client";
import React, { useRef } from "react";
import { useDetailProducts } from "../../../../actions/get";
import { useParams } from "next/navigation";
import Breadcrumb from "@/app/components/Breadcrumb";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Detailpage = () => {
  const params = useParams();
  const productId = params.id as string;
  const plugin = React.useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true })
  );
  const { products } = useDetailProducts(productId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  if (!products || products.length === 0) {
    return (
      <div className="mt-44 text-center text-gray-600 text-lg font-semibold">
        Ürün bulunamadı!
      </div>
    );
  }

  const product = products[0];

  const placeParts = product.place.split(" / ");

  const breadcrumbItems = [
    { label: "Kiralık", href: "/kiralik" },
    ...placeParts.map((part, index) => {
      const href =
        "/kiralik/" +
        placeParts
          .slice(0, index + 1)
          .map((p) => p.toLowerCase().replace(/\s+/g, "-"))
          .join("/");
      return {
        label: `${part} Kiralık`,
        href,
      };
    }),
    {
      label:
        product.subcat && product.subcat.length > 0
          ? product.subcat[0].name
          : "Kategori",
      href: "#",
    },
    { label: `${product.id}` },
  ];
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -500 : 500;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <div className="max-w-[1400px] w-full bg-gray-100 mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="text-2xl font-bold text-gray-900 mt-2">{product.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {/* Sol kısım: Carousel */}
        <div className="col-span-2 bg-white md:flex flex-row  flex-col mt-2 ">
          <div className="w-[300px] md:w-[500px]">
          <Carousel
            plugins={[plugin.current]}
            className="w-[280px] md:w-[480px] rounded-xl"
          >
            <CarouselContent>
              {product.images.map((img) => (
                <CarouselItem key={img.id} className="w-full">
                  <Card className="border-none py-3">
                    <CardContent className="relative aspect-[4/3] w-full p-0">
                      <Image
                        src={product.images[selectedImageIndex].images}
                        alt={`Ürün resmi ${product.images[selectedImageIndex].id}`}
                        fill
                        className="object-cover "
                        priority
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-sm text-center text-gray-600 mb-5">
            {selectedImageIndex + 1} / {product.images.length}
          </div>

          <div className="relative w-full overflow-hidden">
            {/* Geri Butonu */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 "
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Alanı */}
            <div
              ref={scrollRef}
              className="flex sm:gap-4 gap-1 overflow-x-auto no-scrollbar sm:px-10 px-4 scroll-smooth items-center justify-center"
            >
              {product.images.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex w-[130px] h-[80px] cursor-pointer border-2 ${
                    index === selectedImageIndex
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={item.images}
                    alt={`Ürün resmi ${item.id}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* İleri Butonu */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-3 top-1/2 -translate-y-1/2 "
            >
              <ChevronRight className="w-5 h-5 " />
            </button>
          </div>
          <p className="text-gray-600 mt-5">
            {product.adstatus}, {product.rooms}+1, {product.floors}. kat
          </p>
          </div>
          <div className="p-5 ">
            <p className="text-2xl font-bold text-red-600 mt-4">
              {Number(product.price).toLocaleString("tr-TR")} TL
            </p>
            <hr className="my-4" />
            <p className="text-sm mb-5">{product.place}</p>
             
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Brüt:</strong> {product.indirimli_fiyat} m²
              </p>
              <p>
                <strong>İlan Durumu:</strong> {product.adstatus}
              </p>
              <p>
                <strong>Şehir:</strong> {product.city}
              </p>
              <p>
                <strong>İlan No:</strong> {product.id}
              </p>
              <p>
                <strong>Kategori:</strong>{" "}
                {product.subcat?.[0]?.name ?? "Belirtilmemiş"}
              </p>
            </div>
          </div>
        </div>

        {/* Sağ kısım: Bilgiler */}
        <div className="w-full md:w-[320px] bg-white p-5 rounded-md shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">İlan Sahibi</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Adı:</strong> {product.user?.username}
            </p>
            <p>
              <strong>Email:</strong> {product.user?.email}
            </p>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md text-sm flex flex-row items-center justify-center gap-2">
            <FaPhoneAlt  size={24} className="text-white "/>Telefon Numarasını Göster
          </button>
          <button className="w-full border text-sm text-gray-800 py-2 rounded-md flex flex-row items-center justify-center gap-2">
            <MdOutlineLocalPostOffice size={24} className="text-red-500" /> Mesaj Gönder
          </button>
          <button className="w-full border text-sm text-gray-800 py-2 rounded-md flex flex-row items-center justify-center gap-2">
             <FaWhatsapp  size={24} className="text-green-500"/>WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
