# Combined Project Code


---

### `globals.css`

```css
@import "katex/dist/katex.min.css";
@tailwind base;
@tailwind components;
@tailwind utilities;


/* -------------------------
   Color tokens (hybrid theme)
   ------------------------- */
:root{
  --primary-deep: #0f4ff5;    /* deep blue */
  --primary-mid: #3b82f6;     /* mid blue */
  --accent-purple: #6c4ce5;   /* purple accent */
  --muted: #6b7280;           /* muted text */
  --main-text: #061a2b;       /* near-black for high contrast */
  --card-bg: #ffffff;         /* card background */
  --panel-dark-1: #071428;    /* darker panel (header / progress) */
  --panel-dark-2: #091a30;    /* gradient second stop */
  --soft-bg: #f6f9ff;         /* page background */
  --dark-bg: #101010;
  --card-bg: #ffffff;
  --border: rgba(0, 0, 0, 0.08);
  --accent-blue: #4169e1;
  --accent-purple: #6b4bff;
  --accent-purple-glow: rgba(107, 75, 255, 0.22);
  --header-height: 72px;
}

/* -------------------------
   Global page styling
   ------------------------- */
html,body,#__next {
  height: 100%;
}

body {
  @apply bg-[var(--soft-bg)] text-[var(--main-text)] antialiased;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.45;
}

/* -------------------------
   Card / panel utilities
   ------------------------- */
.card-outer {
  border-radius: 1.25rem; /* 20px */
  background: var(--card-bg);
  box-shadow: 0 8px 24px rgba(8, 20, 40, 0.06), 0 2px 6px rgba(8, 20, 40, 0.03);
}

.panel-dark {
  background: linear-gradient(180deg, var(--panel-dark-1), var(--panel-dark-2));
  color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(8, 20, 40, 0.16);
}

/* -------------------------
   Notebook spine (right panel)
   ------------------------- */
.notebook-spine {
  position: relative;
  overflow: visible;
}
.notebook-spine::after {
  content: "";
  position: absolute;
  right: -22px;
  top: 24px;
  bottom: 24px;
  width: 36px;
  border-radius: 12px;
  background: repeating-radial-gradient(circle at 8px 8px, rgba(255,255,255,0.96) 0 2px, rgba(255,255,255,0.00) 2px 14px);
  opacity: 0.9;
  mix-blend-mode: lighten;
  transform: translateX(0);
  pointer-events: none;
}

/* -------------------------
   Floating Action Button
   ------------------------- */
.fab {
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, var(--primary-mid), var(--accent-purple));
  box-shadow: 0 12px 32px rgba(15,79,245,0.18);
  z-index: 60;
}

/* -------------------------
   Small helpers
   ------------------------- */
.header-tabs .tab {
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}

.small-pill {
  background: rgba(255,255,255,0.06);
  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  font-size: 0.85rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 20, 0.55);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Lock scroll behind full-screen modals */
.modal-open {
  overflow: hidden;
}

/* ---------------------------------------- */
/* AI CHAT – FULLSCREEN INTERFACE           */
/* ---------------------------------------- */

.ai-chat-fullscreen-container {
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.24);
}

.ai-chat-header {
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
}

.ai-chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.ai-chat-footer {
  padding: 16px;
  border-top: 1px solid var(--border);
  background: var(--card-bg);
}

/* ---------------------------------------- */
/* AI CHAT – FLOATING COMPACT MODE          */
/* ---------------------------------------- */

.ai-chat-compact-container {
  position: fixed;
  bottom: 96px;
  right: 32px;
  width: 360px;
  height: 420px;
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
  z-index: 1800;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ---------------------------------------- */
/* UTILITY CLASSES                          */
/* ---------------------------------------- */

.no-select {
  user-select: none;
}

.fade-in {
  animation: fadeIn 0.26s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* perspective + preserve 3d helpers */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* make sure tailwind utilities can co-exist with these */

```

---

### `layout.tsx`

```tsx
"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

import DashboardHeader from "@/components/dashboardHeader";
import AiChatButton from "@/components/ai/aiChatButton";
import AiChatBox from "@/components/ai/aiChatBox";

import { AIChatProvider } from "@/context/aiChatContext";

const inter = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--soft-bg)] min-h-screen`}>
        <AIChatProvider>
          {/* Header */}
          <DashboardHeader />

          {/* Page container with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
            className="pt-6"
          >
            {children}
          </motion.div>

          {/* Floating AI Chat Button & Chat Box */}
          <AiChatButton />
          <AiChatBox />
        </AIChatProvider>
      </body>
    </html>
  );
}

```

---

### `page.module.css`

```css
.page {
  --background: #fafafa;
  --foreground: #fff;

  --text-primary: #000;
  --text-secondary: #666;

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;
  --button-secondary-border: #ebebeb;

  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-family: var(--font-geist-sans);
  background-color: var(--background);
}

.main {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--foreground);
  padding: 120px 60px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 24px;
}

.intro h1 {
  max-width: 320px;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -2.4px;
  text-wrap: balance;
  color: var(--text-primary);
}

.intro p {
  max-width: 440px;
  font-size: 18px;
  line-height: 32px;
  text-wrap: balance;
  color: var(--text-secondary);
}

.intro a {
  font-weight: 500;
  color: var(--text-primary);
}

.ctas {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  gap: 16px;
  font-size: 14px;
}

.ctas a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 128px;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
}

a.primary {
  background: var(--text-primary);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--button-secondary-border);
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 48px 24px;
  }

  .intro {
    gap: 16px;
  }

  .intro h1 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.92px;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }

  .page {
    --background: #000;
    --foreground: #000;

    --text-primary: #ededed;
    --text-secondary: #999;

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
    --button-secondary-border: #1a1a1a;
  }
}

```

---

### `app\page.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProgressCard from "@/components/progressCard";
import AssignmentsOverviewCard from "@/components/assignmentsOverviewCard";
import FlashcardsOverviewCard from "@/components/flashcardsOverviewCard";
import SidePanel from "@/components/sidePanel";
import FloatingActionButton from "@/components/floatingActionButton";
import SemesterTimeline from "@/components/semesterTimeline";

import { staggerContainer, slideFromBottom } from "@/components/animationVariants";

