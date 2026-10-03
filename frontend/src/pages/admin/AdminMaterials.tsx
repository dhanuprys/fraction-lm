import { useState, useEffect, useCallback } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { Material, SubTopic, Question } from "@/types/api";
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
import { Dialog } from "@/components/pouf/controls";
import { Pagination } from "@/components/pouf/pagination";
import { adminChatLogsApi, type ChatSession } from "@/lib/api/adminChatLogs";
import { ChatSessionViewer } from "@/components/admin/ChatSessionViewer";

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
  const [materials, setMaterials] = useState<Material[]>([]);
  const [subTopics, setSubTopics] = useState<Record<number, string>>({});

  useEffect(() => {
    Promise.all([adminApi.getMaterials(), adminApi.getSubTopics()]).then(([mRes, stRes]) => {
      setMaterials(mRes.data || []);
      const stMap: Record<number, string> = {};
      (stRes.data?.subTopics || []).forEach((st) => {
        stMap[st.id] = st.name;
      });
      setSubTopics(stMap);
    });
  }, []);

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Kelola Materi</Heading>
          <Text muted>Buat konten pembelajaran dan materi.</Text>
        </Stack>
        <Button onClick={onCreate} tone="mint">
          Buat Materi
        </Button>
      </Row>
      <Stack gap={3}>
        {materials.length === 0 ? (
          <Text muted>Tidak ada materi. Buat satu untuk memulai.</Text>
        ) : (
          materials.map((m) => (
            <RowCard key={m.id} onClick={() => onEdit(m)}>
              <Row justify="between" wrap={false}>
                <Row gap={3} wrap={false}>
                  <Blob
                    icon={m.isExerciseOnly ? "target" : "activity"}
                    tone={m.isExerciseOnly ? "orange" : "pink"}
                    size="sm"
                  />
                  <Stack gap={1}>
                    <Text size="sm" muted>
                      Subtopik: {subTopics[m.subTopicId] || `ID ${m.subTopicId}`} · Urutan {m.order}
                    </Text>
                    <Row gap={2} align="center">
                      <Heading level={3}>{m.title}</Heading>
                      {m.isExerciseOnly && <Badge tone="orange">Latihan</Badge>}
                    </Row>
                  </Stack>
                </Row>
                <Badge tone="idle">Edit</Badge>
              </Row>
            </RowCard>
          ))
        )}
      </Stack>
    </Stack>
  );
}

