import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@libs": `${path.resolve(__dirname, "./src/libs/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
    },
  },
  server: {
    port: 7999
  }
})
