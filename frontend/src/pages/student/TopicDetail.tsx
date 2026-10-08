import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { BGM } from "@/config/sound.config";
import { studentApi, type StudentTopic, type StudentSubTopic } from "@/lib/api/student";
import { Heading, Text } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Icon } from "@/components/pouf/Icon";
import { Button } from "@/components/pouf/Button";
import { Empty, ErrorNote, Skeleton } from "@/components/pouf/feedback";
import { getAssetUrl } from "@/lib/utils";

export default function TopicDetail() {
  const { topicSlug } = useParams();
  useBGM(BGM.DASHBOARD);
  const navigate = useNavigate();
  const [topic, setTopic] = useState<StudentTopic | null>(null);
  const [subTopics, setSubTopics] = useState<StudentSubTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(topic?.name || "Subtopik Belajar");

  const loadData = () => {
    if (!topicSlug) return;
    setLoading(true);
    setError(null);
    studentApi
      .getSubTopics(topicSlug)
      .then((res) => {
        if (res.data) {
          setTopic(res.data.topic);
          const mappedSubTopics = (res.data.subTopics || []).map((st) => ({
            ...st,
          }));
          setSubTopics(mappedSubTopics);
        } else {
          setError("Gagal memuat detail topik.");
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
  }, [topicSlug]);

  if (loading) {
    return (
      <Stack gap={6}>
        <Skeleton variant="text" count={2} />
        <Skeleton variant="card" count={3} />
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

  if (!topic) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Topik tidak ditemukan</Heading>
        <div>
          <Button variant="quiet" tone="idle" onClick={() => navigate("/student/topics")}>
            Kembali ke Daftar Topik
          </Button>
        </div>
      </Stack>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Topic */}
      <Stack gap={4}>
        <Link to="/student/topics" className="inline-block" data-clicksound="click">
          <span className="hover:text-[var(--on-surface)] transition-colors">
            <Text size="sm" muted>
              ← Kembali ke Topik
            </Text>
          </span>
        </Link>
        <Card>
          <Grid cols="sidebar">
            <Stack gap={3}>
              <Row gap={2} wrap={false}>
                <Badge tone="mint">Tersedia</Badge>
              </Row>
              <Heading level={2}>{topic.name}</Heading>
              <Text muted>{topic.description}</Text>
            </Stack>
            {topic.thumbnail ? (
              <div
                style={{
                  borderRadius: 20,
                  backgroundImage: `url(${getAssetUrl(topic.thumbnail)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 160,
                  boxShadow: "var(--pouf-blob)",
                }}
              />
            ) : (
              <div
                style={{
                  borderRadius: 20,
                  background: "var(--purple)",
                  minHeight: 160,
                  boxShadow: "var(--pouf-blob)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Blob icon="wand" tone="purple" size="lg" />
              </div>
            )}
          </Grid>
        </Card>
      </Stack>

      <Stack gap={4}>
        <Heading level={2}>Daftar Subtopik</Heading>
        {subTopics.length === 0 ? (
          <Empty icon="search" title="Belum ada subtopik">
            Topik ini belum memiliki materi.
          </Empty>
        ) : (
          <Grid cols={3}>
            {subTopics.map((st) => (
              <Link
                key={st.id}
                to={st.isUnlocked ? `/student/topics/${topic.slug}/${st.slug}` : "#"}
                data-clicksound={st.isUnlocked ? "click" : "blocked"}
                onClick={(e) => {
                  if (!st.isUnlocked) e.preventDefault();
                }}
                className={`group block h-full relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] rounded-[24px] overflow-hidden [&>.pouf-card]:h-full transition-all duration-300 ease-out ${!st.isUnlocked ? "cursor-not-allowed opacity-90" : "hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]"}`}
              >
                <Card variant="tight">
                  <div className="flex flex-col gap-3 h-full">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[var(--pouf-blob)] flex-shrink-0">
                      {st.thumbnail ? (
                        <div
                          className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-out ${st.isUnlocked ? "group-hover:scale-110" : ""}`}
                          style={{ backgroundImage: `url(${getAssetUrl(st.thumbnail)})` }}
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-[var(--blue)] flex items-center justify-center transition-transform duration-500 ease-out ${st.isUnlocked ? "group-hover:scale-110" : ""}`}
                        >
                          <Blob icon="wand" tone="blue" size="md" />
                        </div>
                      )}
                    </div>
                    <Row justify="between" align="center">
                      <Badge tone={st.isUnlocked ? "blue" : "idle"}>
                        {st.isUnlocked ? "Buka" : "Terkunci"}
                      </Badge>
                      <Text size="sm" muted>
                        Bagian {st.order}
                      </Text>
                    </Row>
                    <Heading level={3}>{st.name}</Heading>
                    <div className="line-clamp-2">
                      <Text size="sm" muted>
                        {st.description}
                      </Text>
                    </div>
                    <div className="mt-auto pt-2">
                      <Row gap={2} wrap={false}>
                        <Text size="sm" muted>
                          {st.materialCount || 0} materi
                        </Text>
                      </Row>
                    </div>
                  </div>
                </Card>

                {!st.isUnlocked && (
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-background/90 shadow-xl flex items-center justify-center text-muted-foreground">
                      <Icon name="lock" size={28} />
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </Grid>
        )}
      </Stack>
    </div>
  );
}