export default function DashboardPage() {
  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Helper to convert "x / y" → numeric percent
  function parseProgressFraction(fraction: string): number {
    if (!fraction.includes("/")) return 0;
    const [rawNum, rawDen] = fraction.split("/");

    const num = Number(rawNum.trim());
    const den = Number(rawDen.trim());

    if (!isFinite(num) || !isFinite(den) || den <= 0) return 0;

    return (num / den) * 100;
  }

  // Progress values (auto-calculated)
  const videoCompleted = "6 / 39";
  const testCompleted = "12 / 24";
  const assignmentCompleted = "3 / 8";

  const videoProgress = parseProgressFraction(videoCompleted);
  const testProgress = parseProgressFraction(testCompleted);
  const assignmentProgress = parseProgressFraction(assignmentCompleted);

  return (
    <main className="min-h-screen pb-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto p-6 space-y-8"
      >
        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Video Progress */}
          <motion.div variants={slideFromBottom}>
           <ProgressCard
            title="Video Progress"
            sub="Completed videos"
            completed="6 / 39"
            accuracy="17%"
            href="/videos"
            progress={parseProgressFraction("6 / 39")}
          />

          </motion.div>
          <motion.div variants={slideFromBottom}>
          {/* Test Progress */}
          <ProgressCard
            title="Test Progress"
            sub="MCQs & Tests"
            completed="12 / 24"
            accuracy="71%"
            href="/tests"
            progress={parseProgressFraction("12 / 24")}
          />
          </motion.div>
          {/* Assignment Progress */}
          <motion.div variants={slideFromBottom}>
            <ProgressCard
            title="Assignment Progress"
            sub="Pending & submitted"
            completed="3 / 8"
            accuracy="—"
            href="/assignments"
            progress={parseProgressFraction("3 / 8")}
            />
          </motion.div>

        </div>

        {/* Main Grid: Assignments + Flashcards + Side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <AssignmentsOverviewCard />
            <FlashcardsOverviewCard />
            <SemesterTimeline />
          </div>

          <div className="lg:col-span-1">
            <SidePanel />
          </div>
        </div>
      </motion.div>

      <FloatingActionButton />
    </main>
  );
}

```

---

### `app\assignments\page.tsx`

```tsx
// src/app/assignments/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Assignment = {
  id: number;
  title: string;
  description?: string;
  subject?: string;
  due_date?: string | null;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/student/assignments/");
        setAssignments(data as Assignment[]);
      } catch (err: any) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
      <div className="grid gap-4">
        {assignments.length === 0 && <div>No assignments found.</div>}
        {assignments.map((a) => (
          <div key={a.id} className="p-4 border rounded-md bg-white">
            <h2 className="font-medium">{a.title}</h2>
            <p className="text-sm text-gray-600">{a.description}</p>
            <div className="text-xs text-gray-500 mt-2">
              Subject: {a.subject || "—"} • Due: {a.due_date ? new Date(a.due_date).toLocaleString() : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

```

---

### `app\assignments\view\[assignmentId]\page.tsx`

```tsx
"use client";

import { useParams } from "next/navigation";
import AssignmentDetails from "@/components/assignments/assignmentDetails";
import AssignmentUploadBox from "@/components/assignments/assignmentUploadBox";

export default function AssignmentViewPage() {
  const { assignmentId } = useParams();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Assignment #{assignmentId}</h1>

      <AssignmentDetails assignmentId={String(assignmentId)} />

      <AssignmentUploadBox assignmentId={String(assignmentId)} />
    </main>
  );
}

```

---

### `app\flashcards\page.tsx`

```tsx
// src/app/flashcards/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import FlashcardItem from "@/components/FlashcardItem";
import { apiFetch } from "@/lib/api";

export default function FlashcardsPage() {
  const [mounted, setMounted] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [subject, setSubject] = useState("Biology");
  const [chapter, setChapter] = useState("Cell");

  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [cards, setCards] = useState<Array<{ front: string; back: string; tags?: string[] }>>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function handleGenerate(e: React.FormEvent) {
  e.preventDefault();
  setGenerating(true);
  setStatus(null);
  setCards([]);
  setIndex(0);

  try {
    const payload = {
      subject,
      chapter,
      max_cards: 20   // optional
    };

    const res = await apiFetch("/api/student/flashcards/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const returnedCards = res.cards || [];

    const normalized = returnedCards.map((c: any) => ({
      front: String(c.front || ""),
      back: String(c.back || ""),
      tags: Array.isArray(c.tags) ? c.tags : [],
    }));

    setCards(normalized);
    setOpenForm(false);
  } catch (err: any) {
    setStatus(err.message || "Failed to generate flashcards");
  } finally {
    setGenerating(false);
  }
}


  function nextCard() {
    if (cards.length === 0) return;
    setIndex(i => (i + 1) % cards.length);
  }

  function prevCard() {
    if (cards.length === 0) return;
    setIndex(i => (i - 1 + cards.length) % cards.length);
  }

  return (
    <main className="p-6 min-h-screen flex flex-col items-center">
      
      {/* Loading overlay */}
      {generating && (
        <div className="fixed inset-0 bg-black/40 z-[2000] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-lg font-semibold">Generating flashcards...</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center w-full max-w-3xl mb-6">
        <h1 className="text-2xl font-semibold">Flashcards</h1>
        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Generate Flashcards
        </button>
      </div>

      {/* Modal: subject + chapter only */}
      {openForm && (
        <div className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Generate Flashcards</h2>
              <button onClick={() => setOpenForm(false)}>✕</button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Chapter</label>
                <input value={chapter} onChange={(e) => setChapter(e.target.value)} className="mt-1 w-full border p-2 rounded" />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={generating} className="px-4 py-2 bg-blue-600 text-white rounded">
                  {generating ? "Generating..." : "Generate"}
                </button>
                <button type="button" onClick={() => setOpenForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>

              {status && <p className="text-red-500 mt-2">{status}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Flashcard stack */}
      <div className="mt-10 w-full max-w-xl flex flex-col items-center">
        {cards.length === 0 ? (
          <p className="text-gray-500">No flashcards generated yet.</p>
        ) : (
          <>
            <FlashcardItem key={index} front={cards[index].front} back={cards[index].back} />

            <div className="flex gap-6 mt-6">
              <button onClick={prevCard} className="px-4 py-2 border rounded hover:bg-gray-100">Previous</button>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                Card {index + 1} of {cards.length}
              </div>
              <button onClick={nextCard} className="px-4 py-2 border rounded hover:bg-gray-100">Next</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

```

---

### `app\flashcards\view\[chapterId]\page.tsx`

```tsx
"use client";

import { useParams } from "next/navigation";
import FlashcardSet from "@/components/flashcards/flashcardSet";
import FlashcardToolbar from "@/components/flashcards/flashcardToolbar";

export default function FlashcardViewPage() {
  const { chapterId } = useParams();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Flashcards – {chapterId}</h1>

      <FlashcardToolbar />

      <FlashcardSet chapterId={String(chapterId)} />
    </main>
  );
}

```

---

### `app\notes\page.tsx`

```tsx
// src/app/notes/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { apiFetch, API_URL } from "@/lib/api";

export default function NotesPage() {
  // -------------------------------------------------
  // ALL HOOKS MUST BE AT TOP — NO CONDITIONAL HOOKS
  // -------------------------------------------------
  const [mounted, setMounted] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  // Form fields
  const [board, setBoard] = useState("CBSE");
  const [grade, setGrade] = useState(10);
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("Electricity");
  const [difficulty, setDifficulty] = useState("Medium");

  // Results
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);

  // ---------------------------------------
  // MOUNTED GUARD — SAFE (AFTER ALL HOOKS)
  // ---------------------------------------
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <main className="p-8 min-h-screen"></main>;
  }

  // ---------------------------------------
  // HELPERS
  // ---------------------------------------
  function resetForm() {
    setBoard("CBSE");
    setGrade(10);
    setSubject("Physics");
    setChapter("Electricity");
    setDifficulty("Medium");
  }

  // ---------------------------------------
  // GENERATE NOTES
  // ---------------------------------------
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();

    setGenerating(true);
    setStatus(null);

    try {
      const payload = {
        user_id: 1,
        board,
        grade,
        subject,
        chapter,
        difficulty,
      };

      const res = await apiFetch("/notes/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setNoteId(res.id);
      const url = `${API_URL}/notes/${res.id}/pdf`;
      setPdfUrl(url);

      // Close modal
      setOpenForm(false);
    } catch (err: any) {
      setStatus(err.message || "Failed to generate notes.");
    } finally {
      setGenerating(false);
    }
  }

  // ---------------------------------------
  // PAGE JSX
  // ---------------------------------------
  return (
    <main className="p-8 min-h-screen">

      {/* --------------------------------------------------- */}
      {/* GLOBAL PROGRESS OVERLAY (ALWAYS SAFE — NO HOOKS) */}
      {/* --------------------------------------------------- */}
      {generating && (
        <div className="fixed inset-0 z-[3000] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-lg font-medium text-gray-700">
              Generating your textbook-quality PDF…
            </p>

            <p className="text-sm text-gray-500">
              AI → Markdown → KaTeX → Chromium → PDF
            </p>
          </div>
        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Notes Generator</h1>

        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
        >
          Generate Notes
        </button>
      </div>

      {/* --------------------------------------------------- */}
      {/* GENERATE NOTES MODAL */}
      {/* --------------------------------------------------- */}
      {openForm && (
        <div className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Generate Notes</h2>
              <button onClick={() => setOpenForm(false)}>✕</button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">

              <div>
                <label className="block text-sm font-medium">Board</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Grade</label>
                <input
                  type="number"
                  className="mt-1 w-full border p-2 rounded"
                  value={grade}
                  onChange={(e) => setGrade(parseInt(e.target.value || "0"))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Chapter</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Difficulty</label>
                <select
                  className="mt-1 w-full border p-2 rounded"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {generating ? "Generating…" : "Generate"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setOpenForm(false);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>

              {status && (
                <p className="text-sm text-red-500">{status}</p>
              )}
            </form>

          </div>
        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* PDF VIEWER */}
      {/* --------------------------------------------------- */}
      {pdfUrl && (
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl border p-4">

            {/* Ribbon */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Notes</h2>

              <div className="flex gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Open / Download
                </a>

                <button
                  onClick={() => alert("Cloud saving will be added later.")}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save to Cloud
                </button>
              </div>
            </div>

            <div className="w-full h-[70vh] rounded-lg overflow-hidden border">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="Generated Notes PDF"
              />
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

```

---

### `app\notes\view\[noteId]\page.tsx`

```tsx
"use client";

import { useParams } from "next/navigation";
import PdfViewer from "@/components/notes/pdfViewer";
import { motion } from "framer-motion";
import { fadeScale, slideFromBottom } from "@/components/animationVariants";

export default function NoteViewPage() {
  const { noteId } = useParams();

  return (
    <main className="p-6 space-y-6">
      <motion.h1
        variants={fadeScale}
        initial="hidden"
        animate="visible"
        className="text-2xl font-semibold"
      >
        Viewing Notes – ID: {noteId}
      </motion.h1>

      <motion.div
        variants={slideFromBottom}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow p-4"
      >
        <PdfViewer pdfUrl={`/sample-notes/${noteId}.pdf`} />
      </motion.div>
    </main>
  );
}

```

---

### `app\tests\page.tsx`

```tsx
// src/app/tests/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GeneratorModal from "./generatorModal";
import { apiFetch } from "@/lib/api";

type TestSummary = {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  count: number;
};

export default function TestsPage() {
  const [tests, setTests] = useState<TestSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchRecent();
  }, []);

  async function fetchRecent() {
    setLoading(true);
    try {
      const data = await apiFetch("/api/student/tests/");
      setTests(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tests</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Generate Test
        </button>
      </div>

      <GeneratorModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchRecent();
        }}
      />

      <section>
        {loading ? (
          <div>Loading...</div>
        ) : tests.length === 0 ? (
          <div>No tests yet. Generate one.</div>
        ) : (
          <div className="grid gap-4">
            {tests.map((t) => (
              <div key={t.id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold">{t.title}</h2>
                    <div className="text-sm text-muted">
                      {t.subject} — {t.chapter}
                    </div>
                  </div>

                  <div className="text-right">
                    <div>{t.count} questions</div>

                    <Link href={`/tests/attempt/${t.id}`}>
                      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                        Start
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

```

---

### `app\tests\attempt\[testId]\page.tsx`

```tsx
// src/app/tests/attempt/[testId]/page.tsx
"use client";

import { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

export default function AttemptPage(
  props: { params: Promise<{ testId: string }> }
) {
  const { testId } = use(props.params);

  const [test, setTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTest() {
    setLoading(true);
    try {
      const data = await apiFetch(`/api/student/tests/${testId}`);
      setTest(data);
    } catch (e) {
      console.error("Failed to load test:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && test && containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".katex-target");
      elements.forEach((el) =>
        renderMathInElement(el as HTMLElement, {
          delimiters: [
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          throwOnError: false,
        })
      );
    }
  }, [loading, test, index]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!test) return <div className="p-6">Test not found.</div>;

  const q = test.questions[index];

  function selectOption(opt: string) {
    setAnswers((prev) => ({ ...prev, [q.id]: opt }));
  }

  async function handleSubmit() {
    try {
      const data = await apiFetch(`/api/student/tests/${testId}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers }),
      });
      router.push(`/tests/results/${data.attempt_id}`);
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{test.title}</h1>
        <div>
          Question {index + 1} / {test.count}
        </div>
      </div>

      {/* KaTeX wrapper */}
      <div ref={containerRef} className="p-6 bg-white rounded-lg shadow space-y-4">
        <div className="text-lg katex-target">{q.question}</div>

        <div className="grid gap-3">
          {q.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => selectOption(opt)}
              className={`text-left p-3 rounded border katex-target ${
                answers[q.id] === opt ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="px-4 py-2 rounded border"
          disabled={index === 0}
        >
          Previous
        </button>

        {index < test.count - 1 ? (
          <button onClick={() => setIndex((i) => i + 1)} className="px-4 py-2 rounded bg-blue-600 text-white">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-green-600 text-white">
            Submit Test
          </button>
        )}
      </div>
    </main>
  );
}

```

---

### `app\tests\results\[attemptId]\page.tsx`

```tsx
// src/app/tests/results/[attemptId]/page.tsx
"use client";

import { use, useEffect, useState, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

export default function ResultsPage(props: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = use(props.params);

  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadResult() {
    setLoading(true);
    try {
      const data = await apiFetch(`/api/student/tests/attempt/${attemptId}`);
      setResult(data);
    } catch (err) {
      console.error("Attempt load failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && result && containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".katex-target");
      elements.forEach((el) =>
        renderMathInElement(el as HTMLElement, {
          delimiters: [
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          throwOnError: false,
        })
      );
    }
  }, [loading, result]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!result) return <div className="p-6">Result not found.</div>;

  return (
    <main className="p-6 space-y-6" ref={containerRef}>
      <h1 className="text-3xl font-semibold">Test Results</h1>

      <div className="text-lg">
        Score: <strong>{result.correct} / {result.total}</strong> — {result.percent}%
      </div>

      <section className="space-y-6">
        {result.per_question.map((q: any) => (
          <div key={q.id} className="p-4 bg-white rounded-lg shadow">
            <div className="mb-2 font-medium katex-target">{q.question}</div>

            <div className="mb-2 katex-target">
              Your answer: <strong>{q.selected ?? "No answer"}</strong>
            </div>

            <div className={`mb-2 ${q.is_correct ? "text-green-600" : "text-red-600"}`}>
              {q.is_correct ? "Correct" : `Incorrect — correct: ${q.correct_answer}`}
            </div>

            <div className="text-sm text-gray-600 katex-target">Solution: {q.solution}</div>
          </div>
        ))}
      </section>

      <button onClick={() => router.push("/tests")} className="px-4 py-2 rounded border">
        Back to Tests
      </button>
    </main>
  );
}

```

---

### `app\videos\page.tsx`

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, slideFromBottom } from "@/components/animationVariants";

export default function VideosPage() {
  const videos = [
    { id: "motion-basics", title: "Motion Basics", duration: "12:34", subject: "Physics" },
    { id: "photosynthesis", title: "Photosynthesis – Overview", duration: "09:12", subject: "Biology" },
    { id: "coordinate-geometry", title: "Coordinate Geometry", duration: "18:05", subject: "Math" },
  ];

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Video Lectures</h1>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {videos.map((v) => (
          <motion.div key={v.id} variants={slideFromBottom}>
            <Link href={`/videos/view/${v.id}`}>
              <div className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.subject} • {v.duration}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}

```

---

### `app\videos\view\[videoId]\page.tsx`

```tsx
"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { fadeScale, slideFromRight } from "@/components/animationVariants";
import VideoPlayer from "@/components/videos/videoPlayer";
import TranscriptBox from "@/components/videos/transcriptBox";
import NoteGeneratorButton from "@/components/videos/noteGeneratorButton";

export default function VideoViewPage() {
  const { videoId } = useParams();

  // For the prototype we map to a local placeholder path.
  // Later this will be replaced by a CDN or backend URL.
  const videoUrl = `/sample-videos/${String(videoId)}.mp4`;
  const transcriptUrl = `/sample-videos/${String(videoId)}.vtt`; // optional

  return (
    <main className="p-6 space-y-6">
      <motion.div variants={fadeScale} initial="hidden" animate="visible">
        <h1 className="text-2xl font-semibold">Lecture — {videoId}</h1>
        <p className="text-sm text-gray-600">Watch the lecture, read the transcript, or generate notes.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={slideFromRight} className="lg:col-span-2">
          <VideoPlayer src={videoUrl} />
        </motion.div>

        <motion.aside variants={fadeScale} className="space-y-4">
          <TranscriptBox transcriptUrl={transcriptUrl} />
          <NoteGeneratorButton videoId={String(videoId)} />
        </motion.aside>
      </div>
    </main>
  );
}

```

---

### `generatorModal.tsx`

```tsx
// src/app/tests/generatorModal.tsx
"use client";

import { useState } from "react";
import Portal from "@/components/Portal";
import { apiFetch } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function GeneratorModal({ open, onClose }: Props) {
  const [title, setTitle] = useState("Auto Test");
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("Chapter 1");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Mixed");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await apiFetch("/api/student/tests/generate", {
        method: "POST",
        body: JSON.stringify({
          title,
          subject,
          chapter,
          count,
          difficulty: difficulty === "Mixed" ? null : difficulty,
        }),
      });

      // navigate to attempt
      window.location.href = `/tests/attempt/${data.id}`;
    } catch (err) {
      console.error("Generation error:", err);
      setLoading(false);
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-10">
          <h3 className="text-xl font-semibold mb-4">Generate Test</h3>

          <label className="block mb-2 font-medium">Title</label>
          <input
            className="w-full p-2 border rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block mb-2 font-medium">Subject</label>
          <input
            className="w-full p-2 border rounded mb-4"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label className="block mb-2 font-medium">Chapter</label>
          <input
            className="w-full p-2 border rounded mb-4"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />

          <label className="block mb-2 font-medium">Number of Questions</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />

          <label className="block mb-2 font-medium">Difficulty</label>
          <select
            className="w-full p-2 border rounded mb-6"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Mixed</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded border">
              Cancel
            </button>

            <button
              onClick={handleGenerate}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

```

---

### `animationVariants.ts`

```ts
import { Variants } from "framer-motion";

/* ---------------------------------------- */
/* ORIGINAL VARIANTS (UNCHANGED)            */
/* ---------------------------------------- */

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.36, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.24, ease: "easeIn" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.44, ease: "easeOut" } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.28, ease: "easeIn" } },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.44, ease: "easeOut" } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.28, ease: "easeIn" } },
};

export const slideFromBottom: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: "easeOut" } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.28, ease: "easeIn" } },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.36, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.24, ease: "easeIn" } },
};

/* ---------------------------------------- */
/* NEW VARIANTS (ONLY WHAT CHAT NEEDS)      */
/* ---------------------------------------- */

/* Required for modal overlays (AI chat fullscreen, notes/tests/flashcards) */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/* Compact floating chat box animation */
export const compactChatVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.26, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

/* Fullscreen AI chat modal animation */
export const fullscreenChatVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

```

---

### `assignmentsOverviewCard.tsx`

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slideFromLeft } from "./animationVariants";
import { useRouter } from "next/navigation";

type Assignment = {
  id: string;
  title: string;
  dueDate: string; // ISO
  subject?: string;
  urgent?: boolean;
};

const demoAssignments: Assignment[] = [
  { id: "asg-101", title: "Kinematics Workbook - Q1–Q10", dueDate: "2025-11-25", subject: "Physics", urgent: true },
  { id: "asg-102", title: "Chapter 5 Exercises", dueDate: "2025-12-02", subject: "Math" },
  { id: "asg-103", title: "Organic Chemistry Notes Submission", dueDate: "2025-12-07", subject: "Chemistry" },
];

export default function AssignmentsOverviewCard() {
  const router = useRouter();

  return (
    <motion.div variants={slideFromLeft} initial="hidden" animate="visible" className="card-outer p-6 rounded-[18px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold">Assignments</h3>
          <div className="text-sm text-[var(--muted)] mt-1">Upcoming & pending assignments</div>
        </div>

        <div>
          <Link href="/assignments" className="px-4 py-2 rounded-md bg-[var(--primary-deep)] text-white">View all</Link>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {demoAssignments.map((a) => {
          const due = new Date(a.dueDate);
          const dueStr = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });

          return (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/assignments/view/${a.id}`)}>
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{a.subject}</div>
              </div>

              <div className="text-right">
                <div className={`${a.urgent ? "text-[var(--accent-purple)] font-semibold" : "text-[var(--muted)]"}`}>{dueStr}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{a.urgent ? "Urgent" : "Due"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

```

---

### `assignmentsPreview.tsx`

```tsx
"use client";

export default function AssignmentsPreview() {
  const assignments = [
    { id: 1, title: "Physics – Numerical Practice", due: "Tomorrow" },
    { id: 2, title: "Maths – Algebra Worksheet", due: "In 2 days" },
  ];

  return (
    <div className="space-y-3">
      {assignments.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-yellow-50 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-700">Due: {item.due}</p>
        </div>
      ))}
    </div>
  );
}

```

---

### `dashboardHeader.tsx`

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeScale } from "./animationVariants";

export default function DashboardHeader() {
  return (
    <motion.header
      variants={fadeScale}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-[var(--panel-dark-1)] via-[var(--panel-dark-2)] to-[#071427] text-white rounded-b-[24px] px-6 py-5"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/10 grid place-items-center font-bold">L</div>
            <div className="text-xl font-semibold">
              <Link href="/">Bildofy LMS</Link></div>
          </div>

          {/* chips / quick nav */}
          <nav className="header-tabs ml-4 flex gap-3 items-center">
            <Link href="/assignments" className="tab small-pill">Assignments</Link>
            <Link href="/tests" className="tab small-pill">Tests</Link>
            <Link href="/notes" className="tab small-pill">Notes</Link>
            <Link href="/flashcards" className="tab small-pill">Flashcards</Link>
            <Link href="/videos" className="tab small-pill">Videos</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              aria-label="Search"
              className="rounded-lg px-4 py-2 w-[340px] text-sm text-[var(--main-text)] bg-white/90"
              placeholder="Search courses, topics, or questions..."
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-[var(--primary-deep)] text-white">🔍</button>
          </div>

          <div className="flex gap-2 items-center">
            <button className="w-10 h-10 rounded-md bg-white/6 grid place-items-center">🔔</button>
            <button className="w-10 h-10 rounded-md bg-white/6 grid place-items-center">👤</button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

```

---

### `FlashcardItem.tsx`

```tsx
// src/components/FlashcardItem.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type CardProps = {
  front: string;
  back: string;
};

function markdownToHtml(md: string): string {
  if (!md) return "";
  return md
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

export default function FlashcardItem({ front, back }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const frontContentRef = useRef<HTMLDivElement>(null);
  const backContentRef = useRef<HTMLDivElement>(null);

  const frontHtml = `<p>${markdownToHtml(front)}</p>`;
  const backHtml = `<p>${markdownToHtml(back)}</p>`;

  // Load KaTeX + render formulas on both faces
  useEffect(() => {
    const renderMathSafe = (el: HTMLElement | null) => {
      if (!el) return;
      try {
        (window as any).renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false,
        });
      } catch {}
    };

    const loadKatex = () => {
      if (!document.querySelector('link[href*="katex.min.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css";
        document.head.appendChild(link);
      }

      if (typeof (window as any).renderMathInElement !== "function") {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/contrib/auto-render.min.js";
        script.async = true;
        script.onload = () => {
          renderMathSafe(frontContentRef.current);
          renderMathSafe(backContentRef.current);
        };
        document.head.appendChild(script);
      } else {
        renderMathSafe(frontContentRef.current);
        renderMathSafe(backContentRef.current);
      }
    };

    loadKatex();
  }, [frontHtml, backHtml]);

  // container — receives all clicks
  const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "800px",
    height: "18rem",
    cursor: "pointer",
    perspective: "1200px",
    WebkitPerspective: "1200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // inner flipping element
  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    WebkitTransform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    boxSizing: "border-box",
    zIndex: 5,
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "0.75rem",
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    pointerEvents: "none", // <<< important: faces do NOT intercept clicks
  };

  const frontStyle = {
    ...faceBase,
    background: "white",
  };

  const backStyle = {
    ...faceBase,
    background: "white",
    transform: "rotateY(180deg)",
    WebkitTransform: "rotateY(180deg)",
  };

  const contentStyle: React.CSSProperties = {
    width: "100%",
    maxHeight: "100%",
    overflowY: "auto",
    pointerEvents: "none", // <<< ENTIRE content is click-through
  };

  return (
    <div style={containerStyle} onClick={() => setFlipped(f => !f)}>
      <div style={innerStyle} ref={cardRef}>
        {/* FRONT */}
        <div style={frontStyle}>
          <div
            ref={frontContentRef}
            style={contentStyle}
            className="prose max-w-none text-center"
            dangerouslySetInnerHTML={{ __html: frontHtml }}
          />
        </div>

        {/* BACK */}
        <div style={backStyle}>
          <div
            ref={backContentRef}
            style={contentStyle}
            className="prose max-w-none text-center"
            dangerouslySetInnerHTML={{ __html: backHtml }}
          />
        </div>
      </div>
    </div>
  );
}

```

---

### `flashcardsOverviewCard.tsx`

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slideFromLeft } from "./animationVariants";
import { useRouter } from "next/navigation";

const demoSets = [
  { id: "ch-01", title: "Motion - Chapter 1", cards: 48 },
  { id: "ch-02", title: "Algebra - Chapter 5", cards: 36 },
  { id: "ch-03", title: "Atoms & Molecules", cards: 60 },
];

export default function FlashcardsOverviewCard() {
  const router = useRouter();

  return (
    <motion.div variants={slideFromLeft} initial="hidden" animate="visible" className="card-outer p-6 rounded-[18px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold">Flashcards</h3>
          <div className="text-sm text-[var(--muted)] mt-1">Quick practice sets by chapter</div>
        </div>

        <div>
          <Link href="/flashcards" className="px-4 py-2 rounded-md bg-[var(--accent-purple)] text-white">Open</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {demoSets.map((s) => (
          <div key={s.id} className="p-3 rounded-lg border hover:shadow-sm cursor-pointer flex items-center justify-between" onClick={() => router.push(`/flashcards/view/${s.id}`)}>
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{s.cards} cards</div>
            </div>

            <div className="text-sm text-[var(--primary-mid)]">Start</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

```

---

### `floatingActionButton.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIChat } from "@/context/aiChatContext";

export default function FloatingActionButton() {
  const { openCompact } = useAIChat();

  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  function handleAskAI() {
    openCompact();
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[2000]">
      {/* Action Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fab-menu"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col mb-3 items-end gap-3"
          >
            {/* Ask AI */}
            <button
              onClick={handleAskAI}
              className="px-4 py-2 rounded-full bg-white shadow-md border text-sm font-medium hover:bg-gray-50"
            >
              Ask AI
            </button>

            {/* Generate Notes */}
            <button
              className="px-4 py-2 rounded-full bg-white shadow-md border text-sm font-medium hover:bg-gray-50"
              onClick={() => {
                const event = new CustomEvent("open-notes-modal");
                window.dispatchEvent(event);
                setOpen(false);
              }}
            >
              Generate Notes
            </button>

            {/* Generate Test */}
            <button
              className="px-4 py-2 rounded-full bg-white shadow-md border text-sm font-medium hover:bg-gray-50"
              onClick={() => {
                const event = new CustomEvent("open-test-modal");
                window.dispatchEvent(event);
                setOpen(false);
              }}
            >
              Generate Test
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <button
        onClick={toggleMenu}
        aria-label="quick actions"
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl 
        bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] text-white text-xl font-semibold"
      >
        {open ? "×" : "+"}
      </button>
    </div>
  );
}

```

---

### `notesPreview.tsx`

```tsx
"use client";

export default function NotesPreview() {
  const notes = [
    { id: 1, title: "Motion – Chapter Notes" },
    { id: 2, title: "Chemical Reactions Summary" },
    { id: 3, title: "Trigonometry Basics – Easy Level" },
  ];

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          <p className="font-medium">{note.title}</p>
        </div>
      ))}
    </div>
  );
}

```

---

### `Portal.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

```

---

### `progressCard.tsx`

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeScale } from "./animationVariants";
import { useEffect, useRef, useState } from "react";

interface ProgressCardProps {
  title: string;
  sub: string;
  completed: string;
  accuracy?: string;
  href?: string;
  dynamicRoute?: string;
  progress: number; // numeric 0–100
}

export default function ProgressCard({
  title,
  sub,
  completed,
  accuracy,
  href,
  dynamicRoute,
  progress
}: ProgressCardProps) {
  const router = useRouter();

  // Marker position reference
  const pathRef = useRef<SVGPathElement | null>(null);
  const [markerPos, setMarkerPos] = useState({ x: 80, y: 85 });

  // --- Smooth Mountain Outline ---
  const mountainPath = `
  M20 85
  C55 40, 60 35, 90 10      // Left ridge rising
  C120 35, 125 40, 160 80   // Right ridge descending
`;


  // --- Actual Progress S-Curve ---
  const sCurvePath = `
  M100 85                // Start dead-center at mountain base
  C70 70, 110 55, 95 40 // First curve to the left then right
  C85 25, 100 20, 90 10 // Second curve tightening toward the peak
`;


  // Compute marker position safely
  useEffect(() => {
    const pct = Number(progress);
    if (!isFinite(pct)) return;

    const path = pathRef.current;
    if (!path) return;

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      return;
    }

    if (!isFinite(length) || length === 0) return;

    const dist = (pct / 100) * length;
    if (!isFinite(dist)) return;

    let p;
    try {
      p = path.getPointAtLength(dist);
    } catch {
      return;
    }

    if (isFinite(p.x) && isFinite(p.y)) {
      setMarkerPos({ x: p.x, y: p.y });
    }
  }, [progress]);

  const cardInner = (
    <div className="panel-dark p-5 rounded-2xl min-h-[200px] flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-transform">

      {/* Title */}
      <div>
        <div className="text-sm text-white font-semibold">{title}</div>
        <div className="text-xs text-blue-200/70 mt-1">{sub}</div>
      </div>

      {/* SVG Graphic */}
      <div className="flex justify-center py-3">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">

          {/* Mountain outline */}
          <path
            d={mountainPath}
            stroke="rgba(140,180,255,0.35)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Invisible measurable path */}
          <path
            ref={pathRef}
            d={sCurvePath}
            stroke="transparent"
            strokeWidth="2"
            fill="none"
          />

          {/* Remaining path */}
          <path
            d={sCurvePath}
            stroke="rgba(160,200,255,0.25)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Completed path */}
          <path
            d={sCurvePath}
            stroke="#8AB3FF"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,500"
              to={`${progress * 3}, 500`}
              dur="0.6s"
              fill="freeze"
            />
          </path>

          {/* Marker */}
          <circle cx={markerPos.x} cy={markerPos.y} r="6" fill="#4EA1FF">
            <animate
              attributeName="opacity"
              values="1;0.55;1"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-white/90">
        <div className="text-center">
          <div className="font-semibold">{completed}</div>
          <div className="text-xs text-blue-200/75 mt-1">Completed</div>
        </div>

        <div className="text-center">
          <div className="font-semibold">{accuracy ?? "—"}</div>
          <div className="text-xs text-blue-200/75 mt-1">Accuracy</div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.div variants={fadeScale} initial="hidden" animate="visible">
        <Link href={href}>{cardInner}</Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeScale} initial="hidden" animate="visible" onClick={() => dynamicRoute && router.push(dynamicRoute)}>
      {cardInner}
    </motion.div>
  );
}

```

---

### `quickActions.tsx`

```tsx
"use client";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <button className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
        Generate Notes
      </button>
      <button className="px-5 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition">
        View Assignments
      </button>
      <button className="px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
        Attempt Test
      </button>
    </div>
  );
}

```

---

### `sectionContainer.tsx`

```tsx
"use client";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionContainer({
  title,
  children,
}: SectionContainerProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

```

---

### `semesterTimeline.tsx`

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import TimelineModal from "./timelineModal";
import { fadeScale } from "./animationVariants";
import { format, differenceInDays, parseISO } from "date-fns";

type MarkerType = "assignment" | "test" | "event";

type Marker = {
  id: string;
  date: string; // ISO, e.g. 2025-11-25
  title: string;
  type: MarkerType;
  href?: string;
  description?: string;
};

const demoMarkers: Marker[] = [
  { id: "m1", date: "2025-09-01", title: "Semester Starts", type: "event", description: "Semester begins" },
  { id: "t1", date: "2025-10-05", title: "Unit Test 1", type: "test", href: "/tests/attempt/201", description: "Unit test on chapters 1-3" },
  { id: "a1", date: "2025-10-20", title: "Assignment 1 Due", type: "assignment", href: "/assignments/view/asg-101", description: "Submit numericals" },
  { id: "t2", date: "2025-11-15", title: "Midterm", type: "test", href: "/tests/attempt/301", description: "Midterm exam" },
  { id: "a2", date: "2025-11-25", title: "Assignment 2 Due", type: "assignment", href: "/assignments/view/asg-102", description: "Chapter 5 exercises" },
  { id: "end", date: "2025-12-20", title: "Semester Ends", type: "event", description: "End of term" },
];

function colorForType(t: MarkerType) {
  if (t === "assignment") return "bg-[var(--accent-purple)]";
  if (t === "test") return "bg-[var(--primary-deep)]";
  return "bg-[var(--primary-mid)]";
}

export default function SemesterTimeline() {
  const [markers] = useState<Marker[]>(demoMarkers);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<Marker | null>(null);

  // epoch days range
  const startDate = useMemo(() => parseISO(markers[0].date), [markers]);
  const endDate = useMemo(() => parseISO(markers[markers.length - 1].date), [markers]);
  const totalDays = Math.max(1, differenceInDays(endDate, startDate));

  const today = new Date();
  const clampedToday = today < startDate ? startDate : (today > endDate ? endDate : today);
  const todayOffsetDays = differenceInDays(clampedToday, startDate);
  const todayPct = Math.max(0, Math.min(1, todayOffsetDays / totalDays));

  // scroll to today on mount
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // center today marker after a tick
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.querySelector(`[data-today="1"]`);
    if (!child) return;
    const rect = (child as HTMLElement).offsetLeft - el.clientWidth / 2 + (child as HTMLElement).clientWidth / 2;
    el.scrollTo({ left: rect, behavior: "smooth" });
  }, []);

  function handleMarkerClick(m: Marker) {
    setActive(m);
    setModalOpen(true);
  }

  return (
    <>
      <motion.div variants={fadeScale} initial="hidden" animate="visible" className="card-outer p-6 rounded-[18px]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Semester Timeline</h3>
            <div className="text-sm text-[var(--muted)] mt-1">Overview of the semester — assignments, tests and milestones</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative">
            {/* timeline bar */}
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide" ref={scrollerRef}>
              <div className="relative min-w-[900px] w-max py-6 px-6">
                {/* line */}
                <div className="h-2 rounded-full bg-gradient-to-r from-[#e7f0ff] via-[#eef4ff] to-[#f6eefb] absolute left-6 right-6 top-8"></div>

                {/* markers */}
                {markers.map((m, i) => {
                  const days = differenceInDays(parseISO(m.date), startDate);
                  const pct = Math.max(0, Math.min(1, days / totalDays));
                  // position in px relative to container width (we use relative in-line styling)
                  const leftPct = `${pct * 100}%`;

                  return (
                    <div key={m.id} className="absolute" style={{ left: leftPct, top: 0 }}>
                      <div className="flex flex-col items-center -translate-x-1/2">
                        {/* checkpoint shape */}
                        <button
                          aria-label={m.title}
                          onClick={() => handleMarkerClick(m)}
                          className={`w-6 h-6 rounded-full ${colorForType(m.type)} ring-2 ring-white shadow-lg`}
                        />
                        <div className="mt-2 text-xs text-[var(--muted)] text-center w-28">
                          <div className="font-medium">{m.title}</div>
                          <div className="mt-1">{format(parseISO(m.date), "dd MMM")}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* TODAY marker */}
                <div style={{ left: `${todayPct * 100}%` }} className="absolute top-6 -translate-x-1/2" data-today="1">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[var(--primary-mid)] shadow-[0_6px_18px_rgba(59,130,246,0.18)] animate-pulse-slow"></div>
                    <div className="mt-2 text-xs text-[var(--primary-mid)] font-medium">Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* legend */}
            <div className="mt-4 flex gap-4 items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--accent-purple)]" /> Assignment</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--primary-deep)]" /> Test</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--primary-mid)]" /> Event</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* modal */}
      <TimelineModal open={modalOpen} onClose={() => setModalOpen(false)} marker={active} />
    </>
  );
}

```

---

### `sidePanel.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";

export default function SidePanel() {
  // Mounted guard to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function openNotesModal() {
    window.dispatchEvent(new Event("open-notes-modal"));
  }
  function openTestModal() {
    window.dispatchEvent(new Event("open-test-modal"));
  }
  function openFlashcardsModal() {
    window.dispatchEvent(new Event("open-flashcards-modal"));
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

      <button
        onClick={openNotesModal}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Generate Notes
      </button>

      <button
        onClick={openTestModal}
        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Generate Test
      </button>

      <button
        onClick={openFlashcardsModal}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Generate Flashcards
      </button>

      <p className="text-xs text-gray-500 pt-2">
        Use these tools to quickly generate study content.
      </p>
    </div>
  );
}

```

---

### `summaryCard.tsx`

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SummaryCardProps {
  title: string;
  description: string;
  href?: string; // static navigation
  dynamicRoute?: string; // JS navigation
  className?: string;
}

export default function SummaryCard({
  title,
  description,
  href,
  dynamicRoute,
  className = "",
}: SummaryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (dynamicRoute) router.push(dynamicRoute);
  };

  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow p-6 cursor-pointer ${className}`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return <div onClick={handleClick}>{cardContent}</div>;
}

```

---

### `timelineModal.tsx`

```tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeScale } from "./animationVariants";

type Marker = {
  id: string;
  date?: string;
  title?: string;
  type?: string;
  href?: string;
  description?: string;
};

export default function TimelineModal({ open, onClose, marker }: { open: boolean; onClose: () => void; marker: Marker | null }) {
  const router = useRouter();

  if (!open || !marker) return null;

  const openDeep = () => {
    if (marker.href) router.push(marker.href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div variants={fadeScale} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 z-50 w-full max-w-lg shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{marker.title}</h3>
            <div className="text-sm text-[var(--muted)] mt-1">{marker.date}</div>
          </div>

          <button onClick={onClose} className="text-[var(--muted)]">✕</button>
        </div>

        <div className="mt-4 text-sm text-[var(--muted)]">
          {marker.description ?? "No extra details available."}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {marker.href && <button onClick={openDeep} className="px-4 py-2 bg-[var(--primary-deep)] text-white rounded-md">Open</button>}
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-md">Close</button>
        </div>
      </motion.div>
    </div>
  );
}

```

---

### `topNav.tsx`

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white shadow-sm p-4 flex justify-between items-center"
    >
      <Link href="/" className="text-xl font-semibold text-blue-700">
        LMS Dashboard
      </Link>

      <div className="flex gap-6 text-gray-700 font-medium">
        <Link href="/notes" className="hover:text-blue-600">
          Notes
        </Link>
        <Link href="/flashcards" className="hover:text-blue-600">
          Flashcards
        </Link>
        <Link href="/assignments" className="hover:text-blue-600">
          Assignments
        </Link>
        <Link href="/tests" className="hover:text-blue-600">
          Tests
        </Link>
        <Link href="/videos" className="hover:text-blue-600">
          Videos
        </Link>
      </div>
    </motion.nav>
  );
}

```

---

### `upcomingTests.tsx`

```tsx
"use client";

export default function UpcomingTests() {
  const tests = [
    { id: 1, title: "Biology – Cell Structure", date: "Friday" },
    { id: 2, title: "Maths – Coordinate Geometry", date: "Monday" },
  ];

  return (
    <div className="space-y-3">
      {tests.map((test) => (
        <div
          key={test.id}
          className="p-4 bg-green-50 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          <p className="font-semibold">{test.title}</p>
          <p className="text-sm text-gray-700">On: {test.date}</p>
        </div>
      ))}
    </div>
  );
}

```

---

### `weeklyProgress.tsx`

```tsx
"use client";

export default function WeeklyReport() {
  return (
    <div className="space-y-3">
      <p className="text-gray-700">
        • Your performance improved by <span className="font-semibold">12%</span>
        this week.
      </p>
      <p className="text-gray-700">
        • Homework completion rate:{" "}
        <span className="font-semibold">92%</span>
      </p>
      <p className="text-gray-700">
        • Subjects needing attention:{" "}
        <span className="text-red-600 font-medium">Physics, Maths</span>
      </p>
    </div>
  );
}

```

---

### `aiChatBox.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIChat } from "@/context/aiChatContext";
import { apiFetch } from "@/lib/api";
import {
  compactChatVariants,
  fullscreenChatVariants,
  overlayVariants,
} from "@/components/animationVariants";
import RenderFormattedText from "@/lib/renderFormattedText";
import "katex/dist/katex.min.css";

/* Minimal fallback icons */
function IconMaximize() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor">
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function IconMinimize() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M5 12h14" fill="none" strokeWidth="1.5" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M6 6l12 12M6 18L18 6" fill="none" strokeWidth="1.5" />
    </svg>
  );
}

export default function AiChatBox() {
  // MOUNTED GUARD
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ALL HOOKS MUST COME BEFORE ANY CONDITIONAL RETURN
  const {
    mode,
    messages,
    addMessage,
    openCompact,
    openFullscreen,
    minimize,
    close,
    clearChat,
  } = useAIChat();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (mode === "fullscreen") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mode]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    addMessage("user", text);
    setInput("");
    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = { user_id: 1, question: text, context: [] };
      const res = await apiFetch("/api/student/doubt/ask", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const reply = res?.response ?? "No response from AI.";
      addMessage("assistant", reply);
    } catch (err: any) {
      const message = err?.message || "Failed to reach AI.";
      setErrorMsg(message);
      addMessage("assistant", "Error: " + message);
    } finally {
      setLoading(false);
    }
  }

  function handleInputKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  // DO NOT RETURN EARLY — Instead hide UI until mounted
  const hiddenUntilMounted = !mounted || mode === "closed";

  return (
    <>
      {/* Nothing renders until mounted and chat opened */}
      {hiddenUntilMounted ? null : (
        <>
          {/* Compact Chat */}
          <AnimatePresence>
            {mode === "compact" && (
              <motion.div
                key="ai-compact"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={compactChatVariants}
                className="ai-chat-compact-container fixed bottom-6 right-6 z-[2200] w-[320px] rounded-2xl shadow-lg bg-white overflow-hidden"
                role="dialog"
              >
                <div className="ai-chat-header flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Ask AI</div>
                      <div className="text-xs text-gray-500">Study Assistant</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      onClick={openFullscreen}
                    >
                      <IconMaximize />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      onClick={close}
                    >
                      <IconClose />
                    </button>
                  </div>
                </div>

                <div
                  ref={bodyRef}
                  className="ai-chat-body px-4 py-3 max-h-[320px] overflow-auto"
                >
                  {messages.length === 0 && (
                    <div className="text-sm text-gray-500">
                      Ask anything from the syllabus.
                    </div>
                  )}

                  <div className="flex flex-col gap-3 mt-2">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-md text-sm ${
                          m.role === "user"
                            ? "self-end bg-[rgba(65,105,225,0.12)]"
                            : "self-start bg-[rgba(0,0,0,0.04)]"
                        }`}
                      >
                        <RenderFormattedText text={m.content} />
                      </div>
                    ))}
                    {loading && (
                      <div className="text-xs text-gray-500">AI is thinking…</div>
                    )}
                    {errorMsg && (
                      <div className="text-xs text-red-500">{errorMsg}</div>
                    )}
                  </div>
                </div>

                <div className="ai-chat-footer p-3 border-t">
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleInputKey}
                      placeholder="Type your question..."
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={() => void sendMessage()}
                      disabled={loading || input.trim() === ""}
                      className="px-3 py-2 bg-[var(--accent-blue)] text-white rounded-md disabled:opacity-60"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fullscreen Chat */}
          <AnimatePresence>
            {mode === "fullscreen" && (
              <>
                <motion.div
                  key="ai-overlay"
                  className="fixed inset-0 z-[2300] bg-black/40"
                  onClick={minimize}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={overlayVariants}
                />

                <motion.div
                  key="ai-fullscreen"
                  className="fixed inset-0 z-[2301] flex items-center justify-center p-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fullscreenChatVariants}
                >
                  <div className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold">
                          AI
                        </div>
                        <div>
                          <div className="text-lg font-semibold">AI Tutor</div>
                          <div className="text-xs text-gray-500">
                            Assistant for Grades 9–12
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={minimize}
                        >
                          <IconMinimize />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={clearChat}
                        >
                          Clear
                        </button>
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={close}
                        >
                          <IconClose />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={bodyRef}
                      className="flex-1 px-6 py-4 overflow-auto"
                    >
                      {messages.length === 0 && (
                        <div className="text-sm text-gray-500">
                          Start a conversation — ask a question.
                        </div>
                      )}

                      <div className="flex flex-col gap-4">
                        {messages.map((m, idx) => (
                          <div
                            key={idx}
                            className={`max-w-[85%] p-3 rounded-lg whitespace-pre-wrap text-sm ${
                              m.role === "user"
                                ? "self-end bg-[var(--accent-blue)] text-white"
                                : "self-start bg-[rgba(0,0,0,0.04)] text-black"
                            }`}
                          >
                            <RenderFormattedText text={m.content} />
                          </div>
                        ))}

                        {loading && (
                          <div className="text-sm text-gray-500">
                            AI is thinking…
                          </div>
                        )}
                        {errorMsg && (
                          <div className="text-sm text-red-500">
                            {errorMsg}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t">
                      <div className="max-w-4xl mx-auto w-full flex items-center gap-3">
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleInputKey}
                          rows={2}
                          placeholder="Ask your question... (Enter to send)"
                          className="flex-1 px-3 py-2 border rounded-md resize-none"
                        />
                        <button
                          onClick={() => void sendMessage()}
                          disabled={loading || input.trim() === ""}
                          className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-md disabled:opacity-60"
                        >
                          {loading ? "Thinking…" : "Send"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

```

---

### `aiChatButton.tsx`

```tsx
"use client";

import React from "react";
import { useAIChat } from "@/context/aiChatContext";

export default function AiChatButton(){
  const { mode, openCompact, openFullscreen, minimize, close } = useAIChat();

  function handleClick() {
    if (mode === "closed") {
      openCompact();
      return;
    }
    if (mode === "compact") {
      // expand to full screen
      openFullscreen();
      return;
    }
    if (mode === "fullscreen") {
      // minimize back to compact
      minimize();
      return;
    }
  }

  return (
    <div aria-hidden className="fixed bottom-6 right-6 z-1900">
      <button
        onClick={handleClick}
        aria-label="Open AI chat"
        title="Open AI chat"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] text-white text-lg font-semibold"
      >
        AI
      </button>
    </div>
  );
}

```

---

### `aiChatInput.tsx`

```tsx
"use client";

import { useState } from "react";
import { useChatStore } from "@/components/ai/useChatStore";

export default function AiChatInput() {
  const [value, setValue] = useState("");
  const sendMessage = useChatStore((s) => s.sendMessage);

  const submit = () => {
    if (!value.trim()) return;
    sendMessage(value);
    setValue("");
  };

  return (
    <div className="p-3 border-t flex gap-2 bg-white">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Ask a question..."
        className="flex-1 border rounded-xl p-2 text-sm bg-gray-50"
      />
      <button
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}

```

---

### `aiChatMessage.tsx`

```tsx
"use client";

interface AiChatMessageProps {
  sender: "user" | "ai";
  text: string;
  expanded: boolean;
}

export default function AiChatMessage({ sender, text, expanded }: AiChatMessageProps) {
  const isUser = sender === "user";

  if (expanded) {
    // ChatGPT-style long-form message
    return (
      <div
        className={`w-full p-4 rounded-xl shadow-sm border 
          ${isUser ? "bg-white" : "bg-gray-100"}
        `}
      >
        <p className="whitespace-pre-wrap text-gray-900">{text}</p>
      </div>
    );
  }

  // Compact bubble mode
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl shadow 
          ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}
        `}
      >
        {text}
      </div>
    </div>
  );
}

```

---

### `typingIndicator.tsx`

```tsx
"use client";

export default function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center ml-2">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></span>
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></span>
    </div>
  );
}

```

---

### `useChatStore.ts`

```ts
"use client";

import { create } from "zustand";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface ChatState {
  isOpen: boolean;
  isExpanded: boolean;
  messages: Message[];
  isTyping: boolean;

  openChat: () => void;
  closeChat: () => void;
  expandChat: () => void;
  collapseChat: () => void;

  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  isExpanded: false,
  messages: [],
  isTyping: false,

  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false, isExpanded: false }),
  expandChat: () => set({ isExpanded: true }),
  collapseChat: () => set({ isExpanded: false }),

  sendMessage: async (text: string) => {
    set((s) => ({
      messages: [...s.messages, { sender: "user", text }],
    }));

    set({ isTyping: true });

    await new Promise((r) => setTimeout(r, 900));

    set((s) => ({
      isTyping: false,
      messages: [
        ...s.messages,
        { sender: "ai", text: `AI generated answer to: "${text}"` },
      ],
    }));
  },
}));

```

---

### `assignmentCard.tsx`

```tsx
"use client";

interface AssignmentCardProps {
  title: string;
  due: string;
  status: string;
}

export default function AssignmentCard({
  title,
  due,
  status
}: AssignmentCardProps) {
  const statusColor: Record<string, string> = {
    Pending: "text-red-600",
    "In Progress": "text-yellow-600",
    Submitted: "text-green-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition cursor-pointer space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">Due: {due}</p>
      <p className={`font-medium text-sm ${statusColor[status] || "text-gray-600"}`}>
        Status: {status}
      </p>
    </div>
  );
}

```

---

### `assignmentDetails.tsx`

```tsx
"use client";

interface AssignmentDetailsProps {
  assignmentId: string;
}

export default function AssignmentDetails({ assignmentId }: AssignmentDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Assignment Details</h2>

      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder
        instruction set for assignment #{assignmentId}.
      </p>

      <ul className="list-disc pl-6 space-y-1 text-gray-700">
        <li>Solve the numerical questions from the textbook.</li>
        <li>Submit your solutions in PDF or image format.</li>
        <li>Graphs must be drawn neatly with labeling.</li>
      </ul>

      <p className="text-gray-700 text-sm">
        Make sure to submit before the due date.
      </p>
    </div>
  );
}

```

---

### `assignmentUploadBox.tsx`

```tsx
"use client";

import { useState } from "react";

interface AssignmentUploadBoxProps {
  assignmentId: string;
}

export default function AssignmentUploadBox({ assignmentId }: AssignmentUploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Submit Your Assignment</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-600 border rounded-lg p-2 bg-gray-50"
      />

      {file && (
        <p className="text-sm text-green-600">
          Selected file: {file.name}
        </p>
      )}

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        onClick={() => alert("Assignment submitted (prototype).")}
      >
        Submit Assignment
      </button>
    </div>
  );
}

```

---

### `flashcard.tsx`

```tsx
"use client";

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { fadeScale } from "@/components/animationVariants";

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeScale}
      initial="hidden"
      animate="visible"
      className="flex justify-center"
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front Side */}
        <div
          className="w-80 h-52 bg-white p-6 flex items-center justify-center rounded-xl shadow cursor-pointer"
          onClick={() => setIsFlipped(true)}
        >
          <p className="text-lg font-medium text-center">{front}</p>
        </div>

        {/* Back Side */}
        <div
          className="w-80 h-52 bg-blue-600 text-white p-6 flex items-center justify-center rounded-xl shadow cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          <p className="text-lg font-medium text-center">{back}</p>
        </div>
      </ReactCardFlip>
    </motion.div>
  );
}

```

---

### `flashcardSet.tsx`

```tsx
"use client";

import Flashcard from "@/components/flashcards/flashcard";
import { motion } from "framer-motion";
import { staggerContainer } from "@/components/animationVariants";

const flashcardData: Record<string, { front: string; back: string }[]> = {
  motion: [
    { front: "What is motion?", back: "A change in position with time." },
    { front: "SI unit of speed?", back: "Meters per second (m/s)." },
    { front: "Formula for velocity?", back: "Velocity = Displacement / Time" },
  ],
  algebra: [
    { front: "What is a variable?", back: "A symbol representing a number." },
    { front: "What is a constant?", back: "A fixed value." },
  ],
  atoms: [
    { front: "Who discovered the atom?", back: "John Dalton." },
    { front: "What is an ion?", back: "Charged atom or molecule." },
  ],
};

interface FlashcardSetProps {
  chapterId: string;
}

export default function FlashcardSet({ chapterId }: FlashcardSetProps) {
  const cards = flashcardData[chapterId] || [];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6"
    >
      {cards.map((card, index) => (
        <Flashcard key={index} front={card.front} back={card.back} />
      ))}
    </motion.div>
  );
}

```

---

### `flashcardToolbar.tsx`

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function FlashcardToolbar() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <button
        className="px-5 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300 transition"
        onClick={() => router.back()}
      >
        Back
      </button>

      <button className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
        Shuffle
      </button>

      <button className="px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
        View All
      </button>
    </div>
  );
}

```

---

### `notesCard.tsx`

```tsx
"use client";

interface NotesCardProps {
  title: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function NotesCard({
  title,
  subject,
  difficulty,
}: NotesCardProps) {
  const difficultyColors: Record<string, string> = {
    Easy: "text-green-600",
    Medium: "text-yellow-600",
    Hard: "text-red-600",
  };

  return (
    <div className="cursor-pointer bg-white p-5 rounded-2xl shadow hover:shadow-md transition space-y-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{subject}</p>
      <p className={`font-medium text-sm ${difficultyColors[difficulty]}`}>
        Difficulty: {difficulty}
      </p>
    </div>
  );
}

```

---

### `pdfViewer.tsx`

```tsx
"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className="shadow mb-6"
          />
        ))}
      </Document>
    </div>
  );
}

```

---

### `badge.tsx`

```tsx
"use client";

interface BadgeProps {
  label: string;
  color?: "gray" | "green" | "red" | "yellow" | "blue";
}

export default function Badge({ label, color = "gray" }: BadgeProps) {
  const map = {
    gray: "bg-gray-200 text-gray-700",
    green: "bg-green-200 text-green-700",
    red: "bg-red-200 text-red-700",
    yellow: "bg-yellow-200 text-yellow-700",
    blue: "bg-blue-200 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${map[color]}`}>
      {label}
    </span>
  );
}

```

---

### `baseCard.tsx`

```tsx
"use client";

export default function BaseCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow p-5 hover:shadow-md transition cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

```

---

### `button.tsx`

```tsx
"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary" | "subtle";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    subtle: "bg-transparent text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-5 py-3 rounded-xl shadow transition disabled:opacity-50 ${styles[type]} ${className}`}
    >
      {children}
    </button>
  );
}

```

---

### `divider.tsx`

```tsx
export default function Divider() {
  return <hr className="border-gray-300 my-4" />;
}

```

---

### `loader.tsx`

```tsx
"use client";

export default function Loader({ overlay = false }: { overlay?: boolean }) {
  return overlay ? (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <Spinner />
    </div>
  ) : (
    <Spinner />
  );
}

function Spinner() {
  return (
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  );
}

```

---

### `modal.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import Button from "@/components/shared/button";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow max-w-md w-full"
      >
        {children}

        <div className="text-right mt-4">
          <Button type="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

```

---

### `sectionWrapper.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeScale } from "@/components/animationVariants";

export default function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      variants={fadeScale}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.section>
  );
}

