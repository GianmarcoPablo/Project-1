-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "image_user" (
    "id" TEXT NOT NULL,
    "publicId" TEXT,
    "url" TEXT,
    "format" TEXT,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "bytes" DOUBLE PRECISION,
    "isAvatar" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_user_publicId_key" ON "image_user"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "image_user_userId_key" ON "image_user"("userId");

-- AddForeignKey
ALTER TABLE "image_user" ADD CONSTRAINT "image_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
