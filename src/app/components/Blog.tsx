"use client";
import React from "react";
import { useBlog } from "../../../actions/get";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const { blog, error, loading } = useBlog();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="w-full bg-gray-100 py-6">
      <div className="flex items-center justify-between text-center mb-2 p-4">
        <h2 className="hidden md:flex text-xl">
          Sektörel Gelişmeler{" "}
          <span className="font-semibold">Emlak Yaşam da</span>
        </h2>
        <Button variant="mybutton2" className="px-4 py-2 rounded-md">
          {" "}
          Tüm Emlak Yaşam Haberleri
        </Button>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {blog?.map((item) => (
          <div key={item.id} className="bg-white p-4">
            <Link href={`/blog/${item.id}`} className="rounded-md flex gap-4 ">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="object-cover"
              />
            </Link>
            <h3 className="text-sm font-semibold flex items-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
