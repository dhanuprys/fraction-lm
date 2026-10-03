import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { SubTopic, Topic } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Select, Confirm } from "@/components/pouf/controls";
import imageCompression from "browser-image-compression";
import { getAssetUrl } from "@/lib/utils";

function SubTopicListView({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: (st: SubTopic) => void;
}) {
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [topics, setTopics] = useState<Record<number, string>>({});

  useEffect(() => {
    // Fetch both to map topic IDs to topic names
    Promise.all([adminApi.getSubTopics(), adminApi.getTopics()]).then(([stRes, tRes]) => {
      setSubTopics(stRes.data?.subTopics || []);
      const topicsMap: Record<number, string> = {};
      (tRes.data?.topics || []).forEach((t) => {
        topicsMap[t.id] = t.name;
      });
      setTopics(topicsMap);
    });
  }, []);

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Kelola Subtopik</Heading>
          <Text muted>Buat dan atur subtopik dalam topik.</Text>
        </Stack>
        <Button onClick={onCreate} tone="mint">
          Buat Subtopik
        </Button>
      </Row>
      <Stack gap={3}>
        {subTopics.length === 0 ? (
          <Text muted>Tidak ada subtopik. Buat satu untuk memulai.</Text>
        ) : (
          subTopics.map((st) => (
            <RowCard key={st.id} onClick={() => onEdit(st)}>
              <Row justify="between" wrap={false}>
                <Row gap={3} wrap={false}>
                  <Blob icon="calendar" tone="blue" size="sm" />
                  <Stack gap={1}>
                    <Text size="sm" muted>
                      Topik: {topics[st.topicId] || `ID ${st.topicId}`} · Urutan {st.order}
                    </Text>
                    <Heading level={3}>{st.name}</Heading>
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

function SubTopicFormView({
  subTopic,
  onCancel,
  onSave,
}: {
  subTopic?: SubTopic | null;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [topicId, setTopicId] = useState(subTopic?.topicId?.toString() || "");
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
        setTopicId(topics[0].id.toString());
      }
    });
  }, [subTopic?.id, topicId]);

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
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Gagal mengunggah gambar");
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
      } else {
        await adminApi.createSubTopic(data);
      }
      onSave();
    } catch (err: any) {
      console.error(err);
      const apiError = err.response?.data?.error;
      if (apiError?.name === "ZodError" && apiError?.message) {
        try {
          const parsed = JSON.parse(apiError.message);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setError(parsed.map((p: any) => p.message).join(", "));
            return;
          }
        } catch {
          // fallback
        }
      }
      setError(apiError?.message || err.message || "Gagal menyimpan subtopik");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!subTopic) return;
    setSaving(true);
    try {
      await adminApi.deleteSubTopic(subTopic.id);
      onSave();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Gagal menghapus subtopik");
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>{subTopic ? "Edit Subtopik" : "Subtopik Baru"}</Eyebrow>
          <Heading level={1}>{subTopic ? subTopic.name : "Buat Subtopik"}</Heading>
        </Stack>
      </Row>
      <form onSubmit={handleSubmit}>
        <Card>
          <Stack gap={4}>
            {error && (
              <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-3 rounded font-bold text-sm">
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
            <Field label="Deskripsi">
              {(id, describedBy) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  value={description}
                  onChange={setDescription}
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
            <Field label="Gambar Thumbnail">
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
                      Mengunggah dan mengompres...
                    </Text>
                  )}
                  {thumbnail && (
                    <img
                      src={getAssetUrl(thumbnail)}
                      alt="Thumbnail preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  )}
                </Stack>
              )}
            </Field>

            <Row justify="between" gap={4}>
              <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
                Batal
              </Button>
              <Row gap={2}>
                {subTopic && (
                  <Confirm
                    title="Hapus Subtopik?"
                    body={`Apakah Anda yakin ingin menghapus "${subTopic.name}"?`}
                    confirmLabel="Hapus Subtopik"
                    cancelLabel="Pertahankan Subtopik"
                    onConfirm={handleDelete}
                    loading={saving}
                  >
                    <Button type="button" variant="quiet" tone="warn">
                      Hapus
                    </Button>
                  </Confirm>
                )}
                <Button type="submit" tone="mint" disabled={saving}>
                  Simpan Subtopik
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
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(null);

  if (view === "create") {
    return <SubTopicFormView onCancel={() => setView("list")} onSave={() => setView("list")} />;
  }

  if (view === "edit" && activeSubTopic) {
    return (
      <SubTopicFormView
        subTopic={activeSubTopic}
        onCancel={() => setView("list")}
        onSave={() => setView("list")}
      />
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
