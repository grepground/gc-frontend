import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-chess-bg z-50 flex flex-col items-center justify-center space-y-6">
      {/* Dynamic Chess Piece Pulse Effect */}
      <div className="relative flex items-center justify-center">
        {/* Soft Background Glow */}
        <div className="absolute w-20 h-20 bg-chess-primary/10 rounded-full blur-xl animate-ping" />

        {/* Central Tactical Icon */}
        <div className="relative w-16 h-16 bg-chess-surface rounded-2xl flex items-center justify-center text-3xl animate-bounce">
          ♟️
        </div>
      </div>

      {/* Minimalist Tactical Text & Animated Dots */}
      <div className="flex flex-col items-center space-y-2">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-chess-text/80">
          Calculating Lines
        </span>

        {/* Subtle Progress Bar Indicator */}
        <div className="w-24 h-1 bg-chess-surface rounded-full overflow-hidden">
          <div className="h-full bg-chess-primary rounded-full animate-[loading-bar_1.2s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
