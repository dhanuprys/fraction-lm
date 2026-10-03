import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, type ContentTreeTopic } from "@/lib/api/admin";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Icon } from "@/components/pouf/Icon";

export function CurriculumTreeViewer() {
  const navigate = useNavigate();
  const [tree, setTree] = useState<ContentTreeTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTree = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getContentTree();
      setTree(res.data?.tree || []);
    } catch (err) {
      console.error("Gagal memuat pohon kurikulum:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    loadTree();
  }, [loadTree]);

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <Text muted>Memuat struktur pohon kurikulum...</Text>
      </Card>
    );
  }

  if (tree.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Text muted>Belum ada struktur kurikulum. Buat topik pertama Anda untuk memulai.</Text>
      </Card>
    );
  }

  return (
    <Stack gap={4}>
      <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
        <Row justify="between" align="center">
          <Stack gap={1}>
            <Heading level={3}>Struktur Pohon Kurikulum</Heading>
            <Text size="sm" muted>
              Lihat seluruh hierarki Topik → Subtopik → Materi secara komprehensif.
            </Text>
          </Stack>
          <Button size="sm" variant="quiet" onClick={loadTree}>
            Muat Ulang
          </Button>
        </Row>
      </Card>

      <Stack gap={3}>
        {tree.map((topic) => (
          <Card key={topic.id} className="p-4 border border-[var(--separator)] bg-[var(--surface)]">
            <Stack gap={3}>
              {/* Topic Header Row */}
              <Row
                justify="between"
                align="center"
                className="pb-3 border-b border-[var(--separator)]"
              >
                <Row gap={3} align="center">
                  <Blob icon="wand" tone="yellow" size="sm" />
                  <Stack gap={1}>
                    <Row gap={2} align="center">
                      <Eyebrow>Topik #{topic.order}</Eyebrow>
                      <Badge tone="mint">{topic.subTopics.length} Subtopik</Badge>
                    </Row>
                    <Heading level={2} className="text-lg font-bold">
                      {topic.name}
                    </Heading>
                  </Stack>
                </Row>
                <Row gap={2} align="center">
                  <Button
                    size="sm"
                    tone="mint"
                    onClick={() => navigate(`/admin/subtopics?topicId=${topic.id}&action=create`)}
                  >
                    <Icon name="add" size="sm" /> Subtopik
                  </Button>
                  <Button
                    size="sm"
                    variant="quiet"
                    onClick={() => navigate(`/admin/subtopics?topicId=${topic.id}`)}
                  >
                    Buka Subtopik
                  </Button>
                </Row>
              </Row>

              {/* Child Subtopics List */}
              {topic.subTopics.length === 0 ? (
                <Text size="sm" muted className="italic pl-4">
                  Belum ada subtopik dalam topik ini.
                </Text>
              ) : (
                <div className="pl-4 space-y-3 border-l-2 border-[var(--separator)] ml-3">
                  {topic.subTopics.map((subTopic) => (
                    <div
                      key={subTopic.id}
                      className="p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--separator)]"
                    >
                      <Stack gap={2}>
                        <Row justify="between" align="center">
                          <Row gap={2} align="center">
                            <Blob icon="calendar" tone="blue" size="sm" />
                            <div>
                              <Text size="sm" className="font-bold">
                                {subTopic.name}
                              </Text>
                              <Text size="xs" muted>
                                {subTopic.materials.length} Materi Pembelajaran
                              </Text>
                            </div>
                          </Row>
                          <Row gap={2} align="center">
                            <Button
                              size="sm"
                              tone="mint"
                              onClick={() =>
                                navigate(`/admin/materials?subTopicId=${subTopic.id}&action=create`)
                              }
                            >
                              <Icon name="add" size="sm" /> Materi
                            </Button>
                            <Button
                              size="sm"
                              variant="quiet"
                              onClick={() => navigate(`/admin/materials?subTopicId=${subTopic.id}`)}
                            >
                              Buka Materi
                            </Button>
                          </Row>
                        </Row>

                        {/* Child Materials List */}
                        {subTopic.materials.length > 0 && (
                          <div className="pl-6 space-y-1.5 border-l border-[var(--separator)] mt-2">
                            {subTopic.materials.map((m) => (
                              <div
                                key={m.id}
                                onClick={() =>
                                  navigate(`/admin/materials?subTopicId=${subTopic.id}`)
                                }
                                className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)] border border-[var(--separator)] hover:border-[var(--mint)] transition-colors cursor-pointer group"
                              >
                                <Row gap={2} align="center">
                                  <span className="text-[var(--mint)]">
                                    <Icon name="activity" size="sm" />
                                  </span>
                                  <Text
                                    size="sm"
                                    className="group-hover:text-[var(--mint)] transition-colors font-medium"
                                  >
                                    {m.title}
                                  </Text>
                                </Row>
                                <div className="flex items-center gap-1 text-xs text-[var(--mint)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                  Edit Konten & Soal <Icon name="next" size="sm" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Stack>
                    </div>
                  ))}
                </div>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
