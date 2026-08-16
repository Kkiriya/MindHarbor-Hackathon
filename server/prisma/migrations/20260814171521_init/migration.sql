-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR', 'USER');

-- CreateEnum
CREATE TYPE "UserVisibilityLevel" AS ENUM ('PUBLIC', 'GROUPES_SEULEMENT', 'PRIVE');

-- CreateEnum
CREATE TYPE "UserPrivateMessageLevel" AS ENUM ('PERSONNE', 'MEMBRES_DE_MES_GROUPES', 'TOUT_LE_MONDE');

-- CreateEnum
CREATE TYPE "ResourceCategory" AS ENUM ('ANXIETY', 'SLEEP', 'RELATIONSHIP', 'WORK', 'GRIEF');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('ARTICLE', 'EXERCICE', 'FICHE_PRATIQUE', 'LIEN_EXTERNE');

-- CreateEnum
CREATE TYPE "GroupVisibility" AS ENUM ('PUBLIC', 'PRIVE');

-- CreateEnum
CREATE TYPE "GroupRequestStatus" AS ENUM ('EN_ATTENTE', 'ACCEPTEE', 'REFUSEE');

-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MODERATEUR', 'MEMBRE', 'NON_MEMBRE');

-- CreateEnum
CREATE TYPE "MessageReadReceipt" AS ENUM ('SENT', 'READ');

-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('INAPPROPRIE', 'SPAM', 'INQUIETANT');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('EN_ATTENTE', 'EN_COURS_DE_REVISION', 'RESOLUE', 'REJETEE');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarPictureUrl" TEXT,
    "bio" TEXT,
    "visibilityLevel" "UserVisibilityLevel" NOT NULL DEFAULT 'PRIVE',
    "privateMessageLevel" "UserPrivateMessageLevel" NOT NULL DEFAULT 'MEMBRES_DE_MES_GROUPES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Resource" (
    "resourceId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ResourceCategory" NOT NULL,
    "type" "ResourceType" NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("resourceId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "journalId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "generalMood" INTEGER NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "stressLevel" INTEGER NOT NULL,
    "keyEvents" INTEGER NOT NULL,
    "dailyGratitude" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("journalId")
);

-- CreateTable
CREATE TABLE "JournalActivity" (
    "journalId" UUID NOT NULL,
    "activityId" UUID NOT NULL,

    CONSTRAINT "JournalActivity_pkey" PRIMARY KEY ("journalId","activityId")
);

-- CreateTable
CREATE TABLE "Group" (
    "groupId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "visibility" "GroupVisibility" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "userId" UUID NOT NULL,
    "groupId" UUID NOT NULL,
    "role" "GroupRole" NOT NULL DEFAULT 'NON_MEMBRE',
    "requestStatus" "GroupRequestStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" UUID NOT NULL,
    "userId" UUID,
    "groupId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" UUID NOT NULL,
    "userId" UUID,
    "postId" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" UUID NOT NULL,
    "senderId" UUID,
    "recipientId" UUID,
    "message" TEXT NOT NULL,
    "readReceipt" "MessageReadReceipt" NOT NULL DEFAULT 'SENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Report" (
    "reportId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "userId" UUID,
    "category" "ReportCategory" NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "refreshTokenId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("refreshTokenId")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "UserId" UUID NOT NULL,
    "resourceId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("UserId","resourceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_createdAt_key" ON "JournalEntry"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "JournalEntry"("journalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("resourceId") ON DELETE CASCADE ON UPDATE CASCADE;
