import { useState, useEffect, useMemo } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  adminApi,
  type ContentTreeTopic,
  type StudentLevelInfo,
  type StudentLevelOverride,
} from "@/lib/api/admin";
import type { User } from "@/types/api";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card, RowCard } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Button } from "@/components/pouf/Button";
import { Blob, Badge } from "@/components/pouf/media";
import { Field, Input } from "@/components/pouf/Input";
import { Select, Confirm } from "@/components/pouf/controls";
import { Checkbox } from "@/components/pouf/checkbox";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { toast } from "@/components/pouf/toaster";
import { Icon } from "@/components/pouf/Icon";

// ─── User List View ─────────────────────────────────────────────────────────

function UserListView({
  onCreate,
  onEditProfile,
  onEditLevel,
  onViewProgress,
  onBulkEdit,
}: {
  onCreate: () => void;
  onEditProfile: (u: User) => void;
  onEditLevel: (u: User) => void;
  onViewProgress: (u: User) => void;
  onBulkEdit: (userIds: number[]) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "student" | "admin">("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  const loadUsers = () => {
    setLoading(true);
    adminApi
      .getUsers()
      .then((res) => {
        setUsers(res.data?.users || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat daftar pengguna");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        roleFilter === "all" ? true : roleFilter === "admin" ? u.isAdmin : !u.isAdmin;
      const matchesGrade =
        gradeFilter === "all"
          ? true
          : u.grade?.toString() === gradeFilter;

      return matchesSearch && matchesRole && matchesGrade;
    });
  }, [users, searchQuery, roleFilter, gradeFilter]);

  // Statistics calculation
  const totalUsers = users.length;
  const totalStudents = useMemo(() => users.filter((u) => !u.isAdmin).length, [users]);
  const totalAdmins = useMemo(() => users.filter((u) => u.isAdmin).length, [users]);

  function handleToggleSelect(id: number, checked: boolean | "indeterminate") {
    const next = new Set(selectedIds);
    if (checked === true) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  }

  function handleSelectAll(checked: boolean | "indeterminate") {
    if (checked === true) {
      setSelectedIds(new Set(filteredUsers.map((s) => s.id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  const isSelectionMode = selectedIds.size > 0;

  return (
    <Stack gap={5}>
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Pengguna" },
          { label: "Kelola Akun & Level Siswa" },
        ]}
      />

      {/* Dynamic Header based on Selection State */}
      {isSelectionMode ? (
        <Card className="p-5 border-2 border-[var(--purple)] bg-[color-mix(in_srgb,var(--purple)_8%,transparent)]">
          <Row justify="between" align="center" className="flex-wrap gap-4">
            <Stack gap={1}>
              <Eyebrow>Tindakan Massal (Bulk Action)</Eyebrow>
              <Heading level={1}>{selectedIds.size} Siswa Dipilih</Heading>
            </Stack>
            <Row gap={3}>
              <Button onClick={() => setSelectedIds(new Set())} variant="quiet" tone="idle">
                Batalkan Pilihan
              </Button>
              <Button onClick={() => onBulkEdit(Array.from(selectedIds))} tone="purple">
                <Icon name="trophy" size="sm" /> Atur Level Checkpoint Massal
              </Button>
            </Row>
          </Row>
        </Card>
      ) : (
        <Row justify="between" align="top" className="flex-wrap gap-4">
          <Stack gap={1}>
            <Eyebrow>Portal Admin</Eyebrow>
            <Heading level={1}>Kelola Pengguna & Siswa</Heading>
            <Text muted>Atur akun pengguna, peran admin, checkpoint level, dan rapor progres belajar siswa.</Text>
          </Stack>
          <Button onClick={onCreate} tone="mint">
            <Icon name="add" size="sm" /> Buat Akun Pengguna
          </Button>
        </Row>
      )}

      {/* Quick Summary Metrics Bar */}
      <Grid cols={3} gap={4}>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="users" tone="blue" size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Total Pengguna
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {totalUsers}
              </Heading>
            </Stack>
          </Row>
        </Card>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="user" tone="mint" size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Total Siswa
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {totalStudents}
              </Heading>
            </Stack>
          </Row>
        </Card>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="user" tone="purple" size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Administrator
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {totalAdmins}
              </Heading>
            </Stack>
          </Row>
        </Card>
      </Grid>

      {/* Search & Filter Toolbar */}
      <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
        <Grid cols={3} gap={4}>
          <Field label="Cari Nama / Username">
            {() => (
              <Input
                placeholder="Ketik nama atau username..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            )}
          </Field>
          <Field label="Filter Peran">
            {(id, desc) => (
              <Select
                id={id}
                describedBy={desc}
                value={roleFilter}
                onChange={(val) => setRoleFilter(val as any)}
                options={[
                  { value: "all", label: "Semua Peran" },
                  { value: "student", label: "Siswa" },
                  { value: "admin", label: "Administrator" },
                ]}
              />
            )}
          </Field>
          <Field label="Filter Kelas">
            {(id, desc) => (
              <Select
                id={id}
                describedBy={desc}
                value={gradeFilter}
                onChange={setGradeFilter}
                options={[
                  { value: "all", label: "Semua Kelas" },
                  { value: "4", label: "Kelas 4" },
                  { value: "5", label: "Kelas 5" },
                  { value: "6", label: "Kelas 6" },
                ]}
              />
            )}
          </Field>
        </Grid>
      </Card>

      <Stack gap={3}>
        {/* Selection Header Bar */}
        <Row
          justify="between"
          align="center"
          className="px-2 pb-1 border-b border-[var(--separator)] gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            {filteredUsers.length > 0 && (
              <Checkbox
                id="selectAll"
                label="Pilih Semua"
                checked={selectedIds.size === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
              />
            )}
            <Text size="sm" muted>
              Menampilkan {filteredUsers.length} dari {users.length} pengguna
            </Text>
          </div>
        </Row>

        {/* User List Cards */}
        {loading ? (
          <Card className="text-center py-12">
            <Text muted>Memuat data pengguna...</Text>
          </Card>
        ) : users.length === 0 ? (
          <Card className="text-center py-12">
            <Stack gap={3} align="center">
              <Blob icon="users" tone="idle" size="lg" />
              <Text muted>Tidak ada pengguna. Buat pengguna pertama Anda.</Text>
              <Button onClick={onCreate} tone="mint">
                Buat Pengguna Baru
              </Button>
            </Stack>
          </Card>
        ) : filteredUsers.length === 0 ? (
          <Card className="text-center py-12">
            <Stack gap={3} align="center">
              <Text muted>Tidak ada pengguna yang cocok dengan kriteria pencarian.</Text>
            </Stack>
          </Card>
        ) : (
          <Stack gap={3}>
            {filteredUsers.map((user) => {
              const isSelected = selectedIds.has(user.id);
              return (
                <RowCard
                  key={user.id}
                  selected={isSelected}
                  onClick={() => (user.isAdmin ? onEditProfile(user) : onViewProgress(user))}
                >
                  <Row justify="between" align="center" className="w-full gap-4 flex-wrap">
                    <Row gap={4} align="center" className="flex-1 min-w-[240px]">
                      <div
                        className="flex items-center justify-center p-2 -ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelect(user.id, !isSelected);
                        }}
                      >
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={isSelected}
                          hideLabel
                          onChange={(c) => handleToggleSelect(user.id, c)}
                        />
                      </div>

                      <Row gap={3} align="center" className="flex-1 min-w-0">
                        <Blob
                          icon="user"
                          tone={user.isAdmin ? "purple" : "blue"}
                          size="sm"
                        />
                        <Stack gap={1} className="flex-1 min-w-0">
                          <Row gap={2} align="center" className="flex-wrap">
                            <Heading level={3} className="truncate font-bold">
                              {user.name}
                            </Heading>
                            <Badge tone={user.isAdmin ? "purple" : "idle"}>
                              {user.isAdmin ? "Admin" : "Siswa"}
                            </Badge>
                            {user.grade && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--separator)] text-[var(--fg-muted)]">
                                Kelas {user.grade}
                              </span>
                            )}
                          </Row>
                          <Text size="sm" muted className="truncate">
                            @{user.username}
                          </Text>
                        </Stack>
                      </Row>
                    </Row>

                    {/* Action Buttons Row - Always Visible & Operable */}
                    <Row gap={2} align="center" className="flex-wrap justify-end">
                      <Button
                        variant="solid"
                        tone="mint"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProgress(user);
                        }}
                      >
                        <Icon name="activity" size="sm" /> Lihat Rapor
                      </Button>
                      <Button
                        variant="quiet"
                        tone="yellow"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditLevel(user);
                        }}
                      >
                        <Icon name="trophy" size="sm" /> Atur Level
                      </Button>
                      <Button
                        variant="quiet"
                        tone="idle"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProfile(user);
                        }}
                      >
                        Edit Profil
                      </Button>
                    </Row>
                  </Row>
                </RowCard>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

// ─── Bulk Level Setter Component ────────────────────────────────────────────

function BulkLevelSetter({
  userIds,
  onCancel,
  onSave,
}: {
  userIds: number[];
  onCancel: () => void;
  onSave: () => void;
}) {
  const [tree, setTree] = useState<ContentTreeTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Cascade picker state
  const [selectedTopicId, setSelectedTopicId] = useState<number | "">("");
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | "">("");
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | "">("");

  useEffect(() => {
    adminApi
      .getContentTree()
      .then((res) => {
        setTree(res.data?.tree || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat struktur kurikulum");
      })
      .finally(() => setLoading(false));
  }, []);

  const selectedTopic = tree.find((t) => t.id === selectedTopicId);
  const subTopicOptions = selectedTopic?.subTopics || [];
  const selectedSubTopic = subTopicOptions.find((st) => st.id === selectedSubTopicId);
  const materialOptions = selectedSubTopic?.materials || [];

  function handleTopicChange(val: string) {
    setSelectedTopicId(val ? parseInt(val, 10) : "");
    setSelectedSubTopicId("");
    setSelectedMaterialId("");
    setFeedback(null);
  }

  function handleSubTopicChange(val: string) {
    setSelectedSubTopicId(val ? parseInt(val, 10) : "");
    setSelectedMaterialId("");
    setFeedback(null);
  }

  function handleMaterialChange(val: string) {
    setSelectedMaterialId(val ? parseInt(val, 10) : "");
    setFeedback(null);
  }

  async function handleSaveBulkLevel() {
    if (!selectedMaterialId) return;
    setSaving(true);
    setFeedback(null);
    try {
      await adminApi.setBulkStudentLevel(userIds, selectedMaterialId as number);
      toast.success(`Level massal berhasil diterapkan untuk ${userIds.length} siswa!`);
      onSave();
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengatur level massal.");
      setFeedback("Gagal mengatur level massal.");
      setSaving(false);
    }
  }

  async function handleClearBulkOverride() {
    setSaving(true);
    setFeedback(null);
    try {
      await adminApi.setBulkStudentLevel(userIds, null);
      toast.success(`Override level massal berhasil dihapus untuk ${userIds.length} siswa.`);
      onSave();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus override massal.");
      setFeedback("Gagal menghapus override massal.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <Text muted>Memuat antarmuka level massal...</Text>
      </Card>
    );
  }

  return (
    <Stack gap={5} className="max-w-4xl mx-auto w-full pt-4">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Pengguna", onClick: onCancel },
          { label: "Atur Level Massal" },
        ]}
      />

      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Tindakan Massal</Eyebrow>
          <Heading level={1}>Atur Level Checkpoint Massal</Heading>
          <Text muted>
            Anda akan mengatur checkpoint akses materi untuk{" "}
            <strong>{userIds.length} siswa terpilih</strong> sekaligus.
          </Text>
        </Stack>
      </Row>

      <Card className="p-6">
        <Stack gap={5}>
          <Row gap={3} align="center">
            <Blob icon="trophy" tone="purple" size="md" />
            <Stack gap={1}>
              <Heading level={2}>Tentukan Titik Akses (Checkpoint)</Heading>
              <Text size="sm" muted>
                Semua materi sebelum titik ini akan terbuka secara otomatis untuk siswa. Siswa yang
                progress organiknya sudah melampaui titik ini tidak akan ditarik mundur.
              </Text>
            </Stack>
          </Row>

          <div className="bg-[color-mix(in_srgb,var(--purple)_5%,transparent)] p-6 rounded-2xl border border-[color-mix(in_srgb,var(--purple)_10%,transparent)]">
            <Grid cols={3} gap={4}>
              <Field label="Topik">
                {(id) => (
                  <Select
                    id={id}
                    value={selectedTopicId.toString()}
                    onChange={handleTopicChange}
                    placeholder="-- Pilih Topik --"
                    options={tree.map((t) => ({
                      value: t.id.toString(),
                      label: t.name,
                    }))}
                  />
                )}
              </Field>

              <Field label="Subtopik">
                {(id) => (
                  <Select
                    id={id}
                    value={selectedSubTopicId.toString()}
                    onChange={handleSubTopicChange}
                    disabled={!selectedTopicId}
                    placeholder="-- Pilih Subtopik --"
                    options={subTopicOptions.map((st) => ({
                      value: st.id.toString(),
                      label: `${st.order}. ${st.name}`,
                    }))}
                  />
                )}
              </Field>

              <Field label="Materi Tertinggi (Checkpoint)">
                {(id) => (
                  <Select
                    id={id}
                    value={selectedMaterialId.toString()}
                    onChange={handleMaterialChange}
                    disabled={!selectedSubTopicId}
                    placeholder="-- Pilih Materi --"
                    options={materialOptions.map((m) => ({
                      value: m.id.toString(),
                      label: `${m.order}. ${m.title}`,
                    }))}
                  />
                )}
              </Field>
            </Grid>
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-xl text-sm font-medium border ${feedback.includes("berhasil") ? "text-[var(--mint)] bg-[color-mix(in_srgb,var(--mint)_10%,transparent)] border-[color-mix(in_srgb,var(--mint)_20%,transparent)]" : "text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_10%,transparent)] border-[color-mix(in_srgb,var(--warn)_20%,transparent)]"}`}
            >
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-[var(--separator)]">
            <Button type="button" variant="quiet" tone="idle" onClick={onCancel} disabled={saving}>
              Kembali
            </Button>
            <Row gap={3}>
              <Confirm
                title="Hapus Override Level Massal?"
                body={`Apakah Anda yakin ingin menghapus override level untuk ${userIds.length} siswa terpilih? Mereka akan kembali ke progress belajar organik.`}
                confirmLabel="Hapus Override Massal"
                cancelLabel="Batalkan"
                onConfirm={handleClearBulkOverride}
                loading={saving}
              >
                <Button type="button" variant="quiet" tone="warn" disabled={saving}>
                  Hapus Semua Override
                </Button>
              </Confirm>
              <Button
                type="button"
                tone="purple"
                onClick={handleSaveBulkLevel}
                disabled={saving || !selectedMaterialId}
              >
                {saving ? "Menyimpan..." : "Terapkan Level Massal"}
              </Button>
            </Row>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}

// ─── Single Level Setter Component ──────────────────────────────────────────

function LevelSetterView({ user, onCancel }: { user: User; onCancel: () => void }) {
  const [tree, setTree] = useState<ContentTreeTopic[]>([]);
  const [currentLevel, setCurrentLevel] = useState<StudentLevelInfo | null>(null);
  const [adminOverride, setAdminOverride] = useState<StudentLevelOverride | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [selectedTopicId, setSelectedTopicId] = useState<number | "">("");
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | "">("");
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | "">("");

  useEffect(() => {
    Promise.all([adminApi.getContentTree(), adminApi.getStudentLevel(user.id)])
      .then(([treeRes, levelRes]) => {
        setTree(treeRes.data?.tree || []);
        setCurrentLevel(levelRes.data?.currentLevel || null);
        const override = levelRes.data?.adminOverride || null;
        setAdminOverride(override);

        if (override) {
          setSelectedTopicId(override.topicId);
          setSelectedSubTopicId(override.subTopicId);
          setSelectedMaterialId(override.materialId);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat data level siswa");
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const selectedTopic = tree.find((t) => t.id === selectedTopicId);
  const subTopicOptions = selectedTopic?.subTopics || [];
  const selectedSubTopic = subTopicOptions.find((st) => st.id === selectedSubTopicId);
  const materialOptions = selectedSubTopic?.materials || [];

  function handleTopicChange(val: string) {
    setSelectedTopicId(val ? parseInt(val, 10) : "");
    setSelectedSubTopicId("");
    setSelectedMaterialId("");
    setFeedback(null);
  }

  function handleSubTopicChange(val: string) {
    setSelectedSubTopicId(val ? parseInt(val, 10) : "");
    setSelectedMaterialId("");
    setFeedback(null);
  }

  function handleMaterialChange(val: string) {
    setSelectedMaterialId(val ? parseInt(val, 10) : "");
    setFeedback(null);
  }

  async function handleSaveLevel() {
    if (!selectedMaterialId) return;
    setSaving(true);
    setFeedback(null);
    try {
      await adminApi.setStudentLevel(user.id, selectedMaterialId as number);
      const levelRes = await adminApi.getStudentLevel(user.id);
      setCurrentLevel(levelRes.data?.currentLevel || null);
      setAdminOverride(levelRes.data?.adminOverride || null);
      toast.success(`Level ${user.name} berhasil diperbarui!`);
      setFeedback("Level siswa berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui level siswa.");
      setFeedback("Gagal memperbarui level siswa.");
    } finally {
      setSaving(false);
    }
  }

  async function handleClearOverride() {
    setSaving(true);
    setFeedback(null);
    try {
      await adminApi.setStudentLevel(user.id, null);
      const levelRes = await adminApi.getStudentLevel(user.id);
      setCurrentLevel(levelRes.data?.currentLevel || null);
      setAdminOverride(levelRes.data?.adminOverride || null);
      setSelectedTopicId("");
      setSelectedSubTopicId("");
      setSelectedMaterialId("");
      toast.success("Override level berhasil dihapus.");
      setFeedback("Override level berhasil dihapus.");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus override level.");
      setFeedback("Gagal menghapus override level.");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <Card className="p-6 text-center">
        <Text muted>Memuat data level...</Text>
      </Card>
    );

  return (
    <Stack gap={6} className="max-w-5xl mx-auto w-full pt-4">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Pengguna", onClick: onCancel },
          { label: `Level: ${user.name}` },
        ]}
      />

      <Row justify="between" align="center">
        <Stack gap={1}>
          <Eyebrow>Profil Siswa</Eyebrow>
          <Heading level={1}>Pengaturan Level: {user.name}</Heading>
        </Stack>
        <Button variant="quiet" tone="idle" onClick={onCancel}>
          Kembali ke Daftar
        </Button>
      </Row>

      <Card className="p-6">
        <Stack gap={5}>
          <Row gap={3} align="center">
            <Blob icon="trophy" tone="yellow" size="md" />
            <Stack gap={1}>
              <Heading level={2}>Manajemen Level Akses</Heading>
              <Text size="sm" muted>
                Atur posisi belajar siswa (checkpoint) untuk membuka kunci materi secara berurutan.
              </Text>
            </Stack>
          </Row>

          <Grid cols={2} gap={4}>
            <div className="p-4 rounded-xl bg-[var(--surface-raised)] border border-[var(--separator)]">
              <Stack gap={1}>
                <Text size="sm" muted className="font-semibold">
                  Progress Aktif (Organik + Override)
                </Text>
                {currentLevel ? (
                  <Text>
                    <strong>{currentLevel.topicName}</strong>
                    {" › "}
                    <strong>{currentLevel.subTopicName}</strong>
                    {" › "}
                    {currentLevel.materialTitle}
                  </Text>
                ) : (
                  <Text muted>Belum ada progress.</Text>
                )}
              </Stack>
            </div>

            <div
              className={`p-4 rounded-xl ${adminOverride ? "bg-[color-mix(in_srgb,var(--purple)_8%,transparent)] border border-[color-mix(in_srgb,var(--purple)_20%,transparent)]" : "bg-[var(--surface-raised)] border border-[var(--separator)]"}`}
            >
              <Stack gap={1}>
                <Row justify="between" align="center">
                  <Text size="sm" muted className="font-semibold">
                    Override Admin
                  </Text>
                  {adminOverride && <Badge tone="purple">Aktif</Badge>}
                </Row>
                {adminOverride ? (
                  <>
                    <Text>
                      <strong>{adminOverride.topicName}</strong>
                      {" › "}
                      <strong>{adminOverride.subTopicName}</strong>
                      {" › "}
                      {adminOverride.materialTitle}
                    </Text>
                    <Text size="xs" muted className="mt-1">
                      Diatur pada {new Date(adminOverride.setAt).toLocaleDateString("id-ID")}
                    </Text>
                  </>
                ) : (
                  <Text muted>Tidak ada override aktif.</Text>
                )}
              </Stack>
            </div>
          </Grid>

          <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--separator)]">
            <Stack gap={4}>
              <Heading level={3}>Atur Checkpoint Baru</Heading>

              <Grid cols={3} gap={4}>
                <Field label="Topik">
                  {(id) => (
                    <Select
                      id={id}
                      value={selectedTopicId.toString()}
                      onChange={handleTopicChange}
                      placeholder="-- Pilih Topik --"
                      options={tree.map((t) => ({
                        value: t.id.toString(),
                        label: t.name,
                      }))}
                    />
                  )}
                </Field>
                <Field label="Subtopik">
                  {(id) => (
                    <Select
                      id={id}
                      value={selectedSubTopicId.toString()}
                      onChange={handleSubTopicChange}
                      disabled={!selectedTopicId}
                      placeholder="-- Pilih Subtopik --"
                      options={subTopicOptions.map((st) => ({
                        value: st.id.toString(),
                        label: `${st.order}. ${st.name}`,
                      }))}
                    />
                  )}
                </Field>
                <Field label="Materi Tertinggi">
                  {(id) => (
                    <Select
                      id={id}
                      value={selectedMaterialId.toString()}
                      onChange={handleMaterialChange}
                      disabled={!selectedSubTopicId}
                      placeholder="-- Pilih Materi --"
                      options={materialOptions.map((m) => ({
                        value: m.id.toString(),
                        label: `${m.order}. ${m.title}`,
                      }))}
                    />
                  )}
                </Field>
              </Grid>
            </Stack>
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-xl text-sm font-medium border ${feedback.includes("berhasil") ? "text-[var(--mint)] bg-[color-mix(in_srgb,var(--mint)_12%,transparent)] border-[color-mix(in_srgb,var(--mint)_20%,transparent)]" : "text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_12%,transparent)] border-[color-mix(in_srgb,var(--warn)_20%,transparent)]"}`}
            >
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[var(--separator)]">
            <div>
              {adminOverride && (
                <Confirm
                  title="Hapus Override Level?"
                  body={`Apakah Anda yakin ingin menghapus override level untuk ${user.name}? Siswa akan kembali ke progres belajar organik mereka.`}
                  confirmLabel="Hapus Override"
                  cancelLabel="Pertahankan"
                  onConfirm={handleClearOverride}
                  loading={saving}
                >
                  <Button type="button" variant="quiet" tone="warn" disabled={saving}>
                    Hapus Override
                  </Button>
                </Confirm>
              )}
            </div>
            <Row gap={3}>
              <Button
                type="button"
                variant="quiet"
                tone="idle"
                onClick={onCancel}
                disabled={saving}
              >
                Selesai
              </Button>
              <Button
                type="button"
                tone="purple"
                onClick={handleSaveLevel}
                disabled={saving || !selectedMaterialId}
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan Level"}
              </Button>
            </Row>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}

// ─── User Form View (Create/Edit Profile) ───────────────────────────────────

function UserFormView({
  user,
  onCancel,
  onSave,
}: {
  user?: User | null;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState(user?.grade?.toString() || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data: any = { username, name, isAdmin };
      if (grade) data.grade = parseInt(grade, 10);
      if (password) data.password = password;

      if (user) {
        await adminApi.updateUser(user.id, data);
        toast.success(`Profil ${name} berhasil diperbarui`);
      } else {
        if (!password) {
          const msg = "Kata sandi wajib untuk pengguna baru";
          setError(msg);
          toast.error(msg);
          setSaving(false);
          return;
        }
        await adminApi.createUser(data);
        toast.success(`Akun ${name} berhasil dibuat`);
      }
      onSave();
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      const msg = apiError?.message || err.message || "Gagal menyimpan pengguna";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!user) return;
    setSaving(true);
    try {
      await adminApi.deleteUser(user.id);
      toast.success(`Akun "${user.name}" berhasil dihapus`);
      onSave();
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal menghapus pengguna");
      setSaving(false);
    }
  }

  return (
    <Stack gap={6} className="max-w-5xl mx-auto w-full pt-4">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Pengguna", onClick: onCancel },
          { label: user ? user.name : "Pengguna Baru" },
        ]}
      />

      <Row justify="between" align="center">
        <Stack gap={1}>
          <Eyebrow>{user ? "Edit Pengguna" : "Pengguna Baru"}</Eyebrow>
          <Heading level={1}>{user ? user.name : "Buat Akun Pengguna"}</Heading>
        </Stack>
        <Button variant="quiet" tone="idle" onClick={onCancel}>
          Kembali ke Daftar
        </Button>
      </Row>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <Stack gap={5}>
            <Row gap={3} align="center">
              <Blob icon="user" tone={isAdmin ? "purple" : "blue"} size="md" />
              <Heading level={2}>Informasi Profil</Heading>
            </Row>

            {error && (
              <div className="text-[var(--warn)] bg-[color-mix(in_srgb,var(--warn)_15%,transparent)] p-4 rounded-xl border border-[color-mix(in_srgb,var(--warn)_20%,transparent)] font-medium text-sm">
                {error}
              </div>
            )}

            <Grid cols={2} gap={5}>
              <Field label="Nama Pengguna (Username)">
                {(id, desc) => (
                  <Input
                    id={id}
                    aria-describedby={desc}
                    value={username}
                    onChange={setUsername}
                    placeholder="Contoh: siswa_budi"
                    required
                  />
                )}
              </Field>
              <Field label="Nama Lengkap">
                {(id, desc) => (
                  <Input
                    id={id}
                    aria-describedby={desc}
                    value={name}
                    onChange={setName}
                    placeholder="Contoh: Budi Santoso"
                    required
                  />
                )}
              </Field>
            </Grid>

            <Grid cols={2} gap={5}>
              <Field
                label={
                  user ? "Kata Sandi (Kosongkan jika tidak ingin diubah)" : "Kata Sandi (Wajib)"
                }
              >
                {(id, desc) => (
                  <Input
                    id={id}
                    type="password"
                    aria-describedby={desc}
                    value={password}
                    onChange={setPassword}
                    placeholder="******"
                    required={!user}
                  />
                )}
              </Field>
              <Field label="Kelas (Opsional)">
                {(id, desc) => (
                  <Input
                    id={id}
                    type="number"
                    min="1"
                    max="12"
                    aria-describedby={desc}
                    value={grade}
                    onChange={setGrade}
                    placeholder="Contoh: 4"
                  />
                )}
              </Field>
            </Grid>

            <div className="p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--separator)]">
              <Row gap={3} align="center" justify="between">
                <Stack gap={1}>
                  <Text className="font-bold">Hak Akses Administrator</Text>
                  <Text size="sm" muted>
                    Admin memiliki kontrol penuh atas materi, topik, dan pengguna sistem lainnya.
                  </Text>
                </Stack>
                <Checkbox
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(c) => setIsAdmin(c === true)}
                  hideLabel
                  label="Adalah Admin"
                />
              </Row>
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[var(--separator)]">
              <div>
                {user && (
                  <Confirm
                    title="Hapus Pengguna?"
                    body={`Apakah Anda yakin ingin menghapus akun "${user.name}" secara permanen? Semua data progress belajar juga akan terhapus.`}
                    confirmLabel="Hapus Akun"
                    cancelLabel="Batalkan"
                    onConfirm={handleDelete}
                    loading={saving}
                  >
                    <Button type="button" variant="quiet" tone="warn" disabled={saving}>
                      Hapus Akun
                    </Button>
                  </Confirm>
                )}
              </div>
              <Row gap={3}>
                <Button type="button" variant="quiet" tone="idle" onClick={onCancel}>
                  Batal
                </Button>
                <Button type="submit" tone="mint" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Profil"}
                </Button>
              </Row>
            </div>
          </Stack>
        </Card>
      </form>
    </Stack>
  );
}

