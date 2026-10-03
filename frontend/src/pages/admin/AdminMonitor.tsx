import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useSoundStore } from "@/store/useSoundStore";
import { config } from "@/config";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Button } from "@/components/pouf/Button";
import { Field, Input } from "@/components/pouf/Input";
import { Dialog } from "@/components/pouf/controls";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { ChatSessionViewer } from "@/components/admin/ChatSessionViewer";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";

interface MonitorEvent {
  studentId: number;
  studentName: string;
  questionId: number;
  message?: string;
  reason?: string;
  sender?: string;
  timestamp: string;
  sessionId?: string;
  id?: string;
}

type ConnectionState = "CONNECTING" | "CONNECTED" | "DISCONNECTED";

export default function AdminMonitor() {
  useDocumentTitle("Live Monitor Kelas");
  const token = useAuthStore((state) => state.token);

  const [alarms, setAlarms] = useState<MonitorEvent[]>([]);
  const [activities, setActivities] = useState<MonitorEvent[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Monitor control states
  const [connectionState, setConnectionState] = useState<ConnectionState>("CONNECTING");
  const [isPaused, setIsPaused] = useState(false);
  const [enableSoundAlert, setEnableSoundAlert] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnectStream = useCallback(() => {
    if (!token) return;

    setConnectionState("CONNECTING");
    const eventSource = new EventSource(`${config.API_URL}/admin/monitor/stream?token=${token}`);

    eventSource.onopen = () => {
      setConnectionState("CONNECTED");
    };

    eventSource.addEventListener("activity", (e) => {
      if (isPaused) return;
      try {
        const data = JSON.parse(e.data) as MonitorEvent;
        const entryWithId = { ...data, id: `act-${Date.now()}-${Math.random()}` };
        setActivities((prev) => [entryWithId, ...prev].slice(0, 50));
      } catch (err) {
        console.error("Gagal memproses data aktivitas SSE", err);
      }
    });

    eventSource.addEventListener("alarm", (e) => {
      if (isPaused) return;
      try {
        const data = JSON.parse(e.data) as MonitorEvent;
        const entryWithId = { ...data, id: `alarm-${Date.now()}-${Math.random()}` };
        setAlarms((prev) => [entryWithId, ...prev].slice(0, 30));

        // Trigger chime sound alert if enabled
        if (enableSoundAlert) {
          useSoundStore.getState().playSFX("NOTIFICATION");
        }
        toast.warning(`Intervensi Guru Dibutuhkan: ${data.studentName}`, {
          description: data.reason || "Siswa membutuhkan bantuan matematika",
        });
      } catch (err) {
        console.error("Gagal memproses alarm SSE", err);
      }
    });

    eventSource.onerror = (e) => {
      console.error("SSE Connection error:", e);
      setConnectionState("DISCONNECTED");
      eventSource.close();
    };

    return eventSource;
  }, [token, isPaused, enableSoundAlert]);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    const es = handleConnectStream();
    return () => {
      es?.close();
    };
  }, [handleConnectStream]);

  // Handle Mark Alarm as Resolved
  const handleResolveAlarm = (alarmId?: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== alarmId));
    toast.success("Peringatan intervensi ditandai selesai.");
  };

  // Clear Activity Feed
  const handleClearFeed = () => {
    setActivities([]);
    setAlarms([]);
    toast.info("Riwayat monitor langsung dibersihkan.");
  };

  // Filtered lists based on search
  const filteredAlarms = useMemo(() => {
    if (!searchQuery) return alarms;
    const q = searchQuery.toLowerCase();
    return alarms.filter(
      (a) =>
        a.studentName.toLowerCase().includes(q) ||
        a.studentId.toString().includes(q) ||
        a.reason?.toLowerCase().includes(q),
    );
  }, [alarms, searchQuery]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery) return activities;
    const q = searchQuery.toLowerCase();
    return activities.filter(
      (act) =>
        act.studentName.toLowerCase().includes(q) ||
        act.studentId.toString().includes(q) ||
        act.message?.toLowerCase().includes(q),
    );
  }, [activities, searchQuery]);

  return (
    <Stack gap={5}>
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Live Monitor Kelas" }]} />

      {/* Header & Connection Indicator */}
      <Row justify="between" align="top" className="flex-wrap gap-4">
        <Stack gap={1}>
          <Eyebrow>Live Monitoring Kelas</Eyebrow>
          <Heading level={1}>Live Monitor Siswa & AI Tutor</Heading>
          <Text muted>
            Pantau aktivitas pengerjaan soal dan peringatan intervensi guru secara real-time.
          </Text>
        </Stack>

        <Row gap={3} align="center" className="flex-wrap">
          {connectionState === "CONNECTED" && (
            <Badge tone="mint" className="animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
              Terkoneksi (Live SSE)
            </Badge>
          )}
          {connectionState === "CONNECTING" && <Badge tone="idle">Menghubungkan Stream...</Badge>}
          {connectionState === "DISCONNECTED" && (
            <Row gap={2} align="center">
              <Badge tone="orange">Terputus</Badge>
              <Button size="sm" tone="mint" onClick={handleConnectStream}>
                Hubungkan Ulang
              </Button>
            </Row>
          )}
        </Row>
      </Row>

      {/* Stream Control & Filter Bar */}
      <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
        <Row justify="between" align="center" className="flex-wrap gap-4">
          <div className="flex-1 min-w-[220px]">
            <Field label="Cari Siswa atau Aktivitas">
              {() => (
                <Input
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Ketik nama siswa atau ID..."
                />
              )}
            </Field>
          </div>

          <Row gap={2} align="center" className="flex-wrap pt-5">
            <Button
              type="button"
              size="sm"
              variant={enableSoundAlert ? "solid" : "quiet"}
              tone={enableSoundAlert ? "purple" : "idle"}
              onClick={() => {
                setEnableSoundAlert(!enableSoundAlert);
                toast.info(
                  !enableSoundAlert
                    ? "Bel suara peringatan diaktifkan"
                    : "Bel suara peringatan dinonaktifkan",
                );
              }}
            >
              <Icon name="alerts" size="sm" />
              {enableSoundAlert ? "Bel Suara: Aktif" : "Bel Suara: Mute"}
            </Button>

            <Button
              type="button"
              size="sm"
              variant={isPaused ? "solid" : "quiet"}
              tone={isPaused ? "orange" : "idle"}
              onClick={() => {
                setIsPaused(!isPaused);
                toast.info(!isPaused ? "Stream monitor dijeda" : "Stream monitor dilanjutkan");
              }}
            >
              <Icon name={isPaused ? "play" : "pause"} size="sm" />
              {isPaused ? "Lanjutkan Stream" : "Jeda Stream"}
            </Button>

            <Button type="button" size="sm" variant="quiet" onClick={handleClearFeed}>
              <Icon name="remove" size="sm" /> Bersihkan Feed
            </Button>
          </Row>
        </Row>
      </Card>

      {/* Main Realtime Grid */}
      <Grid cols={2} gap={5}>
        {/* Left Column: Teacher Intervention Alarms */}
        <Stack gap={4}>
          <Card className="p-4 bg-[color-mix(in_srgb,var(--warn)_8%,transparent)] border border-[color-mix(in_srgb,var(--warn)_25%,transparent)]">
            <Row justify="between" align="center">
              <Row gap={2} align="center">
                <Blob icon="warn" tone="orange" size="sm" />
                <Heading level={3} className="text-[var(--fg)]">
                  Peringatan / Intervensi Guru
                </Heading>
              </Row>
              <Badge tone={filteredAlarms.length > 0 ? "orange" : "idle"}>
                {filteredAlarms.length} Perlu Bantuan
              </Badge>
            </Row>
          </Card>

          <Stack gap={3}>
            {filteredAlarms.length === 0 ? (
              <Card className="p-6 text-center bg-[var(--surface-sunken)] border border-[var(--separator)]">
                <Text muted>
                  {searchQuery
                    ? "Tidak ada peringatan intervensi yang sesuai dengan pencarian."
                    : "Belum ada siswa yang membutuhkan intervensi guru saat ini."}
                </Text>
              </Card>
            ) : (
              filteredAlarms.map((alarm, idx) => (
                <Card
                  key={alarm.id || idx}
                  className="p-4 border-2 border-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_6%,transparent)] shadow-sm"
                >
                  <Stack gap={3}>
                    <Row justify="between" align="center">
                      <Row gap={2} align="center">
                        <Blob icon="user" tone="orange" size="sm" />
                        <Stack gap={0}>
                          <Text className="font-bold text-base">{alarm.studentName}</Text>
                          <Text size="xs" muted>
                            ID Siswa: #{alarm.studentId}
                          </Text>
                        </Stack>
                      </Row>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                        {new Date(alarm.timestamp).toLocaleTimeString("id-ID")}
                      </span>
                    </Row>

                    <div className="p-3 rounded-lg bg-[var(--bg)] border border-[color-mix(in_srgb,var(--warn)_30%,transparent)]">
                      <Text size="sm" className="font-semibold text-amber-700 dark:text-amber-300">
                        Alasan Intervensi:{" "}
                        {alarm.reason || "Miskonsepsi berulang pada soal matematika"}
                      </Text>
                    </div>

                    <Row
                      justify="between"
                      align="center"
                      className="pt-2 border-t border-[var(--separator)]"
                    >
                      <Button
                        type="button"
                        size="sm"
                        variant="quiet"
                        tone="mint"
                        onClick={() => handleResolveAlarm(alarm.id)}
                      >
                        <Icon name="ok" size="sm" /> Tandai Selesai
                      </Button>

                      {alarm.sessionId && (
                        <Button
                          type="button"
                          size="sm"
                          tone="purple"
                          onClick={() => setSelectedSessionId(alarm.sessionId || null)}
                        >
                          <Icon name="channels" size="sm" /> Lihat Percakapan
                        </Button>
                      )}
                    </Row>
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        </Stack>

        {/* Right Column: Live Student Activity Stream */}
        <Stack gap={4}>
          <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
            <Row justify="between" align="center">
              <Row gap={2} align="center">
                <Blob icon="channels" tone="blue" size="sm" />
                <Heading level={3}>Aktivitas Pengerjaan Terbaru</Heading>
              </Row>
              <Badge tone="blue">{filteredActivities.length} Aktivitas</Badge>
            </Row>
          </Card>

          <Stack gap={3}>
            {filteredActivities.length === 0 ? (
              <Card className="p-6 text-center bg-[var(--surface-sunken)] border border-[var(--separator)]">
                <Text muted>
                  {searchQuery
                    ? "Tidak ada aktivitas yang sesuai dengan pencarian."
                    : "Menunggu aktivitas pesan/interaksi siswa..."}
                </Text>
              </Card>
            ) : (
              filteredActivities.map((act, idx) => (
                <Card
                  key={act.id || idx}
                  className="p-4 border border-[var(--separator)] bg-[var(--surface)]"
                >
                  <Stack gap={2}>
                    <Row justify="between" align="center">
                      <Row gap={2} align="center">
                        <Blob
                          icon={act.sender === "AI" ? "wand" : "user"}
                          tone={act.sender === "AI" ? "purple" : "blue"}
                          size="sm"
                        />
                        <Text className="font-bold text-sm">{act.studentName}</Text>
                      </Row>
                      <Row gap={2} align="center">
                        <Badge tone={act.sender === "AI" ? "purple" : "blue"}>
                          {act.sender === "AI" ? "Tutor AI" : "Siswa"}
                        </Badge>
                        <Text size="xs" muted>
                          {new Date(act.timestamp).toLocaleTimeString("id-ID")}
                        </Text>
                      </Row>
                    </Row>

                    {act.message && (
                      <Text
                        size="sm"
                        className="bg-[var(--surface-sunken)] p-2.5 rounded-lg border border-[var(--separator)] italic"
                      >
                        "{act.message}"
                      </Text>
                    )}

                    {act.sessionId && (
                      <Row justify="end" className="pt-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="quiet"
                          onClick={() => setSelectedSessionId(act.sessionId || null)}
                        >
                          Lihat Percakapan <Icon name="next" size="sm" />
                        </Button>
                      </Row>
                    )}
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        </Stack>
      </Grid>

      {/* Live Chat Session Review Dialog */}
      {selectedSessionId && (
        <Dialog
          trigger={<span />}
          open={!!selectedSessionId}
          onOpenChange={(open) => !open && setSelectedSessionId(null)}
          title="Tinjauan Sesi Chat Siswa Realtime"
          description="Transkrip lengkap percakapan antara siswa dan AI Tutor dalam sesi ini."
          size="lg"
        >
          <div className="mt-2 min-h-[500px]">
            <ChatSessionViewer sessionId={selectedSessionId} />
          </div>
        </Dialog>
      )}
    </Stack>
  );
}
