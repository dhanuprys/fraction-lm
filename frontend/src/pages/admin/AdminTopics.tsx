import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import type { Topic } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Confirm } from "@/components/pouf/controls";
import imageCompression from "browser-image-compression";
import { getAssetUrl } from "@/lib/utils";

function TopicListView({ onCreate, onEdit }: { onCreate: () => void; onEdit: (t: Topic) => void }) {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    adminApi.getTopics().then((res) => {
      setTopics(res.data?.topics || []);
    });
  }, []);

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Kelola Topik</Heading>
          <Text muted>Buat dan atur topik kurikulum.</Text>
        </Stack>
        <Button onClick={onCreate} tone="mint">
          Buat Topik
        </Button>
      </Row>
      <Stack gap={3}>
        {topics.length === 0 ? (
          <Text muted>Tidak ada topik. Buat satu untuk memulai.</Text>
        ) : (
          topics.map((topic) => (
            <RowCard key={topic.id} onClick={() => onEdit(topic)}>
              <Row justify="between" wrap={false}>
                <Row gap={3} wrap={false}>
                  <Blob icon="wand" tone="yellow" size="sm" />
                  <Stack gap={1}>
                    <Text size="sm" muted>
                      Urutan {topic.order}
                    </Text>
                    <Heading level={3}>{topic.name}</Heading>
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
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengunggah gambar");
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
      } else {
        await adminApi.createTopic(data);
      }
      onSave();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan topik");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!topic) return;
    setSaving(true);
    try {
      await adminApi.deleteTopic(topic.id);
      onSave();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus topik");
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>{topic ? "Edit Topik" : "Topik Baru"}</Eyebrow>
          <Heading level={1}>{topic ? topic.name : "Buat Topik"}</Heading>
        </Stack>
      </Row>
      <form onSubmit={handleSubmit}>
        <Card>
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
            <Grid cols={1} gap={4}>
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
            </Grid>

            <Row justify="between" gap={4}>
              <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
                Batal
              </Button>
              <Row gap={2}>
                {topic && (
                  <Confirm
                    title="Hapus Topik?"
                    body={`Apakah Anda yakin ingin menghapus "${topic.name}"?`}
                    confirmLabel="Hapus Topik"
                    cancelLabel="Pertahankan Topik"
                    onConfirm={handleDelete}
                    loading={saving}
                  >
                    <Button type="button" variant="quiet" tone="down">
                      Hapus
                    </Button>
                  </Confirm>
                )}
                <Button type="submit" tone="mint" disabled={saving}>
                  Simpan Topik
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
