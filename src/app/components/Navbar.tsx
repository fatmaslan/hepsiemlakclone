"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { headCategoryIcons } from "../utils/headCategoryIcons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TfiWorld } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n'



type HeadCategory = {
  id: number;
  name: string;
};

const Navbar = () => {
  const [head, setHead] = useState<HeadCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation('common')

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // Eğer URL tabanlı dil kullanıyorsan burada yönlendirme de yapılabilir
  }
  const fetchHeadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/headcategories/"
      );
      setHead(response.data);
    } catch (error: unknown) {
      setError("Kategoriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadCategories();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  const handleauth = (path: string) => {
    if (user) {
      router.push(path);
    } else {
      setIsLoginOpen(true);
    }
  };
  return (
    <div>
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex sm:gap-7 gap-0 sm:p-4 p-1">
          <Link href="/">
            <Image
              src="/logo-.svg"
              alt="logo"
              width={200}
              height={200}
              className="mt-5 sm:mt-0"
            />
          </Link>
          <div className="flex items-center justify-between w-full mt-4 relative">
            <div className="sm:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-800 p-2 sm:border border-none rounded-md"
              >
                <GiHamburgerMenu size={30} />
              </button>
            </div>
            <div className="gap-4 hidden sm:flex">
              {head.map((category) => {
                const IconComponent = headCategoryIcons[category.name];
                return (
                  <Link
                    href={`/${category.name}`}
                    key={category.id}
                    className="flex items-center gap-2 font-bold hover:text-red-700"
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
            {menuOpen && (
              <div className="absolute top-12 left-0  border-none z-50 p-6 flex flex-col gap-3 sm:hidden">
                {head.map((category) => {
                  const IconComponent = headCategoryIcons[category.name];
                  return (
                    <Link
                      href={`/${category.name}`}
                      key={category.id}
                      className="flex items-center gap-2 hover:text-red-700 "
                      onClick={() => setMenuOpen(false)}
                    >
                      {IconComponent && <IconComponent size={20} />}
                      <span >{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex sm:gap-7 gap-0 sm:p-4 p-1">
          
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex flex-col items-center hover:text-red-950 px-4 mt-2">
          <TfiWorld size={24} />
          <span className="hidden sm:block mt-0 font-semibold text-xs">
            {i18n.language.toUpperCase()}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 max-h-67 border-none p-2 shadow-none left-0">
        <DropdownMenuItem
          className="text-center font-semibold cursor-pointer"
          onClick={() => changeLanguage('tr')}
        >
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-center font-semibold cursor-pointer"
          onClick={() => changeLanguage('en')}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
       

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex gap-3 items-center hover:text-red-950 border border-gray-300 rounded-2xl px-4">
                <span className="hidden sm:block mt-1 font-semibold text-xs">
                  Giriş yap <br />
                  veya <span className="font-bold text-red-700">üye ol</span>
                </span>
                <FaUser size={24} className="text-gray-600" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 border-none p-3 shadow-md rounded-md bg-white space-y-2">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="mybutton"
                  onClick={() => handleauth("/account")}
                  className="w-full justify-center "
                >
                  Üye girişi yap
                </Button>
                <Button
                  variant="mybutton2"
                  onClick={() => router.push("/register")}
                  className="w-full justify-center "
                >
                  Üye ol
                </Button>
              </div>

              <DropdownMenuSeparator />

              <div className="flex flex-col text-sm font-semibold  text-gray-600">
                <Link
                  href="/"
                  className="hover:text-red-700 hover:bg-gray-300 p-3 rounded-md transition duration-300"
                >
                  Kayıtlı Aramalarım
                </Link>
                <Link
                  href="/"
                  className="hover:text-red-700 hover:bg-gray-300 p-3 rounded-md transition duration-300"
                >
                  Favorilerim
                </Link>
                <Link
                  href="/"
                  className="hover:text-red-700 hover:bg-gray-300 p-3 rounded-md transition duration-300"
                >
                  Mesajlarım
                </Link>
                <Link
                  href="/"
                  className="hover:text-red-700 hover:bg-gray-300 p-3 rounded-md transition duration-300"
                >
                  Kazançlarım
                </Link>
                <Link
                  href="/"
                  className="hover:text-red-700 hover:bg-gray-300 p-3 rounded-md transition duration-300"
                >
                  İlanlarım
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
      
            <Button
              variant="mybutton"
              onClick={() => handleauth("/ilan-ver")}
              className="rounded-xl sm:p-6 sm:text-xl text-sm p-2"
            >
              Ücretsiz ilan ver
            </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
