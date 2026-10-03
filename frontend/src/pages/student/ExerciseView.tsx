import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { studentApi, type SessionQuestion, type ExerciseSessionData } from "@/lib/api/student";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Badge, Blob } from "@/components/pouf/media";
import { renderTipTapNode } from "@/components/TipTapRenderer";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useAuthStore } from "@/store/useAuthStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { useSoundStore } from "@/store/useSoundStore";
import { BGM } from "@/config/sound.config";
import { config } from "@/config";
import { inputClasses } from "@/components/pouf/Input";
import { Icon } from "@/components/pouf/Icon";
import { AIAvatar } from "@/components/ui/AIAvatar";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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
    <div className="flex items-center justify-center gap-1">
      {questions.map((q, i) => {
        const isPassed = passedIds.has(q.id);
        const isCurrent = i === currentIdx;
        return (
          <div key={q.id} className="flex items-center gap-1">
            <button
              onClick={() => onSelect(i)}
              className={clsx(
                "w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 cursor-pointer",
                isPassed
                  ? "bg-[var(--mint)] text-[var(--on-accent)] shadow-sm"
                  : isCurrent
                    ? "bg-[var(--purple)] text-[var(--on-accent)] ring-4 ring-[var(--purple)]/30 scale-110"
                    : "bg-surface text-[var(--muted)] border border-[var(--separator)] hover:border-[var(--purple)] hover:text-[var(--purple)]",
              )}
              title={`Soal ${i + 1}${isPassed ? " (Selesai)" : ""}`}
            >
              {isPassed ? "✓" : i + 1}
            </button>
            {i < questions.length - 1 && (
              <div
                className={clsx(
                  "w-6 h-0.5 rounded transition-colors",
                  isPassed ? "bg-[var(--mint)]" : "bg-[var(--separator)]",
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
    <div className="flex flex-col h-full p-4 gap-3 animate-pulse">
      <div className="h-10 bg-surface rounded-full w-3/4" />
      <div className="h-10 bg-surface rounded-full w-1/2 self-end" />
      <div className="h-10 bg-surface rounded-full w-2/3" />
      <div className="h-10 bg-surface rounded-full w-1/3 self-end" />
    </div>
  );
}

// ─── Question Chat Panel ────────────────────────────────────────────────────────
function QuestionChat({
  question,
  sessionId,
  isPassed,
  onStreamComplete,
}: {
  question: SessionQuestion;
  sessionId: string;
  isPassed: boolean;
  onStreamComplete: () => void;
}) {
  const token = useAuthStore((s) => s.token);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef<string>("ready");
  const triggeredToolMsgIdRef = useRef<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrationDoneRef = useRef(false);

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

  // Lazy chat hydration — load previous messages from server on mount
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

  // Detect when streaming completes or when tool is called → trigger parent re-fetch
  useEffect(() => {
    let justTriggered = false;
    
    // 1. Instantaneous trigger: Check if AI just invoked the mark_question_passed tool
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.parts) {
      const hasPassedTool = lastMessage.parts.some(
        (part: any) =>
          part.type === "tool-mark_question_passed" ||
          (part.type === "dynamic-tool" && part.toolName === "mark_question_passed"),
      );
      if (hasPassedTool && triggeredToolMsgIdRef.current !== lastMessage.id) {
        triggeredToolMsgIdRef.current = lastMessage.id;
        justTriggered = true;
        onStreamComplete();
      }
    }

    // 2. Fallback trigger: When streaming completes
    if (prevStatusRef.current !== "ready" && status === "ready" && messages.length > 0) {
      if (!justTriggered) {
        onStreamComplete();
      }
    }
    prevStatusRef.current = status;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Show skeleton while hydrating chat history
  if (!isHydrated) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-(--s4) [border-bottom:1px_solid_var(--separator)] flex-none">
        <Row align="center" gap={2}>
          <AIAvatar state={isLoading ? "thinking" : isPassed ? "happy" : "standby"} size="sm" />
          <Heading level={3}>METADIA AI</Heading>
        </Row>
      </div>

      {/* Messages */}
      <div className="flex-1 p-(--s4) overflow-y-auto flex flex-col gap-(--s3)">
        {/* Welcome message */}
        <div className="flex gap-2 items-start max-w-full">
          <AIAvatar state="default" size="sm" />
          <div className="max-w-[85%] px-4 py-3 rounded-[20px] rounded-tl-sm font-bold text-sm bg-surface text-ink [box-shadow:var(--pouf-row)]">
            Halo! Saya METADIA AI, asisten belajarmu. 😊 Silakan kerjakan soalnya, lalu ketik
            jawabanmu di sini. Jika ada kesulitan, tanyakan saja padaku!
          </div>
        </div>

        {messages
          .filter((m: any) => {
            const textContent =
              m.content || m.parts?.map((p: any) => (p.type === "text" ? p.text : "")).join("");
            return textContent && textContent.trim().length > 0;
          })
          .map((m: any, index: number, array: any[]) => {
            const isLastMessage = index === array.length - 1;
            const textContent =
              m.content ||
              m.parts?.map((part: any) => (part.type === "text" ? part.text : "")).join("") ||
              "";

            const lower = textContent.toLowerCase();
            const positiveWords = ["benar", "tepat", "bagus", "hebat", "selamat", "betul"];
            const aiState =
              (isLastMessage && isPassed) || positiveWords.some((w) => lower.includes(w))
                ? "happy"
                : "default";

            return (
              <div
                key={m.id}
                className={clsx(
                  "flex gap-2 max-w-full",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {m.role !== "user" && <AIAvatar state={aiState} size="sm" />}
                <div
                  className={clsx(
                    "max-w-[85%] px-4 py-3 rounded-[20px] font-medium text-sm",
                    m.role === "user"
                      ? "bg-purple text-[var(--on-accent)] [box-shadow:var(--pouf-control)] rounded-tr-sm"
                      : "bg-surface text-ink [box-shadow:var(--pouf-row)] rounded-tl-sm",
                  )}
                >
                  <div className="flex flex-col gap-2 [&>p]:m-0 [&>p]:leading-relaxed [&>ul]:m-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:m-0 [&>ol]:list-decimal [&>ol]:pl-4">
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

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-2 items-start max-w-full">
            <AIAvatar state="loading" size="sm" />
            <div className="max-w-[85%] px-4 py-3 rounded-[20px] rounded-tl-sm text-sm bg-surface text-ink [box-shadow:var(--pouf-row)]">
              <div className="flex gap-1.5 items-center h-5">
                <span className="w-2 h-2 rounded-full bg-[var(--purple)] animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-[var(--purple)] animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[var(--purple)] animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-(--s4) [border-top:1px_solid_var(--separator)] flex-none">
        <form onSubmit={handleSubmit} className="w-full">
          <Row gap={2} align="end" wrap={false}>
            <div className="flex-1 min-w-0">
              <TextareaAutosize
                className={clsx(
                  inputClasses({ bare: false, invalid: false, mono: false }),
                  "resize-none min-h-[52px] max-h-[150px] w-full block",
                )}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                minRows={1}
                maxRows={5}
                placeholder={
                  isPassed ? "Soal ini sudah dijawab benar!" : "Ketik jawaban atau pertanyaanmu..."
                }
                disabled={isLoading || isPassed}
              />
            </div>
            <Button
              tone="purple"
              disabled={isLoading || isPassed || !input.trim()}
              type="submit"
              label="Kirim"
            >
              <Icon name="send" size="sm" />
            </Button>
          </Row>
        </form>
      </div>
    </div>
  );
}

// ─── Success Celebration Overlay ────────────────────────────────────────────────
function SuccessCelebration({
  isLastQuestion,
  onNext,
  onComplete,
}: {
  isLastQuestion: boolean;
  onNext: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-[var(--card-radius)] z-10 animate-in fade-in duration-300">
      <Stack gap={4} className="text-center items-center p-8">
        <div className="text-6xl animate-bounce">🎉</div>
        <Heading level={2}>Jawaban Benar!</Heading>
        <Text muted>Kamu berhasil menjawab soal ini dengan benar. Hebat!</Text>
        <Button tone="mint" size="lg" onClick={isLastQuestion ? onComplete : onNext}>
          {isLastQuestion ? "🏆 Lihat Hasil Latihan" : "Lanjut ke Soal Berikutnya →"}
        </Button>
      </Stack>
    </div>
  );
}

// ─── Completion Screen ──────────────────────────────────────────────────────────
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
    sessionTotalScore || questions.reduce((acc, q) => acc + (q.masteryScore || 0), 0);
  const avgScore = questions.length > 0 ? totalScore / questions.length : 0;
  const stars = avgScore >= 90 ? 3 : avgScore >= 60 ? 2 : avgScore >= 30 ? 1 : 0;
  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col gap-8">
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
        />
      </div>
      <Stack gap={4}>
        <Card variant="default">
          <Stack gap={6} className="items-center text-center py-4">
            {/* Trophy / Stars */}
            <div className="text-7xl">
              {stars >= 3 ? "🏆" : stars >= 2 ? "⭐" : stars >= 1 ? "👍" : "📚"}
            </div>

            <Stack gap={2} className="items-center">
              <Heading level={1}>Latihan Selesai!</Heading>
              <Text muted>{materialTitle}</Text>
              <div className="flex justify-center">
                {attemptNo > 1 && <Badge tone="purple">Percobaan ke-{attemptNo}</Badge>}
              </div>
            </Stack>

            {/* Star display */}
            <div className="flex gap-2 text-4xl">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={clsx(
                    "transition-transform",
                    s <= stars ? "scale-110" : "opacity-20 grayscale",
                  )}
                >
                  ⭐
                </span>
              ))}
            </div>

            <Stack gap={1} className="items-center">
              <div className="text-5xl font-black text-[var(--purple)]">{totalScore}</div>
              <Text size="sm" muted>
                Total Skor
              </Text>
            </Stack>

            <Text size="sm" muted>
              {questions.filter((q) => q.isPassed).length} dari {questions.length} soal berhasil
              dijawab
            </Text>
          </Stack>
        </Card>

        {/* Per-question summary */}
        <Card variant="default">
          <Stack gap={4}>
            <Heading level={3}>Rincian Soal</Heading>
            <Stack gap={2}>
              {questions.map((q, i) => (
                <div key={q.id} className="flex items-center gap-3 px-4 py-3 bg-surface rounded-xl">
                  <div
                    className={clsx(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                      q.isPassed
                        ? "bg-[var(--mint)] text-[var(--on-accent)]"
                        : "bg-[var(--separator)] text-[var(--muted)]",
                    )}
                  >
                    {q.isPassed ? "✓" : "✗"}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <Text size="sm" className="font-bold">
                      Soal {i + 1}
                    </Text>
                    {q.learningObjective && (
                      <Text size="sm" muted className="truncate">
                        {q.learningObjective}
                      </Text>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge tone={q.isPassed ? "up" : "idle"}>{q.masteryScore ?? 0} poin</Badge>
                  </div>
                </div>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button tone="purple" size="lg" onClick={onRetake}>
            <Icon name="history" /> Ulangi Latihan
          </Button>
          <Button variant="solid" tone="idle" size="lg" onClick={onBackToMaterial}>
            <Icon name="prev" /> Kembali ke Materi
          </Button>
        </div>
      </Stack>
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

  useDocumentTitle(materialData?.title ? `Latihan: ${materialData.title}` : "Latihan");

  const [currentIdx, setCurrentIdx] = useState(0);
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());
  const [justPassed, setJustPassed] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const { width, height } = useWindowSize();

  // Start or resume session
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

        // Build initial passed set from session results
        const passed = new Set<string>();
        sess.questions.forEach((q) => {
          if (q.isPassed) passed.add(q.id);
        });
        setPassedIds(passed);

        // Auto-advance to first unpassed question
        const firstUnpassed = sess.questions.findIndex((q) => !q.isPassed);
        if (firstUnpassed >= 0) {
          setCurrentIdx(firstUnpassed);
        }

        // If all already passed, show completion screen
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
      }
    } finally {
      setLoading(false);
    }
  }, [materialId]);

  const isFetchingResultsRef = useRef(false);
  const initDoneRef = useRef(false);

  // Initial load
  useEffect(() => {
    if (initDoneRef.current) return;
    initDoneRef.current = true;
    initSession();
  }, [initSession]);

  // Called by QuestionChat when AI finishes streaming — lightweight results check
  const handleStreamComplete = useCallback(async () => {
    if (!session || isFetchingResultsRef.current) return;
    isFetchingResultsRef.current = true;

    try {
      const res = await studentApi.getSessionResults(session.id);
      if (!res.data) return;

      const { results, status, totalScore } = res.data;

      // Build fresh passed set
      const newPassedIds = new Set<string>();
      results.forEach((r) => {
        if (r.isPassed) newPassedIds.add(r.questionId);
      });

      // Detect if the CURRENT question just became passed (optimistic)
      const questions = session.questions;
      const currentQ = questions[currentIdx];
      if (currentQ && newPassedIds.has(currentQ.id) && !passedIds.has(currentQ.id)) {
        setJustPassed(true);
        if (newPassedIds.size === questions.length) {
          playSFX("VICTORY");
        } else {
          playSFX("SUCCESS");
        }
      }

      setPassedIds(newPassedIds);

      // Update session questions with new scores
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
        prev ? { ...prev, questions: updatedQuestions, status, totalScore } : prev,
      );
    } catch (err) {
      console.error("Failed to fetch session results:", err);
    } finally {
      isFetchingResultsRef.current = false;
    }
  }, [session, currentIdx, passedIds, playSFX]);

  // Navigate to next unpassed question
  const handleNextQuestion = useCallback(() => {
    if (!session?.questions) return;
    setJustPassed(false);

    const questions = session.questions;
    // Look forward first
    for (let i = currentIdx + 1; i < questions.length; i++) {
      if (!passedIds.has(questions[i].id)) {
        setCurrentIdx(i);
        return;
      }
    }
    // Wrap around
    for (let i = 0; i < currentIdx; i++) {
      if (!passedIds.has(questions[i].id)) {
        setCurrentIdx(i);
        return;
      }
    }
  }, [session, currentIdx, passedIds]);

  // Show completion screen
  const handleShowCompletion = useCallback(async () => {
    setJustPassed(false);
    // Lightweight refresh of final scores
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

  // Retake handler
  const handleRetake = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setShowCompletion(false);
    setJustPassed(false);
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

  // ── Loading / Error States ──
  if (loading) {
    return (
      <Stack gap={6}>
        <Text muted>Memuat latihan soal...</Text>
      </Stack>
    );
  }

  if (isLocked) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Latihan Terkunci 🔒</Heading>
        <Text muted>
          Anda harus menyelesaikan materi sebelumnya terlebih dahulu sebelum dapat mengakses latihan
          ini.
        </Text>
        <div>
          <Button
            variant="solid"
            tone="idle"
            onClick={() => navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)}
          >
            <Icon name="prev" /> Kembali ke Subtopik
          </Button>
        </div>
      </Stack>
    );
  }

  if (!session || !materialData) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Materi tidak ditemukan</Heading>
        <div>
          <Button
            variant="solid"
            tone="idle"
            onClick={() => navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)}
          >
            <Icon name="prev" /> Kembali ke Subtopik
          </Button>
        </div>
      </Stack>
    );
  }

  const questions = session.questions || [];

  // ── Completion Screen ──
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

  // ── No questions ──
  if (questions.length === 0) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Tidak ada soal untuk materi ini.</Heading>
        <div>
          <Button variant="solid" tone="idle" onClick={() => navigate(materialPath)}>
            <Icon name="prev" /> Kembali ke Materi
          </Button>
        </div>
      </Stack>
    );
  }

  const currentQuestion = questions[currentIdx];
  const allPassedAfterThis = passedIds.size + (justPassed ? 0 : 1) >= questions.length;

  return (
    <div className="flex flex-col gap-3 md:h-[calc(100vh-120px)]">
      {/* ── Compact Header ── */}
      <div className="flex-none">
        <Link to={materialPath} className="inline-block mb-2" data-clicksound="click">
          <span className="hover:text-[var(--on-surface)] transition-colors">
            <Text size="sm" muted>
              ← Kembali ke Penjelasan Materi
            </Text>
          </span>
        </Link>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card variant="default">
            {/* Desktop: single row | Mobile: stacked */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <Eyebrow>
                  Latihan Soal {session.attemptNo > 1 ? `(Percobaan ke-${session.attemptNo})` : ""}
                </Eyebrow>
                <Heading level={3}>{materialData.title}</Heading>
              </div>

              {/* Progress Stepper + Badge row */}
              <div className="flex items-center gap-3 flex-1 justify-between md:justify-end">
                {questions.length > 1 && (
                  <div className="flex-shrink-0">
                    <ProgressStepper
                      questions={questions}
                      currentIdx={currentIdx}
                      passedIds={passedIds}
                      onSelect={(i) => {
                        if (!justPassed) {
                          setJustPassed(false);
                          setCurrentIdx(i);
                        }
                      }}
                    />
                  </div>
                )}
                <Badge tone="purple" className="flex-shrink-0">
                  {passedIds.size} / {questions.length} Selesai
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Main Content: Two Equal-Height Columns ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3">
        {/* Left: Question Card — scrollable inside */}
        <motion.div
          className="lg:flex-1 min-h-0 flex flex-col relative z-10"
          key={`question-${currentQuestion.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex-1 overflow-y-auto rounded-[var(--card-radius)]">
            <Card variant="default">
              <Stack gap={4}>
                <Row justify="between" align="center">
                  <Heading level={3}>Pertanyaan</Heading>
                  <Badge tone={passedIds.has(currentQuestion.id) ? "up" : "purple"}>
                    {passedIds.has(currentQuestion.id)
                      ? "✓ Selesai"
                      : `Soal ${currentIdx + 1} dari ${questions.length}`}
                  </Badge>
                </Row>

                {/* Learning objective */}
                {currentQuestion.learningObjective && (
                  <div className="px-4 py-3 bg-[rgba(201,168,255,0.12)] rounded-xl border border-[var(--purple)]/20">
                    <Row gap={2} wrap={false} align="center">
                      <Blob icon="target" tone="purple" size="sm" />
                      <Text size="sm">
                        <strong>Tujuan:</strong> {currentQuestion.learningObjective}
                      </Text>
                    </Row>
                  </div>
                )}

                {/* Question content */}
                <div className="text-xl leading-loose pt-4 pb-2 pouf-text">
                  {currentQuestion.questionUi?.type === "doc" ? (
                    renderTipTapNode(currentQuestion.questionUi)
                  ) : (
                    <Text muted>Konten soal tidak dapat dimuat.</Text>
                  )}
                </div>
              </Stack>
            </Card>
          </div>

          {/* Success celebration overlay */}
          {justPassed && (
            <SuccessCelebration
              isLastQuestion={allPassedAfterThis}
              onNext={handleNextQuestion}
              onComplete={handleShowCompletion}
            />
          )}
        </motion.div>

        {/* Full-screen Confetti on Success */}
        {justPassed && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={300}
              gravity={0.2}
            />
          </div>
        )}

        {/* Right: Chat Panel — all chats rendered, only active one visible */}
        <motion.div
          className="w-full lg:w-[400px] min-h-[380px] lg:min-h-0 flex-none flex flex-col relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex-1 min-h-0 rounded-[var(--card-radius)] bg-white [box-shadow:var(--pouf-card)] flex flex-col overflow-hidden">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={i === currentIdx ? "flex flex-col flex-1 min-h-0" : "hidden"}
              >
                <QuestionChat
                  question={q}
                  sessionId={session.id}
                  isPassed={passedIds.has(q.id)}
                  onStreamComplete={handleStreamComplete}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
