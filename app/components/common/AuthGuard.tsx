"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function GlobalSuspensionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user) {
      // FIX: Eğer kullanıcının isActive değeri false ise ve zaten suspended sayfasında DEĞİLSE önünü kes!
      if (user.isActive === false && pathname !== "/suspended") {
        router.replace("/suspended");
      }

      // Eğer kullanıcı aktifse ama manuel olarak /suspended sayfasına gitmeye çalışıyorsa onu ana sayfaya kurtar
      if (user.isActive === true && pathname === "/suspended") {
        router.replace("/");
      }
    }
  }, [user, loading, pathname, router]);

  // Eğer kullanıcı cezalıysa ve başka sayfaları render etmeye çalışıyorsa ekranı sızıntılara karşı kilitle
  if (
    !loading &&
    user &&
    user.isActive === false &&
    pathname !== "/suspended"
  ) {
    return null;
  }

  return <>{children}</>;
}
