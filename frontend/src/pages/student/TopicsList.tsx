import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { BGM } from "@/config/sound.config";
import { studentApi, type StudentTopic } from "@/lib/api/student";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { ErrorNote } from "@/components/pouf/feedback";
import { Button } from "@/components/pouf/Button";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Icon } from "@/components/pouf/Icon";
import { getAssetUrl } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function TopicsList() {
  useDocumentTitle("Topik Belajar");
  useBGM(BGM.DASHBOARD);
  const [topics, setTopics] = useState<StudentTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    setError(null);
    studentApi
      .getTopics()
      .then((res) => {
        if (res.data?.topics) {
          setTopics(res.data.topics);
        } else {
          setError("Gagal memuat data topik.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Koneksi jaringan bermasalah. Gagal memuat daftar topik.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <Eyebrow>Topik Pembelajaran</Eyebrow>
        <Heading level={1}>Pilih Topik Anda</Heading>
        <Text muted>Pelajari materi baru dan kembangkan kemampuan Anda.</Text>
      </Stack>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <Text muted>Memuat topik...</Text>
        </div>
      ) : error ? (
        <Stack gap={3} align="start">
          <ErrorNote>{error}</ErrorNote>
          <Button onClick={loadData} tone="purple">
            Coba Lagi
          </Button>
        </Stack>
      ) : topics.length === 0 ? (
        <Text muted>Belum ada topik yang tersedia.</Text>
      ) : (
        <Grid cols={3} gap={5}>
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={topic.isUnlocked ? `/student/topics/${topic.slug}` : "#"}
              data-clicksound={topic.isUnlocked ? "click" : "blocked"}
              onClick={(e) => {
                if (!topic.isUnlocked) e.preventDefault();
              }}
              className={`group block h-full relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple)] rounded-[24px] overflow-hidden [&>.pouf-card]:h-full transition-all duration-300 ease-out ${!topic.isUnlocked ? "cursor-not-allowed opacity-90" : "hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]"}`}
            >
              <Card variant="tight">
                <div className="flex flex-col gap-3 h-full">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[var(--pouf-blob)] flex-shrink-0">
                    {topic.thumbnail ? (
                      <div
                        className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-out ${topic.isUnlocked ? "group-hover:scale-110" : ""}`}
                        style={{ backgroundImage: `url(${getAssetUrl(topic.thumbnail)})` }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-[var(--purple)] flex items-center justify-center transition-transform duration-500 ease-out ${topic.isUnlocked ? "group-hover:scale-110" : ""}`}
                      >
                        <Blob icon="wand" tone="purple" size="md" />
                      </div>
                    )}
                  </div>
                  <Row justify="between" align="center">
                    <Badge tone={topic.isUnlocked ? "mint" : "idle"}>
                      {topic.isUnlocked ? "Tersedia" : "Terkunci"}
                    </Badge>
                  </Row>
                  <Heading level={3}>{topic.name}</Heading>
                  <div className="line-clamp-2">
                    <Text size="sm" muted>
                      {topic.description}
                    </Text>
                  </div>
                  <div className="mt-auto pt-2">
                    <Row gap={2} wrap={false}>
                      <Text size="sm" muted>
                        {topic.subtopicCount || 0} subtopik
                      </Text>
                    </Row>
                  </div>
                </div>
              </Card>

              {!topic.isUnlocked && (
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
  );
}
