"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useSimilarProducts } from "../../../actions/get";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";

const Similar = () => {
  const params = useParams();
  const productId = params.id as string;
  const { products } = useSimilarProducts(productId);

  if (!products) {
    return <div>yükleniyor...</div>;
  }
  if (products.length === 0) {
    return <div>Benzer Ürün Yok.</div>;
  }
  return (
    <div className="overflow-hidden w-full md:w-[320px] space-y-4 bg-white p-5 rounded-md shadow-md mt-5">
      <h2 className=" font-bold text-gray-800">Benzer Ürünler</h2>
      {products.map((product) => (
        <div key={product.id} className="flex  gap-2">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-md"
          />
          <div>
            <h2 className="text-xs font-bold text-gray-600">{product.name}</h2>
            <h2 className="font-bold">
              {" "}
              {Number(product.price).toLocaleString("tr-TR")} TL
            </h2>
            <span className="flex items-center cursor-pointer text-sm text-gray-500 space-x-1">
              <IoLocationOutline size={14} />
              <span>{product.place}</span>
            </span>
          </div>
          <span className="flex w-[35px] h-[35px]">
            <Image
              src="/eids-logo-mini.webp"
              alt={product.name}
              width={50}
              height={50}
              className="rounded-md hidden md:block items-center justify-center"
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Similar;
