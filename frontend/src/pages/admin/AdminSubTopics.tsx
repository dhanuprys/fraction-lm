import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { SubTopic, Topic, Material } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Select, Confirm } from "@/components/pouf/controls";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { OrderControls } from "@/components/admin/OrderControls";
import { CurriculumTreeViewer } from "@/components/admin/CurriculumTreeViewer";
import { Segmented } from "@/components/pouf/Segmented";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";
import imageCompression from "browser-image-compression";
import { getAssetUrl } from "@/lib/utils";

function SubTopicListView({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: (st: SubTopic) => void;
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopicId = searchParams.get("topicId") || "all";

  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "tree">("list");

  // Synchronize state if URL query changes
  useEffect(() => {
    const tid = searchParams.get("topicId");
    // eslint-disable-next-line react/set-state-in-effect
    if (tid) setSelectedTopicId(tid);
  }, [searchParams]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [stRes, tRes, mRes] = await Promise.all([
        adminApi.getSubTopics(undefined, 1000),
        adminApi.getTopics(1000),
        adminApi.getMaterials(),
      ]);
      setSubTopics(stRes.data?.subTopics || []);
      setTopics(tRes.data?.topics || []);
      setMaterials(mRes.data || []);
    } catch (err) {
      console.error("Gagal memuat subtopik:", err);
      toast.error("Gagal memuat daftar subtopik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    loadData();
  }, [loadData]);

  const topicMap = useMemo(() => {
    const map: Record<number, Topic> = {};
    topics.forEach((t) => {
      map[t.id] = t;
    });
    return map;
  }, [topics]);

  // Count materials per subtopic
  const materialCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    materials.forEach((m) => {
      counts[m.subTopicId] = (counts[m.subTopicId] || 0) + 1;
    });
    return counts;
  }, [materials]);

  const filteredSubTopics = useMemo(() => {
    return subTopics
      .filter((st) => {
        if (searchQuery && !st.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        if (selectedTopicId !== "all") {
          if (st.topicId !== parseInt(selectedTopicId, 10)) return false;
        }

        return true;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [subTopics, searchQuery, selectedTopicId]);

  const handleSwapOrder = async (st1: SubTopic, st2: SubTopic) => {
    try {
      await Promise.all([
        adminApi.updateSubTopic(st1.id, { order: st2.order }),
        adminApi.updateSubTopic(st2.id, { order: st1.order }),
      ]);
      toast.success("Urutan subtopik berhasil diperbarui");
      loadData();
    } catch (err) {
      console.error("Gagal mengubah urutan subtopik:", err);
      toast.error("Gagal mengubah urutan subtopik");
    }
  };

  const currentTopic = selectedTopicId !== "all" ? topicMap[parseInt(selectedTopicId, 10)] : null;

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Topik", href: "/admin/topics" },
          ...(currentTopic
            ? [{ label: currentTopic.name, href: `/admin/subtopics?topicId=${currentTopic.id}` }]
            : []),
          { label: "Kelola Subtopik" },
        ]}
      />

      <Row justify="between" align="top" className="flex-wrap gap-4">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>
            {currentTopic ? `Subtopik: ${currentTopic.name}` : "Kelola Subtopik"}
          </Heading>
          <Text muted>
            Klik pada subtopik untuk melihat materi di dalamnya. Klik 'Edit Subtopik' untuk mengubah
            nama/topik induk.
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
            <Icon name="wand" size="sm" /> Buat Subtopik Baru
          </Button>
        </Row>
      </Row>

      {viewMode === "tree" ? (
        <CurriculumTreeViewer />
      ) : (
        <>
          {/* Filter Bar */}
          <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
            <Grid cols={2} gap={4}>
              <Field label="Cari Subtopik">
                {() => (
                  <Input
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Ketik nama subtopik..."
                  />
                )}
              </Field>
              <Field label="Filter Berdasarkan Topik">
                {(id, desc) => (
                  <Select
                    id={id}
                    describedBy={desc}
                    value={selectedTopicId}
                    onChange={(val) => {
                      setSelectedTopicId(val);
                      if (val === "all") {
                        setSearchParams({});
                      } else {
                        setSearchParams({ topicId: val });
                      }
                    }}
                    options={[
                      { value: "all", label: "Semua Topik Induk" },
                      ...topics.map((t) => ({ value: t.id.toString(), label: t.name })),
                    ]}
                  />
                )}
              </Field>
            </Grid>
          </Card>

          <Stack gap={3}>
            {loading ? (
              <Text muted>Memuat daftar subtopik...</Text>
            ) : filteredSubTopics.length === 0 ? (
              <Card className="p-6 text-center">
                <Text muted>
                  {searchQuery || selectedTopicId !== "all"
                    ? "Tidak ada subtopik yang sesuai dengan pencarian."
                    : "Belum ada subtopik. Klik 'Buat Subtopik Baru' untuk memulai."}
                </Text>
              </Card>
            ) : (
              filteredSubTopics.map((st, index) => {
                const mCount = materialCounts[st.id] || 0;
                return (
                  <RowCard
                    key={st.id}
                    onClick={() => navigate(`/admin/materials?subTopicId=${st.id}`)}
                  >
                    <Row justify="between" align="center" wrap={false} className="w-full">
                      <Row gap={4} align="center" wrap={false} className="flex-1 min-w-0">
                        <Blob icon="calendar" tone="blue" size="sm" />
                        <Stack gap={1} className="flex-1 min-w-0">
                          <Row gap={2} align="center" className="flex-wrap">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                              Topik: {topicMap[st.topicId]?.name || `ID ${st.topicId}`}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[color-mix(in_srgb,var(--mint)_15%,transparent)] text-[var(--mint)] border border-[color-mix(in_srgb,var(--mint)_30%,transparent)]">
                              {mCount} Materi
                            </span>
                          </Row>
                          <Heading level={3} className="truncate">
                            {st.name}
                          </Heading>
                          {st.description && (
                            <Text size="sm" muted className="truncate">
                              {st.description}
                            </Text>
                          )}
                        </Stack>
                      </Row>

                      <Row gap={2} align="center" wrap={false}>
                        <OrderControls
                          order={st.order}
                          isFirst={index === 0}
                          isLast={index === filteredSubTopics.length - 1}
                          onMoveUp={() => handleSwapOrder(st, filteredSubTopics[index - 1])}
                          onMoveDown={() => handleSwapOrder(st, filteredSubTopics[index + 1])}
                        />
                        <Button
                          type="button"
                          size="sm"
                          tone="mint"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/materials?subTopicId=${st.id}&action=create`);
                          }}
                        >
                          <Icon name="add" size="sm" /> Materi
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="quiet"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(st);
                          }}
                        >
                          Edit Subtopik
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

function SubTopicFormView({
  subTopic,
  initialTopicId,
  onCancel,
  onSave,
}: {
  subTopic?: SubTopic | null;
  initialTopicId?: string;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [topicId, setTopicId] = useState(subTopic?.topicId?.toString() || initialTopicId || "");
  const [name, setName] = useState(subTopic?.name || "");
  const [slug, setSlug] = useState(subTopic?.slug || "");
  const [description, setDescription] = useState(subTopic?.description || "");
  const [thumbnail, setThumbnail] = useState(subTopic?.thumbnail || "");
  const [order, setOrder] = useState(subTopic?.order?.toString() || "1");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableTopics, setAvailableTopics] = useState<Topic[]>([]);

  useEffect(() => {
    adminApi.getTopics(1000).then((res) => {
      const topics = res.data?.topics || [];
      setAvailableTopics(topics);
      if (!topicId && topics.length > 0) {
        setTopicId(
          initialTopicId && topics.some((t) => t.id.toString() === initialTopicId)
            ? initialTopicId
            : topics[0].id.toString(),
        );
      }
    });
  }, [subTopic?.id, topicId, initialTopicId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const res = await adminApi.uploadFile(compressedFile);
      if (res.data?.url) {
        setThumbnail(res.data.url);
        toast.success("Gambar berhasil diunggah");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data = {
        topicId: parseInt(topicId, 10),
        name,
        slug,
        description,
        thumbnail,
        order: parseInt(order, 10),
      };

      if (subTopic) {
        await adminApi.updateSubTopic(subTopic.id, data);
        toast.success(`Subtopik "${name}" berhasil diperbarui`);
      } else {
        await adminApi.createSubTopic(data);
        toast.success(`Subtopik "${name}" berhasil dibuat`);
      }
      onSave();
    } catch (err: any) {
      console.error(err);
      const apiError = err.response?.data?.error;
      if (apiError?.name === "ZodError" && apiError?.message) {
        try {
          const parsed = JSON.parse(apiError.message);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const msg = parsed.map((p: any) => p.message).join(", ");
            setError(msg);
            toast.error(msg);
            return;
          }
        } catch {
          // fallback
        }
      }
      const msg = apiError?.message || err.message || "Gagal menyimpan subtopik";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!subTopic) return;
    setSaving(true);
    try {
      await adminApi.deleteSubTopic(subTopic.id);
      toast.success(`Subtopik "${subTopic.name}" berhasil dihapus`);
      onSave();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Gagal menghapus subtopik");
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Subtopik", onClick: onCancel },
          { label: subTopic ? subTopic.name : "Subtopik Baru" },
        ]}
      />

      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>{subTopic ? "Edit Subtopik" : "Subtopik Baru"}</Eyebrow>
          <Heading level={1}>{subTopic ? subTopic.name : "Buat Subtopik Baru"}</Heading>
        </Stack>
      </Row>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <Stack gap={4}>
            {error && (
              <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-3 rounded-lg font-bold text-sm">
                {error}
              </div>
            )}
            <Field label="Topik Induk">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={topicId}
                  onChange={setTopicId}
                  options={availableTopics.map((t) => ({
                    value: t.id.toString(),
                    label: t.name,
                  }))}
                />
              )}
            </Field>
            <Field label="Nama Subtopik">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={name}
                  onChange={(val) => {
                    setName(val);
                    if (!subTopic)
                      setSlug(
                        val
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, ""),
                      );
                  }}
                  placeholder="Contoh: Pecahan Senilai & Sederhana"
                  required
                />
              )}
            </Field>
            <Field label="Slug URL">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={slug}
                  onChange={setSlug}
                  required
                  placeholder="contoh: bilangan-pecahan-dasar"
                />
              )}
            </Field>
            <Field label="Deskripsi Subtopik">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={description}
                  onChange={setDescription}
                  placeholder="Penjelasan ringkas materi dalam subtopik ini..."
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
            <Field label="Gambar Thumbnail Subtopik">
              {(id, describedBy) => (
                <Stack gap={2}>
                  <input
                    type="file"
                    id={id}
                    aria-describedby={describedBy}
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <Text size="sm" muted>
                      Mengunggah dan mengompres gambar...
                    </Text>
                  )}
                  {thumbnail && (
                    <img
                      src={getAssetUrl(thumbnail)}
                      alt="Thumbnail preview"
                      className="max-w-[200px] rounded-lg border border-[var(--separator)] shadow-sm"
                    />
                  )}
                </Stack>
              )}
            </Field>

            <Row justify="between" gap={4} className="pt-4 border-t border-[var(--separator)]">
              <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
                Batal
              </Button>
              <Row gap={2}>
                {subTopic && (
                  <Confirm
                    title="Hapus Subtopik?"
                    body={`Apakah Anda yakin ingin menghapus subtopik "${subTopic.name}"?`}
                    confirmLabel="Hapus Subtopik"
                    cancelLabel="Pertahankan Subtopik"
                    onConfirm={handleDelete}
                    loading={saving}
                  >
                    <Button type="button" variant="quiet" tone="warn">
                      Hapus Subtopik
                    </Button>
                  </Confirm>
                )}
                <Button type="submit" tone="mint" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Subtopik"}
                </Button>
              </Row>
            </Row>
          </Stack>
        </Card>
      </form>
    </Stack>
  );
}

export default function AdminSubTopics() {
  useDocumentTitle("Kelola Subtopik");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAction = searchParams.get("action");
  const topicId = searchParams.get("topicId");

  const [view, setView] = useState<"list" | "create" | "edit">(
    initialAction === "create" ? "create" : "list",
  );
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);

  const handleFinish = () => {
    setView("list");
    // Clear action query param
    if (searchParams.get("action")) {
      searchParams.delete("action");
      setSearchParams(searchParams);
    }
  };

  if (view === "create") {
    return (
      <SubTopicFormView
        initialTopicId={topicId || undefined}
        onCancel={handleFinish}
        onSave={handleFinish}
      />
    );
  }

  if (view === "edit" && activeSubTopic) {
    return (
      <SubTopicFormView subTopic={activeSubTopic} onCancel={handleFinish} onSave={handleFinish} />
    );
  }

  return (
    <SubTopicListView
      onCreate={() => {
        setActiveSubTopic(null);
        setView("create");
      }}
      onEdit={(st) => {
        setActiveSubTopic(st);
        setView("edit");
      }}
    />
  );
}
