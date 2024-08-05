/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Curriculum` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_userId_key" ON "Curriculum"("userId");