```

---

### `toast.tsx`

```tsx
"use client";

export default function Toast({
  message,
  type = "info",
}: {
  message: string;
  type?: "info" | "success" | "error";
}) {
  const colors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div
      className={`px-4 py-2 text-white rounded-xl shadow ${colors[type]} animate-slide-in`}
    >
      {message}
    </div>
  );
}

```

---

### `toastContainer.tsx`

```tsx
"use client";

export default function ToastContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50">
      {children}
    </div>
  );
}

```

---

### `testListItem.tsx`

```tsx
"use client";

interface TestListItemProps {
  id: number;
  title: string;
  difficulty: string;
  duration: number;
}

export default function TestListItem({ title, difficulty, duration }: TestListItemProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition cursor-pointer flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm">Difficulty: {difficulty}</p>
      </div>
      <p className="text-gray-700">{duration} min</p>
    </div>
  );
}

```

---

### `testOption.tsx`

```tsx
"use client";

interface TestOptionProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export default function TestOption({ text, selected, onClick }: TestOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border transition
        ${
          selected
            ? "bg-blue-600 text-white border-blue-700"
            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
        }
      `}
    >
      {text}
    </button>
  );
}

```

---

### `testQuestion.tsx`

```tsx
"use client";

import TestOption from "@/components/tests/testOption";

interface TestQuestionProps {
  data: { question: string; options: string[] };
  selected: number | undefined;
  onSelect: (optionIndex: number) => void;
}

export default function TestQuestion({ data, selected, onSelect }: TestQuestionProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">{data.question}</h2>

      <div className="space-y-3">
        {data.options.map((option, idx) => (
          <TestOption
            key={idx}
            text={option}
            selected={selected === idx}
            onClick={() => onSelect(idx)}
          />
        ))}
      </div>
    </div>
  );
}

```

---

### `TestQuestionCard.tsx`

```tsx
// src/components/tests/TestQuestionCard.tsx
"use client";

import React from "react";

type Props = {
  q: any;
  selected?: string | null;
  onSelect: (option: string) => void;
};

export default function TestQuestionCard({ q, selected, onSelect }: Props) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* question may contain KaTeX delimiters like \( ... \) */}
      <div className="mb-4 text-lg">{q.question}</div>

      <div className="grid gap-3">
        {q.options.map((opt: string, idx: number) => {
          const isSelected = selected === opt;
          return (
            <button
              key={idx}
              onClick={() => onSelect(opt)}
              className={`text-left p-3 rounded border ${isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

```

---

### `testResultCard.tsx`

```tsx
"use client";

interface TestResultCardProps {
  title: string;
  score: number;
  total: number;
  difficulty: string;
}

export default function TestResultCard({
  title,
  score,
  total,
  difficulty
}: TestResultCardProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-gray-700 text-lg">
        Score: <span className="font-semibold">{score}/{total}</span>
      </p>

      <p className="text-gray-700">Difficulty: {difficulty}</p>

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-gray-700 font-semibold">{percentage}%</p>
    </div>
  );
}

```

---

### `testTimer.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";

interface TestTimerProps {
  minutes: number;
}

export default function TestTimer({ minutes }: TestTimerProps) {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = Math.floor(time / 60);
  const ss = time % 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow w-max">
      <p className="text-xl font-semibold">
        {mm}:{ss.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

```

---

### `noteGeneratorButton.tsx`

```tsx
"use client";

import { useState } from "react";

interface NoteGeneratorButtonProps {
  videoId: string;
}

export default function NoteGeneratorButton({ videoId }: NoteGeneratorButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setMessage(null);

    try {
      // Prototype: POST to a placeholder endpoint.
      // Replace `/api/generate-notes` with your real endpoint later.
      const res = await fetch("/api/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      if (!res.ok) throw new Error("Request failed");

      const json = await res.json();
      // expecting { success: true, noteId: "123", message: "..." }
      setMessage(json.message ?? "Notes generated.");
    } catch (err) {
      setMessage("Failed to generate notes. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
      <p className="text-sm text-gray-700">Generate AI notes for this lecture</p>

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Notes"}
        </button>

        <a
          href={`/videos/view/${videoId}/download-notes`}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Download Latest Notes
        </a>
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}

```

---

### `transcriptBox.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

interface TranscriptBoxProps {
  transcriptUrl?: string;
}

export default function TranscriptBox({ transcriptUrl }: TranscriptBoxProps) {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!transcriptUrl) {
      // placeholder transcript for prototype
      setTranscript(
        `00:00 Introduction to topic
00:30 Key concept one explained
02:15 Worked example and explanation
05:40 Summary and next steps`
      );
      return;
    }

    // Try to fetch a .vtt or .txt transcript – non-blocking
    fetch(transcriptUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => setTranscript(text))
      .catch(() => {
        // fallback placeholder
        setTranscript(
          `00:00 Introduction to topic
00:30 Key concept one explained
02:15 Worked example and explanation
05:40 Summary and next steps`
        );
      });
  }, [transcriptUrl]);

  const filtered = query
    ? transcript
        ?.split("\n")
        .filter((l) => l.toLowerCase().includes(query.toLowerCase()))
        .join("\n")
    : transcript;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Transcript</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((s) => !s)}
            className="px-3 py-1 bg-gray-100 rounded-md"
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transcript..."
          className="w-full text-sm p-2 border rounded-md bg-gray-50"
        />
      </div>

      {expanded && (
        <pre className="text-sm text-gray-800 whitespace-pre-wrap max-h-64 overflow-auto">
          {filtered}
        </pre>
      )}
      {!expanded && (
        <p className="text-sm text-gray-700">Transcript collapsed</p>
      )}
    </div>
  );
}

```

---

### `videoCard.tsx`

```tsx
"use client";

interface VideoCardProps {
  id: string;
  title: string;
  duration?: string;
  subject?: string;
  onClick?: () => void;
}

export default function VideoCard({ id, title, duration, subject, onClick }: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-md transition"
      role="button"
      tabIndex={0}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {subject && <p className="text-sm text-gray-600">{subject} • {duration}</p>}
    </div>
  );
}

