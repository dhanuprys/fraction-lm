import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { adminApi } from "@/lib/api/admin";
import { Heading, Text, Eyebrow } from "@/components/pouf/text";
import { Card } from "@/components/pouf/surface";
import { Stack, Row, Grid } from "@/components/pouf/layout";
import { Blob, Badge } from "@/components/pouf/media";

export default function AdminDashboard() {
  useDocumentTitle("Admin Dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTopics: 0,
    totalSubTopics: 0,
    totalMaterials: 0,
    totalQuestions: 0,
    systemHealth: 99.9,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getDashboardStats()
      .then((res) => {
        if (res.data) {
          setStats(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Stack gap={5}>
      <Row justify="between" align="top">
        <Stack gap={1}>
          <Eyebrow>Portal Admin</Eyebrow>
          <Heading level={1}>Ikhtisar Sistem</Heading>
          <Text muted>Statistik sekilas dan metrik aktivitas.</Text>
        </Stack>
        <Badge tone="purple">Aktif</Badge>
      </Row>

      <Grid cols={3} gap={4}>
        <Card>
          <Stack gap={3}>
            <Row justify="between" wrap={false}>
              <Text size="sm" muted>
                Total Pengguna
              </Text>
              <Blob icon="users" tone="blue" size="sm" />
            </Row>
            <Heading level={2}>{loading ? "-" : stats.totalUsers}</Heading>
            <Text size="sm" muted>
              Total akun terdaftar
            </Text>
          </Stack>
        </Card>

        <Card>
          <Stack gap={3}>
            <Row justify="between" wrap={false}>
              <Text size="sm" muted>
                Total Topik
              </Text>
              <Blob icon="wand" tone="yellow" size="sm" />
            </Row>
            <Heading level={2}>{loading ? "-" : stats.activeTopics}</Heading>
            <Text size="sm" muted>
              Dengan {stats.totalSubTopics} subtopik
            </Text>
          </Stack>
        </Card>

        <Card>
          <Stack gap={3}>
            <Row justify="between" wrap={false}>
              <Text size="sm" muted>
                Total Materi
              </Text>
              <Blob icon="activity" tone="pink" size="sm" />
            </Row>
            <Heading level={2}>{loading ? "-" : stats.totalMaterials}</Heading>
            <Text size="sm" muted>
              Tersedia untuk dipelajari
            </Text>
          </Stack>
        </Card>

        <Card>
          <Stack gap={3}>
            <Row justify="between" wrap={false}>
              <Text size="sm" muted>
                Bank Soal
              </Text>
              <Blob icon="target" tone="orange" size="sm" />
            </Row>
            <Heading level={2}>{loading ? "-" : stats.totalQuestions}</Heading>
            <Text size="sm" muted>
              Pertanyaan terdaftar
            </Text>
          </Stack>
        </Card>

        <Card>
          <Stack gap={3}>
            <Row justify="between" wrap={false}>
              <Text size="sm" muted>
                Kesehatan Sistem
              </Text>
              <Blob icon="ok" tone="mint" size="sm" />
            </Row>
            <Heading level={2}>{loading ? "-" : stats.systemHealth}%</Heading>
            <Text size="sm" muted>
              Semua layanan operasional
            </Text>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}
