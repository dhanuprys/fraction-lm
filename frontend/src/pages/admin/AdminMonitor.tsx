import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { config } from "@/config";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Badge } from "@/components/pouf/media";
import { IconBell, IconMessageCircle, IconExternalLink } from "@tabler/icons-react";
import { Dialog } from "@/components/pouf/controls";
import { ChatSessionViewer } from "@/components/admin/ChatSessionViewer";

interface MonitorEvent {
  studentId: number;
  studentName: string;
  questionId: number;
  message?: string;
  reason?: string;
  sender?: string;
  timestamp: string;
  sessionId?: string;
}

export default function AdminMonitor() {
  useDocumentTitle("Live Monitor");
  const token = useAuthStore((state) => state.token);

  const [alarms, setAlarms] = useState<MonitorEvent[]>([]);
  const [activities, setActivities] = useState<MonitorEvent[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSource(`${config.API_URL}/admin/monitor/stream?token=${token}`);

    eventSource.addEventListener("activity", (e) => {
      try {
        const data = JSON.parse(e.data) as MonitorEvent;
        setActivities((prev) => [data, ...prev].slice(0, 50));
      } catch (err) {
        console.error("Failed to parse activity data", err);
      }
    });

    eventSource.addEventListener("alarm", (e) => {
      try {
        const data = JSON.parse(e.data) as MonitorEvent;
        setAlarms((prev) => [data, ...prev].slice(0, 20));
      } catch (err) {
        console.error("Failed to parse alarm data", err);
      }
    });

    eventSource.addEventListener("error", (e) => {
      console.error("SSE Error:", e);
      // EventSource automatically attempts to reconnect
    });

    return () => {
      eventSource.close();
    };
  }, [token]);

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Monitor Kelas</Eyebrow>
          <Heading level={1}>Live Monitor Siswa</Heading>
          <Text muted>Pantau aktivitas dan peringatan intervensi AI secara real-time.</Text>
        </Stack>
        <Badge tone="green">Terkoneksi (SSE)</Badge>
      </Row>

      <Grid cols={2} gap={4}>
        <Stack gap={4}>
          <Row justify="between">
            <Row gap={2} align="center">
              <IconBell className="text-red-500" />
              <Heading level={3}>Peringatan / Intervensi Guru</Heading>
            </Row>
            <Badge tone="red">{alarms.length}</Badge>
          </Row>

          <Stack gap={3}>
            {alarms.length === 0 ? (
              <Card>
                <Text muted className="text-center py-4">
                  Belum ada peringatan.
                </Text>
              </Card>
            ) : (
              alarms.map((alarm, idx) => (
                <Card key={idx} className="border-red-200 bg-red-50 dark:bg-red-900/10">
                  <Stack gap={2}>
                    <Row justify="between">
                      <Text weight="bold">
                        {alarm.studentName} (ID: {alarm.studentId})
                      </Text>
                      <Text size="sm" muted>
                        {new Date(alarm.timestamp).toLocaleTimeString()}
                      </Text>
                    </Row>
                    <Text className="text-red-700 dark:text-red-400 font-medium">
                      Membutuhkan Bantuan: {alarm.reason}
                    </Text>
                    {alarm.sessionId && (
                      <Row justify="end" className="mt-2">
                        <button
                          className="flex items-center gap-1 text-sm text-red-700 font-medium hover:underline"
                          onClick={() => setSelectedSessionId(alarm.sessionId || null)}
                        >
                          Lihat Percakapan <IconExternalLink size={14} />
                        </button>
                      </Row>
                    )}
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        </Stack>

        <Stack gap={4}>
          <Row justify="between">
            <Row gap={2} align="center">
              <IconMessageCircle className="text-blue-500" />
              <Heading level={3}>Aktivitas Terbaru</Heading>
            </Row>
            <Badge tone="blue">{activities.length}</Badge>
          </Row>

          <Stack gap={3}>
            {activities.length === 0 ? (
              <Card>
                <Text muted className="text-center py-4">
                  Menunggu aktivitas siswa...
                </Text>
              </Card>
            ) : (
              activities.map((activity, idx) => (
                <Card key={idx}>
                  <Stack gap={2}>
                    <Row justify="between">
                      <Text weight="bold">
                        {activity.studentName} (ID: {activity.studentId})
                      </Text>
                      <Text size="sm" muted>
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </Text>
                    </Row>
                    <Badge tone={activity.sender === "AI" ? "purple" : "blue"}>
                      {activity.sender === "AI" ? "AI" : "Siswa"}
                    </Badge>
                    <Text>{activity.message}</Text>
                    {activity.sessionId && (
                      <Row justify="end" className="mt-2">
                        <button
                          className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
                          onClick={() => setSelectedSessionId(activity.sessionId || null)}
                        >
                          Lihat Percakapan <IconExternalLink size={14} />
                        </button>
                      </Row>
                    )}
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        </Stack>
      </Grid>

      <Dialog
        open={!!selectedSessionId}
        onOpenChange={(open) => !open && setSelectedSessionId(null)}
        title="Live Session Review"
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
