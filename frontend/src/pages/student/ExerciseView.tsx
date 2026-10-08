import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  studentApi,
  type SessionQuestion,
  type ExerciseSessionData,
} from "@/lib/api/student";
import { Button } from "@/components/pouf/Button";
import { renderTipTapNode } from "@/components/TipTapRenderer";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useAuthStore } from "@/store/useAuthStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { useSoundStore } from "@/store/useSoundStore";
import { BGM } from "@/config/sound.config";
import { config } from "@/config";
import { Icon } from "@/components/pouf/Icon";
import { AIAvatar } from "@/components/ui/AIAvatar";
import { ErrorNote } from "@/components/pouf/feedback";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import logoRectangle from "@/assets/images/bg/logo-rectangle.webp";
import exerciseBg from "@/assets/images/bg/exercise.webp";
import {
  Lightbulb,
  RefreshCcw,
  CircleHelp,
  Hand,
  PartyPopper,
  Trophy,
  Lock,
  BookOpenCheck,
  ClipboardList,
  BookOpen,
  ThumbsUp,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";

// ─── Constants & helpers ────────────────────────────────────────────────────────

// One-tap messages so younger students don't have to type to get help.
// They are sent through the normal chat flow, so they appear in the thread
// as regular student messages.
const QUICK_REPLIES = [
  {
    Icon: Lightbulb,
    label: "Beri aku petunjuk",
    text: "Bisakah kamu beri aku petunjuk?",
  },
  {
    Icon: RefreshCcw,
    label: "Jelaskan lagi",
    text: "Bisakah kamu jelaskan lagi dengan cara yang lebih mudah?",
  },
  {
    Icon: CircleHelp,
    label: "Aku bingung",
    text: "Aku bingung, bisa bantu aku mulai dari mana?",
  },
];

// Learning objectives are authored in the third person for teachers
// ("Siswa dapat membaca ..."). Shown to the student, that reads like a
// report card, so address the student directly instead.
// (Best long-term fix: author a student-facing objective in the content.)
function toStudentVoice(text: string): string {
  return text.replace(
    /^siswa\s+(dapat|mampu|bisa)\b/i,
    (_match, verb: string) => `Kamu ${verb.toLowerCase()}`,
  );
}

// Returns true only for the specific message that actually carries the
// "mark_question_passed" tool result. Tying the avatar's "happy" mood to this
// structured signal (instead of scanning text for words like "tepat") avoids
// a smiling mascot next to corrective feedback such as "belum tepat".
function hasPassedToolPart(message: any): boolean {
  if (!message?.parts) return false;
  return message.parts.some(
    (part: any) =>
      part.type === "tool-mark_question_passed" ||
      (part.type === "dynamic-tool" &&
        part.toolName === "mark_question_passed"),
  );
}

// Encouragement shown on the results screen, indexed by star count (0-3).
// The 2-star emoji is deliberately not a star — the star row right below it
// would otherwise repeat the same symbol.
const RESULT_COPY: Record<number, { Icon: any; message: string }> = {
  0: {
    Icon: BookOpen,
    message: "Jangan menyerah! Ulangi pelan-pelan, kamu pasti bisa.",
  },
  1: { Icon: ThumbsUp, message: "Lumayan! Yuk coba lagi supaya makin paham." },
  2: {
    Icon: PartyPopper,
    message: "Bagus sekali! Sedikit lagi menuju bintang penuh.",
  },
  3: { Icon: Trophy, message: "Sempurna! Kamu sudah menguasai materi ini." },
};

function usePrefersReducedMotion(): boolean {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}

// ─── Progress Stepper ──────────────────────────────────────────────────────────
function ProgressStepper({
  questions,
  currentIdx,
  passedIds,
  onSelect,
}: {
  questions: SessionQuestion[];
  currentIdx: number;
  passedIds: Set<string>;
  onSelect: (idx: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-1.5 overflow-x-auto py-1.5 px-1.5 -mx-1.5"
      role="list"
      aria-label="Daftar soal"
    >
      {questions.map((q, i) => {
        const isPassed = passedIds.has(q.id);
        const isCurrent = i === currentIdx;
        return (
          <div key={q.id} className="flex items-center gap-1.5" role="listitem">
            <button
              onClick={() => onSelect(i)}
              aria-label={`Soal ${i + 1}${isPassed ? ", selesai" : ""}`}
              aria-current={isCurrent ? "step" : undefined}
              className={clsx(
                "w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30",
                isPassed
                  ? "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600"
                  : isCurrent
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 border border-slate-200/80",
                // The current question keeps a visible ring even when it is
                // already passed — otherwise two green circles look identical
                // and the student can't tell where they are.
                isCurrent &&
                  clsx(
                    "ring-4 scale-105",
                    isPassed ? "ring-emerald-500/25" : "ring-purple-500/20",
                  ),
              )}
              title={`Soal ${i + 1}${isPassed ? " (Selesai)" : ""}`}
            >
              {isPassed ? "✓" : i + 1}
            </button>
            {i < questions.length - 1 && (
              <div
                className={clsx(
                  "w-4 h-0.5 rounded-full transition-colors flex-shrink-0",
                  isPassed ? "bg-emerald-400" : "bg-slate-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Chat Skeleton ──────────────────────────────────────────────────────────────
function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full p-6 gap-4 animate-pulse bg-slate-50/50">
      <div className="h-12 bg-white border border-slate-200/60 rounded-2xl w-3/4 shadow-2xs" />
      <div className="h-10 bg-purple-100/60 rounded-2xl w-1/2 self-end shadow-2xs" />
      <div className="h-14 bg-white border border-slate-200/60 rounded-2xl w-2/3 shadow-2xs" />
      <div className="h-10 bg-purple-100/60 rounded-2xl w-1/3 self-end shadow-2xs" />
    </div>
  );
}

// ─── Completed Dock ─────────────────────────────────────────────────────────────
// Replaces the input once a question is passed. The "what next?" action lives
// here — directly under the AI's closing message, where the student is already
// looking — instead of in a modal that blurs the question the AI just
// explained.
function CompletedDock({
  allPassed,
  isStreaming,
  onNext,
  onComplete,
}: {
  allPassed: boolean;
  isStreaming: boolean;
  onNext: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-teal-50/60 px-4 py-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs animate-in zoom-in-50 duration-300">
          <PartyPopper size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-emerald-900 m-0 leading-tight">
            Jawaban benar!
          </p>
          <p className="text-xs text-emerald-700 m-0 mt-0.5 leading-snug">
            {allPassed
              ? "Semua soal sudah selesai. Saatnya lihat hasilmu!"
              : "Kerja bagus! Lanjut ke soal berikutnya."}
          </p>
        </div>
      </div>
      <div className="sm:flex-shrink-0">
        <Button
          tone="purple"
          size="lg"
          disabled={isStreaming}
          onClick={allPassed ? onComplete : onNext}
        >
          {allPassed ? (
            <span className="flex items-center gap-2">
              <Trophy size={16} /> Lihat Hasil
            </span>
          ) : (
            "Soal Berikutnya →"
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Question Chat Panel ────────────────────────────────────────────────────────
function QuestionChat({
  question,
  sessionId,
  isPassed,
  allPassed,
  onStreamComplete,
  onNext,
  onComplete,
}: {
  question: SessionQuestion;
  sessionId: string;
  isPassed: boolean;
  allPassed: boolean;
  onStreamComplete: () => void;
  onNext: () => void;
  onComplete: () => void;
}) {
  const token = useAuthStore((s) => s.token);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef<string>("ready");
  const triggeredToolMsgIdRef = useRef<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrationDoneRef = useRef(false);
  const isMuted = useSoundStore((s) => s.isMuted);
  const toggleMute = useSoundStore((s) => s.toggleMute);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${config.API_URL}/student/questions/${question.id}/chat`,
        headers: { Authorization: `Bearer ${token}` },
        body: { sessionId },
      }),
    [question.id, token, sessionId],
  );

  const { messages, status, sendMessage, setMessages } = useChat({
    transport,
  });
  const isLoading = status === "streaming" || status === "submitted";

  // Lazy chat hydration
  useEffect(() => {
    if (hydrationDoneRef.current) return;
    hydrationDoneRef.current = true;

    studentApi
      .getSessionChat(sessionId, question.id)
      .then((res) => {
        if (res.data?.messages) {
          setMessages(
            res.data.messages.map((m) => ({
              ...m,
              parts: [{ type: "text", text: m.content }],
            })),
          );
        }
      })
      .catch((err) => {
        console.error("Failed to load chat history:", err);
      })
      .finally(() => {
        setIsHydrated(true);
      });
  }, [sessionId, question.id, setMessages]);

  useEffect(() => {
    let justTriggered = false;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && hasPassedToolPart(lastMessage)) {
      if (triggeredToolMsgIdRef.current !== lastMessage.id) {
        triggeredToolMsgIdRef.current = lastMessage.id;
        justTriggered = true;
        onStreamComplete();
      }
    }
    if (
      prevStatusRef.current !== "ready" &&
      status === "ready" &&
      messages.length > 0
    ) {
      if (!justTriggered) onStreamComplete();
    }
    prevStatusRef.current = status;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isPassed]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickReply = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  };

  if (!isHydrated) return <ChatSkeleton />;

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50/60">
      {/* ── Chat Header ── */}
      <div className="px-6 py-3.5 border-b border-slate-200/80 flex items-center justify-between bg-white flex-none shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <AIAvatar
              state={isLoading ? "thinking" : isPassed ? "happy" : "standby"}
              size="sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm m-0 leading-tight">
              METADIA AI
            </h3>
            <p className="text-[11px] text-slate-500 m-0">
              Asisten Belajar Pecahan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="quiet"
            tone="idle"
            onClick={toggleMute}
            aria-label={isMuted ? "Bunyikan Musik" : "Matikan Musik"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* ── Messages Container ──
          The inner wrapper shares max-w-3xl with the input dock so messages
          and input stay aligned on wide screens. */}
      <div
        className="flex-1 min-h-0 px-5 py-6 lg:px-6 overflow-y-auto"
        role="log"
        aria-live="polite"
        aria-label="Percakapan dengan METADIA AI"
      >
        <div className="w-full max-w-3xl mx-auto space-y-4">
          {/* Initial Welcome Bubble */}
          <div className="flex gap-3 items-start max-w-full">
            <AIAvatar state="default" size="sm" />
            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-xs text-[15px] font-medium bg-white border border-slate-200/80 text-slate-700 shadow-2xs leading-relaxed">
              Halo! Saya{" "}
              <span className="font-bold text-purple-700">METADIA AI</span>,
              asisten belajarmu.{" "}
              <Hand
                size={16}
                className="inline-block text-amber-500 mx-0.5 -mt-1"
                aria-hidden="true"
              />{" "}
              Silakan kerjakan soalnya, lalu ketik jawabanmu di sini. Jika ada
              kesulitan, tanyakan saja padaku!
            </div>
          </div>

          {messages
            .filter((m: any) => {
              const textContent =
                m.content ||
                m.parts
                  ?.map((p: any) => (p.type === "text" ? p.text : ""))
                  .join("");
              return textContent && textContent.trim().length > 0;
            })
            .map((m: any) => {
              const aiState = hasPassedToolPart(m) ? "happy" : "default";
              const textContent =
                m.content ||
                m.parts
                  ?.map((part: any) => (part.type === "text" ? part.text : ""))
                  .join("") ||
                "";

              return (
                <div
                  key={m.id}
                  className={clsx(
                    "flex gap-3 max-w-full",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {m.role !== "user" && <AIAvatar state={aiState} size="sm" />}
                  <div
                    className={clsx(
                      "max-w-[85%] px-4.5 py-3.5 rounded-2xl text-[15px] leading-relaxed break-words",
                      // Explicit weights: AI text is medium so **bold** inside
                      // a reply actually stands out; the student's own bubble
                      // is slightly heavier on the purple background.
                      m.role === "user"
                        ? "bg-purple-600 text-white font-semibold rounded-tr-xs shadow-xs"
                        : "bg-white border border-slate-200/90 text-slate-800 font-medium rounded-tl-xs shadow-2xs",
                    )}
                  >
                    <div className="flex flex-col gap-2.5 [&>p]:m-0 [&>ul]:m-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:m-0 [&>ol]:list-decimal [&>ol]:pl-5 [&_strong]:font-bold [&_pre]:bg-slate-800 [&_pre]:text-white [&_pre]:p-3 [&_pre]:rounded-lg [&_code]:bg-purple-50 [&_code]:text-purple-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md font-sans">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {textContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}

          {isLoading && (
            <div className="flex gap-3 items-start max-w-full animate-in fade-in duration-200">
              <AIAvatar state="thinking" size="sm" />
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-xs text-sm bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex gap-1.5 items-center h-5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ── Chat Input Dock ── */}
      <div className="px-4 pt-3 pb-4 border-t border-slate-200/80 bg-white flex-none">
        <div className="w-full max-w-3xl mx-auto">
          {isPassed ? (
            <CompletedDock
              allPassed={allPassed}
              isStreaming={isLoading}
              onNext={onNext}
              onComplete={onComplete}
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              {/* Quick replies */}
              <div
                className="flex gap-2 overflow-x-auto pb-0.5"
                role="group"
                aria-label="Pertanyaan cepat"
              >
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleQuickReply(q.text)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 hover:bg-purple-100 hover:border-purple-300 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/20"
                  >
                    <q.Icon size={14} aria-hidden="true" />
                    {q.label}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center bg-slate-50 border border-slate-200/90 focus-within:bg-white focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 rounded-2xl p-2 transition-all shadow-2xs">
                <TextareaAutosize
                  className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-400 text-[15px] min-h-[44px] max-h-[140px] py-2 px-3 resize-none font-sans"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  minRows={1}
                  maxRows={5}
                  placeholder="Ketik jawaban atau pertanyaanmu di sini..."
                  aria-label="Jawaban atau pertanyaanmu"
                  disabled={isLoading}
                />
                <div className="flex items-center gap-2 pl-2">
                  <Button
                    tone="purple"
                    size="sm"
                    disabled={isLoading || !input.trim()}
                    type="submit"
                  >
                    <Icon name="send" size="sm" /> Kirim
                  </Button>
                </div>
              </div>

              {/* Keyboard hint is irrelevant on touch devices, so it's desktop-only */}
              <p className="hidden md:block text-xs text-slate-400 text-center m-0">
                Tekan{" "}
                <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-500">
                  Enter ↵
                </kbd>{" "}
                untuk mengirim •{" "}
                <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-500">
                  Shift + Enter
                </kbd>{" "}
                untuk baris baru
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Animated Counter ───────────────────────────────────────────────────────────
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuart
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(startValue + (value - startValue) * easeOut));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{count}</>;
}

// ─── Completion Screen ──────────────────────────────────────────────────────────
// Two columns on large screens (summary | breakdown + actions) so everything,
// including the buttons, fits without scrolling; stacked on small screens.
function CompletionScreen({
  materialTitle,
  questions,
  attemptNo,
  sessionTotalScore,
  onBackToMaterial,
  onRetake,
}: {
  materialTitle: string;
  questions: SessionQuestion[];
  attemptNo: number;
  sessionTotalScore: number;
  onBackToMaterial: () => void;
  onRetake: () => void;
}) {
  const totalScore =
    sessionTotalScore ||
    questions.reduce((acc, q) => acc + (q.masteryScore || 0), 0);
  const avgScore = questions.length > 0 ? totalScore / questions.length : 0;
  const stars =
    avgScore >= 90 ? 3 : avgScore >= 60 ? 2 : avgScore >= 30 ? 1 : 0;
  const passedCount = questions.filter((q) => q.isPassed).length;
  const copy = RESULT_COPY[stars];
  // Below full stars the most useful next step is another try; with full
  // stars it's moving on. The primary button follows that.
  const retakeIsPrimary = stars < 3;
  const { width, height } = useWindowSize();
  const prefersReducedMotion = usePrefersReducedMotion();

  const masteredObjectives = Array.from(
    new Set(
      questions
        .filter((q) => q.isPassed && q.learningObjective)
        .map((q) => toStudentVoice(q.learningObjective!)),
    ),
  );

  return (
    // w-full + flex-1: without them this root shrinks to its content width
    // when the parent layout is a flex row, pinning the screen to the left.
    // Added overflow-y-auto to allow scrolling on shorter viewports.
    <div
      className="w-full flex-1 min-h-[100dvh] flex flex-col bg-slate-50/90 bg-blend-overlay p-5 lg:p-10 overflow-y-auto"
      style={{
        backgroundImage: `url(${exerciseBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!prefersReducedMotion && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
          />
        </div>
      )}

      {/* my-auto (not justify-center) centers the content when it is short,
          but never clips the top when it is taller than the viewport. */}
      <div className="my-auto mx-auto w-full max-w-xl lg:max-w-5xl grid grid-cols-1 lg:grid-cols-5 lg:items-start gap-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* ── Summary Column ── */}
        <section
          aria-labelledby="result-title"
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {/* Achievement Hero */}
          <div className="flex flex-col items-center text-center gap-4 bg-gradient-to-b from-white to-purple-50/40 rounded-3xl p-7 lg:p-8 border border-purple-100/70 shadow-sm relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

            <div
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-sm z-10 animate-in zoom-in-50 duration-500 delay-150"
              aria-hidden="true"
            >
              <copy.Icon size={48} />
            </div>

            <div className="z-10 flex flex-col items-center">
              <h1
                id="result-title"
                className="text-3xl font-extrabold text-slate-900 m-0 tracking-tight"
              >
                Latihan Selesai!
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1 mb-0">
                {materialTitle}
              </p>
            </div>

            {attemptNo > 1 && (
              <span className="px-3.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200/60 z-10">
                Percobaan ke-{attemptNo}
              </span>
            )}

            <div className="flex flex-col items-center gap-2 z-10">
              <div
                className="flex gap-2 text-4xl"
                role="img"
                aria-label={`${stars} dari 3 bintang`}
              >
                {[1, 2, 3].map((s, idx) => (
                  <span
                    key={s}
                    className={clsx(
                      "transition-transform",
                      s <= stars
                        ? "text-amber-400 drop-shadow-xs scale-110"
                        : "text-slate-200 opacity-50",
                      !prefersReducedMotion &&
                        s <= stars &&
                        "animate-in zoom-in duration-500",
                    )}
                    style={{
                      animationDelay: `${200 + idx * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <Star fill="currentColor" size={32} />
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-600 m-0 max-w-[17rem] leading-relaxed">
                {copy.message}
              </p>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-slate-200/80 p-5 shadow-sm">
              <span className="text-4xl font-black text-purple-600 tracking-tight leading-none mb-1">
                <AnimatedCounter value={totalScore} />
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Score
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-slate-200/80 p-5 shadow-sm">
              <span className="text-4xl font-black text-emerald-600 tracking-tight leading-none mb-1">
                {passedCount}/{questions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Soal Benar
              </span>
            </div>
          </div>
        </section>

        {/* ── Breakdown Column + Actions ── */}
        <section
          aria-label="Rincian hasil"
          className="lg:col-span-3 flex flex-col gap-5"
        >
          {/* Learning Achievement */}
          {masteredObjectives.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                  <BookOpenCheck size={18} />
                </span>
                <h2 className="text-[15px] font-bold text-slate-800 m-0">
                  Yang kamu kuasai
                </h2>
              </div>
              <ul className="m-0 p-0 list-none space-y-2.5">
                {masteredObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] shadow-xs font-bold">
                      ✓
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed m-0 pt-0.5">
                      {obj}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rincian Soal (Simplified Achievement Cards) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 m-0 flex items-center gap-2">
                <ClipboardList
                  size={18}
                  className="text-slate-500"
                  aria-hidden="true"
                />{" "}
                Rincian Soal
              </h2>
            </div>
            <ul className="m-0 p-0 list-none divide-y divide-slate-100">
              {questions.map((q, i) => {
                const isPassed = q.isPassed;
                return (
                  <li
                    key={q.id}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50/30 transition-colors"
                  >
                    <div
                      className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 shadow-2xs",
                        isPassed
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400 border border-slate-200/80",
                      )}
                    >
                      {isPassed ? "✓" : "○"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-slate-800 text-sm block mb-0.5">
                        Soal {i + 1}
                      </span>
                      {q.learningObjective && (
                        <span className="text-xs text-slate-500 block truncate">
                          {toStudentVoice(q.learningObjective)}
                        </span>
                      )}
                    </div>
                    {isPassed && (
                      <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
                        Mastered
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div
              className={clsx(
                "flex-1",
                retakeIsPrimary ? "order-1" : "order-2",
              )}
            >
              <Button
                variant={retakeIsPrimary ? "solid" : "quiet"}
                tone="purple"
                size="lg"
                block
                onClick={onRetake}
              >
                <Icon name="history" />{" "}
                {retakeIsPrimary ? "Coba Lagi" : "Ulangi Latihan"}
              </Button>
            </div>
            <div
              className={clsx(
                "flex-1",
                retakeIsPrimary ? "order-2" : "order-1",
              )}
            >
              <Button
                variant={retakeIsPrimary ? "quiet" : "solid"}
                tone="purple"
                size="lg"
                block
                onClick={onBackToMaterial}
              >
                {retakeIsPrimary ? (
                  <>
                    <Icon name="prev" /> Pelajari Materi
                  </>
                ) : (
                  <>🚀 Lanjut Materi</>
                )}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Main Exercise View ─────────────────────────────────────────────────────────
export default function ExerciseView() {
  const { topicSlug, subTopicSlug, materialId } = useParams();
  const navigate = useNavigate();
  useBGM(BGM.QUIZ, true);
  const playSFX = useSoundStore((s) => s.playSFX);

  const [session, setSession] = useState<ExerciseSessionData | null>(null);
  const [materialData, setMaterialData] = useState<{
    id: number;
    title: string;
    content: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useDocumentTitle(
    materialData?.title ? `Latihan: ${materialData.title}` : "Latihan",
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());
  // True while the confetti burst is playing after a question is newly passed.
  const [celebrating, setCelebrating] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const { width, height } = useWindowSize();

  const prefersReducedMotion = usePrefersReducedMotion();
  const [error, setError] = useState<string | null>(null);

  const initSession = useCallback(async () => {
    if (!materialId) return;
    const id = parseInt(materialId, 10);
    if (isNaN(id)) return;
    try {
      const res = await studentApi.startSession(id);
      if (res.data) {
        const { session: sess, material: mat } = res.data;
        setSession(sess);
        setMaterialData(mat);
        const passed = new Set<string>();
        sess.questions.forEach((q) => {
          if (q.isPassed) passed.add(q.id);
        });
        setPassedIds(passed);
        const firstUnpassed = sess.questions.findIndex((q) => !q.isPassed);
        if (firstUnpassed >= 0) setCurrentIdx(firstUnpassed);
        if (
          sess.status === "COMPLETED" ||
          (sess.questions.length > 0 && sess.questions.every((q) => q.isPassed))
        ) {
          setShowCompletion(true);
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 403) {
        setIsLocked(true);
      } else {
        setError("Koneksi jaringan bermasalah. Gagal memuat sesi latihan.");
      }
    } finally {
      setLoading(false);
    }
  }, [materialId]);

  const isFetchingResultsRef = useRef(false);
  const initDoneRef = useRef(false);

  useEffect(() => {
    if (initDoneRef.current) return;
    initDoneRef.current = true;
    initSession();
  }, [initSession]);

  const handleStreamComplete = useCallback(async () => {
    if (!session || isFetchingResultsRef.current) return;
    isFetchingResultsRef.current = true;
    try {
      const res = await studentApi.getSessionResults(session.id);
      if (!res.data) return;
      const { results, status, totalScore } = res.data;
      const newPassedIds = new Set<string>();
      results.forEach((r) => {
        if (r.isPassed) newPassedIds.add(r.questionId);
      });
      const questions = session.questions;
      const currentQ = questions[currentIdx];
      const isNewlyPassed =
        !!currentQ &&
        newPassedIds.has(currentQ.id) &&
        !passedIds.has(currentQ.id);

      if (isNewlyPassed) {
        if (newPassedIds.size === questions.length) playSFX("VICTORY");
        else playSFX("SUCCESS");
        // The celebration is non-blocking (confetti + the completion dock in
        // the chat), so it can start right away without hiding anything the
        // student still needs to read.
        setCelebrating(true);
      }

      setPassedIds(newPassedIds);
      const updatedQuestions = questions.map((q) => {
        const result = results.find((r) => r.questionId === q.id);
        return result
          ? {
              ...q,
              isPassed: result.isPassed,
              masteryScore: result.masteryScore,
            }
          : q;
      });
      setSession((prev) =>
        prev
          ? { ...prev, questions: updatedQuestions, status, totalScore }
          : prev,
      );
    } catch (err) {
      console.error("Failed to fetch session results:", err);
    } finally {
      isFetchingResultsRef.current = false;
    }
  }, [session, currentIdx, passedIds, playSFX]);

  const handleNextQuestion = useCallback(() => {
    if (!session?.questions) return;
    setCelebrating(false);
    const questions = session.questions;
    for (let i = currentIdx + 1; i < questions.length; i++) {
      if (!passedIds.has(questions[i].id)) {
        setCurrentIdx(i);
        return;
      }
    }
    for (let i = 0; i < currentIdx; i++) {
      if (!passedIds.has(questions[i].id)) {
        setCurrentIdx(i);
        return;
      }
    }
  }, [session, currentIdx, passedIds]);

  const handleShowCompletion = useCallback(async () => {
    setCelebrating(false);
    if (session) {
      try {
        const res = await studentApi.getSessionResults(session.id);
        if (res.data) {
          const { results, totalScore } = res.data;
          const updatedQuestions = session.questions.map((q) => {
            const result = results.find((r) => r.questionId === q.id);
            return result
              ? {
                  ...q,
                  isPassed: result.isPassed,
                  masteryScore: result.masteryScore,
                }
              : q;
          });
          setSession((prev) =>
            prev ? { ...prev, questions: updatedQuestions, totalScore } : prev,
          );
        }
      } catch (err) {
        console.error("Failed to refresh final scores:", err);
      }
    }
    setShowCompletion(true);
  }, [session]);

  const handleRetake = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setShowCompletion(false);
    setCelebrating(false);
    setCurrentIdx(0);
    setPassedIds(new Set());
    try {
      const res = await studentApi.retakeSession(session.id);
      if (res.data) {
        const { session: newSess, material: mat } = res.data;
        setSession(newSess);
        setMaterialData(mat);
      }
    } catch (err) {
      console.error("Retake failed:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const materialPath = `/student/topics/${topicSlug}/${subTopicSlug}/${materialId}`;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[100dvh] bg-slate-50/50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium m-0">
            Memuat latihan soal...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[100dvh] gap-6 text-center px-6 bg-slate-50/50">
        <ErrorNote>{error}</ErrorNote>
        <Button
          variant="solid"
          tone="purple"
          onClick={() => {
            setLoading(true);
            setError(null);
            initSession();
          }}
        >
          <Icon name="refresh" /> Coba Lagi
        </Button>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[100dvh] gap-6 text-center px-6 bg-slate-50/50">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
          <Lock size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 m-0">
            Latihan Terkunci
          </h2>
          <p className="text-slate-500 text-sm max-w-md mt-2 m-0 leading-relaxed">
            Anda harus menyelesaikan materi sebelumnya terlebih dahulu sebelum
            dapat mengakses latihan ini.
          </p>
        </div>
        <Button
          variant="solid"
          tone="purple"
          onClick={() =>
            navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)
          }
        >
          <Icon name="prev" /> Kembali ke Subtopik
        </Button>
      </div>
    );
  }

  if (!session || !materialData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[100dvh] gap-6 text-center px-6 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 m-0">
          Materi tidak ditemukan
        </h2>
        <Button
          variant="solid"
          tone="purple"
          onClick={() =>
            navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)
          }
        >
          <Icon name="prev" /> Kembali ke Subtopik
        </Button>
      </div>
    );
  }

  const questions = session.questions || [];

  if (showCompletion) {
    return (
      <CompletionScreen
        materialTitle={materialData.title}
        questions={questions}
        attemptNo={session.attemptNo}
        sessionTotalScore={session.totalScore}
        onBackToMaterial={() => navigate(materialPath)}
        onRetake={handleRetake}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[100dvh] gap-6 text-center px-6 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 m-0">
          Tidak ada soal untuk materi ini.
        </h2>
        <Button
          variant="solid"
          tone="purple"
          onClick={() => navigate(materialPath)}
        >
          <Icon name="prev" /> Kembali ke Materi
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const isCurrentPassed = passedIds.has(currentQuestion.id);
  const allPassed = passedIds.size >= questions.length;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden bg-white">
      {/* ── Left Pane: Quiz & App Info ── */}
      <div className="w-full lg:w-[45%] lg:h-full flex flex-col border-r border-slate-200/80 relative bg-slate-50/40">
        <div className="flex flex-col flex-1 min-h-0 p-5 lg:p-8 lg:overflow-y-auto">
          {/* Top bar — kept slim so the question stays above the fold */}
          <div className="flex items-center justify-between mb-6">
            <img
              src={logoRectangle}
              alt="METADIA"
              className="h-16 w-auto object-contain -ml-1"
            />
            <Link
              to={materialPath}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-600 px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200/60 transition-all shadow-none hover:shadow-xs focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/20"
              data-clicksound="click"
            >
              <Icon name="prev" size="sm" /> Kembali ke Materi
            </Link>
          </div>

          {/* Title Area */}
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/60 text-purple-700 text-xs font-bold border border-purple-200/50">
                Latihan Soal
              </span>
              {session.attemptNo > 1 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                  Percobaan ke-{session.attemptNo}
                </span>
              )}
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug m-0">
              {materialData.title}
            </h1>
          </div>

          {/* Progress — stepper and counter share one row; the "Progres
              Latihan" label was dropped because the stepper explains itself. */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <ProgressStepper
              questions={questions}
              currentIdx={currentIdx}
              passedIds={passedIds}
              onSelect={(i) => setCurrentIdx(i)}
            />
            <span className="text-xs font-semibold text-slate-500 flex-shrink-0">
              Soal {currentIdx + 1} dari {questions.length}
            </span>
          </div>

          {/* Question Section Focal Point */}
          <div className="flex flex-col flex-1">
            {currentQuestion.learningObjective && (
              <div className="mb-3 flex items-start gap-2 px-1">
                <span className="text-purple-500 mt-0.5 flex-shrink-0">
                  <Icon name="target" size="sm" />
                </span>
                <span className="text-sm font-medium text-slate-500 leading-relaxed">
                  {toStudentVoice(currentQuestion.learningObjective)}
                </span>
              </div>
            )}

            {/* Question card. Passed questions get a calm green tint instead
                of a text badge — status is already spelled out in the chat
                dock, so the card only needs a quiet visual cue. */}
            <div
              className={clsx(
                "relative flex-1 flex items-center min-h-[240px] rounded-3xl border p-6 lg:p-8 text-slate-800 text-lg lg:text-xl leading-relaxed transition-colors duration-500",
                isCurrentPassed
                  ? "bg-emerald-50/40 border-emerald-300/70 ring-4 ring-emerald-500/10"
                  : "bg-white border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
              )}
            >
              <div className="w-full">
                {currentQuestion.questionUi?.type === "doc" ? (
                  renderTipTapNode(currentQuestion.questionUi)
                ) : (
                  <p className="text-slate-400 m-0">
                    Konten soal tidak dapat dimuat.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Pane: AI Chat ── */}
      <div className="w-full lg:w-[55%] flex flex-col h-[70vh] lg:h-full min-h-0 bg-slate-50/60 relative">
        <QuestionChat
          key={currentQuestion.id}
          question={currentQuestion}
          sessionId={session.id.toString()}
          isPassed={isCurrentPassed}
          allPassed={allPassed}
          onStreamComplete={handleStreamComplete}
          onNext={handleNextQuestion}
          onComplete={handleShowCompletion}
        />
      </div>

      {/* Full-screen confetti burst on success (skipped for students who
          prefer reduced motion). It unmounts itself when it finishes. */}
      {celebrating && !prefersReducedMotion && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.2}
            onConfettiComplete={() => setCelebrating(false)}
          />
        </div>
      )}
    </div>
  );
}
