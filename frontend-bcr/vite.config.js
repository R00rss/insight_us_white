import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: 'localhost',
    // port: 443,
    port: 7003,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:2003",
        // target: "https://127.0.0.1:443",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
