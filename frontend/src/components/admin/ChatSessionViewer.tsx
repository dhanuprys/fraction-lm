import { useEffect, useState, useRef } from "react";
import { Stack, Row } from "@/components/pouf/layout";
import { Text, Heading } from "@/components/pouf/text";
import { Blob, Badge } from "@/components/pouf/media";
import { AIAvatar } from "@/components/ui/AIAvatar";
import { adminChatLogsApi, type SessionLogsResponse } from "@/lib/api/adminChatLogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export function ChatSessionViewer({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<SessionLogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line react/set-state-in-effect
    setLoading(true);
    adminChatLogsApi
      .getSessionLogs(sessionId)
      .then((res) => {
        if (mounted && res.data) {
          setData(res.data);
          // Scroll to bottom after load
          setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Text muted>Memuat percakapan...</Text>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center">
        <Text muted>Percakapan tidak ditemukan.</Text>
      </div>
    );
  }

  return (
    <Stack gap={4} className="h-full">
      <div className="border-b border-[var(--separator)] pb-4">
        <Heading level={3}>Sesi Belajar: {data.session.student.name}</Heading>
        <Text size="sm" muted>
          Materi: {data.session.material.title}
        </Text>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4">
        {data.logs.map((log) => {
          const isAI = log.sender === "AI";
          const isSystem = log.sender === "SYSTEM";

          if (isSystem) {
            let toolData = log.message;
            try {
              const parsed = JSON.parse(log.message);
              if (Array.isArray(parsed)) {
                toolData = parsed.map((t) => `${t.name}(${JSON.stringify(t.args)})`).join(", ");
              }
            } catch {
              // fallback to raw message
            }

            return (
              <div key={log.id} className="flex justify-center my-4">
                <div className="bg-[var(--blue)]/10 border border-[var(--blue)]/20 text-[var(--blue)] px-4 py-2 rounded-xl text-xs font-mono max-w-[85%] break-words">
                  <div className="font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Sistem Menjalankan Aksi
                  </div>
                  <div className="opacity-80">{toolData}</div>
                </div>
              </div>
            );
          }

          return (
            <Row key={log.id} justify={isAI ? "start" : "end"} align="top" wrap={false} gap={3}>
              {isAI && <AIAvatar state="standby" size="sm" className="mt-1" />}

              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  isAI
                    ? "bg-[var(--surface)] [box-shadow:var(--pouf-row)] text-[var(--ink)] rounded-tl-none"
                    : "bg-[var(--purple)] text-[var(--on-accent)] [box-shadow:var(--pouf-control)] rounded-tr-none"
                }`}
              >
                {log.isHint && (
                  <Text
                    size="sm"
                    className={isAI ? "text-[var(--purple)] mb-1 font-medium" : "mb-1 font-medium"}
                  >
                    [Hint Diberikan]
                  </Text>
                )}
                <div className="flex flex-col gap-2 [&>p]:m-0 [&>p]:leading-relaxed [&>ul]:m-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:m-0 [&>ol]:list-decimal [&>ol]:pl-4 pouf-text">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {log.message}
                  </ReactMarkdown>
                </div>
                {isAI && log.usedModel && (
                  <div className="mt-2 border-t border-[var(--separator)] pt-2 opacity-80 flex justify-end">
                    <Badge tone="purple">{log.usedModel}</Badge>
                  </div>
                )}
              </div>

              {!isAI && <Blob icon="user" tone="blue" size="sm" className="flex-shrink-0 mt-1" />}
            </Row>
          );
        })}
        {data.logs.length === 0 && (
          <Text muted className="text-center mt-10">
            Belum ada pesan di sesi ini.
          </Text>
        )}
        <div ref={endRef} />
      </div>
    </Stack>
  );
}
