# 🚀 PrepAI – AI-Powered Mock Interview Platform

PrepAI is an AI-powered mock interview platform that helps users prepare for technical interviews by generating personalized interview questions and providing instant AI-driven feedback on their answers.

## ✨ Features

- 🤖 AI-generated interview questions based on:
  - Tech Stack
  - Job Description
  - Experience Level
- 🎤 Real-time mock interview experience
- 📊 AI-powered answer evaluation
- ⭐ Performance rating for every interview
- 💡 Detailed feedback and improvement suggestions
- 🔐 Secure authentication with Clerk
- 📱 Responsive and modern UI

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Authentication
- Clerk

### AI
- Groq API (Compound Beta Mini)

### Deployment
- Vercel

## 📂 Project Structure

```
PrepAI/
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── utils/
├── package.json
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/prepai.git
```

### Navigate to the project

```bash
cd prepai
```

### Install dependencies

```bash
npm install
```

### Create a `.env.local` file

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

GROQ_API_KEY=your_key
```

### Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## 📖 How It Works

1. Sign in using Clerk Authentication.
2. Enter your:
   - Tech Stack
   - Job Role
   - Experience Level
3. PrepAI generates 5 personalized interview questions.
4. Answer each question.
5. AI evaluates your responses.
6. Receive:
   - Overall Rating
   - Detailed Feedback
   - Improvement Suggestions

## 🎯 Future Improvements

- Voice-based interviews
- Webcam support
- Resume-based question generation
- Interview history dashboard
- Multiple AI models
- Coding interview mode

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Varun Sammal**

- GitHub: https://github.com/HackStreetBoy11
- LinkedIn: https://linkedin.com/in/varun-sammal-771122256

---

⭐ If you like this project, don't forget to give it a star!
