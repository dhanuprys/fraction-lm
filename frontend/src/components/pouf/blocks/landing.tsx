import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { CTA } from "../cta";
import { Card } from "../surface";
import { Stack, Row, Grid } from "../layout";
import { Heading, Text, Eyebrow, Highlight } from "../text";
import { Button } from "../Button";
import { Blob, Badge } from "../media";
import { useAuthStore } from "@/store/useAuthStore";
import logoRectangle from "@/assets/images/bg/logo-rectangle.png";

const brand = (
  <div className="flex items-center">
    <img src={logoRectangle} alt="METADIA" className="h-8 w-auto object-contain" />
  </div>
);

const FEATURES = [
  {
    icon: "sparkle",
    tone: "yellow",
    title: "Belajar Menyenangkan",
    body: "Belajar pecahan matematika kini lebih seru dengan ilustrasi dan materi interaktif.",
  },
  {
    icon: "activity",
    tone: "purple",
    title: "Koreksi AI Otomatis",
    body: "Sistem AI akan mengoreksi jawaban secara otomatis dan memberikan penjelasan langkah-demi-langkah.",
  },
  {
    icon: "target",
    tone: "mint",
    title: "Pantau Perkembangan",
    body: "Lihat perkembangan pemahaman dan hasil evaluasi siswa secara langsung.",
  },
] as const;

