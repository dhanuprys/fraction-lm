import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminChatLogsApi, type ChatSession } from "@/lib/api/adminChatLogs";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Blob, Badge } from "@/components/pouf/media";
import { ChatSessionViewer } from "@/components/admin/ChatSessionViewer";
import { Pagination } from "@/components/pouf/pagination";
import { Dialog } from "@/components/pouf/controls";

export function AdminChatLogs() {
  useDocumentTitle("Riwayat Belajar - Portal Admin");

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    setLoading(true);
    const offset = (page - 1) * LIMIT;
    adminChatLogsApi.getSessions({ limit: LIMIT, offset }).then((res) => {
      if (res.data) {
        setSessions(res.data.sessions);
        if (res.data.pagination) setTotalPages(res.data.pagination.totalPages);
      }
      setLoading(false);
    });
  }, [page]);

  return (
    <Stack gap={6}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Riwayat Sesi Belajar</Heading>
          <Text muted>Pantau interaksi siswa dengan AI.</Text>
        </Stack>
      </Row>

      {loading ? (
        <Text muted>Memuat data sesi...</Text>
      ) : sessions.length === 0 ? (
        <Card>
          <Text muted>Belum ada sesi belajar yang tersimpan.</Text>
        </Card>
      ) : (
        <Stack gap={3}>
          {sessions.map((session) => (
            <RowCard key={session.id} onClick={() => setSelectedSessionId(session.id)}>
              <Row gap={4} className="w-full" align="center" wrap={false}>
                <Blob icon="log" tone="yellow" size="sm" />
                <div className="flex-1 min-w-0">
                  <Stack gap={1}>
                    <Heading level={3}>{session.student.name}</Heading>
                    <Text size="sm" muted truncate>
                      {session.material.title} (Percobaan {session.attemptNo})
                    </Text>
                  </Stack>
                </div>
                <Badge tone={session.status === "COMPLETED" ? "mint" : "idle"}>
                  {session.status}
                </Badge>
              </Row>
            </RowCard>
          ))}
        </Stack>
      )}

      {totalPages > 1 && <Pagination page={page} total={totalPages} onChange={setPage} />}

      <Dialog
        open={!!selectedSessionId}
        onOpenChange={(open) => !open && setSelectedSessionId(null)}
        title="Riwayat Sesi"
        size="lg"
        trigger={<div style={{ display: "none" }} />}
      >
        {selectedSessionId && (
          <div className="h-[600px]">
            <ChatSessionViewer sessionId={selectedSessionId} />
          </div>
        )}
      </Dialog>
    </Stack>
  );
}
