# Aamir Rajper Portfolio Agent

## Runtime

Browser
  -> Netlify Function
  -> Gemini 3.1 Flash-Lite
  -> Groq GPT-OSS-120B fallback

API keys are server-side only.

## Netlify environment variables

GEMINI_API_KEY
GROQ_API_KEY

Optional:

GEMINI_MODEL
GROQ_MODEL

## Visitor controls

Five questions per browser per day.

Additional server-side lightweight rate limiting:
eight requests per IP per ten minutes per warm function.

## Scope

The agent is intentionally site-aware rather than a
general-purpose internet chatbot.

It helps visitors find:

- projects
- professional experience
- education
- publication
- documents
- CV
- services
- contact

## Future

The architecture can later add:

- project document retrieval
- GitHub code navigation
- technical report retrieval
- analytics demonstrations
- agentic operations demonstrations
- supply-chain decision-support demonstrations
