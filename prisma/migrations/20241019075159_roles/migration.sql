/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];

-- DropTable
DROP TABLE "UserRole";