/** A complete marketing route for METADIA. */
export function LandingBlock() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const user = useAuthStore((s) => s.user);

  const handleAction = () => {
    if (isAuthenticated) {
      navigate(user?.isAdmin ? "/admin" : "/student");
    } else {
      navigate("/login");
    }
  };

  function scrollTo(id: string) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="max-w-[1120px] mx-auto p-(--s5) max-[620px]:p-(--s3)">
      <Stack gap={6}>
        <Navbar
          brand={brand}
          links={[
            { label: "Fitur", href: "#features", active: true },
            { label: "Cara Kerja", href: "#how-it-works" },
          ]}
          actions={
            <Button size="sm" onClick={handleAction}>
              {isAuthenticated ? "Dashboard" : "Masuk"}
            </Button>
          }
        />

        <Grid cols="sidebar" gap={5}>
          <Stack gap={4}>
            <Badge tone="yellow">Kini Hadir untuk Siswa Sekolah Dasar</Badge>
            <Heading level={1}>
              Belajar Pecahan Lebih <Highlight>Mudah & Menyenangkan</Highlight>.
            </Heading>
            <Text muted>
              Platform pembelajaran cerdas dengan teknologi AI yang membantu siswa SD memahami
              konsep matematika pecahan secara interaktif.
            </Text>
            <Row gap={2}>
              <Button size="lg" onClick={handleAction}>
                {isAuthenticated ? "Ke Dashboard Anda" : "Mulai Belajar Sekarang"}
              </Button>
              <Button size="lg" variant="quiet" onClick={() => scrollTo("features")}>
                Pelajari Fitur
              </Button>
            </Row>
            <Text size="sm" muted>
              Belajar mandiri dengan bimbingan kecerdasan buatan kapan saja, di mana saja.
            </Text>
          </Stack>

          <Card>
            <Stack gap={4}>
              <Row justify="between">
                <Stack gap={1}>
                  <Eyebrow>Simulasi Latihan</Eyebrow>
                  <Heading level={3}>Penjumlahan Pecahan</Heading>
                </Stack>
                <Badge tone="mint">Selesai</Badge>
              </Row>
              <Grid cols={1}>
                <Stack gap={2}>
                  <Text size="sm" muted>
                    Pertanyaan:
                  </Text>
                  <Text className="font-bold text-lg" style={{ color: "var(--ink)" }}>
                    Berapa hasil dari 1/2 + 1/4 ?
                  </Text>
                </Stack>
                <Stack gap={2} className="mt-2">
                  <Text size="sm" muted>
                    Jawaban Siswa:
                  </Text>
                  <Row gap={2} wrap={false} align="center">
                    <Text className="font-bold text-lg" style={{ color: "var(--ink)" }}>
                      3/4
                    </Text>
                    <Blob icon="ok" tone="mint" size="sm" />
                  </Row>
                </Stack>
              </Grid>
              <div className="p-3 bg-[var(--purple)] bg-opacity-10 rounded-xl mt-2 border border-[var(--purple)] border-opacity-20">
                <Row gap={2} wrap={false}>
                  <Blob icon="sparkle" tone="purple" size="sm" />
                  <Text size="sm">
                    <strong>Tanggapan AI:</strong> Hebat! Kamu sudah benar menyamakan penyebut
                    menjadi 4 (2/4 + 1/4) sebelum menjumlahkannya.
                  </Text>
                </Row>
              </div>
            </Stack>
          </Card>
        </Grid>

        <section id="features">
          <Stack gap={4}>
            <Stack gap={1}>
              <Eyebrow>Fitur Unggulan</Eyebrow>
              <Heading level={2}>Mengapa Memilih METADIA?</Heading>
              <Text muted>
                Dirancang untuk memandu anak belajar secara mandiri tanpa rasa bosan.
              </Text>
            </Stack>
            <Grid cols={3}>
              {FEATURES.map((f, index) => (
                <Card key={f.title} motion={index % 2 === 0 ? "tilt-left" : "tilt-right"}>
                  <Stack gap={3}>
                    <Blob icon={f.icon as any} tone={f.tone as any} />
                    <Heading level={3}>{f.title}</Heading>
                    <Text size="sm" muted>
                      {f.body}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </section>

        <section id="how-it-works">
          <Card>
            <Grid cols="sidebar">
              <Stack gap={3}>
                <Eyebrow>Cara Kerja</Eyebrow>
                <Heading level={2}>Belajar dalam 3 Langkah Mudah.</Heading>
                <Text muted>
                  Sistem kami memadukan materi terstruktur dengan latihan evaluasi interaktif yang
                  didukung kecerdasan buatan.
                </Text>
                <Text size="sm" muted>
                  Materi terstruktur · Umpan balik AI secara instan
                </Text>
              </Stack>
              <Stack gap={4}>
                <Row gap={3} wrap={false} align="top">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--blue)] text-[var(--on-accent)] font-bold flex items-center justify-center mt-1">
                    1
                  </div>
                  <Stack gap={1}>
                    <Heading level={3}>Pelajari Materi Topik</Heading>
                    <Text size="sm" muted>
                      Pahami konsep dasar pecahan melalui materi bacaan yang dirancang khusus dan
                      mudah dipahami.
                    </Text>
                  </Stack>
                </Row>
                <Row gap={3} wrap={false} align="top">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--yellow)] text-[var(--on-accent)] font-bold flex items-center justify-center mt-1">
                    2
                  </div>
                  <Stack gap={1}>
                    <Heading level={3}>Kerjakan Latihan Mandiri</Heading>
                    <Text size="sm" muted>
                      Uji pemahaman dengan menyelesaikan soal essay dan latihan matematika di setiap
                      akhir subtopik.
                    </Text>
                  </Stack>
                </Row>
                <Row gap={3} wrap={false} align="top">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--mint)] text-[var(--on-accent)] font-bold flex items-center justify-center mt-1">
                    3
                  </div>
                  <Stack gap={1}>
                    <Heading level={3}>Dapatkan Penilaian AI</Heading>
                    <Text size="sm" muted>
                      AI memberikan nilai instan, penjelasan cara menjawab yang benar, dan
                      menunjukkan letak kesalahan jawaban.
                    </Text>
                  </Stack>
                </Row>
              </Stack>
            </Grid>
          </Card>
        </section>

        <CTA
          tone="purple"
          title="Mulai Petualangan Belajar!"
          description="Daftarkan akun dan tingkatkan kemampuan matematika Anda hari ini."
          action={
            <>
              <Button size="lg" onClick={handleAction}>
                {isAuthenticated ? "Ke Dashboard" : "Masuk ke Akun"}
              </Button>
            </>
          }
        />

        <Footer
          brand={brand}
          tagline="Platform pembelajaran masa depan."
          columns={[
            {
              title: "Produk",
              links: [
                { label: "Fitur", href: "#features" },
                { label: "Cara Kerja", href: "#how-it-works" },
              ],
            },
            {
              title: "Perusahaan",
              links: [
                { label: "Tentang", href: "#" },
                { label: "Kontak", href: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privasi", href: "#" },
                { label: "Ketentuan", href: "#" },
              ],
            },
          ]}
          note="© 2026 METADIA. Platform pembelajaran interaktif."
        />
      </Stack>
    </div>
  );
}
