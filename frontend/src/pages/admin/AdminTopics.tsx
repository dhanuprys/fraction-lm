import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { Topic, SubTopic } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Confirm } from "@/components/pouf/controls";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { OrderControls } from "@/components/admin/OrderControls";
import { CurriculumTreeViewer } from "@/components/admin/CurriculumTreeViewer";
import { Segmented } from "@/components/pouf/Segmented";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";
import imageCompression from "browser-image-compression";
import { getAssetUrl } from "@/lib/utils";

function TopicListView({ onCreate, onEdit }: { onCreate: () => void; onEdit: (t: Topic) => void }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "tree">("list");

  const loadTopics = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, stRes] = await Promise.all([
        adminApi.getTopics(1000),
        adminApi.getSubTopics(undefined, 1000),
      ]);
      setTopics(tRes.data?.topics || []);
      setSubTopics(stRes.data?.subTopics || []);
    } catch (err) {
      console.error("Gagal memuat topik:", err);
      toast.error("Gagal memuat daftar topik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    loadTopics();
  }, [loadTopics]);

  // Count subtopics per topic
  const subTopicCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    subTopics.forEach((st) => {
      counts[st.topicId] = (counts[st.topicId] || 0) + 1;
    });
    return counts;
  }, [subTopics]);

  const filteredTopics = useMemo(() => {
    return topics
      .filter((t) =>
        searchQuery ? t.name.toLowerCase().includes(searchQuery.toLowerCase()) : true,
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [topics, searchQuery]);

  const handleSwapOrder = async (t1: Topic, t2: Topic) => {
    try {
      await Promise.all([
        adminApi.updateTopic(t1.id, { order: t2.order }),
        adminApi.updateTopic(t2.id, { order: t1.order }),
      ]);
      toast.success("Urutan topik berhasil diperbarui");
      // eslint-disable-next-line react/set-state-in-effect
    loadTopics();
    } catch (err) {
      console.error("Gagal mengubah urutan topik:", err);
      toast.error("Gagal mengubah urutan topik");
    }
  };

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kurikulum" },
          { label: "Kelola Topik" },
        ]}
      />

      <Row justify="between" align="top" className="flex-wrap gap-4">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Kelola Topik Kurikulum</Heading>
          <Text muted>
            Klik pada kartu topik untuk melihat subtopik di dalamnya. Klik tombol 'Edit Topik' untuk
            mengubah nama/slug topik.
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
            <Icon name="wand" size="sm" /> Buat Topik Baru
          </Button>
        </Row>
      </Row>

      {viewMode === "tree" ? (
        <CurriculumTreeViewer />
      ) : (
        <>
          {/* Filter Bar */}
          <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
            <Field label="Cari Topik">
              {() => (
                <Input
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Ketik nama topik..."
                />
              )}
            </Field>
          </Card>

          <Stack gap={3}>
            {loading ? (
              <Text muted>Memuat daftar topik...</Text>
            ) : filteredTopics.length === 0 ? (
              <Card className="p-6 text-center">
                <Text muted>
                  {searchQuery
                    ? "Tidak ada topik yang sesuai dengan kata kunci pencarian."
                    : "Belum ada topik. Klik 'Buat Topik Baru' untuk memulai."}
                </Text>
              </Card>
            ) : (
              filteredTopics.map((topic, index) => {
                const stCount = subTopicCounts[topic.id] || 0;
                return (
                  <RowCard
                    key={topic.id}
                    onClick={() => navigate(`/admin/subtopics?topicId=${topic.id}`)}
                  >
                    <Row justify="between" align="center" wrap={false} className="w-full">
                      <Row gap={4} align="center" wrap={false} className="flex-1 min-w-0">
                        <Blob icon="wand" tone="yellow" size="sm" />
                        <Stack gap={1} className="flex-1 min-w-0">
                          <Row gap={2} align="center" className="flex-wrap">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                              Slug: {topic.slug}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[color-mix(in_srgb,var(--mint)_15%,transparent)] text-[var(--mint)] border border-[color-mix(in_srgb,var(--mint)_30%,transparent)]">
                              {stCount} Subtopik
                            </span>
                          </Row>
                          <Heading level={3} className="truncate">
                            {topic.name}
                          </Heading>
                          {topic.description && (
                            <Text size="sm" muted className="truncate">
                              {topic.description}
                            </Text>
                          )}
                        </Stack>
                      </Row>

                      <Row gap={2} align="center" wrap={false}>
                        <OrderControls
                          order={topic.order}
                          isFirst={index === 0}
                          isLast={index === filteredTopics.length - 1}
                          onMoveUp={() => handleSwapOrder(topic, filteredTopics[index - 1])}
                          onMoveDown={() => handleSwapOrder(topic, filteredTopics[index + 1])}
                        />
                        <Button
                          type="button"
                          size="sm"
                          tone="mint"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/subtopics?topicId=${topic.id}&action=create`);
                          }}
                        >
                          <Icon name="add" size="sm" /> Subtopik
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="quiet"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(topic);
                          }}
                        >
                          Edit Topik
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

function TopicFormView({
  topic,
  onCancel,
  onSave,
}: {
  topic?: Topic | null;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(topic?.name || "");
  const [slug, setSlug] = useState(topic?.slug || "");
  const [description, setDescription] = useState(topic?.description || "");
  const [thumbnail, setThumbnail] = useState(topic?.thumbnail || "");
  const [order, setOrder] = useState(topic?.order?.toString() || "1");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        name,
        slug,
        description,
        thumbnail,
        order: parseInt(order, 10),
      };

      if (topic) {
        await adminApi.updateTopic(topic.id, data);
        toast.success(`Topik "${name}" berhasil diperbarui`);
      } else {
        await adminApi.createTopic(data);
        toast.success(`Topik "${name}" berhasil dibuat`);
      }
      onSave();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan topik");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!topic) return;
    setSaving(true);
    try {
      await adminApi.deleteTopic(topic.id);
      toast.success(`Topik "${topic.name}" berhasil dihapus`);
      onSave();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus topik");
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Topik", onClick: onCancel },
          { label: topic ? topic.name : "Topik Baru" },
        ]}
      />

      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>{topic ? "Edit Topik" : "Topik Baru"}</Eyebrow>
          <Heading level={1}>{topic ? topic.name : "Buat Topik Baru"}</Heading>
        </Stack>
      </Row>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <Stack gap={4}>
            <Field label="Nama Topik">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={name}
                  onChange={(val) => {
                    setName(val);
                    if (!topic)
                      setSlug(
                        val
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, ""),
                      );
                  }}
                  placeholder="Contoh: Bilangan Pecahan"
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
                  placeholder="contoh: bilangan-pecahan"
                />
              )}
            </Field>
            <Field label="Deskripsi Topik">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={description}
                  onChange={setDescription}
                  placeholder="Ringkasan cakupan topik ini..."
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
            <Field label="Gambar Thumbnail Topik">
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
                {topic && (
                  <Confirm
                    title="Hapus Topik?"
                    body={`Apakah Anda yakin ingin menghapus topik "${topic.name}"?`}
                    confirmLabel="Hapus Topik"
                    cancelLabel="Pertahankan Topik"
                    onConfirm={handleDelete}
                    loading={saving}
                  >
                    <Button type="button" variant="quiet" tone="warn">
                      Hapus
                    </Button>
                  </Confirm>
                )}
                <Button type="submit" tone="mint" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Topik"}
                </Button>
              </Row>
            </Row>
          </Stack>
        </Card>
      </form>
    </Stack>
  );
}

export default function AdminTopics() {
  useDocumentTitle("Kelola Topik");
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  if (view === "create") {
    return <TopicFormView onCancel={() => setView("list")} onSave={() => setView("list")} />;
  }

  if (view === "edit") {
    return (
      <TopicFormView
        topic={activeTopic}
        onCancel={() => setView("list")}
        onSave={() => setView("list")}
      />
    );
  }

  return (
    <TopicListView
      onCreate={() => setView("create")}
      onEdit={(t) => {
        setActiveTopic(t);
        setView("edit");
      }}
    />
  );
}
