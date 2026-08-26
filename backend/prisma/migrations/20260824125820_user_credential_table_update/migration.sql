/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerUserId]` on the table `UserCredential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,provider]` on the table `UserCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCredential_provider_providerUserId_key" ON "UserCredential"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredential_userId_provider_key" ON "UserCredential"("userId", "provider");
