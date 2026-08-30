"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSiteName } from "../../services/siteConfig";

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // User Dropdown
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Modal Menu

  // Scroll Durumları
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sayfa değiştiğinde menüleri kapat
  useEffect(() => {
    setMenuOpen(false);
    setIsOpen(false);
  }, [pathname]);

  // Scroll Mantığı
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (currentScrollY < 10) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollDiff = currentScrollY - lastScrollY.current;

      if (scrollDiff > 10) {
        setShowHeader(false);
        setIsOpen(false);
        setMenuOpen(false);
      } else if (scrollDiff < -10) {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dışarı tıklandığında menüleri kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (isOpen || menuOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, menuOpen]);

  if (pathname === "/auth") return null;

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  const apiBase = backendUrl.replace("/api/v1", "");

  const avatarSrc = user?.avatar
    ? `${apiBase}/images/avatars/${user.avatar}`
    : null;

  const playerInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "P";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`sticky top-4 z-50 w-full max-w-5xl mx-auto px-3 sm:px-6 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-24"
        }`}
      >
        <div className="w-full bg-chess-surface rounded-full px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity select-none shrink-0"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt={`${getSiteName()} logo`}
                sizes="32px"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-black text-lg sm:text-xl text-chess-text tracking-tight lowercase">
              {getSiteName()}
            </span>
          </Link>

          {/* Sağ Alan: Sadece Sign in / Profil ve 3 Çizgi Menü Butonu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!mounted || loading ? (
              <div className="w-20 h-9 rounded-full bg-chess-bg/60 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-chess-bg text-chess-text font-bold text-xs cursor-pointer hover:bg-chess-surface-hover transition-colors"
                >
                  <div className="w-7 h-7 min-w-[28px] min-h-[28px] rounded-full bg-chess-primary/10 text-chess-primary flex items-center justify-center font-black overflow-hidden relative shrink-0">
                    {avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={user.username}
                        fill
                        sizes="28px"
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <span>{playerInitial}</span>
                    )}
                  </div>
                  <span className="hidden sm:inline">{user.username}</span>
                </button>

                {/* Kullanıcı Dropdown (Çizgisiz & Düz) */}
                {isOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-chess-surface rounded-3xl p-2.5 z-50 space-y-1 text-xs">
                    {/* Profil Başlık Kartı */}
                    <div className="px-3 py-2.5 bg-chess-bg rounded-2xl mb-1 flex items-center justify-between">
                      <div className="font-black text-chess-text truncate">
                        {user.username}
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-chess-primary/10 text-chess-primary shrink-0">
                        {user?.role || "player"}
                      </span>
                    </div>

                    {/* Menü Seçenekleri */}
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-chess-bg font-black text-chess-text/80 hover:text-chess-text transition-colors"
                    >
                      Profile
                    </Link>

                    {user?.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-xl hover:bg-chess-bg font-black text-chess-text/80 hover:text-chess-text transition-colors"
                      >
                        Admin Settings
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 font-black text-chess-text/60 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-chess-primary text-chess-surface font-black px-5 py-2 rounded-full hover:opacity-90 transition-opacity text-xs whitespace-nowrap"
              >
                Sign in
              </Link>
            )}

            {/* En Sağda Yer Alan 3 Çizgi Hamburger Menü Butonu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setIsOpen(false);
                }}
                type="button"
                className="w-10 h-10 rounded-full bg-chess-bg text-chess-text font-black text-base flex items-center justify-center hover:bg-chess-surface-hover transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? "✕" : "☰"}
              </button>

              {/* Çizgisiz, Tamamen Flat Açılır Menü Modalı */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-chess-surface rounded-3xl p-3 z-50 space-y-1 text-xs font-black">
                  <Link
                    href="/news"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-2xl hover:bg-chess-bg text-chess-text/80 transition-colors"
                  >
                    News
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-2xl hover:bg-chess-bg text-chess-text/80 transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-2xl hover:bg-chess-bg text-chess-text/80 transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Ekranın Sağ Altındaki Yuvarlak "Yukarı Dön" Butonu */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-chess-surface text-chess-primary flex items-center justify-center hover:bg-chess-primary hover:text-chess-surface transition-all duration-300 cursor-pointer ${
          showScrollTop
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <span className="text-lg font-black">↑</span>
      </button>
    </>
  );
}
