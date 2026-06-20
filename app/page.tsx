'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ExerciseAnalyzer, ExerciseMode, FrameResult } from '../lib/exercise-analyzer';
import BragCard from '../components/BragCard';

export default function KombatTrainer() {
  const [mode, setMode] = useState<ExerciseMode>('Striking Drills');
  const [isTracking, setIsTracking] = useState(false);
  const [showBrag, setShowBrag] = useState(false);
  const [maxComboTracker, setMaxComboTracker] = useState(0);
  
  const [metrics, setMetrics] = useState<FrameResult>({
    reps: 0,
    accuracy: 0,
    xp: 0,
    combo: 0,
    stamina: 100,
    bossHp: 2000,
    rank: 'WHITE BELT',
    calories: 0,
    rhythmHit: false,
    feedback: [],
    isCalibrated: false
  });
  
  const analyzerRef = useRef<ExerciseAnalyzer | null>(null);

  useEffect(() => {
    analyzerRef.current = new ExerciseAnalyzer();
  }, []);

  useEffect(() => {
    if (metrics.combo > maxComboTracker) {
      setMaxComboTracker(metrics.combo);
    }
  }, [metrics.combo, maxComboTracker]);

  const endSession = () => {
    setIsTracking(false);
    setShowBrag(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 md:p-8 font-mono overflow-x-hidden">
      {showBrag && (
        <BragCard
          rank={metrics.rank}
          reps={metrics.reps}
          xp={metrics.xp}
          calories={metrics.calories}
          maxCombo={maxComboTracker}
        />
      )}
      
      <header className="mb-6 flex justify-between items-end border-b border-red-900 pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-red-600 kombat-title tracking-tighter uppercase italic">
            KOMBAT TRAINER
          </h1>
          <p className="text-red-400/70 text-sm tracking-widest mt-1 font-bold">
            NEURAL ATHLETIC ENGINE v3.0
          </p>
        </div>
        <div className="text-right hidden md:block border border-red-900/50 bg-red-950/20 px-6 py-2 rounded">
          <p className="text-red-500 font-bold text-xs tracking-widest">{metrics.rank}</p>
          <p className="text-4xl text-white font-black">
            {metrics.xp} <span className="text-sm text-fuchsia-500">XP</span>
          </p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {/* BOSS HP BAR */}
          <div className="hud-panel p-4 rounded-xl border border-red-900/50">
            <div className="flex justify-between mb-1">
              <span className="text-red-500 font-black tracking-widest text-sm">BOSS PROTOCOL</span>
              <span className="text-white font-black">{metrics.bossHp} HP</span>
            </div>
            <div className="w-full bg-black h-6 rounded border border-red-900 overflow-hidden relative">
              <div
                className="bg-red-600 h-full transition-all duration-200"
                style={{ width: `${(metrics.bossHp / 3000) * 100}%` }}
              />
            </div>
          </div>

          <div className="hud-panel border border-red-900/50 rounded-xl p-2 flex flex-col items-center justify-center min-h-[500px] relative">
            {!isTracking ? (
              <button
                onClick={() => setIsTracking(true)}
                className="px-10 py-5 bg-red-700 hover:bg-red-600 text-white rounded-md uppercase font-black text-2xl tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-500"
              >
                ENGAGE SYSTEM
              </button>
            ) : (
              <div
                className={`w-full h-full flex flex-col items-center justify-center bg-black rounded relative overflow-hidden ${
                  metrics.rhythmHit ? 'border-4 border-yellow-400' : ''
                }`}
              >
                <div className="absolute inset-0 pointer-events-none border-[4px] border-red-900/30 rounded z-10" />
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 animate-[scan_3s_ease-in-out_infinite] z-10" />
                
                <p className="text-red-500 text-xl font-black tracking-widest animate-pulse z-20">
                  {metrics.isCalibrated ? '[ LIVE FEED ACTIVE ]' : '[ SCANNING BIOMETRICS ]'}
                </p>
                
                {metrics.combo > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <h2 className="text-8xl font-black text-white/10 italic transform -rotate-6 scale-125">
                      {metrics.combo} HITS
                    </h2>
                  </div>
                )}

                <button
                  onClick={endSession}
                  className="absolute bottom-4 px-6 py-2 bg-black border border-red-900 rounded text-sm text-red-500 hover:text-white hover:bg-red-900 transition-all z-40 font-bold"
                >
                  END COMBAT & EXTRACT DATA
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="hud-panel p-5 rounded-xl border border-red-900/50 flex flex-col justify-center">
              <h3 className="text-red-500 text-xs font-bold tracking-widest">STRIKES</h3>
              <p className="text-5xl font-black text-white">{metrics.reps}</p>
            </div>
            <div className="hud-panel p-5 rounded-xl border border-orange-600/40">
              <h3 className="text-orange-500 text-xs font-bold tracking-widest">COMBO</h3>
              <p className="text-5xl font-black text-orange-500">
                {metrics.combo}
                <span className="text-2xl text-orange-700">x</span>
              </p>
            </div>
          </div>

          <div className="hud-panel p-5 rounded-xl border border-red-900/50 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-red-500 text-xs font-bold tracking-widest">STAMINA MATRIX</h3>
                <span className="text-green-400 font-bold">{metrics.stamina}%</span>
              </div>
              <div className="w-full bg-black h-4 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.stamina > 50
                      ? 'bg-green-500'
                      : metrics.stamina > 20
                      ? 'bg-yellow-500'
                      : 'bg-red-600 animate-pulse'
                  }`}
                  style={{ width: `${metrics.stamina}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 mt-4">
                <h3 className="text-red-500 text-xs font-bold tracking-widest">KCAL BURNED</h3>
                <span className="text-cyan-400 font-bold">{metrics.calories}</span>
              </div>
            </div>
          </div>
          
          <div className="hud-panel p-5 rounded-xl border border-red-900/50 min-h-[160px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
            <h3 className="text-red-500 text-xs font-bold tracking-widest mb-3 pl-2">AI COACHING LOG</h3>
            <div className="pl-2">
              {metrics.feedback.length === 0 ? (
                <p className="text-slate-600 text-sm italic">Awaiting kinetic input...</p>
              ) : (
                metrics.feedback.map((f, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-sm mb-2 font-bold bg-black/50 border-l-2 ${
                      f.tone === 'critical'
                        ? 'text-red-500 border-red-500'
                        : f.tone === 'warn'
                        ? 'text-yellow-400 border-yellow-400'
                        : 'text-green-400 border-green-400'
                    }`}
                  >
                    &gt; {f.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}