-- CreateTable
CREATE TABLE "FrReq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" TEXT NOT NULL,
    "client_brand" TEXT NOT NULL,
    "freighter_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL,
    "ati" TEXT NOT NULL
);
