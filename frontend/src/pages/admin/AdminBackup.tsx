import { useState, useEffect, useRef, useCallback } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { toast } from "@/components/pouf/toaster";
import JSZip from "jszip";
import {
  Rocket,
  Package,
  Download,
  AlertTriangle,
  FileArchive,
  CheckCircle2,
  Calendar,
  Monitor,
  BarChart,
  FileText,
  PartyPopper,
  RefreshCw,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface BackupPreview {
  topics: number;
  subTopics: number;
  materials: number;
  questions: number;
  assets: number;
  estimatedSizeBytes: number;
}

interface ZipManifest {
  version: string;
  format: string;
  createdAt: string;
  source?: { hostname: string };
  counts: {
    topics: number;
    subTopics: number;
    materials: number;
    questions: number;
    assets: number;
  };
  includesSettings?: boolean;
}

type RestorePhase = "idle" | "validating" | "uploading" | "restoring" | "done" | "error";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(1)} ${sizes[i]}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ── Stat Card sub-component ──────────────────────────────────────────────────

function StatCard({
  value,
  label,
  tone = "blue",
}: {
  value: number | string;
  label: string;
  tone?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 16px",
        borderRadius: "12px",
        background: `var(--pouf-${tone}-ghost, rgba(100,100,255,0.08))`,
        border: `1px solid var(--pouf-${tone}-border, rgba(100,100,255,0.15))`,
        minWidth: "80px",
        flex: "1 1 80px",
      }}
    >
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: `var(--pouf-${tone}-text, var(--pouf-ink))`,
          lineHeight: 1.2,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          color: "var(--pouf-ink-muted)",
          marginTop: "2px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function AdminBackup() {
  useDocumentTitle("Backup & Restore");

  // ── Backup State ─────────────────────────────────────────────────────────
  const [preview, setPreview] = useState<BackupPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // ── Restore State ────────────────────────────────────────────────────────
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [manifest, setManifest] = useState<ZipManifest | null>(null);
  const [restorePhase, setRestorePhase] = useState<RestorePhase>("idle");
  const [includeSettings, setIncludeSettings] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [restoreResult, setRestoreResult] = useState<Record<string, number | boolean> | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load backup preview on mount ─────────────────────────────────────────
  useEffect(() => {
    adminApi
      .getBackupPreview()
      .then((res) => {
        if (res.data) setPreview(res.data);
      })
      .catch((err) => {
        console.error("Failed to load backup preview:", err);
        toast.error("Gagal memuat pratinjau cadangan");
      })
      .finally(() => setLoadingPreview(false));
  }, []);

  // ── Backup Download ──────────────────────────────────────────────────────
  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await adminApi.downloadBackup();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Cadangan berhasil diunduh!");
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Gagal mengunduh cadangan");
    } finally {
      setDownloading(false);
    }
  }

  // ── File Selection & Client-Side Validation ──────────────────────────────
  const validateFile = useCallback(async (file: File) => {
    setRestorePhase("validating");
    setManifest(null);
    setConfirmChecked(false);
    setConfirmText("");
    setRestoreResult(null);

    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer());

      // Check manifest
      const manifestFile = zip.file("manifest.json");
      if (!manifestFile) {
        toast.error("File ZIP tidak valid: manifest.json tidak ditemukan");
        setRestorePhase("error");
        return;
      }

      const manifestData: ZipManifest = JSON.parse(await manifestFile.async("text"));

      if (manifestData.format !== "llm-fraction-lm-backup") {
        toast.error(`Format cadangan tidak valid: "${manifestData.format}"`);
        setRestorePhase("error");
        return;
      }

      // Check curriculum file exists
      const curriculumFile = zip.file("data/curriculum.json");
      if (!curriculumFile) {
        toast.error("File ZIP tidak valid: curriculum.json tidak ditemukan");
        setRestorePhase("error");
        return;
      }

      setManifest(manifestData);
      setRestoreFile(file);
      setRestorePhase("idle");
      toast.success("File cadangan valid dan siap dipulihkan");
    } catch (err) {
      console.error("File validation failed:", err);
      toast.error("File tidak valid atau bukan format ZIP yang benar");
      setRestorePhase("error");
    }
  }, []);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) validateFile(file);
  }

  // ── Drag & Drop handlers ─────────────────────────────────────────────────
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.name.endsWith(".zip")) {
        toast.error("Hanya file ZIP yang diterima");
        return;
      }
      validateFile(file);
    }
  }

  // ── Restore Execution ────────────────────────────────────────────────────
  async function handleRestore() {
    if (!restoreFile || !manifest) return;

    setRestorePhase("uploading");
    try {
      setRestorePhase("restoring");
      const res = await adminApi.restoreBackup(restoreFile, includeSettings);

      if (res.data) {
        setRestoreResult(res.data as unknown as Record<string, number | boolean>);
        setRestorePhase("done");
        toast.success("Pemulihan berhasil! Data kurikulum telah dipulihkan.");
        // Refresh preview with new data
        try {
          const previewRes = await adminApi.getBackupPreview();
          if (previewRes.data) setPreview(previewRes.data);
        } catch {
          /* non-critical */
        }
      }
    } catch (err: any) {
      console.error("Restore failed:", err);
      const msg = err?.response?.data?.message || "Pemulihan gagal. Silakan coba lagi.";
      toast.error(msg);
      setRestorePhase("error");
    }
  }

  // ── Reset restore form ───────────────────────────────────────────────────
  function resetRestore() {
    setRestoreFile(null);
    setManifest(null);
    setRestorePhase("idle");
    setConfirmChecked(false);
    setConfirmText("");
    setRestoreResult(null);
    setIncludeSettings(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const canRestore =
    restoreFile &&
    manifest &&
    confirmChecked &&
    confirmText === "PULIHKAN" &&
    restorePhase === "idle";

  const isRestoring = restorePhase === "uploading" || restorePhase === "restoring";

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Stack gap={5}>
      {/* Page Header */}
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Backup & Restore</Heading>
          <Text muted>
            Migrasikan kurikulum antar server dengan mudah dan aman. Cadangan bersifat portabel —
            dapat dipulihkan di deployment manapun.
          </Text>
        </Stack>
      </Row>

      {/* ── Migration Info Banner ────────────────────────────────────────── */}
      <Card>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <Rocket
            size={24}
            style={{ color: "var(--pouf-blue-solid, #5588ff)", flexShrink: 0, marginTop: 2 }}
          />
          <Stack gap={1}>
            <Text style={{ fontWeight: 600 }}>Migrasi Antar Deployment</Text>
            <Text muted style={{ fontSize: "0.875rem" }}>
              Cadangan mencakup seluruh kurikulum (topik, subtopik, materi, dan soal) beserta semua
              aset gambar. File ZIP yang dihasilkan bersifat <strong>portabel</strong> — URL gambar
              dinormalisasi secara otomatis sehingga cadangan dari <code>localhost:3000</code> dapat
              langsung digunakan di <code>server-sekolah.com</code> tanpa perlu mengedit path secara
              manual.
            </Text>
          </Stack>
        </div>
      </Card>

      {/* ── BACKUP SECTION ──────────────────────────────────────────────── */}
      <Card>
        <Stack gap={4}>
          <Stack gap={1}>
            <Heading level={3}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Package size={24} /> Buat Cadangan Kurikulum
              </span>
            </Heading>
            <Text muted>
              Ekspor seluruh konten kurikulum ke file ZIP portabel yang dapat dipulihkan di server
              manapun.
            </Text>
          </Stack>

          {/* Stats Grid */}
          {loadingPreview ? (
            <Text muted>Memuat statistik...</Text>
          ) : preview ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <StatCard value={preview.topics} label="Topik" tone="purple" />
              <StatCard value={preview.subTopics} label="Subtopik" tone="blue" />
              <StatCard value={preview.materials} label="Materi" tone="mint" />
              <StatCard value={preview.questions} label="Soal" tone="orange" />
              <StatCard value={preview.assets} label="Aset" tone="pink" />
              <StatCard
                value={formatBytes(preview.estimatedSizeBytes)}
                label="Estimasi"
                tone="idle"
              />
            </div>
          ) : (
            <Text muted>Tidak ada data untuk dicadangkan.</Text>
          )}

          <Row justify="end" gap={3}>
            <Button
              onClick={handleDownload}
              tone="mint"
              disabled={downloading || !preview || preview.topics === 0}
            >
              {downloading ? (
                <>
                  <span className="spinner" style={{ marginRight: 8 }} />
                  Mengunduh...
                </>
              ) : (
                <>
                  <Download size={16} style={{ marginRight: 8 }} /> Unduh Cadangan
                </>
              )}
            </Button>
          </Row>
        </Stack>
      </Card>

      {/* ── RESTORE SECTION ─────────────────────────────────────────────── */}
      <Card>
        <Stack gap={4}>
          <Stack gap={1}>
            <Heading level={3}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <RefreshCw size={24} /> Pulihkan dari Cadangan
              </span>
            </Heading>
            <Text muted>
              Impor file cadangan ZIP untuk memulihkan kurikulum dari deployment lain.
            </Text>
          </Stack>

          {/* Warning Banner */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(255, 80, 80, 0.08)",
              border: "1px solid rgba(255, 80, 80, 0.2)",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <AlertTriangle
              size={20}
              style={{ color: "var(--pouf-red-text, #e55)", flexShrink: 0, marginTop: 2 }}
            />
            <Stack gap={1}>
              <Text style={{ fontWeight: 600, color: "var(--pouf-red-text, #e55)" }}>
                Operasi Bersifat Permanen
              </Text>
              <Text muted style={{ fontSize: "0.85rem" }}>
                Pemulihan akan <strong>menghapus seluruh</strong> data kurikulum yang ada saat ini
                (topik, subtopik, materi, soal), semua progres siswa, riwayat chat, dan file aset.
                Data tersebut akan diganti dengan isi cadangan. Pastikan Anda sudah membuat cadangan
                data saat ini sebelum melanjutkan.
              </Text>
            </Stack>
          </div>

          {/* Drop Zone */}
          {restorePhase !== "done" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                onChange={handleFileSelect}
                style={{ display: "none" }}
                id="restore-file-input"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  padding: "32px 24px",
                  borderRadius: "12px",
                  border: `2px dashed ${dragOver ? "var(--pouf-blue-solid, #5588ff)" : "var(--pouf-border)"}`,
                  background: dragOver
                    ? "rgba(85, 136, 255, 0.06)"
                    : "var(--pouf-surface-raised, rgba(255,255,255,0.03))",
                  textAlign: "center",
                  cursor: isRestoring ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  opacity: isRestoring ? 0.5 : 1,
                  pointerEvents: isRestoring ? "none" : "auto",
                }}
              >
                <Stack gap={2} align="center">
                  <FileArchive size={32} style={{ color: "var(--pouf-text-muted)" }} />
                  <Text style={{ fontWeight: 500 }}>
                    {restoreFile ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <CheckCircle2 size={16} style={{ color: "var(--pouf-mint-text, #5a5)" }} />
                        {restoreFile.name} ({formatBytes(restoreFile.size)})
                      </span>
                    ) : (
                      "Seret file ZIP cadangan ke sini atau klik untuk memilih"
                    )}
                  </Text>
                  {restorePhase === "validating" && (
                    <Text muted style={{ fontSize: "0.85rem" }}>
                      Memvalidasi file...
                    </Text>
                  )}
                </Stack>
              </div>
            </>
          )}

          {/* Validation Result */}
          {manifest && restorePhase !== "done" && (
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(80, 200, 120, 0.06)",
                border: "1px solid rgba(80, 200, 120, 0.2)",
              }}
            >
              <Stack gap={3}>
                <Row align="center" gap={2}>
                  <CheckCircle2 size={20} style={{ color: "var(--pouf-mint-text, #5a5)" }} />
                  <Text style={{ fontWeight: 600, color: "var(--pouf-mint-text, #5a5)" }}>
                    File Cadangan Valid
                  </Text>
                </Row>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "6px 16px",
                    fontSize: "0.875rem",
                  }}
                >
                  <Text muted style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} /> Dibuat
                  </Text>
                  <Text>{formatDate(manifest.createdAt)}</Text>

                  {manifest.source?.hostname && (
                    <>
                      <Text muted style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Monitor size={14} /> Sumber
                      </Text>
                      <Text>
                        <code>{manifest.source.hostname}</code>
                      </Text>
                    </>
                  )}

                  <Text muted style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <BarChart size={14} /> Konten
                  </Text>
                  <Text>
                    {manifest.counts.topics} Topik · {manifest.counts.subTopics} Subtopik ·{" "}
                    {manifest.counts.materials} Materi · {manifest.counts.questions} Soal ·{" "}
                    {manifest.counts.assets} Aset
                  </Text>

                  <Text muted style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <FileText size={14} /> Versi
                  </Text>
                  <Text>v{manifest.version}</Text>
                </div>

                {/* Optional: Include Settings checkbox */}
                {manifest.includesSettings && (
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={includeSettings}
                      onChange={(e) => setIncludeSettings(e.target.checked)}
                      style={{ width: 16, height: 16, cursor: "pointer" }}
                    />
                    <Text>Sertakan pengaturan aplikasi (model AI, dll.)</Text>
                  </label>
                )}
              </Stack>
            </div>
          )}

          {/* Confirmation Section */}
          {manifest && restorePhase !== "done" && (
            <Stack gap={3}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  disabled={isRestoring}
                  style={{ width: 16, height: 16, marginTop: 2, cursor: "pointer", flexShrink: 0 }}
                />
                <Text>
                  Saya memahami bahwa operasi ini bersifat{" "}
                  <strong>permanen dan tidak dapat dibatalkan</strong>. Seluruh data kurikulum dan
                  progres siswa akan dihapus dan diganti dengan isi cadangan.
                </Text>
              </label>

              <Stack gap={1}>
                <Text muted style={{ fontSize: "0.85rem" }}>
                  Ketik <strong>"PULIHKAN"</strong> untuk mengonfirmasi:
                </Text>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                  disabled={isRestoring}
                  placeholder="Ketik PULIHKAN"
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${confirmText === "PULIHKAN" ? "rgba(80, 200, 120, 0.5)" : "var(--pouf-border)"}`,
                    background: "var(--pouf-surface-raised, rgba(255,255,255,0.03))",
                    color: "var(--pouf-ink)",
                    fontSize: "1rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    maxWidth: "300px",
                  }}
                />
              </Stack>

              <Row justify="between" align="center">
                <Button onClick={resetRestore} tone="idle" disabled={isRestoring}>
                  Batal
                </Button>
                <Button onClick={handleRestore} tone="orange" disabled={!canRestore}>
                  {isRestoring ? (
                    <>
                      <span className="spinner" style={{ marginRight: 8 }} />
                      {restorePhase === "uploading" ? "Mengunggah..." : "Memulihkan..."}
                    </>
                  ) : (
                    "🔄 Pulihkan Sekarang"
                  )}
                </Button>
              </Row>
            </Stack>
          )}

          {/* Restoring Progress */}
          {isRestoring && (
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(255, 165, 0, 0.06)",
                border: "1px solid rgba(255, 165, 0, 0.2)",
              }}
            >
              <Stack gap={2}>
                <Row align="center" gap={2}>
                  <div
                    className="spinner"
                    style={{
                      width: 20,
                      height: 20,
                      border: "2px solid rgba(255,165,0,0.3)",
                      borderTopColor: "rgba(255,165,0,0.8)",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  <Text style={{ fontWeight: 600, color: "var(--pouf-orange-text, #e90)" }}>
                    Pemulihan sedang berlangsung...
                  </Text>
                </Row>
                <Text muted style={{ fontSize: "0.85rem" }}>
                  Jangan tutup halaman ini. Proses ini mencakup penghapusan data lama, pemulihan
                  aset, dan penulisan data kurikulum baru.
                </Text>
              </Stack>
            </div>
          )}

          {/* Success Result */}
          {restorePhase === "done" && restoreResult && (
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(80, 200, 120, 0.06)",
                border: "1px solid rgba(80, 200, 120, 0.2)",
              }}
            >
              <Stack gap={3}>
                <Row align="center" gap={2}>
                  <PartyPopper size={24} style={{ color: "var(--pouf-mint-text, #5a5)" }} />
                  <Heading level={3}>
                    <span style={{ color: "var(--pouf-mint-text, #5a5)" }}>
                      Pemulihan Berhasil!
                    </span>
                  </Heading>
                </Row>

                <Text muted>
                  Kurikulum berhasil dipulihkan dari cadangan. Berikut ringkasan data yang
                  dipulihkan:
                </Text>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <StatCard
                    value={restoreResult.topicsCreated as number}
                    label="Topik"
                    tone="purple"
                  />
                  <StatCard
                    value={restoreResult.subTopicsCreated as number}
                    label="Subtopik"
                    tone="blue"
                  />
                  <StatCard
                    value={restoreResult.materialsCreated as number}
                    label="Materi"
                    tone="mint"
                  />
                  <StatCard
                    value={restoreResult.questionsCreated as number}
                    label="Soal"
                    tone="orange"
                  />
                  <StatCard
                    value={restoreResult.assetsRestored as number}
                    label="Aset"
                    tone="pink"
                  />
                </div>

                <Row justify="end">
                  <Button onClick={resetRestore} tone="idle">
                    Selesai
                  </Button>
                </Row>
              </Stack>
            </div>
          )}

          {/* Error State */}
          {restorePhase === "error" && (
            <Row justify="end">
              <Button onClick={resetRestore} tone="idle">
                Coba Lagi
              </Button>
            </Row>
          )}
        </Stack>
      </Card>

      {/* Spinner keyframe animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: rgba(255,255,255,0.8);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
      `}</style>
    </Stack>
  );
}
