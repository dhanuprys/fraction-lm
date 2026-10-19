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
import {
  DEFAULT_AI_MODEL,
  AI_MODEL_OPTIONS,
  getGlobalAiModelSelectOptions,
} from "@/config/ai.config";

export default function AdminSettings() {
  useDocumentTitle("Pengaturan");

  const [aiModel, setAiModel] = useState<string>(DEFAULT_AI_MODEL);
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

  const selectedModelMeta = AI_MODEL_OPTIONS.find((m) => m.value === aiModel);

  if (loading) {
    return <Text>Memuat...</Text>;
  }

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Pengaturan Aplikasi</Heading>
          <Text muted>Kelola konfigurasi sistem dan model AI global.</Text>
        </Stack>
      </Row>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Model AI Sistem (Global)</Heading>
          <Field
            label="Model Bahasa (LLM) Utama"
            hint="Model ini akan digunakan sebagai mesin tutor AI standar untuk semua siswa, kecuali akun yang memiliki pengaturan override khusus."
          >
            {(id, describedBy) => (
              <Select
                id={id}
                describedBy={describedBy}
                value={aiModel}
                onChange={setAiModel}
                options={getGlobalAiModelSelectOptions()}
              />
            )}
          </Field>

          {selectedModelMeta && (
            <div className="p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--separator)] text-sm">
              <Text size="sm" muted>
                <strong className="text-[var(--fg)] font-semibold">{selectedModelMeta.label}:</strong>{" "}
                {selectedModelMeta.description}
              </Text>
            </div>
          )}

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