```

---

### `videoPlayer.tsx`

```tsx
"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow">
      <video
        ref={videoRef}
        className="w-full h-auto max-h-[60vh] bg-black"
        src={src}
        poster={poster}
        controls={false}
        preload="metadata"
      />

      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        <div className="text-sm text-gray-600">HD • Auto-generated captions available</div>
      </div>
    </div>
  );
}

```

---

### `aiChatContext.tsx`

```tsx
// src/context/aiChatContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type ChatMode = "closed" | "compact" | "fullscreen";

interface AIChatContextType {
  mode: ChatMode;
  messages: { role: "user" | "assistant"; content: string }[];
  openCompact: () => void;
  openFullscreen: () => void;
  minimize: () => void;
  close: () => void;
  addMessage: (role: "user" | "assistant", content: string) => void;
  clearChat: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ChatMode>("closed");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const openCompact = useCallback(() => setMode("compact"), []);
  const openFullscreen = useCallback(() => setMode("fullscreen"), []);
  const minimize = useCallback(() => setMode("compact"), []);
  const close = useCallback(() => setMode("closed"), []);

  const addMessage = useCallback(
    (role: "user" | "assistant", content: string) => {
      setMessages((prev) => [...prev, { role, content }]);
    },
    []
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AIChatContext.Provider
      value={{
        mode,
        messages,
        openCompact,
        openFullscreen,
        minimize,
        close,
        addMessage,
        clearChat,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const ctx = useContext(AIChatContext);
  if (!ctx) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return ctx;
}

```

---

### `api.ts`

```ts
// src/lib/api.ts

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Unified fetch wrapper for backend API calls.
 * - Automatically sets JSON headers
 * - Throws error on non-2xx responses
 * - Returns JSON when possible, otherwise returns raw Response
 */
export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_URL}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const finalOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const res = await fetch(url, finalOptions);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API Error ${res.status}: ${res.statusText} → ${text || "Unknown error"}`
    );
  }

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res;
}

```

---

### `renderFormattedText.tsx`

```tsx
// src/lib/renderFormattedText.tsx
"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

/**
 * Lightweight replacements for common scientific tokens.
 */
function applySymbolReplacements(input: string): string {
  if (!input) return input;

  const replacements: [RegExp, string][] = [
    [/\s->\s/g, " → "],
    [/\s<-\s/g, " ← "],
    [/>=/g, "≥"],
    [/<=/g, "≤"],
    [/\+\/-/g, "±"],
    [/\bdeg\b/g, "°"],
    [/\balpha\b/gi, "α"],
    [/\bbeta\b/gi, "β"],
    [/\bgamma\b/gi, "γ"],
    [/\bdelta\b/gi, "Δ"],
    [/\bepsilon\b/gi, "ε"],
    [/\btheta\b/gi, "θ"],
    [/\blambda\b/gi, "λ"],
    [/\bmu\b/gi, "µ"],
    [/\bpi\b/gi, "π"],
    [/\bsqrt\(([^)]+)\)/gi, "√($1)"],
    [/\s\*\s/g, " × "],
  ];

  let out = input;
  for (const [regex, repl] of replacements) {
    out = out.replace(regex, repl);
  }
  return out;
}

export default function RenderFormattedText({ text }: { text: string }) {
  const processed = useMemo(() => applySymbolReplacements(text || ""), [text]);

  return (
    <div className="prose max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}

```

---

### `config.py`

```python
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    APP_NAME: str = "LMS Student Backend"
    DEBUG: bool = True

    # Core backend configs
    DATABASE_URL: str = "sqlite+aiosqlite:///./lms_dev.db"
    REDIS_URL: str = "redis://localhost:6379/0"

    # AI configs
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_API_BASE: Optional[str] = "https://api.openai.com/v1"

    # File storage (local dev)
    FILE_STORAGE_PATH: str = "./app/pdfs"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        # This is the important line
        extra = "allow"
        env_file_encoding = "utf-8"


settings = Settings()

```

---

### `loop_fix.py`

```python
import asyncio
import sys

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

```

---

### `main.py`

```python
# REQUIRED FIX FOR WINDOWS + PLAYWRIGHT
import app.loop_fix  # noqa: F401

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db.session import engine, Base

# Routers
from .routers.student import notes as notes_router
from .routers.student import flashcards as flashcards_router
from .routers.student import tests as tests_router
from .routers.student import assignments as assignments_router
from .routers.student import progress as progress_router
from .routers.student import ai_chat as ai_chat_router
from app.routers.student import tests as tests_router  # add this import

# Add to app router registrations (after other include_router calls)



import asyncio
import os

# -------------------------------------------------------------------
# APPLICATION INITIALIZATION
# -------------------------------------------------------------------
app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)

# -------------------------------------------------------------------
# CORS CONFIGURATION
# -------------------------------------------------------------------
# Example: ALLOWED_ORIGINS="http://localhost:3000"
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# ROUTER REGISTRATION (PREFIX FIX APPLIED)
# -------------------------------------------------------------------
# All student-related endpoints are mounted under /api/student
app.include_router(notes_router.router)
app.include_router(flashcards_router.router)
app.include_router(tests_router.router)
app.include_router(assignments_router.router)
app.include_router(progress_router.router)
app.include_router(ai_chat_router.router)


# --------------------------------------------------------------
#-----
# STARTUP EVENT
# -------------------------------------------------------------------
@app.on_event("startup")
async def on_startup():
    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Ensure storage path exists
    os.makedirs(settings.FILE_STORAGE_PATH, exist_ok=True)


# -------------------------------------------------------------------
# HEALTH CHECK
# -------------------------------------------------------------------
@app.get("/health")
async def health():
    return {"ok": True}

```

---

### `__init__.py`

```python

```

---

### `routers\student\__init__.py`

```python

```

---

### `session.py`

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from ..config import settings
from collections.abc import AsyncGenerator

DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(
    DATABASE_URL,
    future=True,
    echo=settings.DEBUG,
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()


# Dependency for FastAPI routes
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

```

---

### `models\assignment.py`

```python
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from ..db.session import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    created_by = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

```

---

### `schemas\assignment.py`

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AssignmentOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    subject: Optional[str]
    due_date: Optional[datetime]

    class Config:
        orm_mode = True

```

---

### `models\flashcard.py`

```python
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from ..db.session import Base

class FlashcardSet(Base):
    __tablename__ = "flashcard_sets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=True)

    # Safe attribute, real column name preserved
    cards_json = Column("metadata", Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

```

---

### `schemas\flashcard.py`

```python
# backend/app/schemas/flashcard.py
from pydantic import BaseModel
from typing import List, Optional

class Flashcard(BaseModel):
    front: str
    back: str
    tags: Optional[List[str]] = []

class FlashcardCreateResponse(BaseModel):
    id: int
    title: str
    subject: str
    cards: List[Flashcard] = []

    class Config:
        from_attributes = True

```

---

### `models\note.py`

```python
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from ..db.session import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    board = Column(String, nullable=False)
    grade = Column(Integer, nullable=False)
    subject = Column(String, nullable=False)
    chapter = Column(String, nullable=False)
    difficulty = Column(String, nullable=True)
    markdown = Column(Text, nullable=True)
    pdf_path = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

```

---

### `schemas\note.py`

```python
from pydantic import BaseModel
from typing import Optional


class NoteCreate(BaseModel):
    user_id: int
    board: str
    grade: int
    subject: str
    chapter: str
    difficulty: Optional[str] = "Medium"


class NoteOut(BaseModel):
    id: int
    pdf_path: str | None
    markdown: str | None

    class Config:
        orm_mode = True

```

---

### `models\test.py`

```python
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from ..db.session import Base


class Test(Base):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    data_json = Column("metadata", Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

```

---

### `schemas\test.py`

```python
# backend/app/schemas/test.py

from pydantic import BaseModel, Field, validator
from typing import List, Optional


# --------------------------------------------------------
# INTERNAL SCHEMA (used for generation + internal storage)
# --------------------------------------------------------
class TestQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    answer: str
    solution: str
    difficulty: str

    @validator("options")
    def require_four_options(cls, v):
        if not isinstance(v, list) or len(v) != 4:
            raise ValueError("options must contain exactly four strings")
        return v

    @validator("answer")
    def answer_in_options(cls, v, values):
        opts = values.get("options")
        if opts and v not in opts:
            raise ValueError("answer must be one of the options")
        return v


class TestModel(BaseModel):
    id: str
    title: str
    subject: str
    chapter: str
    questions: List[TestQuestion]
    count: int
    created_at: int


# --------------------------------------------------------
# PUBLIC-FACING SCHEMA (for GET /tests/{id} — NO ANSWER)
# --------------------------------------------------------
class PublicTestQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    solution: str
    difficulty: str


class PublicTestModel(BaseModel):
    id: str
    title: str
    subject: str
    chapter: str
    questions: List[PublicTestQuestion]
    count: int
    created_at: int


# --------------------------------------------------------
# SUBMISSION SCHEMAS
# --------------------------------------------------------
class TestCreateRequest(BaseModel):
    title: str
    subject: str
    chapter: str
    count: int = Field(..., gt=0)
    difficulty: Optional[str] = None


class SubmitRequest(BaseModel):
    answers: dict


class SubmitResponse(BaseModel):
    attempt_id: str
    test_id: str
    total: int
    correct: int
    incorrect: int
    percent: float

```

---

### `user.py`

```python
from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from ..db.session import Base
import enum


class RoleEnum(str, enum.Enum):
    student = "student"
    teacher = "teacher"
    parent = "parent"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.student)
    board = Column(String, nullable=True)  # CBSE / Karnataka / PU
    grade = Column(Integer, nullable=True)

```

---

### `assignment_repo.py`

```python
from ..models.assignment import Assignment
from .base_repo import BaseRepo
from sqlalchemy.ext.asyncio import AsyncSession


class AssignmentRepo(BaseRepo[Assignment]):
    def __init__(self):
        super().__init__(Assignment)

```

---

### `base_repo.py`

```python
from typing import Generic, TypeVar, Type
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import as_declarative

T = TypeVar("T")


class BaseRepo(Generic[T]):
    def __init__(self, model: Type[T]):
        self.model = model

    async def get(self, db: AsyncSession, id: int):
        stmt = select(self.model).where(self.model.id == id)
        result = await db.execute(stmt)
        return result.scalars().first()

    async def list(self, db: AsyncSession, limit: int = 100):
        stmt = select(self.model).limit(limit)
        result = await db.execute(stmt)
        return result.scalars().all()

    async def create(self, db: AsyncSession, obj):
        db.add(obj)
        await db.commit()
        await db.refresh(obj)
        return obj
```

---

### `flashcard_repo.py`

```python
from ..models.flashcard import FlashcardSet
from .base_repo import BaseRepo
from sqlalchemy.ext.asyncio import AsyncSession
import json


class FlashcardRepo(BaseRepo[FlashcardSet]):
    def __init__(self):
        super().__init__(FlashcardSet)

    async def create_set(self, db: AsyncSession, user_id: int, title: str, subject: str, cards: list):
        obj = FlashcardSet(user_id=user_id, title=title, subject=subject, metadata=json.dumps(cards, ensure_ascii=False))
        return await self.create(db, obj)

```

---

### `note_repo.py`

```python
from ..models.note import Note
from .base_repo import BaseRepo
from sqlalchemy.ext.asyncio import AsyncSession


class NoteRepo(BaseRepo[Note]):
    def __init__(self):
        super().__init__(Note)

    async def create_note(self, db: AsyncSession, **kwargs):
        n = Note(**kwargs)
        return await self.create(db, n)

```

---

### `ai_chat.py`

```python
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ...services.ai_service import chat_completion

router = APIRouter(prefix="/api/student/doubt", tags=["student.doubt"])


class DoubtIn(BaseModel):
    user_id: int
    question: str
    context: list[dict] | None = None


@router.post("/ask")
async def ask_doubt(payload: DoubtIn):
    system = {"role": "system", "content": "You are a helpful tutor for grades 9-12. Use provided context only."}
    messages = [system]
    if payload.context:
        messages.extend(payload.context)
    messages.append({"role": "user", "content": payload.question})
    try:
        resp = await chat_completion(messages, max_tokens=800, temperature=0.2)
        return {"ok": True, "response": resp["choices"][0]["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

```

---

### `assignments.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ...db.session import get_db
from ...repositories.assignment_repo import AssignmentRepo
from ...schemas.assignment import AssignmentOut

router = APIRouter(prefix="/api/student/assignments", tags=["student.assignments"])
repo = AssignmentRepo()


@router.get("/", response_model=list[AssignmentOut])
async def list_assignments(db: AsyncSession = Depends(get_db)):
    rows = await repo.list(db)
    return rows

```

---

### `flashcards.py`

```python
# backend/app/routers/student/flashcards.py

from fastapi import APIRouter, HTTPException, Request
from ...services.flashcards_service import generate_flashcards

router = APIRouter(
    prefix="/api/student/flashcards",
    tags=["student-flashcards"]
)


@router.post("/generate")
async def generate_flashcards_endpoint(request: Request):
    print("\n[BACKEND] ROUTER ENTERED generate_flashcards_endpoint")

    payload = await request.json()
    print("[BACKEND] DEBUG PAYLOAD:", payload)

    subject = payload.get("subject")
    chapter = payload.get("chapter")
    max_cards = payload.get("max_cards", 20)
    user_id = payload.get("user_id", 1)

    if not subject or not chapter:
        raise HTTPException(status_code=400, detail="Missing required fields: subject or chapter")

    try:
        result = await generate_flashcards(
            db=None,
            user_id=user_id,
            subject=subject,
            chapter=chapter,
            max_cards=max_cards
        )

        print("[BACKEND] FLASHCARDS GENERATED SUCCESSFULLY")
        return {"cards": result["cards"]}

    except Exception as e:
        print("[BACKEND] FLASHCARDS ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

```

---

### `notes.py`

```python
# backend/app/routers/student/notes.py

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

from app.services.notes_service import NotesService

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.post("/generate")
async def generate_notes(payload: dict, db: AsyncSession = Depends(get_db)):
    """
    Generate textbook-quality PDF notes (AI → Markdown → HTML → PDF)
    """
    required = ["user_id", "board", "grade", "subject", "chapter", "difficulty"]
    for field in required:
        if field not in payload:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")

    service = NotesService(db)

    try:
        result = await service.generate_notes(
            user_id=payload["user_id"],
            board=payload["board"],
            grade=int(payload["grade"]),
            subject=payload["subject"],
            chapter=payload["chapter"],
            difficulty=payload["difficulty"],
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{note_id}/pdf")
async def get_notes_pdf(note_id: int, db: AsyncSession = Depends(get_db)):
    """
    Streams a generated PDF from disk.
    """

    service = NotesService(db)

    try:
        pdf_path = await service.get_pdf_path(note_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Return binary content
    try:
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="PDF file not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"inline; filename=notes_{note_id}.pdf"},
    )

@router.post("/{note_id}/save-cloud")
async def save_cloud(note_id: int):
    """
    Placeholder endpoint — implementation will come later.
    """
    return {"status": "ok", "message": "Cloud save not implemented yet"}

```

---

### `progress.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ...db.session import get_db

router = APIRouter(prefix="/api/student/progress", tags=["student.progress"])


@router.get("/overview")
async def progress_overview(user_id: int, db: AsyncSession = Depends(get_db)):
    # Minimal placeholder that frontend can call for prototyping
    return {
        "user_id": user_id,
        "progress": {
            "notes_generated": 3,
            "tests_taken": 2,
            "assignments_pending": 1
        }
    }

```

---

### `tests.py`

```python
# backend/app/routers/student/tests.py

from fastapi import APIRouter, HTTPException
from typing import List

from ...schemas.test import (
    TestCreateRequest,
    TestModel,
    PublicTestModel,
    SubmitRequest,
    SubmitResponse,
)
from ...services.tests_service import (
    generate_test_with_ai,
    get_test,
    list_tests,
    submit_attempt,
    get_attempt,
)

router = APIRouter(
    prefix="/api/student/tests",
    tags=["student-tests"]
)


# ----------------------------------------------------------
# POST /generate  → Creates a full test WITH answers
# ----------------------------------------------------------
@router.post("/generate", response_model=TestModel)
async def generate_test(payload: TestCreateRequest):
    try:
        return await generate_test_with_ai(
            subject=payload.subject,
            chapter=payload.chapter,
            count=payload.count,
            difficulty=payload.difficulty
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------------------------------------
# GET /attempt/{attempt_id} → Shows user attempt results
# ----------------------------------------------------------
@router.get("/attempt/{attempt_id}")
async def fetch_attempt(attempt_id: str):
    attempt = get_attempt(attempt_id)
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return attempt


# ----------------------------------------------------------
# POST /{test_id}/submit → Submit answers for a test
# ----------------------------------------------------------
@router.post("/{test_id}/submit", response_model=SubmitResponse)
async def submit_test(test_id: str, payload: SubmitRequest):
    stored_test = get_test(test_id)
    if not stored_test:
        raise HTTPException(status_code=404, detail="Test not found")

    try:
        return submit_attempt(test_id, payload.answers)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------------------------------------
# GET /{test_id} → Returns a PUBLIC test WITHOUT answers
# ----------------------------------------------------------
@router.get("/{test_id}", response_model=PublicTestModel)
async def fetch_test(test_id: str):
    stored = get_test(test_id)
    if not stored:
        raise HTTPException(status_code=404, detail="Test not found")

    # Remove answer before sending to the student
    cleaned_questions = []
    for q in stored["questions"]:
        cleaned_questions.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "solution": q["solution"],
            "difficulty": q["difficulty"],
        })

    return {
        "id": stored["id"],
        "title": stored["title"],
        "subject": stored["subject"],
        "chapter": stored["chapter"],
        "questions": cleaned_questions,
        "count": stored["count"],
        "created_at": stored["created_at"],
    }


# ----------------------------------------------------------
# GET / → Recent tests (internal full models)
# ----------------------------------------------------------
@router.get("/", response_model=List[TestModel])
async def recent_tests():
    return list_tests()

```

---

### `common.py`

```python
from pydantic import BaseModel
from typing import Optional


class BaseOut(BaseModel):
    ok: bool = True
    message: Optional[str] = None

```

---

### `ai_service.py`

```python
import os
import asyncio
from typing import Optional, Any
import httpx
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type
from ..config import settings

OPENAI_API_KEY = settings.OPENAI_API_KEY
OPENAI_API_BASE = settings.OPENAI_API_BASE.rstrip("/")

if not OPENAI_API_KEY:
    # Not raising here — allow local dev but functions will error if called.
    pass


class OpenAIError(Exception):
    pass


@retry(wait=wait_exponential(min=1, max=10), stop=stop_after_attempt(3),
       retry=retry_if_exception_type((httpx.HTTPError, OpenAIError)))
async def chat_completion(messages: list[dict], model: str = "gpt-4o-mini", max_tokens: int = 1500, temperature: float = 0.2) -> dict:
    if not OPENAI_API_KEY:
        raise OpenAIError("OPENAI_API_KEY not configured in environment")

    url = f"{OPENAI_API_BASE}/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "n": 1,
    }

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        r = await client.post(url, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()
        return data
    
async def generate_notes_markdown(
    user_id: int,
    board: str,
    grade: int,
    subject: str,
    chapter: str,
    difficulty: str,
) -> str:
    """
    Generates structured markdown notes using the AI model.
    Output: Strict markdown only (headings, lists, tables, formulas).
    No emojis, no HTML, no code fences unless required.
    """

    system_prompt = (
        "You are an LMS notes generator for Indian school students (Grades 9–12).\n"
        "You MUST output ONLY clean markdown (no HTML).\n"
        "Use headings, subheadings, bullet points, examples, formulas.\n"
        "Use LaTeX-style syntax inside $$ $$ for formulas.\n"
        "Maintain accuracy and academic correctness.\n"
        "Do NOT include any metadata, disclaimers, or extra commentary.\n"
        "STRICT FORMAT: Only markdown notes as final output.\n"
    )

    user_prompt = (
        f"Generate notes for:\n"
        f"Board: {board}\n"
        f"Grade: {grade}\n"
        f"Subject: {subject}\n"
        f"Chapter: {chapter}\n"
        f"Difficulty: {difficulty}\n\n"
        f"Ensure the notes include:\n"
        f"- Key definitions\n"
        f"- Important formulas (use $$formula$$)\n"
        f"- Diagrams described in text\n"
        f"- Summary tables where useful\n"
        f"- Key takeaways at the end\n"
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user",   "content": user_prompt},
    ]

    try:
        response = await chat_completion(messages)
    except Exception as e:
        raise RuntimeError(f"AI notes generation failed: {str(e)}")

    # Extract markdown text from model response
    try:
        content = response["choices"][0]["message"]["content"]
    except Exception:
        raise RuntimeError("AI returned unexpected response format.")

    if not isinstance(content, str):
        raise RuntimeError("AI response was not a valid markdown string.")

    return content.strip()

```

---

### `flashcards_service.py`

```python
# backend/app/services/flashcards_service.py

import json
from typing import List, Dict, Any
from ..utils.ai_client import generate_flashcard_ai_output


# ============================================================
# IN-MEMORY FLASHCARD STORAGE (matches your tests system)
# ============================================================

FLASHCARD_DB = {}  # key: flashcard_set_id, value: dict with cards


def validate_flashcard_output(ai_output: Any) -> List[Dict[str, str]]:
    """
    Ensures AI output is structured as:
    {
        "cards": [
            {"front": "...", "back": "..."},
            ...
        ]
    }
    """
    if not isinstance(ai_output, dict):
        raise ValueError("AI did not return a JSON object")

    cards = ai_output.get("cards")
    if not isinstance(cards, list):
        raise ValueError("'cards' must be a list")

    valid_cards = []
    for card in cards:
        if not isinstance(card, dict):
            continue

        front = card.get("front")
        back = card.get("back")

        if not front or not back:
            continue

        valid_cards.append({"front": front, "back": back})

    if not valid_cards:
        raise ValueError("AI returned no valid flashcards")

    return valid_cards


# ============================================================
# MAIN FUNCTION — NO DATABASE REQUIRED
# ============================================================

async def generate_flashcards(
    db,
    user_id: int,
    subject: str,
    chapter: str,
    max_cards: int = 20
):
    """
    Completely DB-free flashcard generation.
    Stores flashcard sets in FLASHCARD_DB.
    Returns a dictionary containing only the cards.
    """

    # 1. Call the AI generator
    ai_output = await generate_flashcard_ai_output(
        subject=subject,
        chapter=chapter,
        max_cards=max_cards
    )

    # 2. Validate structure
    cards = validate_flashcard_output(ai_output)

    # 3. Create a flashcard set ID
    flashcard_set_id = f"fc_{len(FLASHCARD_DB) + 1}"

    FLASHCARD_DB[flashcard_set_id] = {
        "id": flashcard_set_id,
        "user_id": user_id,
        "subject": subject,
        "chapter": chapter,
        "cards": cards
    }

    # 4. Return ONLY what the frontend needs
    return {"id": flashcard_set_id, "cards": cards}

```

---

### `notes_service.py`

```python
# backend/app/services/notes_service.py
import os
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pathlib import Path

from app.models.note import Note
from app.services.ai_service import generate_notes_markdown
from app.services.pdf_generator import generate_pdf_from_markdown
from app.config import settings


class NotesService:
    """
    Generates notes with AI, renders into a textbook-quality PDF using headless Chromium,
    saves the PDF file and DB record, and returns metadata.
    """

    def __init__(self, session: AsyncSession):
        self.session = session

    async def generate_notes(
        self,
        user_id: int,
        board: str,
        grade: int,
        subject: str,
        chapter: str,
        difficulty: str,
    ) -> dict:
        # 1) Generate markdown from AI
        markdown = await generate_notes_markdown(
            user_id=user_id,
            board=board,
            grade=grade,
            subject=subject,
            chapter=chapter,
            difficulty=difficulty,
        )

        if not markdown or not isinstance(markdown, str):
            raise ValueError("AI did not return valid markdown text.")

        # 2) Render markdown -> PDF using headless Chromium
        title = f"{subject} — {chapter}"
        try:
            pdf_bytes = await generate_pdf_from_markdown(markdown, title=title)
        except Exception as e:
            raise RuntimeError(f"PDF generation failed: {str(e)}")

        # 3) Persist PDF to storage
        upload_dir = settings.FILE_STORAGE_PATH if hasattr(settings, "FILE_STORAGE_PATH") else getattr(settings, "UPLOAD_FOLDER", None)
        if not upload_dir:
            raise RuntimeError("No upload/file storage path configured (settings.FILE_STORAGE_PATH).")

        os.makedirs(upload_dir, exist_ok=True)

        filename = f"notes_{user_id}_{subject}_{chapter}_{int(datetime.utcnow().timestamp())}.pdf"
        # sanitize filename
        safe_filename = "".join(c for c in filename if c.isalnum() or c in ("_", "-", ".")).rstrip()
        pdf_path = os.path.join(upload_dir, safe_filename)

        with open(pdf_path, "wb") as f:
            f.write(pdf_bytes)

        # 4) Save DB record
        new_note = Note(
            user_id=user_id,
            board=board,
            grade=grade,
            subject=subject,
            chapter=chapter,
            difficulty=difficulty,
            markdown=markdown,
            pdf_path=pdf_path,
        )

        self.session.add(new_note)
        await self.session.commit()
        await self.session.refresh(new_note)

        return {
            "id": new_note.id,
            "pdf_path": new_note.pdf_path,
            "markdown": new_note.markdown,
        }

    async def get_pdf_path(self, note_id: int) -> str:
        q = select(Note).where(Note.id == note_id)
        result = await self.session.execute(q)
        note = result.scalar_one_or_none()

        if not note:
            raise ValueError("Note not found.")

        return note.pdf_path

```

---

### `pdf_generator.py`

```python
# backend/app/services/pdf_generator.py

import os
import tempfile
import asyncio
from typing import Optional
from pathlib import Path

from markdown import markdown as md_to_html
from jinja2 import Template
from playwright.async_api import async_playwright

from markdown.extensions.toc import TocExtension
from markdown.extensions.fenced_code import FencedCodeExtension

# NEW: Better Markdown → Math parser
from markdown_katex import KatexExtension


TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "templates")
TEMPLATE_PATH = os.path.normpath(os.path.join(TEMPLATES_DIR, "notes_template.html"))


async def generate_pdf_from_markdown(
    markdown_text: str,
    title: Optional[str] = None,
    css_variables: Optional[dict] = None,
) -> bytes:
    """
    Convert Markdown → HTML (with KaTeX) → Playwright → PDF.
    Ensures KaTeX renders BEFORE snapshot.
    """

    # -------------------------------------------
    # 1) Convert markdown → HTML
    # -------------------------------------------
    html_body = md_to_html(
        markdown_text,
        extensions=[
            KatexExtension(no_inline_svg=True),     # FIX: Prevents math being wrapped incorrectly
            "tables",
            "sane_lists",
            FencedCodeExtension(),
            TocExtension(),
        ],
    )

    # -------------------------------------------
    # 2) Load template and inject HTML
    # -------------------------------------------
    if not os.path.exists(TEMPLATE_PATH):
        raise RuntimeError(f"PDF template missing: {TEMPLATE_PATH}")

    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        template_src = f.read()

    tmpl = Template(template_src)
    rendered_html = tmpl.render(
        title=title or "Notes",
        content=html_body,
        css_vars=css_variables or {},
    )

    # -------------------------------------------
    # 3) Write temporary HTML file
    # -------------------------------------------
    tmpdir = tempfile.mkdtemp(prefix="notes_pdf_")
    html_file = os.path.join(tmpdir, "notes.html")

    with open(html_file, "w", encoding="utf-8") as fh:
        fh.write(rendered_html)

    # -------------------------------------------
    # 4) Launch Playwright Chromium
    # -------------------------------------------
    playwright = await async_playwright().start()
    pdf_bytes: bytes

    try:
        browser = await playwright.chromium.launch(args=["--no-sandbox"])
        context = await browser.new_context(viewport={"width": 1200, "height": 1600})
        page = await context.new_page()

        # Load HTML
        file_url = Path(html_file).absolute().as_uri()
        await page.goto(file_url, wait_until="load")

        # NEW: Block until KaTeX fully renders
        # Wait for KaTeX global render hook injected in HTML template
        try:
            await page.wait_for_function("window.__katex_render_done === true", timeout=5000)
        except Exception:
            # fallback delay
            await asyncio.sleep(0.5)

        # Ensure layout settles
        await asyncio.sleep(0.25)

        # -------------------------------------------
        # 5) Generate PDF
        # -------------------------------------------
        pdf_bytes = await page.pdf(
            format="A4",
            print_background=True,
            margin={"top": "20mm", "bottom": "20mm", "left": "18mm", "right": "18mm"},
            prefer_css_page_size=True,
        )

        await context.close()
        await browser.close()

    finally:
        await asyncio.sleep(0.05)
        await playwright.stop()

    # Cleanup temp files
    try:
        os.remove(html_file)
        os.rmdir(tmpdir)
    except Exception:
        pass

    return pdf_bytes

```

---

### `tests_service.py`

```python
# backend/app/services/tests_service.py

from typing import Dict, List, Any, Optional
import uuid
import time
import logging
import asyncio

from ..schemas.test import TestQuestion
from ..utils.ai_client import call_json_function

_LOG = logging.getLogger("tests_service")

_TEST_STORE: Dict[str, dict] = {}
_ATTEMPT_STORE: Dict[str, dict] = {}

AI_MODEL = "gpt-4o-mini"
MAX_ATTEMPTS = 3
RETRY_DELAY = 1.0


def _make_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


# ---------------------------------------
# FUNCTION SCHEMA FOR JSON MODE
# ---------------------------------------
tests_schema = {
    "name": "create_test_questions",
    "description": "Generate MCQ test questions for a subject and chapter",
    "parameters": {
        "type": "object",
        "properties": {
            "questions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "question": {"type": "string"},
                        "options": {
                            "type": "array",
                            "items": {"type": "string"},
                            "minItems": 4,
                            "maxItems": 4
                        },
                        "answer": {"type": "string"},        # REQUIRED
                        "solution": {"type": "string"},      # REQUIRED
                        "difficulty": {"type": "string"}     # REQUIRED
                    },
                    "required": ["id", "question", "options", "answer", "solution", "difficulty"]
                }
            }
        },
        "required": ["questions"]
    }
}


