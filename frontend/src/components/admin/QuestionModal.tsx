import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api/admin";
import type { Question } from "@/types/api";
import { Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Field, Input, inputClasses } from "@/components/pouf/Input";
import { Select, Confirm, Dialog } from "@/components/pouf/controls";
import { Checkbox } from "@/components/pouf/checkbox";
import { RichTextEditor } from "@/components/pouf/RichTextEditor";
import { TagInput } from "./TagInput";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";

interface QuestionModalProps {
  materialId: number;
  question?: Question | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function QuestionModal({
  materialId,
  question,
  isOpen,
  onOpenChange,
  onSave,
}: QuestionModalProps) {
  const [learningObjective, setLearningObjective] = useState("");
  const [questionUi, setQuestionUi] = useState<unknown>({});
  const [llmContext, setLlmContext] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [evalKeywords, setEvalKeywords] = useState<string[]>([]);
  const [evalMisconceptions, setEvalMisconceptions] = useState<string[]>([]);
  const [evalStrictness, setEvalStrictness] = useState("medium");

  const [answers, setAnswers] = useState<
    Array<{
      answer_ui: unknown;
      answer_llm_context: string;
      is_correct: boolean;
    }>
  >([]);

  useEffect(() => {
    if (question) {
      setLearningObjective(question.learningObjective || "");
      setQuestionUi(question.questionUi || {});
      setLlmContext(question.questionLlmContext || "");
      setEvalKeywords(question.evaluationParameters?.keywords || []);
      setEvalMisconceptions(question.evaluationParameters?.misconceptions || []);
      setEvalStrictness(question.evaluationParameters?.strictness_level || "medium");
      setAnswers(Array.isArray(question.answers) ? question.answers : []);
    } else {
      setLearningObjective("");
      setQuestionUi({});
      setLlmContext("");
      setEvalKeywords([]);
      setEvalMisconceptions([]);
      setEvalStrictness("medium");
      setAnswers([]);
    }
  }, [question, isOpen]);

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
    setError(null);
    try {
      const evaluationParameters = {
        keywords: evalKeywords,
        misconceptions: evalMisconceptions,
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
        toast.success("Pertanyaan berhasil diperbarui");
      } else {
        await adminApi.createQuestion(data);
        toast.success("Pertanyaan baru berhasil dibuat");
      }
      onSave();
      onOpenChange(false);
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      const msg = err.response?.data?.message || err.message || "Gagal menyimpan pertanyaan";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!question) return;
    setSaving(true);
    try {
      await adminApi.deleteQuestion(question.id);
      toast.success("Pertanyaan berhasil dihapus");
      onSave();
      onOpenChange(false);
    } catch (e: unknown) {
      const err = e as ApiError;
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal menghapus pertanyaan");
      setSaving(false);
    }
  }

