'use client'
import React from 'react';

interface BragCardProps {
  rank: string;
  reps: number;
  xp: number;
  calories: number;
  maxCombo: number;
}

export default function BragCard({ rank, reps, xp, calories, maxCombo }: BragCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      {/* 9:16 Aspect Ratio Container perfectly sized for IG Reels/Stories */}
      <div id="brag-card" className="brag-card-bg w-[360px] h-[640px] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-red-500 font-black tracking-[0.3em] text-sm mb-2">KOMBAT TRAINER</h2>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">{rank}</h1>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 mb-8"></div>
        </div>
        
        <div className="relative z-10 space-y-6">
           <div className="bg-black/50 border border-red-900/50 p-4 rounded-xl flex justify-between items-center">
             <span className="text-red-400 font-bold text-sm tracking-widest">TOTAL STRIKES</span>
             <span className="text-3xl font-black text-white">{reps}</span>
           </div>
           
           <div className="bg-black/50 border border-red-900/50 p-4 rounded-xl flex justify-between items-center">
             <span className="text-red-400 font-bold text-sm tracking-widest">MAX COMBO</span>
             <span className="text-3xl font-black text-orange-500">{maxCombo}x</span>
           </div>
           
           <div className="bg-black/50 border border-red-900/50 p-4 rounded-xl flex justify-between items-center">
             <span className="text-red-400 font-bold text-sm tracking-widest">CALORIES BURNED</span>
             <span className="text-3xl font-black text-cyan-400">{calories}</span>
           </div>
           
           <div className="bg-black/50 border border-red-900/50 p-4 rounded-xl flex justify-between items-center">
             <span className="text-red-400 font-bold text-sm tracking-widest">XP GAINED</span>
             <span className="text-3xl font-black text-fuchsia-500">{xp}</span>
           </div>
        </div>
        
        <div className="relative z-10 text-center mt-4">
           <p className="text-slate-400 text-xs tracking-widest uppercase">Screenshot to share on IG</p>
           <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 border border-red-500 text-red-500 rounded-full text-xs font-bold hover:bg-red-900/30">RESTART SYSTEM</button>
        </div>
      </div>
    </div>
  );
}