def _build_messages(subject: str, chapter: str, count: int, difficulty: Optional[str]):
    diff_text = (
        f"The difficulty of ALL questions must be '{difficulty}'."
        if difficulty else
        "Use a balanced mix of Easy, Medium, Hard."
    )

    system_msg = (
        "You are a test generator AI. "
        "Return ONLY the function call with valid JSON arguments. "
        "NO extra text. NO explanations."
    )

    user_msg = (
        f"Generate {count} MCQs for subject '{subject}' and chapter '{chapter}'. "
        f"{diff_text} "
        "Math must use KaTeX like \\( x^2 \\) and \\[ E=mc^2 \\]. "
        "Each question MUST have: id, question, options (4), answer, solution, difficulty."
    )

    return [
        {"role": "system", "content": system_msg},
        {"role": "user", "content": user_msg}
    ]


# ---------------------------------------
# MAIN GENERATOR WITH RETRIES
# ---------------------------------------
async def generate_test_with_ai(subject: str, chapter: str, count: int, difficulty: Optional[str]):
    last_error = None

    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            messages = _build_messages(subject, chapter, count, difficulty)

            result = await call_json_function(
                model=AI_MODEL,
                messages=messages,
                function_schema=tests_schema
            )

            # Validate with Pydantic
            validated = []
            for raw_q in result["questions"]:
                q = TestQuestion.parse_obj(raw_q)
                validated.append(q)

            # Normalize
            normalized = []
            for q in validated:
                normalized.append({
                    "id": _make_id("q"),
                    "question": q.question,
                    "options": q.options,
                    "answer": q.answer,
                    "solution": q.solution,
                    "difficulty": q.difficulty
                })

            test_id = _make_id("t")
            test_obj = {
                "id": test_id,
                "title": f"{subject} - {chapter}",
                "subject": subject,
                "chapter": chapter,
                "questions": normalized,
                "count": len(normalized),
                "created_at": int(time.time())
            }

            _TEST_STORE[test_id] = test_obj
            return test_obj

        except Exception as e:
            last_error = e
            _LOG.warning(f"Attempt {attempt} failed: {e}")
            if attempt < MAX_ATTEMPTS:
                await asyncio.sleep(RETRY_DELAY)
            else:
                raise RuntimeError(f"Failed after {MAX_ATTEMPTS} attempts: {last_error}")


