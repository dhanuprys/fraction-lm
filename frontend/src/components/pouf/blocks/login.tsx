import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../surface";
import { Stack, Row } from "../layout";
import { Heading, Text } from "../text";
import { Field, Input } from "../Input";
import { Button } from "../Button";
import logoRectangle from "@/assets/images/bg/logo-rectangle.webp";
import { Badge } from "../media";

export interface LoginValues {
  username: string;
  password: string;
}

const DEFAULT_VALUES: LoginValues = { username: "", password: "" };

interface LoginBlockProps {
  onLogin: (values: LoginValues) => Promise<void>;
}

export function LoginBlock({ onLogin }: LoginBlockProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const submit = handleSubmit(async (values, event) => {
    try {
      // Robust fallback: If an extension or browser translation caused React Hook Form's
      // state to desync, fall back to reading directly from the real DOM input elements.
      const form = event?.target as HTMLFormElement | undefined;
      const domUsername = (form?.elements.namedItem("username") as HTMLInputElement | null)?.value;
      const domPassword = (form?.elements.namedItem("password") as HTMLInputElement | null)?.value;

      const finalValues: LoginValues = {
        username: values.username || domUsername || "",
        password: values.password || domPassword || "",
      };

      await onLogin(finalValues);
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message ||
        (e.response?.status === 401
          ? "Username atau kata sandi salah. Silakan periksa kredensial Anda."
          : e.message || "Login gagal. Silakan periksa kredensial Anda.");
      setError("root", {
        message: errorMessage,
      });
    }
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: "24px 8vw",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <form
          onSubmit={submit}
          noValidate
          translate="no"
          className="notranslate"
        >
          <Card>
            <Stack gap={5}>
              <Stack gap={3}>
                <div className="flex flex-col items-center pb-8">
                  <img
                    src={logoRectangle}
                    alt="METADIA"
                    className="w-[60%] object-contain"
                  />
                  <Badge tone="purple" className="mt-2">BETA VERSION</Badge>
                </div>
                <Stack gap={1}>
                  <Heading level={2}>Selamat datang kembali</Heading>
                  <Text size="sm" muted>
                    Masuk ke akun pembelajaran Anda.
                  </Text>
                  {errors.root && (
                    <Text size="sm">
                      <span style={{ color: "var(--color-danger, red)" }}>
                        {errors.root.message}
                      </span>
                    </Text>
                  )}
                </Stack>
              </Stack>

              <Stack gap={4}>
                <Field label="Nama Pengguna" error={errors.username?.message}>
                  {(id, describedBy) => (
                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: "Nama pengguna wajib diisi." }}
                      render={({ field }) => (
                        <Input
                          ref={field.ref}
                          id={id}
                          name={field.name}
                          describedBy={describedBy}
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="student123"
                          autoComplete="username"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          translate="no"
                          data-enable-grammarly="false"
                          data-gramm="false"
                          data-lt-active="false"
                          required
                          invalid={!!errors.username}
                        />
                      )}
                    />
                  )}
                </Field>

                <Field label="Kata Sandi" error={errors.password?.message}>
                  {(id, describedBy) => (
                    <Row gap={2} wrap={false}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "Kata sandi wajib diisi.",
                            minLength: {
                              value: 4,
                              message: "Gunakan setidaknya 4 karakter.",
                            },
                          }}
                          render={({ field }) => (
                            <Input
                              ref={field.ref}
                              id={id}
                              name={field.name}
                              describedBy={describedBy}
                              type={showPassword ? "text" : "password"}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder="••••••••…"
                              autoComplete="current-password"
                              autoCapitalize="none"
                              autoCorrect="off"
                              spellCheck={false}
                              translate="no"
                              data-enable-grammarly="false"
                              data-gramm="false"
                              data-lt-active="false"
                              required
                              invalid={!!errors.password}
                            />
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="quiet"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? "Sembunyikan" : "Tampilkan"}
                      </Button>
                    </Row>
                  )}
                </Field>
                <Button
                  block
                  type="submit"
                  loading={isSubmitting}
                  translate="no"
                >
                  Masuk
                </Button>
              </Stack>
            </Stack>
          </Card>
        </form>
      </div>
    </div>
  );
}
