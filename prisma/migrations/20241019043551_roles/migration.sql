-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE', 'CUSTOMER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[],
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