# ---------------------------------------
# Retrieval and attempts (unchanged)
# ---------------------------------------
def get_test(test_id: str) -> Optional[dict]:
    return _TEST_STORE.get(test_id)


def list_tests(limit: int = 20) -> List[dict]:
    items = sorted(_TEST_STORE.values(), key=lambda x: x["created_at"], reverse=True)
    return items[:limit]


def submit_attempt(test_id: str, answers: Dict[str, str], user_id: str = "anon") -> dict:
    test = get_test(test_id)
    if not test:
        raise RuntimeError("Test not found")

    total = len(test["questions"])
    correct = 0
    per_question = []

    for q in test["questions"]:
        selected = answers.get(q["id"])
        is_correct = selected == q["answer"]
        if is_correct:
            correct += 1

        per_question.append({
            "id": q["id"],
            "question": q["question"],
            "selected": selected,
            "correct_answer": q["answer"],
            "is_correct": is_correct,
            "solution": q["solution"]
        })

    attempt = {
        "attempt_id": _make_id("a"),
        "test_id": test_id,
        "user_id": user_id,
        "total": total,
        "correct": correct,
        "incorrect": total - correct,
        "percent": round((correct / total) * 100, 2),
        "per_question": per_question,
        "timestamp": int(time.time())
    }

    _ATTEMPT_STORE[attempt["attempt_id"]] = attempt
    return attempt