  return (
    <Dialog
      trigger={<span />}
      open={isOpen}
      onOpenChange={onOpenChange}
      title={question ? "Edit Pertanyaan Evaluasi" : "Buat Pertanyaan Baru"}
      description="Konfigurasi tujuan pembelajaran, soal visual, evaluasi AI, dan pilihan jawaban."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="mt-2">
        <Stack gap={5}>
          {error && (
            <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-3 rounded-lg font-semibold text-sm">
              {error}
            </div>
          )}

          {/* Section 1: Detail Pertanyaan */}
          <Card className="p-4 border border-[var(--separator)] bg-[var(--surface-sunken)]">
            <Stack gap={4}>
              <Eyebrow>Detail & Konten Soal</Eyebrow>
              <Field label="Tujuan Pembelajaran (Objective)">
                {(id, desc) => (
                  <Input
                    id={id}
                    aria-describedby={desc}
                    value={learningObjective}
                    onChange={setLearningObjective}
                    placeholder="Contoh: Siswa dapat menentukan pembilang dan penyebut dari pecahan sederhana"
                    required
                  />
                )}
              </Field>
              <Field label="Konten Pertanyaan (Teks Kaya & Rumus)">
                {(id, desc) => (
                  <div id={id} aria-describedby={desc}>
                    <RichTextEditor
                      value={questionUi}
                      onChange={setQuestionUi}
                      placeholder="Tulis pertanyaan Anda di sini... Tambahkan teks, matematika, atau gambar."
                      minHeight="140px"
                    />
                  </div>
                )}
              </Field>
              <Field label="Konteks Tambahan LLM / Prompt (Opsional)">
                {(id, desc) => (
                  <textarea
                    id={id}
                    aria-describedby={desc}
                    className={inputClasses()}
                    rows={2}
                    value={llmContext}
                    onChange={(e) => setLlmContext(e.target.value)}
                    placeholder="Instruksi tambahan bagi AI Tutor ketika mendampingi soal ini..."
                  />
                )}
              </Field>
            </Stack>
          </Card>

          {/* Section 2: Parameter Evaluasi AI */}
          <Card className="p-4 border border-[var(--separator)] bg-[var(--surface-sunken)]">
            <Stack gap={4}>
              <Eyebrow>Parameter Evaluasi Penilaian AI</Eyebrow>
              <Grid cols={2} gap={4}>
                <Field label="Kata Kunci Utama (Keywords)">
                  {() => (
                    <TagInput
                      value={evalKeywords}
                      onChange={setEvalKeywords}
                      placeholder="Ketik kata kunci & tekan Enter..."
                    />
                  )}
                </Field>
                <Field label="Miskonsepsi yang Diantisipasi">
                  {() => (
                    <TagInput
                      value={evalMisconceptions}
                      onChange={setEvalMisconceptions}
                      placeholder="Ketik miskonsepsi & tekan Enter..."
                    />
                  )}
                </Field>
              </Grid>
              <Field label="Tingkat Ketepatan Evaluasi (Strictness)">
                {(id, desc) => (
                  <Select
                    id={id}
                    describedBy={desc}
                    value={evalStrictness}
                    onChange={setEvalStrictness}
                    options={[
                      { value: "loose", label: "Longgar (Pemahaman Konsep)" },
                      { value: "medium", label: "Sedang (Standar)" },
                      { value: "strict", label: "Ketat (Presisi Tepat)" },
                    ]}
                  />
                )}
              </Field>
            </Stack>
          </Card>

          {/* Section 3: Pilihan / Sample Jawaban */}
          <Card className="p-4 border border-[var(--separator)] bg-[var(--surface-sunken)]">
            <Stack gap={4}>
              <Row justify="between" align="center">
                <Eyebrow>Opsi Jawaban ({answers.length})</Eyebrow>
                <Button type="button" size="sm" tone="mint" onClick={handleAddAnswer}>
                  + Tambah Jawaban
                </Button>
              </Row>

              {answers.length === 0 ? (
                <Text size="sm" muted className="italic">
                  Belum ada pilihan jawaban. Tambahkan minimal 1 jawaban untuk soal ini.
                </Text>
              ) : (
                <Stack gap={3}>
                  {answers.map((ans, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-[var(--separator)] bg-[var(--bg)] flex flex-col gap-3"
                    >
                      <Row justify="between" align="center">
                        <Row gap={2} align="center">
                          <span className="w-6 h-6 rounded-full bg-[var(--mint-subtle)] text-[var(--mint)] font-bold text-xs flex items-center justify-center">
                            {i + 1}
                          </span>
                          <Text>
                            <strong>Opsi Jawaban {i + 1}</strong>
                          </Text>
                        </Row>
                        <Button
                          type="button"
                          size="sm"
                          variant="quiet"
                          tone="warn"
                          onClick={() => removeAnswer(i)}
                        >
                          <Icon name="close" size="sm" /> Hapus
                        </Button>
                      </Row>

                      <Checkbox
                        checked={ans.is_correct}
                        onChange={(checked) => updateAnswer(i, "is_correct", checked === true)}
                        label="Jawaban Ini Benar (Correct Answer)"
                      />

                      <Field label="Konten Teks Jawaban (Rich Text)">
                        {(id, desc) => (
                          <div id={id} aria-describedby={desc}>
                            <RichTextEditor
                              value={ans.answer_ui}
                              onChange={(val) => updateAnswer(i, "answer_ui", val)}
                              minHeight="80px"
                              placeholder="Tulis opsi jawaban..."
                            />
                          </div>
                        )}
                      </Field>

                      <Field label="Penjelasan / Feedback AI untuk Opsi Ini">
                        {(id, desc) => (
                          <textarea
                            id={id}
                            aria-describedby={desc}
                            className={inputClasses()}
                            rows={2}
                            value={ans.answer_llm_context}
                            onChange={(e) => updateAnswer(i, "answer_llm_context", e.target.value)}
                            placeholder="Alasan mengapa opsi ini benar atau salah..."
                          />
                        )}
                      </Field>
                    </div>
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>

          {/* Action Buttons */}
          <Row justify="between" align="center" className="pt-3 border-t border-[var(--separator)]">
            <Button
              type="button"
              variant="quiet"
              tone="idle"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Row gap={2}>
              {question && (
                <Confirm
                  title="Hapus Pertanyaan?"
                  body="Apakah Anda yakin ingin menghapus pertanyaan ini beserta jawaban di dalamnya?"
                  confirmLabel="Hapus Pertanyaan"
                  cancelLabel="Pertahankan"
                  onConfirm={handleDelete}
                  loading={saving}
                >
                  <Button type="button" variant="quiet" tone="warn">
                    Hapus
                  </Button>
                </Confirm>
              )}
              <Button type="submit" tone="mint" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan Pertanyaan"}
              </Button>
            </Row>
          </Row>
        </Stack>
      </form>
    </Dialog>
  );
}
