export type ExerciseMode = 'Striking Drills' | 'Power Squats';
export type Tone = 'good' | 'warn' | 'info' | 'critical';

export interface FrameResult {
  reps: number;
  accuracy: number;
  xp: number;
  combo: number;
  stamina: number;
  bossHp: number;
  rank: string;
  calories: number;
  rhythmHit: boolean;
  feedback: { tone: Tone; text: string }[];
  isCalibrated: boolean;
}

export class ExerciseAnalyzer {
  private reps = 0;
  private xp = 0;
  private combo = 0;
  private stamina = 100;
  private bossHp = 2000;
  private calories = 0;
  private idleTimer = 0;
  private recentScores: number[] = [];
  private phase: 'up' | 'down' | 'idle' = 'idle';
  private calibrated = false;
  private calibrationFrames = 0;
  private lastSpeakTime = 0;
  private lastPulseTime = 0;
  private rhythmActive = false;
  
  public reset() {
    this.reps = 0;
    this.combo = 0;
    this.stamina = 100;
    this.bossHp = 2000;
    this.calories = 0;
    this.phase = 'idle';
    this.calibrated = false;
    this.calibrationFrames = 0;
  }

  private getRank(currentXp: number): string {
    if (currentXp > 20000) return 'APEX PREDATOR';
    if (currentXp > 10000) return 'BLACK BELT';
    if (currentXp > 5000) return 'BROWN BELT';
    if (currentXp > 2000) return 'PURPLE BELT';
    if (currentXp > 500) return 'BLUE BELT';
    return 'WHITE BELT';
  }

  private speak(text: string, timestampMs: number, priority: boolean = false) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (priority || timestampMs - this.lastSpeakTime > 4000) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1; 
        utterance.pitch = 0.8;
        window.speechSynthesis.speak(utterance);
        this.lastSpeakTime = timestampMs;
      }
    }
  }

  public processFrame(landmarks: any[] | undefined, mode: ExerciseMode, timestampMs: number): FrameResult {
    // Rhythm Pulse Logic (Beat matching)
    if (timestampMs - this.lastPulseTime > 1000) {
        this.rhythmActive = true;
        this.lastPulseTime = timestampMs;
    } else if (timestampMs - this.lastPulseTime > 300) {
        this.rhythmActive = false;
    }

    const result: FrameResult = {
      reps: this.reps,
      accuracy: this.recentScores.length ? Math.round(this.recentScores.reduce((a, b) => a + b, 0) / this.recentScores.length) : 100,
      xp: this.xp,
      combo: this.combo,
      stamina: Math.max(0, this.stamina),
      bossHp: Math.max(0, this.bossHp),
      rank: this.getRank(this.xp),
      calories: parseFloat(this.calories.toFixed(1)),
      rhythmHit: false,
      feedback: [],
      isCalibrated: this.calibrated
    };

    if (this.stamina < 100 && this.phase === 'idle') this.stamina += 0.3; 

    if (!landmarks || landmarks.length < 33) {
      result.feedback.push({ tone: 'critical', text: 'TARGET LOST. RETURN TO ZONE.' });
      this.combo = 0; 
      return result;
    }

    if (!this.calibrated) {
      this.calibrationFrames++;
      result.feedback.push({ tone: 'info', text: 'SYNCING NEURAL MESH...' });
      if (this.calibrationFrames > 30) {
        this.calibrated = true;
        this.speak("System online. Destroy the target.", timestampMs, true);
      }
      return result;
    }

    // THE IDLE TAUNT ENGINE
    if (this.phase === 'idle') {
        this.idleTimer++;
        if (this.idleTimer > 150) {
            this.speak("Are you resting? Get back in the fight!", timestampMs);
            this.idleTimer = 0;
        }
    }

    if (mode === 'Striking Drills') {
      const leftWrist = landmarks[15];
      const rightWrist = landmarks[16];
      const nose = landmarks[0];

      // Form Degradation Check
      if (leftWrist.y > nose.y + 0.15 && rightWrist.y > nose.y + 0.15) {
         if (this.stamina < 30) {
             result.feedback.push({ tone: 'warn', text: 'FATIGUE DETECTED. BREATHE.' });
         } else {
             result.feedback.push({ tone: 'warn', text: 'GUARD DROPPED! HANDS UP!' });
         }
      }

      if (this.phase === 'idle') {
        if (Math.abs(leftWrist.x - nose.x) > 0.3 || Math.abs(rightWrist.x - nose.x) > 0.3) {
            this.idleTimer = 0;
            this.reps++;
            this.combo++;
            this.stamina -= 4; 
            this.calories += 0.15; // Burn matrix
            
            let strikeMultiplier = 1;
            
            // Rhythm Kombat System
            if (this.rhythmActive) {
                strikeMultiplier = 2;
                result.rhythmHit = true;
                result.feedback.push({ tone: 'good', text: 'PERFECT TIMING! 2x DMG' });
            }

            const damage = 15 * (1 + (this.combo * 0.05)) * strikeMultiplier;
            this.bossHp -= damage;
            this.xp += Math.round(damage);

            if (this.combo === 10) {
                this.speak("Unstoppable!", timestampMs, true);
                if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Haptic Kill-Strike
            }

            if (this.bossHp <= 0) {
                this.speak("Target eliminated. Next wave incoming.", timestampMs, true);
                this.bossHp = 3000 + (this.xp * 0.1); // Boss scales up
            }

            this.phase = 'up';
            setTimeout(() => { this.phase = 'idle' }, 350);
        }
      }
    }

    result.stamina = Math.round(this.stamina);
    result.bossHp = Math.round(this.bossHp);
    result.rank = this.getRank(this.xp);
    return result;
  }
}