// ─── Student Progress View ───────────────────────────────────────────────────

function StudentProgressView({ user, onCancel }: { user: User; onCancel: () => void }) {
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState<ContentTreeTopic[]>([]);
  const [mProgress, setMProgress] = useState<any[]>([]);
  const [qProgress, setQProgress] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([adminApi.getContentTree(), adminApi.getStudentProgress(user.id)])
      .then(([treeRes, progRes]) => {
        setTree(treeRes.data?.tree || []);
        setMProgress(progRes.data?.materialProgresses || []);
        setQProgress(progRes.data?.questionProgresses || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat rapor progres siswa");
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <Text muted>Memuat data rapor...</Text>
      </Card>
    );
  }

  // Summary Metrics
  const completedMaterialsCount = mProgress.filter((mp) => mp.status === "COMPLETED").length;
  const passedQuestionsCount = qProgress.filter((qp) => qp.isPassed).length;
  const teacherInterventionsCount = qProgress.filter((qp) => qp.needsTeacherIntervention).length;

  // Group questions by material
  const materialsMap = new Map();
  mProgress.forEach((mp) => {
    materialsMap.set(mp.materialId, { ...mp, questions: [] });
  });

  qProgress.forEach((qp) => {
    if (qp.question?.materialId) {
      if (!materialsMap.has(qp.question.materialId)) {
        materialsMap.set(qp.question.materialId, {
          materialId: qp.question.materialId,
          material: qp.question.material,
          questions: [],
        });
      }
      materialsMap.get(qp.question.materialId).questions.push(qp);
    }
  });

  const renderedTopics = tree
    .map((topic) => {
      const renderedSubTopics = topic.subTopics
        .map((subTopic) => {
          const materialsWithProgress = (subTopic.materials || [])
            .filter((m: any) => materialsMap.has(m.id))
            .map((m: any) => ({
              ...materialsMap.get(m.id),
              material: m, // Override with tree material for title/order
            }));

          if (materialsWithProgress.length === 0) return null;

          return (
            <div key={subTopic.id} className="pl-2">
              <Heading level={3} className="mb-4 text-[var(--muted)]">
                {subTopic.name}
              </Heading>
              <Stack gap={3}>
                {materialsWithProgress.map((mp: any) => (
                  <div
                    key={mp.id || `mat-${mp.materialId}`}
                    className="p-4 rounded-xl border border-[var(--separator)] bg-[var(--surface-raised)]"
                  >
                    <Row justify="between" align="center" className="mb-3 flex-wrap gap-2">
                      <Row gap={3} align="center">
                        <Blob
                          icon={mp.status === "COMPLETED" ? "ok" : "live"}
                          tone={mp.status === "COMPLETED" ? "mint" : "blue"}
                          size="sm"
                        />
                        <Stack gap={0}>
                          <Text className="font-bold">
                            {mp.material?.title || `Materi ID ${mp.materialId}`}
                          </Text>
                          <Text size="sm" muted>
                            {mp.status === "COMPLETED" ? "Selesai" : "Sedang Dikerjakan"} • Skor:{" "}
                            {mp.totalScore || 0}
                          </Text>
                        </Stack>
                      </Row>
                      {mp.startedAt && (
                        <Text size="sm" muted>
                          {new Date(mp.startedAt).toLocaleDateString("id-ID")}
                        </Text>
                      )}
                    </Row>

                    {mp.questions && mp.questions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--separator)]">
                        <Stack gap={1}>
                          {mp.questions.map((qp: any, idx: number) => (
                            <Row
                              key={qp.id}
                              justify="between"
                              align="center"
                              className="text-sm px-2 py-2 hover:bg-[var(--surface-sunken)] rounded transition-colors flex-wrap gap-2"
                            >
                              <Row gap={4} align="center">
                                <Text className="w-28 font-medium">
                                  Soal #{idx + 1}
                                </Text>
                                <Badge
                                  tone={
                                    qp.isPassed
                                      ? "mint"
                                      : qp.needsTeacherIntervention
                                        ? "orange"
                                        : "idle"
                                  }
                                >
                                  {qp.isPassed
                                    ? "Lulus"
                                    : qp.needsTeacherIntervention
                                      ? "Butuh Bantuan Guru"
                                      : "Belum Lulus"}
                                </Badge>
                              </Row>
                              <Row gap={5} className="text-[var(--fg-muted)]">
                                <span>Percobaan: {qp.attemptCount}</span>
                                <span>Hint: {qp.hintsUsed}</span>
                                <span className="font-bold text-[var(--fg)]">
                                  Skor: {qp.masteryScore}
                                </span>
                              </Row>
                            </Row>
                          ))}
                        </Stack>
                      </div>
                    )}
                  </div>
                ))}
              </Stack>
            </div>
          );
        })
        .filter(Boolean);

      if (renderedSubTopics.length === 0) return null;

      return (
        <Card key={topic.id} className="p-0 overflow-hidden">
          <div className="bg-[var(--surface-sunken)] p-4 border-b border-[var(--separator)]">
            <Heading level={2}>{topic.name}</Heading>
          </div>
          <div className="p-4">
            <Stack gap={6}>{renderedSubTopics}</Stack>
          </div>
        </Card>
      );
    })
    .filter(Boolean);

  return (
    <Stack gap={6} className="max-w-5xl mx-auto w-full pt-4">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Kelola Pengguna", onClick: onCancel },
          { label: `Rapor: ${user.name}` },
        ]}
      />

      <Row justify="between" align="center">
        <Stack gap={1}>
          <Eyebrow>Rapor Siswa</Eyebrow>
          <Heading level={1}>Progres Belajar: {user.name}</Heading>
        </Stack>
        <Button variant="quiet" tone="idle" onClick={onCancel}>
          Kembali ke Daftar
        </Button>
      </Row>

      {/* Rapor Overview Metric Cards */}
      <Grid cols={3} gap={4}>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="ok" tone="mint" size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Materi Selesai
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {completedMaterialsCount} Materi
              </Heading>
            </Stack>
          </Row>
        </Card>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="trophy" tone="yellow" size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Soal Lulus
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {passedQuestionsCount} Soal
              </Heading>
            </Stack>
          </Row>
        </Card>
        <Card className="p-4 bg-[var(--surface-sunken)] border border-[var(--separator)]">
          <Row gap={3} align="center">
            <Blob icon="warn" tone={teacherInterventionsCount > 0 ? "orange" : "idle"} size="sm" />
            <Stack gap={0}>
              <Text size="xs" muted className="font-semibold uppercase tracking-wider">
                Bantuan Guru
              </Text>
              <Heading level={2} className="text-xl font-bold">
                {teacherInterventionsCount} Soal
              </Heading>
            </Stack>
          </Row>
        </Card>
      </Grid>

      {renderedTopics.length === 0 ? (
        <Card className="text-center py-12">
          <Stack gap={3} align="center">
            <Blob icon="activity" tone="idle" size="lg" />
            <Text muted>Siswa ini belum memulai materi pembelajaran apapun.</Text>
          </Stack>
        </Card>
      ) : (
        <Stack gap={6}>{renderedTopics}</Stack>
      )}
    </Stack>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

