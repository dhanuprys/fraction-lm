import { Dialog } from "@/components/pouf/controls";
import { Badge, Blob } from "@/components/pouf/media";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Icon } from "@/components/pouf/Icon";

interface MaterialPreviewData {
  title: string;
  subTopicName?: string;
  topicName?: string;
  difficulty?: number | string;
  isExerciseOnly?: boolean;
  content?: any;
  materialLlmContext?: string;
}

interface StudentMaterialPreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  material: MaterialPreviewData;
}

export function StudentMaterialPreviewModal({
  isOpen,
  onOpenChange,
  material,
}: StudentMaterialPreviewModalProps) {
  // Extract HTML or plain text from editor content object if present
  const renderContentHtml = () => {
    if (!material.content) return "Belum ada konten materi.";
    if (typeof material.content === "string") return material.content;
    if (material.content.html) return material.content.html;
    if (material.content.text) return material.content.text;
    try {
      return JSON.stringify(material.content, null, 2);
    } catch {
      return String(material.content);
    }
  };

  const difficultyLabel =
    String(material.difficulty) === "3"
      ? "Sulit"
      : String(material.difficulty) === "2"
        ? "Sedang"
        : "Mudah";

  return (
    <Dialog
      trigger={<span />}
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Pratinjau Tampilan Siswa"
      description="Inilah simulasi tampilan halaman belajar materi yang akan dilihat oleh siswa."
      size="lg"
    >
      <div className="mt-3 space-y-4">
        {/* Simulated Student Window Frame */}
        <div className="rounded-2xl border-2 border-[var(--separator)] bg-[var(--bg)] shadow-lg overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[var(--surface-sunken)] px-4 py-3 border-b border-[var(--separator)] flex items-center justify-between">
            <Row gap={2} align="center">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              <Text size="sm" muted className="ml-2 font-mono">
                student/topics/{material.topicName || "topik"}/{material.subTopicName || "subtopik"}
              </Text>
            </Row>
            <Badge tone="mint">Tampilan Siswa</Badge>
          </div>

          {/* Body Content Container */}
          <div className="p-6 max-h-[550px] overflow-y-auto space-y-6">
            {/* Topic & Subtopic Badges */}
            <Row gap={2} align="center" className="flex-wrap">
              {material.topicName && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                  {material.topicName}
                </span>
              )}
              {material.subTopicName && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--mint)_15%,transparent)] text-[var(--mint)] border border-[color-mix(in_srgb,var(--mint)_30%,transparent)]">
                  {material.subTopicName}
                </span>
              )}
              <Badge tone={material.isExerciseOnly ? "orange" : "idle"}>
                {material.isExerciseOnly ? "Hanya Latihan" : `Tingkat: ${difficultyLabel}`}
              </Badge>
            </Row>

            {/* Material Title */}
            <Heading level={1} className="text-2xl font-bold">
              {material.title || "Judul Materi"}
            </Heading>

            {/* Rendered Material Body */}
            <Card className="p-6 bg-[var(--surface)] border border-[var(--separator)] min-h-[160px] prose dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: renderContentHtml() }}
                className="text-[var(--fg)] leading-relaxed space-y-3"
              />
            </Card>

            {/* LLM Assistant Simulated Prompt Box (If context exists) */}
            {material.materialLlmContext && (
              <Card className="p-4 bg-[color-mix(in_srgb,var(--mint)_8%,transparent)] border border-[color-mix(in_srgb,var(--mint)_25%,transparent)]">
                <Row gap={3} align="center">
                  <Blob icon="wand" tone="mint" size="sm" />
                  <Stack gap={1} className="flex-1">
                    <Eyebrow>Instruksi AI Tutor untuk Materi Ini</Eyebrow>
                    <Text size="sm" muted>
                      {material.materialLlmContext}
                    </Text>
                  </Stack>
                </Row>
              </Card>
            )}

            {/* Action Bar Simulation */}
            <Row justify="end" gap={3} className="pt-4 border-t border-[var(--separator)]">
              <Button tone="mint" size="md">
                <Icon name="wand" size="sm" /> Mulai Sesi Latihan
              </Button>
            </Row>
          </div>
        </div>

        <Row justify="end">
          <Button variant="quiet" onClick={() => onOpenChange(false)}>
            Tutup Pratinjau
          </Button>
        </Row>
      </div>
    </Dialog>
  );
}
