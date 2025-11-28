# ASL Recognition - Sign Language to Text & Speech

A real-time American Sign Language (ASL) recognition web application that converts hand gestures to text and speech using AI-powered hand tracking.

![ASL Recognition App](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-green)

## ✨ Features

- **Real-time Hand Tracking** - Uses MediaPipe AI to detect and track hand landmarks
- **70+ ASL Signs Recognition** - Supports numbers, common words, and phrases
- **Text-to-Speech** - Automatically speaks detected signs aloud
- **Transcript History** - Keeps track of all recognized signs
- **Signs Guide** - Built-in reference guide showing all supported signs with descriptions
- **Modern UI** - Beautiful, responsive interface built with Tailwind CSS and shadcn/ui

## 🤟 Supported Signs (70+)

### Numbers (1-10)
| Sign | Gesture |
|------|---------|
| 1-5 | Finger counting |
| 6-9 | Thumb touching different fingers |
| 10 | Thumbs up high |

### Words & Phrases by Category

| Category | Signs |
|----------|-------|
| **Greetings** | HELLO, GOODBYE, THANK YOU, PLEASE, SORRY, EXCUSE ME, I LOVE YOU, YES, NO |
| **Actions** | HELP, STOP, GO, COME, WAIT, SIT, STAND, WALK, RUN, SLEEP, WAKE UP |
| **Food & Drink** | EAT, DRINK, WATER, MILK, HUNGRY, FULL, FOOD, BREAKFAST, LUNCH, DINNER |
| **Feelings** | HAPPY, SAD, ANGRY, SCARED, TIRED, SICK, HURT, LOVE, EXCITED, CONFUSED, SURPRISED |
| **People** | MOTHER, FATHER, FAMILY, FRIEND, BABY, BOY, GIRL, PERSON |
| **Places** | HOME, SCHOOL, WORK, STORE, HOSPITAL, CHURCH |
| **Time** | NOW, LATER, TODAY, TOMORROW, YESTERDAY, MORNING, NIGHT |
| **Questions** | WHAT, WHERE, WHEN, WHO, WHY, HOW |
| **Descriptive** | GOOD, BAD, BIG, SMALL, HOT, COLD, BEAUTIFUL, NICE |
| **Common** | MORE, WANT, NEED, LIKE, DON'T LIKE, KNOW, DON'T KNOW, LEARN, UNDERSTAND, THINK, REMEMBER, FORGET, AGAIN, BATHROOM, PLAY |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Webcam for hand tracking
- Modern browser (Chrome, Firefox, Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chaithanyavbharadvaj/Final.git
cd Final
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

## 🎮 How to Use

1. Click **"Start Camera"** to enable your webcam
2. Allow camera permissions when prompted
3. Position your hand in front of the camera
4. Make ASL signs and watch them get recognized!
5. Click **"View All Signs"** to see the complete guide of supported signs
6. Use **"Speak Transcript"** to hear all recognized signs read aloud
7. Use **"Clear"** to reset the transcript

### Tips for Best Recognition

- Ensure good lighting on your hands
- Position your hand clearly in the camera frame
- Hold signs steady for about half a second
- Keep your hand at a comfortable distance from the camera

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Hand Tracking**: MediaPipe Hands API
- **Speech**: Web Speech API (Text-to-Speech)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── WebcamCapture.tsx    # Hand tracking & gesture recognition
│   ├── CurrentGestureDisplay.tsx  # Shows current detected sign
│   ├── TranscriptDisplay.tsx      # Shows transcript history
│   └── SignsGuide.tsx       # Signs reference guide
├── pages/
│   └── Index.tsx        # Main application page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── main.tsx            # App entry point
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more ASL signs
- Improve gesture recognition accuracy
- Enhance the UI/UX
- Fix bugs

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) for the hand tracking technology
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- ASL community for sign language resources