function MaterialFormView({
  material,
  onCancel,
  onSave,
}: {
  material?: Material | null;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [subTopicId, setSubTopicId] = useState(material?.subTopicId?.toString() || "");
  const [title, setTitle] = useState(material?.title || "");
  const [order, setOrder] = useState(material?.order?.toString() || "1");
  const [content, setContent] = useState<unknown>(material?.content || {});
  const [llmContext, setLlmContext] = useState(material?.materialLlmContext || "");
  const [difficulty, setDifficulty] = useState<string>(material?.difficulty?.toString() || "1");
  const [isExerciseOnly, setIsExerciseOnly] = useState<boolean>(material?.isExerciseOnly || false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");

  const [availableSubTopics, setAvailableSubTopics] = useState<SubTopic[]>([]);

  useEffect(() => {
    adminApi.getSubTopics(undefined, 1000).then((res) => {
      const st = res.data?.subTopics || [];
      setAvailableSubTopics(st);
      if (!subTopicId && st.length > 0) {
        setSubTopicId(st[0].id.toString());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      } else {
        await adminApi.createMaterial(data);
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
            setError(parsed.map((p: { message: string }) => p.message).join(", "));
            return;
          }
        } catch {}
      }
      setError(apiError?.message || err.message || "Gagal menyimpan materi");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!material) return;
    setSaving(true);
    try {
      await adminApi.deleteMaterial(material.id);
      onSave();
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      alert(err.response?.data?.message || err.message || "Gagal menghapus materi");
      setSaving(false);
    }
  }
  const formContent = (
    <form onSubmit={handleSubmit}>
      <Card>
        <Stack gap={4}>
          {error && (
            <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-3 rounded font-bold text-sm">
              {error}
            </div>
          )}
          <Field label="Subtopik Induk">
            {(id, describedBy) => (
              <Select
                id={id}
                describedBy={describedBy}
                value={subTopicId}
                onChange={setSubTopicId}
                options={availableSubTopics.map((st) => ({
                  value: st.id.toString(),
                  label: st.name,
                }))}
              />
            )}
          </Field>
          <Grid cols={2} gap={4}>
            <Field label="Judul Materi">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={title}
                  onChange={setTitle}
                  required
                />
              )}
            </Field>
            <Field label="Urutan">
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
            <Field label="Tingkat Kesulitan">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={difficulty}
                  onChange={setDifficulty}
                  options={[
                    { value: "1", label: "Mudah" },
                    { value: "2", label: "Sedang" },
                    { value: "3", label: "Sulit" },
                  ]}
                />
              )}
            </Field>
          </Grid>
          <Field label="Tipe Materi">
            {(id, _describedBy) => (
              <Row gap={2} align="center">
                <Checkbox
                  id={id}
                  checked={isExerciseOnly}
                  onChange={(c) => setIsExerciseOnly(c === true)}
                />
                <Text>Hanya Latihan (Fokus Pada Soal)</Text>
              </Row>
            )}
          </Field>

          <Field label="Konten (Teks Kaya)">
            {(id, describedBy) => (
              <div id={id} aria-describedby={describedBy}>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Tulis konten materi Anda di sini... Tambahkan teks, rumus matematika, dan gambar."
                />
              </div>
            )}
          </Field>
          <Field label="Konteks LLM (Opsional)">
            {(id, describedBy) => (
              <textarea
                id={id}
                aria-describedby={describedBy}
                value={llmContext}
                onChange={(e) => setLlmContext(e.target.value)}
                rows={4}
                className={inputClasses({
                  bare: false,
                  invalid: false,
                  mono: false,
                })}
              />
            )}
          </Field>

          <Row justify="between" gap={4}>
            <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
              Batal
            </Button>
            <Row gap={2}>
              {material && (
                <Confirm
                  title="Hapus Materi?"
                  body={`Apakah Anda yakin ingin menghapus "${material.title}"?`}
                  confirmLabel="Hapus Materi"
                  cancelLabel="Pertahankan Materi"
                  onConfirm={handleDelete}
                  loading={saving}
                >
                  <Button type="button" variant="quiet" tone="warn">
                    Hapus
                  </Button>
                </Confirm>
              )}
              <Button type="submit" tone="mint" disabled={saving}>
                Simpan Materi
              </Button>
            </Row>
          </Row>
        </Stack>
      </Card>
    </form>
  );

  return (
    <Stack gap={5}>
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
              label: "Detail Materi",
              content: formContent,
            },
            {
              value: "questions",
              label: "Pertanyaan",
              content: <MaterialQuestions materialId={material.id} />,
            },
            {
              value: "chat_logs",
              label: "Riwayat Chat",
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

function QuestionFormView({
  materialId,
  question,
  onCancel,
  onSave,
}: {
  materialId: number;
  question?: Question | null;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [learningObjective, setLearningObjective] = useState(question?.learningObjective || "");
  const [questionUi, setQuestionUi] = useState<unknown>(question?.questionUi || {});
  const [llmContext, setLlmContext] = useState(question?.questionLlmContext || "");
  const [saving, setSaving] = useState(false);

  const [evalKeywords, setEvalKeywords] = useState(
    (question?.evaluationParameters?.keywords || []).join(", "),
  );
  const [evalMisconceptions, setEvalMisconceptions] = useState(
    (question?.evaluationParameters?.misconceptions || []).join(", "),
  );
  const [evalStrictness, setEvalStrictness] = useState(
    question?.evaluationParameters?.strictness_level || "medium",
  );

  const [answers, setAnswers] = useState<
    Array<{
      answer_ui: unknown;
      answer_llm_context: string;
      is_correct: boolean;
    }>
  >(Array.isArray(question?.answers) ? question.answers : []);

  function handleAddAnswer() {
    setAnswers([...answers, { answer_ui: {}, answer_llm_context: "", is_correct: false }]);
  }

  function updateAnswer(index: number, key: string, val: unknown) {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], [key]: val };
    setAnswers(newAnswers);
  }

  function removeAnswer(index: number) {
    setAnswers(answers.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const evaluationParameters = {
        keywords: evalKeywords
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        misconceptions: evalMisconceptions
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        strictness_level: evalStrictness,
      };

      const data = {
        materialId,
        learningObjective,
        questionUi,
        questionLlmContext: llmContext,
        evaluationParameters,
        answers,
      };
      if (question) {
        await adminApi.updateQuestion(question.id, data);
      } else {
        await adminApi.createQuestion(data);
      }
      onSave();
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      alert(err.response?.data?.message || "Gagal menyimpan pertanyaan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!question) return;
    setSaving(true);
    try {
      await adminApi.deleteQuestion(question.id);
      onSave();
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      alert(err.response?.data?.message || "Gagal menghapus pertanyaan");
      setSaving(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Heading level={3}>{question ? "Edit Pertanyaan" : "Pertanyaan Baru"}</Heading>
          <Field label="Tujuan Pembelajaran">
            {(id, desc) => (
              <Input
                id={id}
                describedBy={desc}
                value={learningObjective}
                onChange={setLearningObjective}
              />
            )}
          </Field>
          <Field label="Konten Pertanyaan (Teks Kaya)">
            {(id, desc) => (
              <div id={id} aria-describedby={desc}>
                <RichTextEditor
                  value={questionUi}
                  onChange={setQuestionUi}
                  placeholder="Tulis pertanyaan Anda di sini..."
                />
              </div>
            )}
          </Field>
          <Field label="Konteks LLM (Opsional)">
            {(id, desc) => (
              <textarea
                id={id}
                aria-describedby={desc}
                className={inputClasses()}
                value={llmContext}
                onChange={(e) => setLlmContext(e.target.value)}
              />
            )}
          </Field>

          <div className="border-t border-[var(--separator)] pt-4" />
          <Eyebrow>Parameter Evaluasi (Untuk Penilai AI)</Eyebrow>
          <Grid cols={2} gap={4}>
            <Field label="Kata Kunci (dipisahkan koma)">
              {(id, desc) => (
                <Input
                  id={id}
                  describedBy={desc}
                  value={evalKeywords}
                  onChange={setEvalKeywords}
                  placeholder="misalnya, pembilang, penyebut"
                />
              )}
            </Field>
            <Field label="Miskonsepsi (dipisahkan koma)">
              {(id, desc) => (
                <Input
                  id={id}
                  describedBy={desc}
                  value={evalMisconceptions}
                  onChange={setEvalMisconceptions}
                  placeholder="misalnya, menjumlahkan penyebut"
                />
              )}
            </Field>
            <Field label="Tingkat Ketatnya">
              {(id, desc) => (
                <Select
                  id={id}
                  describedBy={desc}
                  value={evalStrictness}
                  onChange={setEvalStrictness}
                  options={[
                    { value: "loose", label: "Longgar (Konsep)" },
                    { value: "medium", label: "Sedang" },
                    { value: "strict", label: "Ketat (Tepat)" },
                  ]}
                />
              )}
            </Field>
          </Grid>

          <div className="border-t border-[var(--separator)] pt-4" />
          <Row justify="between" align="center">
            <Eyebrow>Jawaban</Eyebrow>
            <Button type="button" size="sm" onClick={handleAddAnswer}>
              Tambah Jawaban
            </Button>
          </Row>

          <Stack gap={4}>
            {answers.length === 0 && (
              <Text muted>No answers added. Add one for multiple choice or sample answer.</Text>
            )}
            {answers.map((ans, i) => (
              <Card key={i}>
                <Stack gap={4}>
                  <Row justify="between" align="center">
                    <Text>
                      <strong>Answer Option {i + 1}</strong>
                    </Text>
                    <Button
                      type="button"
                      size="sm"
                      variant="quiet"
                      tone="warn"
                      onClick={() => removeAnswer(i)}
                    >
                      Remove
                    </Button>
                  </Row>

                  <Checkbox
                    checked={ans.is_correct}
                    onChange={(checked) => updateAnswer(i, "is_correct", checked === true)}
                    label="Is Correct Answer"
                  />

                  <Field label="Answer UI (Rich Text)">
                    {(id, desc) => (
                      <div id={id} aria-describedby={desc}>
                        <RichTextEditor
                          value={ans.answer_ui}
                          onChange={(val) => updateAnswer(i, "answer_ui", val)}
                          minHeight="100px"
                          placeholder="Content for this answer option..."
                        />
                      </div>
                    )}
                  </Field>

                  <Field label="Answer LLM Context">
                    {(id, desc) => (
                      <textarea
                        id={id}
                        aria-describedby={desc}
                        className={inputClasses()}
                        value={ans.answer_llm_context}
                        onChange={(e) => updateAnswer(i, "answer_llm_context", e.target.value)}
                        rows={2}
                        placeholder="Explain why this answer is correct or incorrect..."
                      />
                    )}
                  </Field>
                </Stack>
              </Card>
            ))}
          </Stack>

          <div className="border-t border-[var(--separator)] pt-4" />

          <Row justify="between" gap={4}>
            <Button type="button" variant="quiet" onClick={onCancel}>
              Batal
            </Button>
            <Row gap={2}>
              {question && (
                <Confirm
                  title="Hapus Pertanyaan?"
                  body="Apakah Anda yakin ingin menghapus pertanyaan ini?"
                  confirmLabel="Hapus Pertanyaan"
                  cancelLabel="Pertahankan Pertanyaan"
                  onConfirm={handleDelete}
                  loading={saving}
                >
                  <Button type="button" variant="quiet" tone="warn">
                    Hapus
                  </Button>
                </Confirm>
              )}
              <Button type="submit" tone="mint" disabled={saving}>
                Simpan Pertanyaan
              </Button>
            </Row>
          </Row>
        </Stack>
      </form>
    </Card>
  );
}

function MaterialQuestions({ materialId }: { materialId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  const load = useCallback(() => {
    adminApi.getQuestions(materialId).then((res) => setQuestions(res.data || []));
  }, [materialId]);

  useEffect(() => {
    load();
  }, [load]);

  if (view === "create" || view === "edit") {
    return (
      <QuestionFormView
        materialId={materialId}
        question={activeQuestion}
        onCancel={() => setView("list")}
        onSave={() => {
          setView("list");
          load();
        }}
      />
    );
  }

  return (
    <Stack gap={4}>
      <Row justify="between" align="center">
        <Stack gap={1}>
          <Heading level={3}>Pertanyaan ({questions.length})</Heading>
          <Text size="sm" muted>
            Pertanyaan yang terkait dengan materi ini
          </Text>
        </Stack>
        <Button
          type="button"
          size="sm"
          tone="mint"
          onClick={() => {
            setActiveQuestion(null);
            setView("create");
          }}
        >
          Tambah Pertanyaan
        </Button>
      </Row>
      {questions.length === 0 ? (
        <Text muted>Belum ada pertanyaan. Tambahkan untuk memulai.</Text>
      ) : (
        <Stack gap={2}>
          {questions.map((q, i) => (
            <RowCard
              key={q.id}
              onClick={() => {
                setActiveQuestion(q);
                setView("edit");
              }}
            >
              <Row justify="between" align="center">
                <Row gap={3} align="center">
                  <div className="w-8 h-8 rounded-full bg-mint/10 text-mint flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <Text>
                    <strong>{q.learningObjective || "Pertanyaan Tanpa Judul"}</strong>
                  </Text>
                </Row>
                <Badge tone="idle">Edit</Badge>
              </Row>
            </RowCard>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default function AdminMaterials() {
  useDocumentTitle("Kelola Materi");
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);

  if (view === "create") {
    return <MaterialFormView onCancel={() => setView("list")} onSave={() => setView("list")} />;
  }

  if (view === "edit" && activeMaterial) {
    return (
      <MaterialFormView
        material={activeMaterial}
        onCancel={() => setView("list")}
        onSave={() => setView("list")}
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
    // eslint-disable-next-line react/set-state-in-effect
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
        <Card>
          <Text muted>Belum ada sesi belajar untuk materi ini.</Text>
        </Card>
      ) : (
        <Stack gap={3}>
          {sessions.map((session) => (
            <RowCard key={session.id} onClick={() => setSelectedSessionId(session.id)}>
              <Row gap={4} className="w-full" align="center" wrap={false}>
                <Blob icon="log" tone="idle" size="sm" />
                <div className="flex-1 min-w-0">
                  <Stack gap={1}>
                    <Heading level={3}>{session.student.name}</Heading>
                    <Text size="sm" muted>
                      Percobaan {session.attemptNo}
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
