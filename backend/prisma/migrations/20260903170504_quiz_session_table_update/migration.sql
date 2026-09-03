/*
  Warnings:

  - Added the required column `title` to the `QuizSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizSession" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled session';
