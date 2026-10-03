import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../surface";
import { Stack, Row } from "../layout";
import { Heading, Text } from "../text";
import { Field, Input } from "../Input";
import { Button } from "../Button";
import logoRectangle from "@/assets/images/bg/logo-rectangle.png";

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

  const submit = handleSubmit(async (values) => {
    try {
      await onLogin(values);
    } catch (e: any) {
      setError("root", {
        message: e.message || "Login gagal. Silakan periksa kredensial Anda.",
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
        <form onSubmit={submit} noValidate>
          <Card>
            <Stack gap={5}>
              <Stack gap={3}>
                <img src={logoRectangle} alt="METADIA" className="h-18 w-auto object-contain" />
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
                          spellCheck={false}
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
                <Button block type="submit" loading={isSubmitting}>
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