def get_attempt(attempt_id: str) -> Optional[dict]:
    return _ATTEMPT_STORE.get(attempt_id)

```

---

### `ai_client.py`

```python
# backend/app/utils/ai_client.py

import json
import re
import os
from typing import Any, Dict
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=api_key)


# ============================================================
# 1. FUNCTION CALLING SUPPORT (CORRECT FOR CHAT COMPLETIONS)
# ============================================================

async def call_json_function(model: str, messages: list, function_schema: dict) -> Dict[str, Any]:
    """
    Calls OpenAI chat.completions.create() using function-calling
    and returns the parsed JSON arguments.
    """

    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        tools=[{
            "type": "function",
            "function": function_schema
        }],
        tool_choice={"type": "function", "function": {"name": function_schema["name"]}},
        temperature=0.2
    )

    try:
        # Correct extraction for ChatCompletionMessageFunctionToolCall
        tool_call = response.choices[0].message.tool_calls[0]
        args_str = tool_call.function.arguments  # <-- this is a string
        return json.loads(args_str)

    except Exception as e:
        raise ValueError(
            f"Function call JSON parse failed: {e}\n"
            f"Raw: {response}"
        )


# ============================================================
# 2. FLASHCARD LEGACY SUPPORT (UNCHANGED)
# ============================================================

