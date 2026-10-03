import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row } from "@/components/pouf/layout";
import { Select } from "@/components/pouf/controls";
import { Button } from "@/components/pouf/Button";
import { Field } from "@/components/pouf/Input";
import { toast } from "@/components/pouf/toaster";

const AVAILABLE_AI_MODELS = [
  "deepseek-chat",
  "deepseek-v4-flash",
  "deepseek-v4.1-flash",
  "deepseek-v4-pro",
];

export default function AdminSettings() {
  useDocumentTitle("Pengaturan");

  const [aiModel, setAiModel] = useState("deepseek-v4-flash");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getSettings()
      .then((res) => {
        if (res.data?.ai_model) {
          setAiModel(res.data.ai_model);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat pengaturan", err);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await adminApi.updateSetting({ key: "ai_model", value: aiModel });
      toast.success("Pengaturan berhasil disimpan");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Text>Memuat...</Text>;
  }

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Pengaturan Aplikasi</Heading>
          <Text muted>Kelola konfigurasi sistem dan model AI.</Text>
        </Stack>
      </Row>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Model AI</Heading>
          <Field label="Model Bahasa (LLM)">
            {(id, describedBy) => (
              <Select
                id={id}
                describedBy={describedBy}
                value={aiModel}
                onChange={setAiModel}
                options={AVAILABLE_AI_MODELS.map((model) => ({
                  value: model,
                  label: model,
                }))}
              />
            )}
          </Field>

          <Row justify="end">
            <Button onClick={handleSave} tone="mint" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </Row>
        </Stack>
      </Card>
    </Stack>
  );
}
