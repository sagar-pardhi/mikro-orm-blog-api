import { defineConfig } from "@mikro-orm/sqlite";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default defineConfig({
  dbName: "sqlite.db",
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["dist/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
});
