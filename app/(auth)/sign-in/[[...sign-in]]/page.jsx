import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#eef4ff] via-[#f8f5ff] to-[#e0f2fe] p-4 overflow-hidden">

      {/* Left Side */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center rounded-[2.5rem] overflow-hidden border border-white/40 bg-white/40 backdrop-blur-2xl shadow-[0_20px_80px_rgba(99,102,241,0.15)]">

        {/* Background Glow */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-400/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-60px] w-80 h-80 bg-purple-400/30 blur-3xl rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">

          <div className="mb-8">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent leading-tight">
              PrepAI
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-md leading-relaxed">
              Build confidence with AI-powered mock interviews,
              personalized feedback, and smarter preparation.
            </p>
          </div>

          {/* Illustration */}
          <img
            src="login.png"
            alt="PrepAI Illustration"
            className="object-contain w-full max-w-2xl drop-shadow-[0_20px_60px_rgba(79,70,229,0.35)] hover:scale-105 transition-all duration-500"
          />

          {/* Floating Cards */}
          <div className="absolute left-10 top-5 bg-white/70 backdrop-blur-xl border border-white rounded-2xl px-5 py-3 shadow-lg">
            <p className="text-sm font-semibold text-indigo-700">
              AI Mock Interviews
            </p>
          </div>

          <div className="absolute bottom-6 right-10 bg-white/70 backdrop-blur-xl border border-white rounded-2xl px-5 py-3 shadow-lg">
            <p className="text-sm font-semibold text-purple-700">
              Instant AI Feedback
            </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center relative">

        {/* Glow */}
        <div className="absolute w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full"></div>

        {/* Sign In Card */}
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/50 bg-white/60 backdrop-blur-2xl shadow-[0_20px_80px_rgba(99,102,241,0.18)] p-3">

          <div className="text-center mb-6 pt-4">
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2 text-sm">
              Sign in to continue your AI interview journey
            </p>
          </div>

          <div className="flex justify-center">
            <SignIn />
          </div>

        </div>
      </div>
    </div>
  )
}