def _extract_text_from_response(response: Any) -> str:
    try:
        return response.choices[0].message.content
    except Exception:
        return ""


def _strip_code_fences(text: str) -> str:
    cleaned = re.sub(r"^```(?:json)?\s*", "", text)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def _extract_first_json(text: str) -> str:
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON found in AI output.")
    for end in range(len(text) - 1, start, -1):
        try:
            json.loads(text[start:end])
            return text[start:end]
        except:
            pass
    raise ValueError("Unable to extract JSON from AI output.")


async def generate_flashcard_ai_output(subject: str, chapter: str, max_cards: int = 20) -> Dict[str, Any]:
    """
    Legacy flashcard generator — kept EXACTLY as your flashcards expect.
    """

    prompt = f"""
Generate up to {max_cards} flashcards for subject '{subject}' and chapter '{chapter}'.

Respond ONLY with valid JSON in this format:

{{
    "cards": [
        {{
            "front": "Question text",
            "back": "Answer text"
        }}
    ]
}}
"""

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a flashcard generator that outputs ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    text = _extract_text_from_response(response)
    if not text:
        raise ValueError("AI returned empty response.")

    cleaned = _strip_code_fences(text)

    try:
        return json.loads(cleaned)
    except:
        candidate = _extract_first_json(cleaned)
        return json.loads(candidate)

```

---

### `sanitize.py`

```python
import re


def sanitize_markdown(md: str) -> str:
    # Basic sanitization to avoid unsupported chars
    if not md:
        return ""
    # Replace some unicode chars that fpdf may struggle with
    replacements = {
        "\u2013": "-",  # en dash
        "\u2014": "-",  # em dash
        "\u2022": "-",  # bullet
        "\u00b2": "^2",  # superscript 2
    }
    for k, v in replacements.items():
        md = md.replace(k, v)
    # Trim repeated blank lines
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()

```
