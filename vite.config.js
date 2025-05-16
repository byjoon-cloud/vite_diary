import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
      sourcemap: true,
      minify: false,
    },
  };

  // 개발 환경에서는 base를 '/'로, 프로덕션에서는 '/vite_diary/'로 설정
  if (command === "build") {
    config.base = "/vite_diary/";
  } else {
    config.base = "/";
  }

  return config;
});
