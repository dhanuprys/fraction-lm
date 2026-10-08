import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { BGM } from "@/config/sound.config";
import {
  studentApi,
  type StudentTopic,
  type StudentSubTopic,
  type StudentMaterial,
} from "@/lib/api/student";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Icon } from "@/components/pouf/Icon";
import { Button } from "@/components/pouf/Button";
import { ErrorNote, Skeleton } from "@/components/pouf/feedback";
import { getAssetUrl } from "@/lib/utils";

export default function SubTopicDetail() {
  const { topicSlug, subTopicSlug } = useParams();
  useBGM(BGM.DASHBOARD);
  const navigate = useNavigate();

  const [topic, setTopic] = useState<StudentTopic | null>(null);
  const [subTopic, setSubTopic] = useState<StudentSubTopic | null>(null);
  const [materials, setMaterials] = useState<StudentMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(subTopic?.name || "Materi Belajar");

  const loadData = () => {
    if (!topicSlug || !subTopicSlug) return;
    setLoading(true);
    setError(null);
    studentApi
      .getMaterials(topicSlug, subTopicSlug)
      .then((res) => {
        if (res.data) {
          setTopic(res.data.topic);
          setSubTopic(res.data.subTopic);
          setMaterials(res.data.materials || []);
        } else {
          setError("Gagal memuat detail subtopik.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Koneksi jaringan bermasalah. Gagal memuat data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [topicSlug, subTopicSlug]);

  if (loading) {
    return (
      <Stack gap={6}>
        <Skeleton variant="text" count={2} />
        <Skeleton variant="card" count={2} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack gap={6} align="start">
        <ErrorNote>{error}</ErrorNote>
        <Button onClick={loadData} tone="purple">Coba Lagi</Button>
      </Stack>
    );
  }

  if (!topic || !subTopic) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Subtopik tidak ditemukan</Heading>
        <div>
          <Button
            variant="quiet"
            tone="idle"
            onClick={() => navigate(`/student/topics/${topicSlug}`)}
          >
            Kembali ke Subtopik
          </Button>
        </div>
      </Stack>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Stack gap={4}>
        <Link to={`/student/topics/${topic.slug}`} className="inline-block" data-clicksound="click">
          <span className="hover:text-[var(--on-surface)] transition-colors">
            <Text size="sm" muted>
              ← Kembali ke {topic.name}
            </Text>
          </span>
        </Link>
        <Card variant="default">
          <Row gap={6} align="center">
            {subTopic.thumbnail ? (
              <div
                className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0 hidden sm:block"
                style={{ backgroundImage: `url(${getAssetUrl(subTopic.thumbnail)})` }}
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-blue/10 flex items-center justify-center shrink-0 hidden sm:flex">
                <Blob icon="calendar" tone="blue" size="lg" />
              </div>
            )}
            <div className="flex flex-col gap-2 flex-1">
              <Row justify="between" align="top">
                <Eyebrow>Bagian {subTopic.order}</Eyebrow>
                <Badge tone="mint">Tersedia</Badge>
              </Row>
              <Heading level={1}>{subTopic.name}</Heading>
              <Text muted>{subTopic.description || "Tidak ada deskripsi."}</Text>
            </div>
          </Row>
        </Card>
      </Stack>

      <Stack gap={4}>
        <Heading level={2}>Materi Pembelajaran</Heading>
        {materials.length === 0 ? (
          <Text muted>Belum ada materi untuk subtopik ini.</Text>
        ) : (
          <div className="flex flex-col gap-3">
            {materials.map((mat) => {
              const isDone = mat.status === "COMPLETED";
              const isInProgress = mat.status === "IN_PROGRESS";
              return (
                <Link
                  key={mat.id}
                  to={
                    mat.isUnlocked
                      ? `/student/topics/${topic.slug}/${subTopic.slug}/${mat.id}`
                      : "#"
                  }
                  data-clicksound={mat.isUnlocked ? "click" : "blocked"}
                  onClick={(e) => {
                    if (!mat.isUnlocked) e.preventDefault();
                  }}
                  className={`group block w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] rounded-control relative overflow-hidden transition-all duration-300 ease-out ${!mat.isUnlocked ? "cursor-not-allowed opacity-80" : "hover:-translate-y-1 hover:shadow-md"}`}
                >
                  <RowCard selected={false}>
                    <Row justify="between" wrap={false}>
                      <Row gap={3} wrap={false}>
                        <Blob
                          icon={
                            !mat.isUnlocked
                              ? "lock"
                              : isDone
                                ? "ok"
                                : isInProgress
                                  ? "play"
                                  : mat.isExerciseOnly
                                    ? "target"
                                    : "wand"
                          }
                          tone={
                            !mat.isUnlocked
                              ? "idle"
                              : isDone
                                ? "mint"
                                : isInProgress
                                  ? "blue"
                                  : mat.isExerciseOnly
                                    ? "orange"
                                    : "purple"
                          }
                          size="sm"
                        />
                        <div className="flex flex-col gap-1">
                          <Text size="sm" muted>
                            {mat.isExerciseOnly ? "Latihan" : "Materi"} · Ke-{mat.order}
                          </Text>
                          <Heading level={3}>{mat.title}</Heading>
                        </div>
                      </Row>
                      <Badge
                        tone={
                          !mat.isUnlocked ? "idle" : isDone ? "up" : isInProgress ? "blue" : "idle"
                        }
                      >
                        {!mat.isUnlocked
                          ? "Terkunci"
                          : isDone
                            ? "Selesai"
                            : isInProgress
                              ? "Lanjut"
                              : "Mulai"}
                      </Badge>
                    </Row>
                  </RowCard>

                  {!mat.isUnlocked && (
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-background/90 shadow-md flex items-center justify-center text-muted-foreground">
                        <Icon name="lock" size={20} />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </Stack>
    </div>
  );
}
