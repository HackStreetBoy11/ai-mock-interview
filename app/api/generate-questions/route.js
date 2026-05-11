import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const { jobPosition, jobDescription, jobExperience } = await req.json();

    const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. 
    Please give me 5 interview questions with answers in JSON format. 
    Each item should have "question" and "answer" fields. 
    Return only valid JSON array, no extra text.`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: inputPrompt }],
        model: "compound-beta-mini",
        temperature: 1,
        max_completion_tokens: 1024,
    });

    const result = chatCompletion.choices[0]?.message?.content;

    // Parse JSON from AI response
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    const questions = JSON.parse(jsonMatch[0]);

    return Response.json({ questions });
}