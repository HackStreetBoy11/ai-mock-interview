import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const { question, userAnswer } = await req.json();

    const feedbackPrompt = `Question: ${question}, User Answer: ${userAnswer}. 
    Depends on question and user answer for given interview question,
    please give us rating for answer and feedback as area of improvement if any
    in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.
    Return only valid JSON object, no extra text.`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: feedbackPrompt }],
        model: "compound-beta-mini",
        temperature: 1,
        max_completion_tokens: 1024,
    });

    const result = chatCompletion.choices[0]?.message?.content;

    // Parse JSON from AI response (same pattern as your generate-question API)
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const feedback = JSON.parse(jsonMatch[0]);

    return Response.json({ feedback });
}