type ViewState = "list" | "create" | "edit-profile" | "edit-level" | "bulk-level" | "view-progress";

export default function AdminUsers() {
  useDocumentTitle("Kelola Pengguna");
  const [view, setView] = useState<ViewState>("list");
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [bulkUserIds, setBulkUserIds] = useState<number[]>([]);

  if (view === "create") {
    return <UserFormView onCancel={() => setView("list")} onSave={() => setView("list")} />;
  }

  if (view === "edit-profile" && activeUser) {
    return (
      <UserFormView
        user={activeUser}
        onCancel={() => setView("list")}
        onSave={() => setView("list")}
      />
    );
  }

  if (view === "edit-level" && activeUser) {
    return <LevelSetterView user={activeUser} onCancel={() => setView("list")} />;
  }

  if (view === "view-progress" && activeUser) {
    return <StudentProgressView user={activeUser} onCancel={() => setView("list")} />;
  }

  if (view === "bulk-level") {
    return (
      <BulkLevelSetter
        userIds={bulkUserIds}
        onCancel={() => setView("list")}
        onSave={() => {
          setView("list");
          setTimeout(() => setBulkUserIds([]), 100);
        }}
      />
    );
  }

  return (
    <UserListView
      onCreate={() => setView("list")}
      onEditProfile={(u) => {
        setActiveUser(u);
        setView("edit-profile");
      }}
      onEditLevel={(u) => {
        setActiveUser(u);
        setView("edit-level");
      }}
      onViewProgress={(u) => {
        setActiveUser(u);
        setView("view-progress");
      }}
      onBulkEdit={(ids) => {
        setBulkUserIds(ids);
        setView("bulk-level");
      }}
    />
  );
}
