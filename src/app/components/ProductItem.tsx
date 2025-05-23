"use client";

import React from "react";
import { useAllProducts } from "../../../actions/get";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductItem = () => {
  const { products } = useAllProducts();

  if (!products || products.length === 0) {
    return <p className="text-center mt-10 text-gray-500">Ürün bulunamadı.</p>;
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4 bg-gray-100">
      <div className="mb-6 ">
        <h2 className="hidden md:flex text-2xl font-semibold">
          {products[0].city} Şehir Vitrini{" "}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-md">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="flex flex-col p-2 bg-white hover:border-1 hover:border-gray-600 rounded-md h-[380px]"
          >
            <div className="flex flex-col items-start">
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={400}
                className="object-cover rounded-md mb-2 w-full h-[200px]"
              />
              <h3 className="text-lg font-bold px-2 text-gray-600">
                {Number(item.price).toLocaleString("tr-TR")} TL
              </h3>
              <p className="text-sm text-gray-600 font-medium px-1">
                {item.adstatus}, {item.rooms}+1, {item.floors}. kat
              </p>
              <p className="text-sm text-gray-500 px-1">{item.place}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="mybutton3" className="flex-1 py-2">
                Telefonu
                <br />
                Göster
              </Button>
              <Button variant="mybutton3"  className="px-3 py-2">
                Mesaj
              </Button>
              <Button variant="mybutton3" className="px-3 py-2">
                Whatsapp
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductItem;
