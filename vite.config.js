import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
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

  // 배포 환경에 따라 base 설정
  if (mode === "github") {
    // GitHub Pages 배포 시
    config.base = command === "build" ? "/vite_diary/" : "/";
  } else {
    // Vercel 배포 시
    config.base = "/";
  }

  return config;
});
