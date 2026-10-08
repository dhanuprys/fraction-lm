import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useBGM } from "@/hooks/useBGM";
import { studentApi, type StudentMaterialDetail } from "@/lib/api/student";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Badge, Blob } from "@/components/pouf/media";
import { Button } from "@/components/pouf/Button";
import { ErrorNote } from "@/components/pouf/feedback";
import { CTA } from "@/components/pouf/cta";
import { renderTipTapNode } from "@/components/TipTapRenderer";
import { toast } from "@/components/pouf/toaster";

export default function MaterialView() {
  const { topicSlug, subTopicSlug, materialId } = useParams();
  useBGM();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<StudentMaterialDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(material?.title || "Baca Materi");

  const loadData = () => {
    if (!materialId) return;
    const id = parseInt(materialId, 10);
    if (isNaN(id)) return;

    setLoading(true);
    setError(null);
    setIsLocked(false);

    studentApi
      .getMaterial(id)
      .then((res) => {
        if (res.data) {
          setMaterial(res.data.material);
        } else {
          setError("Gagal memuat materi pembelajaran.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403) {
          setIsLocked(true);
        } else {
          setError("Koneksi jaringan bermasalah. Gagal memuat materi.");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [materialId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <Text muted>Memuat data...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <Stack gap={6} align="start">
        <ErrorNote>{error}</ErrorNote>
        <Button onClick={loadData} tone="purple">
          Coba Lagi
        </Button>
      </Stack>
    );
  }

  if (isLocked) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Materi Terkunci 🔒</Heading>
        <Text muted>
          Anda harus menyelesaikan materi sebelumnya terlebih dahulu sebelum dapat mengakses materi
          ini.
        </Text>
        <div>
          <Button
            variant="quiet"
            tone="idle"
            onClick={() => navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)}
          >
            Kembali ke Subtopik
          </Button>
        </div>
      </Stack>
    );
  }

  if (!material) {
    return (
      <Stack gap={6}>
        <Heading level={2}>Materi tidak ditemukan</Heading>
        <div>
          <Button
            variant="quiet"
            tone="idle"
            onClick={() => navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)}
          >
            Kembali ke Subtopik
          </Button>
        </div>
      </Stack>
    );
  }

  const isDone = material.status === "COMPLETED";
  const isInProgress = material.status === "IN_PROGRESS";

  async function handleMarkAsRead() {
    setIsCompleting(true);
    try {
      await studentApi.completeMaterial(material!.id);
      setMaterial((prev) => (prev ? { ...prev, status: "COMPLETED" } : null));
      toast.success("Materi berhasil ditandai selesai! 🎉");
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompleting(false);
    }
  }

  const isEmptyContent =
    !material.content ||
    (material.content.type === "doc" &&
      (!material.content.content ||
        (material.content.content.length === 1 && !material.content.content[0].content)));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <Stack gap={4}>
        <Link
          to={`/student/topics/${topicSlug}/${subTopicSlug}`}
          className="inline-block"
          data-clicksound="click"
        >
          <span className="hover:text-[var(--on-surface)] transition-colors">
            <Text size="sm" muted>
              ← Kembali ke Subtopik
            </Text>
          </span>
        </Link>
        <Card variant="default">
          <Row justify="between" align="center">
            <Row gap={4} align="center">
              <Blob
                icon={
                  material.isExerciseOnly
                    ? isDone
                      ? "ok"
                      : "target"
                    : isDone
                      ? "ok"
                      : isInProgress
                        ? "play"
                        : "wand"
                }
                tone={
                  material.isExerciseOnly
                    ? isDone
                      ? "mint"
                      : "orange"
                    : isDone
                      ? "mint"
                      : isInProgress
                        ? "blue"
                        : "purple"
                }
                size="md"
              />
              <div className="flex flex-col gap-1">
                <Eyebrow>
                  {material.isExerciseOnly ? "Instruksi Latihan" : "Materi Pembelajaran"}
                </Eyebrow>
                <Heading level={1}>{material.title}</Heading>
              </div>
            </Row>
            <Row gap={3} align="center">
              <Badge tone={isDone ? "up" : isInProgress ? "blue" : "idle"}>
                {isDone ? "Selesai" : isInProgress ? "Sedang Dipelajari" : "Belum Mulai"}
              </Badge>
              {material.isExerciseOnly &&
                material.questions &&
                material.questions.length > 0 &&
                !isDone && (
                  <Button
                    tone="orange"
                    onClick={() =>
                      navigate(
                        `/student/topics/${topicSlug}/${subTopicSlug}/${materialId}/exercise`,
                      )
                    }
                  >
                    Mulai
                  </Button>
                )}
            </Row>
          </Row>
        </Card>
      </Stack>

      {/* Content Area */}
      <Card variant="default">
        <Stack gap={5}>
          <Heading level={2}>
            {material.isExerciseOnly ? "Persiapan Sebelum Latihan" : "Penjelasan Materi"}
          </Heading>
          <div className="material-content-renderer max-w-none">
            {isEmptyContent && material.isExerciseOnly ? (
              <Text muted>Tidak ada instruksi khusus. Kamu bisa langsung memulai latihan!</Text>
            ) : material.content?.type === "doc" ? (
              renderTipTapNode(material.content)
            ) : (
              <Text muted>Konten tidak dapat dirender.</Text>
            )}
          </div>

          {material.summaryMaterials && material.summaryMaterials.length > 0 && (
            <div className="mt-4 flex flex-col gap-6 pt-6 border-t border-[var(--separator)]">
              <Heading level={2}>Ringkasan Materi Sebelumnya</Heading>
              <div className="flex flex-col gap-8">
                {material.summaryMaterials.map((summary, idx) => {
                  const isSummaryEmpty =
                    !summary.content ||
                    (summary.content.type === "doc" &&
                      (!summary.content.content ||
                        (summary.content.content.length === 1 &&
                          !summary.content.content[0].content)));

                  if (isSummaryEmpty) return null;

                  return (
                    <div key={idx} className="flex flex-col gap-3">
                      <Eyebrow>{summary.title}</Eyebrow>
                      <div className="material-content-renderer max-w-none text-[0.95em] opacity-90">
                        {summary.content?.type === "doc" ? renderTipTapNode(summary.content) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Stack>
      </Card>

      {/* Questions CTA */}
      {material.questions && material.questions.length > 0 ? (
        <CTA
          title={material.isExerciseOnly ? "Waktunya Berlatih!" : "Siap Menguji Pemahamanmu?"}
          description={
            material.isExerciseOnly
              ? "Kerjakan soal-soal latihan ini untuk mengukur kemampuanmu."
              : "Kerjakan latihan soal untuk mengevaluasi materi yang telah dipelajari."
          }
          tone={material.isExerciseOnly ? "pink" : "purple"}
          action={
            <Button
              tone="mint"
              onClick={() =>
                navigate(`/student/topics/${topicSlug}/${subTopicSlug}/${materialId}/exercise`)
              }
            >
              Mulai Latihan Sekarang
            </Button>
          }
        />
      ) : !isDone ? (
        <CTA
          title="Selesai Membaca?"
          description="Tandai materi ini sebagai selesai untuk membuka akses ke materi selanjutnya."
          tone="blue"
          action={
            <Button tone="mint" onClick={handleMarkAsRead} disabled={isCompleting}>
              {isCompleting ? "Menandai..." : "Tandai sebagai selesai dibaca"}
            </Button>
          }
        />
      ) : (
        <CTA
          title="Materi Selesai 🎉"
          description="Kamu sudah menyelesaikan materi ini. Silakan lanjut ke materi berikutnya."
          tone="mint"
          action={
            <Button
              tone="purple"
              onClick={() => navigate(`/student/topics/${topicSlug}/${subTopicSlug}`)}
            >
              Lanjut Belajar
            </Button>
          }
        />
      )}
    </div>
  );
}
