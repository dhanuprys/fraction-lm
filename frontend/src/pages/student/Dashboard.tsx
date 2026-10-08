import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { BGM } from "@/config/sound.config";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Progress } from "@/components/pouf/progress";
import { Card, RowCard } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { ErrorNote, Skeleton } from "@/components/pouf/feedback";
import { studentApi, type StudentDashboardData } from "@/lib/api/student";

const MINUTES = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "minute",
});

export default function Dashboard() {
  const navigate = useNavigate();
  useDocumentTitle("Dashboard");
  useBGM(BGM.DASHBOARD);
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState("");

  const loadData = () => {
    setLoading(true);
    setError(null);
    studentApi
      .getDashboard()
      .then((res) => {
        if (res.data?.dashboard) {
          setData(res.data.dashboard);
          setActiveId(res.data.dashboard.activeId);
        } else {
          setError("Gagal memuat data dashboard.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Koneksi jaringan bermasalah. Gagal memuat dashboard.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const active = useMemo(() => {
    if (!data) return null;
    return data.lessons.find((lesson) => lesson.id === activeId) ?? data.lessons[0] ?? null;
  }, [data, activeId]);

  const remaining = useMemo(() => {
    if (!data) return 0;
    return data.lessons
      .filter((lesson) => !data.completed.includes(lesson.id))
      .reduce((sum, lesson) => sum + lesson.duration, 0);
  }, [data]);

  if (loading) {
    return (
      <Stack gap={5}>
        <Skeleton variant="text" count={2} />
        <Skeleton variant="card" count={2} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack gap={5} align="start">
        <ErrorNote>{error}</ErrorNote>
        <Button onClick={loadData} tone="purple">Coba Lagi</Button>
      </Stack>
    );
  }

  if (!data || !active) {
    return (
      <Stack gap={5}>
        <Heading level={2}>Belum ada topik yang aktif</Heading>
        <Text muted>Silakan pilih topik di menu Topik Belajar.</Text>
      </Stack>
    );
  }

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Dashboard Belajar</Eyebrow>
          <Heading level={1}>Lanjutkan Belajarmu</Heading>
          <Text muted>Selesaikan materi yang sedang berjalan dan capai targetmu hari ini.</Text>
        </Stack>
      </Row>

      <Card>
        <Grid cols="sidebar" gap={5}>
          <Stack gap={3}>
            <Text size="sm" muted>
              Topik Saat Ini
            </Text>
            <Heading level={2}>{data.currentTopic.name}</Heading>
            <Text muted>{data.currentTopic.description}</Text>
            <Progress value={data.progress} tone="mint" label="Progress topik" />
            <Row justify="between">
              <Text size="sm">{data.progress}% selesai</Text>
              <Text size="sm" muted>
                Sisa waktu {MINUTES.format(remaining)}
              </Text>
            </Row>
          </Stack>
          <div className="flex items-center justify-center">
            <Blob
              icon={data.progress === 100 ? "trophy" : "target"}
              tone={data.progress === 100 ? "yellow" : "purple"}
              size="lg"
            />
          </div>
        </Grid>
      </Card>

      <Grid cols="sidebar" gap={4}>
        <Stack gap={3}>
          {data.lessons.map((lesson, index) => (
            <RowCard
              key={lesson.id}
              selected={lesson.id === activeId}
              onClick={() => setActiveId(lesson.id)}
            >
              <Row justify="between" wrap={false}>
                <Row gap={3} wrap={false}>
                  <Blob
                    icon={
                      lesson.isLocked
                        ? "lock"
                        : data.completed.includes(lesson.id)
                          ? "ok"
                          : lesson.kind === "Quiz"
                            ? "wand"
                            : "play"
                    }
                    tone={
                      lesson.isLocked
                        ? "idle"
                        : data.completed.includes(lesson.id)
                          ? "mint"
                          : index % 2 === 0
                            ? "blue"
                            : "purple"
                    }
                    size="sm"
                  />
                  <Stack gap={1} className={lesson.isLocked ? "opacity-50" : ""}>
                    <Text size="sm" muted>
                      {lesson.kind} · {MINUTES.format(lesson.duration)}
                    </Text>
                    <Heading level={3}>{lesson.title}</Heading>
                  </Stack>
                </Row>
                <Badge
                  tone={
                    lesson.isLocked ? "idle" : data.completed.includes(lesson.id) ? "up" : "purple"
                  }
                >
                  {lesson.isLocked
                    ? "Terkunci"
                    : data.completed.includes(lesson.id)
                      ? "Selesai"
                      : "Mulai"}
                </Badge>
              </Row>
            </RowCard>
          ))}
        </Stack>

        <Card>
          <Stack gap={4}>
            <Badge tone={active.isLocked ? "idle" : active.kind === "Quiz" ? "yellow" : "blue"}>
              {active.kind}
            </Badge>
            <Heading level={2} className={active.isLocked ? "opacity-50" : ""}>
              {active.title}
            </Heading>
            <Text muted>
              {active.isLocked
                ? "Selesaikan materi sebelumnya untuk membuka akses ke tahap ini."
                : "Pelajari materi ini dan selesaikan latihan untuk melangkah ke tahap selanjutnya."}
            </Text>
            <Row justify="between">
              <Text muted>Estimasi Waktu</Text>
              <Text num>{MINUTES.format(active.duration)}</Text>
            </Row>
            <Button
              tone={
                active.isLocked ? "idle" : data.completed.includes(active.id) ? "purple" : "mint"
              }
              block
              disabled={active.isLocked}
              onClick={() => navigate(`/student/topics/${data.currentTopic.slug}/${active.slug}`)}
            >
              {active.isLocked
                ? "Terkunci"
                : data.completed.includes(active.id)
                  ? "Lihat Materi"
                  : "Mulai Belajar"}
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}
