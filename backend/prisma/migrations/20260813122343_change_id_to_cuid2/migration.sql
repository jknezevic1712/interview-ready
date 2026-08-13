/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,questionId]` on the table `QuizResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuizResponse_sessionId_questionId_key" ON "QuizResponse"("sessionId", "questionId");
