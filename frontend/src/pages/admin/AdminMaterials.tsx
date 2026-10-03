import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { Material, SubTopic, Question, Topic } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Field, Input, inputClasses } from "@/components/pouf/Input";
import { Select, Confirm } from "@/components/pouf/controls";
import { Tabs } from "@/components/pouf/disclosure";
import { Checkbox } from "@/components/pouf/checkbox";
import { RichTextEditor } from "@/components/pouf/RichTextEditor";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { OrderControls } from "@/components/admin/OrderControls";
import { QuestionModal } from "@/components/admin/QuestionModal";
import { StudentMaterialPreviewModal } from "@/components/admin/StudentMaterialPreviewModal";
import { CurriculumTreeViewer } from "@/components/admin/CurriculumTreeViewer";
import { Segmented } from "@/components/pouf/Segmented";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";
import { adminChatLogsApi, type ChatSession } from "@/lib/api/adminChatLogs";
import { ChatSessionViewer } from "@/components/admin/ChatSessionViewer";
import { Dialog } from "@/components/pouf/controls";
import { Pagination } from "@/components/pouf/pagination";

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: {
        name?: string;
        message?: string;
      };
    };
  };
  message?: string;
}

function MaterialListView({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: (m: Material) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubTopicId = searchParams.get("subTopicId") || "all";
  const initialTopicId = searchParams.get("topicId") || "all";

  const [materials, setMaterials] = useState<Material[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId);
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>(initialSubTopicId);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "tree">("list");

  // Sync if URL search params change
  useEffect(() => {
    const stid = searchParams.get("subTopicId");
    if (stid) setSelectedSubTopicId(stid);
    const tid = searchParams.get("topicId");
    if (tid) setSelectedTopicId(tid);
  }, [searchParams]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [mRes, stRes, tRes] = await Promise.all([
        adminApi.getMaterials(),
        adminApi.getSubTopics(undefined, 1000),
        adminApi.getTopics(1000),
      ]);
      setMaterials(mRes.data || []);
      setSubTopics(stRes.data?.subTopics || []);
      setTopics(tRes.data?.topics || []);
    } catch (err) {
      console.error("Gagal memuat data materi:", err);
      toast.error("Gagal memuat data materi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const subTopicMap = useMemo(() => {
    const map: Record<number, SubTopic> = {};
    subTopics.forEach((st) => {
      map[st.id] = st;
    });
    return map;
  }, [subTopics]);

  const topicMap = useMemo(() => {
    const map: Record<number, Topic> = {};
    topics.forEach((t) => {
      map[t.id] = t;
    });
    return map;
  }, [topics]);

  // Filtered subtopics based on topic selection
  const filteredSubTopics = useMemo(() => {
    if (selectedTopicId === "all") return subTopics;
    const tid = parseInt(selectedTopicId, 10);
    return subTopics.filter((st) => st.topicId === tid);
  }, [subTopics, selectedTopicId]);

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return materials
      .filter((m) => {
        // Search filter
        if (
          searchQuery &&
          !m.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Subtopic filter
        if (selectedSubTopicId !== "all") {
          if (m.subTopicId !== parseInt(selectedSubTopicId, 10)) return false;
        }

        // Topic filter
        if (selectedTopicId !== "all") {
          const st = subTopicMap[m.subTopicId];
          if (!st || st.topicId !== parseInt(selectedTopicId, 10)) return false;
        }

        return true;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [materials, searchQuery, selectedSubTopicId, selectedTopicId, subTopicMap]);

  // Quick order update
  const handleSwapOrder = async (m1: Material, m2: Material) => {
    try {
      await Promise.all([
        adminApi.updateMaterial(m1.id, { order: m2.order }),
        adminApi.updateMaterial(m2.id, { order: m1.order }),
      ]);
      toast.success("Urutan materi berhasil diperbarui");
      loadData();
    } catch (err) {
      console.error("Gagal mengubah urutan:", err);
      toast.error("Gagal mengubah urutan materi");
    }
  };

  const currentSubTopic =
    selectedSubTopicId !== "all"
      ? subTopicMap[parseInt(selectedSubTopicId, 10)]
      : null;
  const currentTopic = currentSubTopic
    ? topicMap[currentSubTopic.topicId]
    : selectedTopicId !== "all"
      ? topicMap[parseInt(selectedTopicId, 10)]
      : null;

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Topik", href: "/admin/topics" },
          ...(currentTopic
            ? [
                {
                  label: currentTopic.name,
                  href: `/admin/subtopics?topicId=${currentTopic.id}`,
                },
              ]
            : []),
          ...(currentSubTopic
            ? [
                {
                  label: currentSubTopic.name,
                  href: `/admin/materials?subTopicId=${currentSubTopic.id}`,
                },
              ]
            : []),
          { label: "Kelola Materi" },
        ]}
      />

      <Row justify="between" align="top" className="flex-wrap gap-4">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>
            {currentSubTopic
              ? `Materi: ${currentSubTopic.name}`
              : currentTopic
                ? `Materi: ${currentTopic.name}`
                : "Kelola Materi Pembelajaran"}
          </Heading>
          <Text muted>
            Klik pada kartu materi untuk membuka editor konten teks kaya, evaluasi AI, dan pertanyaan latihan.
          </Text>
        </Stack>
        <Row gap={3} align="center">
          <Segmented
            label="Mode Tampilan"
            value={viewMode}
            onChange={(val) => setViewMode(val as "list" | "tree")}
            options={[
              { value: "list", label: "Daftar Kartu" },
              { value: "tree", label: "Pohon Kurikulum" },
            ]}
          />
          <Button onClick={onCreate} tone="mint">
            <Icon name="wand" size="sm" /> Buat Materi Baru
          </Button>
        </Row>
      </Row>

      {viewMode === "tree" ? (
        <CurriculumTreeViewer />
      ) : (
        <>
          {/* Filter & Search Bar */}
          <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
            <Grid cols={3} gap={4}>
              <Field label="Cari Materi">
                {() => (
                  <Input
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Ketik judul materi..."
                  />
                )}
              </Field>
              <Field label="Filter Topik">
                {(id, desc) => (
                  <Select
                    id={id}
                    describedBy={desc}
                    value={selectedTopicId}
                    onChange={(val) => {
                      setSelectedTopicId(val);
                      setSelectedSubTopicId("all");
                      if (val === "all") {
                        setSearchParams({});
                      } else {
                        setSearchParams({ topicId: val });
                      }
                    }}
                    options={[
                      { value: "all", label: "Semua Topik" },
                      ...topics.map((t) => ({ value: t.id.toString(), label: t.name })),
                    ]}
                  />
                )}
              </Field>
              <Field label="Filter Subtopik">
                {(id, desc) => (
                  <Select
                    id={id}
                    describedBy={desc}
                    value={selectedSubTopicId}
                    onChange={(val) => {
                      setSelectedSubTopicId(val);
                      if (val === "all") {
                        setSearchParams({});
                      } else {
                        setSearchParams({ subTopicId: val });
                      }
                    }}
                    options={[
                      { value: "all", label: "Semua Subtopik" },
                      ...filteredSubTopics.map((st) => ({
                        value: st.id.toString(),
                        label: `${st.name} (${topicMap[st.topicId]?.name || "Topik"})`,
                      })),
                    ]}
                  />
                )}
              </Field>
            </Grid>
          </Card>

          <Stack gap={3}>
            {loading ? (
              <Text muted>Memuat daftar materi...</Text>
            ) : filteredMaterials.length === 0 ? (
              <Card className="p-6 text-center">
                <Text muted>
                  {searchQuery || selectedTopicId !== "all" || selectedSubTopicId !== "all"
                    ? "Tidak ada materi yang sesuai dengan filter."
                    : "Belum ada materi. Klik 'Buat Materi Baru' untuk memulai."}
                </Text>
              </Card>
            ) : (
              filteredMaterials.map((m, index) => {
                const st = subTopicMap[m.subTopicId];
                const topic = st ? topicMap[st.topicId] : null;

                return (
                  <RowCard key={m.id} onClick={() => onEdit(m)}>
                    <Row justify="between" align="center" wrap={false} className="w-full">
                      <Row gap={4} align="center" wrap={false} className="flex-1 min-w-0">
                        <Blob
                          icon={m.isExerciseOnly ? "target" : "activity"}
                          tone={m.isExerciseOnly ? "orange" : "pink"}
                          size="sm"
                        />
                        <Stack gap={1} className="flex-1 min-w-0">
                          <Row gap={2} align="center" className="flex-wrap">
                            {topic && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                                {topic.name}
                              </span>
                            )}
                            {st && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[color-mix(in_srgb,var(--mint)_12%,transparent)] text-[var(--mint)] border border-[color-mix(in_srgb,var(--mint)_25%,transparent)]">
                                {st.name}
                              </span>
                            )}
                            {m.isExerciseOnly && <Badge tone="orange">Latihan</Badge>}
                          </Row>
                          <Heading level={3} className="truncate">
                            {m.title}
                          </Heading>
                        </Stack>
                      </Row>

                      <Row gap={3} align="center" wrap={false}>
                        <OrderControls
                          order={m.order}
                          isFirst={index === 0}
                          isLast={index === filteredMaterials.length - 1}
                          onMoveUp={() => handleSwapOrder(m, filteredMaterials[index - 1])}
                          onMoveDown={() => handleSwapOrder(m, filteredMaterials[index + 1])}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="quiet"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(m);
                          }}
                        >
                          Kelola Konten & Soal
                        </Button>
                      </Row>
                    </Row>
                  </RowCard>
                );
              })
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}

function MaterialFormView({
  material,
  initialSubTopicId,
  onCancel,
  onSave,
}: {
  material?: Material | null;
  initialSubTopicId?: string;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [subTopicId, setSubTopicId] = useState(
    material?.subTopicId?.toString() || initialSubTopicId || "",
  );
  const [title, setTitle] = useState(material?.title || "");
  const [order, setOrder] = useState(material?.order?.toString() || "1");
  const [content, setContent] = useState<unknown>(material?.content || {});
  const [llmContext, setLlmContext] = useState(material?.materialLlmContext || "");
  const [difficulty, setDifficulty] = useState<string>(material?.difficulty?.toString() || "1");
  const [isExerciseOnly, setIsExerciseOnly] = useState<boolean>(material?.isExerciseOnly || false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [availableSubTopics, setAvailableSubTopics] = useState<SubTopic[]>([]);
  const [availableTopics, setAvailableTopics] = useState<Record<number, string>>({});

  useEffect(() => {
    Promise.all([adminApi.getSubTopics(undefined, 1000), adminApi.getTopics(1000)]).then(
      ([stRes, tRes]) => {
        const st = stRes.data?.subTopics || [];
        setAvailableSubTopics(st);
        if (!subTopicId && st.length > 0) {
          setSubTopicId(initialSubTopicId && st.some(s => s.id.toString() === initialSubTopicId) ? initialSubTopicId : st[0].id.toString());
        }

        const tMap: Record<number, string> = {};
        (tRes.data?.topics || []).forEach((t) => {
          tMap[t.id] = t.name;
        });
        setAvailableTopics(tMap);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSubTopicId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data = {
        subTopicId: parseInt(subTopicId, 10),
        title,
        order: parseInt(order, 10),
        content,
        materialLlmContext: llmContext,
        difficulty: parseInt(difficulty, 10),
        isExerciseOnly,
      };

      if (material) {
        await adminApi.updateMaterial(material.id, data);
        toast.success(`Materi "${title}" berhasil diperbarui`);
      } else {
        await adminApi.createMaterial(data);
        toast.success(`Materi "${title}" berhasil dibuat`);
      }
      onSave();
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      const apiError = err.response?.data?.error;
      if (apiError?.name === "ZodError" && apiError?.message) {
        try {
          const parsed = JSON.parse(apiError.message);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const msg = parsed.map((p: { message: string }) => p.message).join(", ");
            setError(msg);
            toast.error(msg);
            return;
          }
        } catch {}
      }
      const msg = apiError?.message || err.message || "Gagal menyimpan materi";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!material) return;
    setSaving(true);
    try {
      await adminApi.deleteMaterial(material.id);
      toast.success(`Materi "${material.title}" berhasil dihapus`);
      onSave();
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Gagal menghapus materi");
      setSaving(false);
    }
  }

  const selectedStObj = availableSubTopics.find((st) => st.id.toString() === subTopicId);

  const formContent = (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <Stack gap={5}>
          {error && (
            <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-3 rounded-lg font-bold text-sm">
              {error}
            </div>
          )}
          <Row justify="between" align="center">
            <Field label="Subtopik Induk">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={subTopicId}
                  onChange={setSubTopicId}
                  options={availableSubTopics.map((st) => ({
                    value: st.id.toString(),
                    label: `${st.name} — [Topik: ${availableTopics[st.topicId] || "Lainnya"}]`,
                  }))}
                />
              )}
            </Field>
            <Button
              type="button"
              variant="quiet"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Icon name="photo" size="sm" /> Pratinjau Siswa
            </Button>
          </Row>

          <Grid cols={2} gap={4}>
            <Field label="Judul Materi">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={title}
                  onChange={setTitle}
                  placeholder="Contoh: Mengenal Pembilang & Penyebut"
                  required
                />
              )}
            </Field>
            <Field label="Urutan Posisi">
              {(id, describedBy) => (
                <Input
                  id={id}
                  type="number"
                  min="1"
                  aria-describedby={describedBy}
                  value={order}
                  onChange={setOrder}
                  required
                />
              )}
            </Field>
          </Grid>
          <Grid cols={2} gap={4}>
            <Field label="Tingkat Kesulitan">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={difficulty}
                  onChange={setDifficulty}
                  options={[
                    { value: "1", label: "Mudah (Level 1)" },
                    { value: "2", label: "Sedang (Level 2)" },
                    { value: "3", label: "Sulit (Level 3)" },
                  ]}
                />
              )}
            </Field>
            <Field label="Modus Konten Materi">
              {(id) => (
                <div className="flex items-center h-10 mt-1">
                  <Row gap={2} align="center">
                    <Checkbox
                      id={id}
                      checked={isExerciseOnly}
                      onChange={(c) => setIsExerciseOnly(c === true)}
                    />
                    <Text>Materi Ini Hanya Berisi Latihan Soal</Text>
                  </Row>
                </div>
              )}
            </Field>
          </Grid>

          <Field label="Konten Materi (Teks Kaya & Rumus Matematika)">
            {(id, describedBy) => (
              <div id={id} aria-describedby={describedBy}>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Tulis materi pembelajaran di sini..."
                  minHeight="220px"
                />
              </div>
            )}
          </Field>

          <Field label="Konteks LLM Tambahan (Prompt Guidance untuk Tutor AI)">
            {(id, describedBy) => (
              <textarea
                id={id}
                aria-describedby={describedBy}
                value={llmContext}
                onChange={(e) => setLlmContext(e.target.value)}
                rows={3}
                placeholder="Instruksi khusus untuk model AI saat mendampingi siswa di materi ini..."
                className={inputClasses({
                  bare: false,
                  invalid: false,
                  mono: false,
                })}
              />
            )}
          </Field>

          <Row justify="between" gap={4} className="pt-4 border-t border-[var(--separator)]">
            <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
              Kembali ke Daftar
            </Button>
            <Row gap={2}>
              {material && (
                <Confirm
                  title="Hapus Materi?"
                  body={`Apakah Anda yakin ingin menghapus materi "${material.title}"? Semua pertanyaan di dalamnya juga akan terhapus.`}
                  confirmLabel="Hapus Materi"
                  cancelLabel="Pertahankan Materi"
                  onConfirm={handleDelete}
                  loading={saving}
                >
                  <Button type="button" variant="quiet" tone="warn">
                    Hapus Materi
                  </Button>
                </Confirm>
              )}
              <Button type="submit" tone="mint" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan Materi"}
              </Button>
            </Row>
          </Row>
        </Stack>
      </Card>

      {/* Live Preview Modal */}
      <StudentMaterialPreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        material={{
          title,
          subTopicName: selectedStObj?.name,
          topicName: selectedStObj ? availableTopics[selectedStObj.topicId] : undefined,
          difficulty,
          isExerciseOnly,
          content,
          materialLlmContext: llmContext,
        }}
      />
    </form>
  );

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Materi", onClick: onCancel },
          { label: material ? material.title : "Materi Baru" },
        ]}
      />

      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>{material ? "Edit Materi" : "Materi Baru"}</Eyebrow>
          <Heading level={1}>{material ? material.title : "Buat Materi"}</Heading>
        </Stack>
      </Row>

      {material ? (
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          tone="mint"
          tabs={[
            {
              value: "details",
              label: "Detail Materi & Konten",
              content: formContent,
            },
            {
              value: "questions",
              label: "Pertanyaan Latihan & Evaluasi",
              content: <MaterialQuestions materialId={material.id} />,
            },
            {
              value: "chat_logs",
              label: "Riwayat Chat Pembelajaran",
              content: <MaterialChatLogs materialId={material.id} />,
            },
          ]}
        />
      ) : (
        formContent
      )}
    </Stack>
  );
}

