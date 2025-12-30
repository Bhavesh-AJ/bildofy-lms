1. Project Overview

You are building a Learning Management System (LMS) for Indian students (Classes 9–12), covering:

CBSE

Karnataka SSLC

Karnataka PUC

The LMS contains:

Student dashboard

AI chat tutor

Notes generator (PDF + markdown → KaTeX)

Flashcards generator (stacked, flippable cards with KaTeX-rendered math)

Test generator (MCQs, step-by-step)

Assignments, progress reporting, etc.

Frontend + Backend must integrate seamlessly.

2. System Architecture
Frontend

Next.js 14 App Router

TailwindCSS

Framer Motion animations

Components follow camelCase file names + PascalCase component names

Consistent LMS UI theme (white + blue + purple)

Floating AI chat button + expandable chat modal

Notes: modal for input, PDF viewer in-page

Flashcards: stacked deck style, flip on click, math rendered using KaTeX

Tests: redesigned flow (modal → test-taking interface → results)

Important frontend behavior rules:

All AI-generated content (notes, flashcards, chat, tests) must be rendered with KaTeX.

Components must not block pointer events (previous issue affected flashcard flipping).

Flip animation must work across entire card, not only center.

No new folders unless explicitly requested.

Backend (FastAPI)

FastAPI + SQLAlchemy Async (postgres)

RQ workers for background tasks

Playwright (Chromium) used for PDF generation

Notes PDF generation works perfectly:

HTML template → KaTeX render → PDF via headless Chrome

KaTeX is handled client-side for flashcards, tests, chat

AI requests handled via custom OpenAI API wrapper (ai_service.py)

Backend Conventions:

Clean architecture:

services/ → business logic

repositories/ → DB interface

routers/ → request handlers

schemas/ → Pydantic models

AI functions must return clean markdown with LaTeX, NOT escaped.

Notes generator uses HTML template + Playwright → final PDF.

Flashcards generator cleans LaTeX before sending to frontend.

All AI content must be processed into usable form for KaTeX.

 3. Critical Fixes Already Implemented
Notes

✔ PDF generation fixed with Playwright
✔ HTML template includes KaTeX
✔ PDF viewer modal replaced by in-page inline viewer
✔ Backend stores preprocessed content
✔ No more “Undefined font” or line-height errors

Flashcards

✔ Flip issue fixed by isolating 3D transforms
✔ KaTeX rendering failure identified:

Problem: AI output escapes LaTeX → "\\frac"

Fix: Backend unescapes LaTeX before saving
✔ Flip event fixed to work anywhere on card
✔ KaTeX injected properly but still needs final validation

General

✔ Backend event loop fixed (Windows Proactor loop)
✔ Playwright installation resolved
✔ API routing issues partially resolved
✔ Multiple errors resolved (font, character, CORS, JSON)

 4. Outstanding Issues (as of last message)

These must be carried over to new chat:

1. Flashcards endpoint returning 404

Swagger shows endpoint exists → but direct navigation returns 404.
Likely:

Wrong prefix

Wrong path in main.py

Double-prefix mounting (/api/student/api/student/...)

Or router not where frontend expects

Need to re-verify exact mounted URL from Swagger.

2. Flashcards KaTeX still not rendering

After unescaping LaTeX, still seeing raw \frac text.

Possible remaining causes:

AI output still escaping one layer

JSON loader double-escaping

Pydantic schema escaping

Frontend using incorrect content ref

HTML formatting interfering with delimiters

Missing proper delimiters after preprocessing

Needs full inspection of payload → service → router → frontend rendering.

3. Test module redesign still pending

User wants:

Modal to choose subject, chapter, difficulty

Backend generates MCQ set (JSON)

Frontend presents test interface page-by-page

Final result summary with analytics

 5. Universal Rule (Must be kept in new chat)
🧩 Everything AI-generated must be KaTeX-compatible.

This applies to:

Notes (already working, server-side KaTeX)

Flashcards (frontend KaTeX)

Tests (frontend KaTeX)

AI Chat (inline KaTeX)

Assignments

This requires:

Backend returns raw LaTeX (never escaped)

Frontend uses auto-render KaTeX

Flip and DOM transforms must not break KaTeX rendering

 6. Constraints

These must stay active in the next chat:

✳ NON-HALLUCINATION POLICY

Never invent filenames, APIs, backend functions

Ask for missing details explicitly

✳ FOLDER STRUCTURE IS LAW

No creating new folders unless explicitly asked

Follow frontend/ and backend/app/ structure strictly

✳ FRONTEND

Next.js App Router only

TailwindCSS only

Framer Motion

No random component libraries (unless approved)

✳ BACKEND

FastAPI only

SQLAlchemy Async

RQ workers for async tasks

Playwright for PDF generation

OpenAI integration through existing wrapper

 7. Current Needed Fix (High Priority)
Fix Flashcards 404 routing mismatch

Need exact route from Swagger to diagnose.

Fix Flashcards KaTeX output

LaTeX still appears raw — likely double-escaped or unescaped incorrectly.

 8. Requirements for next chat

When starting new chat, provide:

This markdown

The latest version of main.py

The exact route path shown in Swagger for flashcards

The current flashcards_service.py

The current flashcards.py router

One example of the raw AI output returned from backend

One example of the raw flashcard JSON stored in DB

 9. Summary

This markdown captures:

Project architecture

All constraints

All design rules

All fixes applied

All remaining issues

Backend + frontend conventions

KaTeX rules

PDF system

Flashcard system

Test system rewrite requirement

This is everything needed to fully restore context in the next chat.