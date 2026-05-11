import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div
                    className="hidden bg-cover lg:block lg:w-2/3"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}
                >
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-50">
                        <div>
                            {/* Brand name with accent */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-indigo-400 font-semibold tracking-widest text-sm uppercase">InterviewAI</span>
                            </div>

                            <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                                Ace Your Next Interview <br />
                                <span className="text-indigo-400">with AI-Powered Practice</span>
                            </h2>

                            <p className="max-w-xl mt-4 text-gray-300 text-base leading-relaxed">
                                Simulate real interview scenarios, get instant AI feedback on your answers,
                                and track your improvement — all in one place. Land your dream job with confidence.
                            </p>

                            {/* Feature highlights */}
                            <div className="mt-8 space-y-3">
                                {[
                                    { icon: "🎯", text: "Role-specific mock interviews tailored to your job" },
                                    { icon: "🤖", text: "Real-time AI feedback on tone, clarity & content" },
                                    { icon: "📈", text: "Track progress and identify weak spots instantly" },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-lg">{feature.icon}</span>
                                        <span className="text-gray-200 text-sm">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        {/* Mobile-only header */}
                        <div className="lg:hidden mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Interview Mocker</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Practice smarter. Interview better.</p>
                        </div>

                        <div className="mt-4">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}