function MaterialQuestions({ materialId }: { materialId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  const loadQuestions = useCallback(() => {
    adminApi.getQuestions(materialId).then((res) => setQuestions(res.data || []));
  }, [materialId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleDuplicateQuestion = async (e: React.MouseEvent, q: Question) => {
    e.stopPropagation();
    try {
      const duplicateData = {
        materialId: q.materialId,
        learningObjective: `${q.learningObjective || "Pertanyaan"} (Salinan)`,
        questionUi: q.questionUi,
        questionLlmContext: q.questionLlmContext,
        evaluationParameters: q.evaluationParameters,
        answers: q.answers,
      };
      await adminApi.createQuestion(duplicateData);
      toast.success("Pertanyaan berhasil diduplikasi");
      loadQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menduplikasi pertanyaan");
    }
  };

  return (
    <Stack gap={4}>
      <Row justify="between" align="center">
        <Stack gap={1}>
          <Heading level={3}>Pertanyaan Latihan ({questions.length})</Heading>
          <Text size="sm" muted>
            Pertanyaan dan parameter evaluasi AI yang terkait dengan materi ini
          </Text>
        </Stack>
        <Button
          type="button"
          size="sm"
          tone="mint"
          onClick={() => {
            setActiveQuestion(null);
            setIsModalOpen(true);
          }}
        >
          <Icon name="wand" size="sm" /> Tambah Pertanyaan
        </Button>
      </Row>

      {questions.length === 0 ? (
        <Card className="p-6 text-center">
          <Text muted>Belum ada pertanyaan. Klik 'Tambah Pertanyaan' untuk membuat soal baru.</Text>
        </Card>
      ) : (
        <Stack gap={3}>
          {questions.map((q, i) => (
            <RowCard
              key={q.id}
              onClick={() => {
                setActiveQuestion(q);
                setIsModalOpen(true);
              }}
            >
              <Row justify="between" align="center" className="w-full">
                <Row gap={3} align="center" className="flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[var(--mint-subtle)] text-[var(--mint)] flex items-center justify-center font-bold text-sm flex-none">
                    {i + 1}
                  </div>
                  <Stack gap={1} className="flex-1 min-w-0">
                    <Heading level={3} className="truncate">
                      {q.learningObjective || "Pertanyaan Tanpa Judul Objective"}
                    </Heading>
                    {q.evaluationParameters?.keywords && (
                      <Row gap={1} className="flex-wrap">
                        {q.evaluationParameters.keywords.map((kw, kwIdx) => (
                          <span
                            key={kwIdx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]"
                          >
                            {kw}
                          </span>
                        ))}
                      </Row>
                    )}
                  </Stack>
                </Row>
                <Row gap={2} align="center">
                  <Button
                    type="button"
                    size="sm"
                    variant="quiet"
                    onClick={(e) => handleDuplicateQuestion(e, q)}
                  >
                    <Icon name="photo" size="sm" /> Salin Soal
                  </Button>
                  <Badge tone="idle">Edit Soal</Badge>
                </Row>
              </Row>
            </RowCard>
          ))}
        </Stack>
      )}

      {/* Modal Dialog for Question Editing */}
      <QuestionModal
        materialId={materialId}
        question={activeQuestion}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={loadQuestions}
      />
    </Stack>
  );
}

export default function AdminMaterials() {
  useDocumentTitle("Kelola Materi");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAction = searchParams.get("action");
  const subTopicId = searchParams.get("subTopicId");

  const [view, setView] = useState<"list" | "create" | "edit">(
    initialAction === "create" ? "create" : "list",
  );
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);

  const handleFinish = () => {
    setView("list");
    if (searchParams.get("action")) {
      searchParams.delete("action");
      setSearchParams(searchParams);
    }
  };

  if (view === "create") {
    return (
      <MaterialFormView
        initialSubTopicId={subTopicId || undefined}
        onCancel={handleFinish}
        onSave={handleFinish}
      />
    );
  }

  if (view === "edit" && activeMaterial) {
    return (
      <MaterialFormView
        material={activeMaterial}
        onCancel={handleFinish}
        onSave={handleFinish}
      />
    );
  }

  return (
    <MaterialListView
      onCreate={() => {
        setActiveMaterial(null);
        setView("create");
      }}
      onEdit={(m) => {
        setActiveMaterial(m);
        setView("edit");
      }}
    />
  );
}

function MaterialChatLogs({ materialId }: { materialId: number }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * LIMIT;
    adminChatLogsApi
      .getSessions({ materialId: materialId.toString(), limit: LIMIT, offset })
      .then((res) => {
        if (res.data) {
          setSessions(res.data.sessions);
          if (res.data.pagination) setTotalPages(res.data.pagination.totalPages);
        }
        setLoading(false);
      });
  }, [materialId, page]);

  return (
    <Stack gap={4}>
      {loading ? (
        <Text muted>Memuat riwayat chat...</Text>
      ) : sessions.length === 0 ? (
        <Card className="p-6 text-center">
          <Text muted>Belum ada sesi belajar siswa untuk materi ini.</Text>
        </Card>
      ) : (
        <Stack gap={3}>
          {sessions.map((session) => (
            <RowCard key={session.id} onClick={() => setSelectedSessionId(session.id)}>
              <Row gap={4} className="w-full" align="center" wrap={false}>
                <Blob icon="channels" tone="idle" size="sm" />
                <div className="flex-1 min-w-0">
                  <Stack gap={1}>
                    <Heading level={3}>{session.student.name}</Heading>
                    <Text size="sm" muted>
                      Percobaan Ke-{session.attemptNo} · {session.startedAt ? new Date(session.startedAt).toLocaleDateString("id-ID") : "Baru saja"}
                    </Text>
                  </Stack>
                </div>
                <Badge tone={session.status === "COMPLETED" ? "mint" : "idle"}>
                  {session.status}
                </Badge>
              </Row>
            </RowCard>
          ))}
          {totalPages > 1 && (
            <div className="flex justify-center pt-2">
              <Pagination page={page} total={totalPages} onChange={setPage} />
            </div>
          )}
        </Stack>
      )}

      {selectedSessionId && (
        <Dialog
          trigger={<span />}
          open={!!selectedSessionId}
          onOpenChange={(open) => !open && setSelectedSessionId(null)}
          title="Detail Sesi Chat Siswa"
          size="lg"
        >
          <ChatSessionViewer sessionId={selectedSessionId} />
        </Dialog>
      )}
    </Stack>
  );
}
