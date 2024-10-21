-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'ACCESS');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('ACCESS', 'ROLE', 'USER', 'DEMO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "language" TEXT,
    "refreshToken" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedUserId" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedUserId" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleType" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedUserId" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedUserId" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "roleType" "Role" NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "accessType" "AccessType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedUserId" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedUserId" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleType_key" ON "UserRole"("userId", "roleType");

-- CreateIndex
CREATE UNIQUE INDEX "Access_roleType_resourceType_accessType_key" ON "Access"("roleType", "resourceType", "accessType");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
