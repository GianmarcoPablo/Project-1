/*
  Warnings:

  - You are about to drop the column `filename` on the `Curriculum` table. All the data in the column will be lost.
  - You are about to drop the column `filetype` on the `Curriculum` table. All the data in the column will be lost.
  - You are about to drop the column `fileurl` on the `Curriculum` table. All the data in the column will be lost.
  - Added the required column `bytes` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curriculum" DROP COLUMN "filename",
DROP COLUMN "filetype",
DROP COLUMN "fileurl",
ADD COLUMN     "bytes" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
