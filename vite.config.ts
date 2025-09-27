export default defineConfig({
  base: "/", // 👈 isso resolve no domínio customizado
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
