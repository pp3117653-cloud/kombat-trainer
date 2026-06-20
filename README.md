# KOMBAT TRAINER - Neural Athletic Engine v3.0

**Elite AI-powered combat fitness training system** with real-time pose detection, gamification, and voice coaching.

## 🚀 Features

- **MediaPipe Pose Detection**: Real-time body tracking using computer vision
- **Gamification Engine**: XP system, ranking (White Belt → Apex Predator), combo tracking
- **Boss Battle Mechanics**: Dynamic difficulty scaling based on performance
- **Real-time Metrics**: Stamina, calories, accuracy, rhythm detection
- **Voice Coaching**: AI vocal feedback and motivational prompts
- **Brag Card Generation**: Instagram-ready 9:16 performance summary cards
- **Rhythm Combat System**: 2x damage multiplier for beat-perfect strikes

## 📋 Tech Stack

- **Next.js 14.2.3** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MediaPipe Vision** - Pose estimation and tracking
- **React 18** - UI rendering

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/pp3117653-cloud/kombat-trainer.git
cd kombat-trainer

# Install dependencies
npm install
```

## 🏃 Running Locally

```bash
# Development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How It Works

1. **Click "ENGAGE SYSTEM"** to start a training session
2. **Position yourself** in front of your webcam
3. **Perform striking drills** (punches, jabs) for real-time detection
4. **Build combos** for increased damage multipliers
5. **Defeat the boss** to scale up difficulty
6. **End session** to generate your brag card

## 📊 Ranking System

- **White Belt**: 0 XP (Starting)
- **Blue Belt**: 500+ XP
- **Purple Belt**: 2,000+ XP
- **Brown Belt**: 5,000+ XP
- **Black Belt**: 10,000+ XP
- **Apex Predator**: 20,000+ XP

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

- **Netlify**: Import from Git, build command: `npm run build`, output: `.next`
- **Docker**: Create `Dockerfile` with Node.js base image
- **AWS/GCP**: Use standard Next.js deployment guides

## 📝 Environment Variables

No environment variables required for basic setup.

## 🐛 Troubleshooting

**Build Errors**: TypeScript/ESLint errors are ignored (configured in `next.config.mjs`)

**Pose Not Detected**: Ensure proper lighting and camera positioning

**Audio Issues**: Check browser audio permissions and speaker settings

## 📦 Performance Optimization

- Images unoptimized for edge deployment compatibility
- Build errors intentionally ignored for flexible development
- Lightweight MediaPipe Vision library (0.10.35)

## 📄 License

Private Repository

## 🤝 Contributing

Internal project - contact team for contributions

---

**Ready to enter the arena?** 🥊⚡
