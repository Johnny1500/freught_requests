-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FrReq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_brand" TEXT NOT NULL,
    "freighter_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'новая',
    "ati" TEXT NOT NULL
);
INSERT INTO "new_FrReq" ("ati", "client_brand", "comment", "freighter_name", "id", "phone", "status", "timestamp") SELECT "ati", "client_brand", "comment", "freighter_name", "id", "phone", "status", "timestamp" FROM "FrReq";
DROP TABLE "FrReq";
ALTER TABLE "new_FrReq" RENAME TO "FrReq";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
