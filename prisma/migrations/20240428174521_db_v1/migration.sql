/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "menu" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "prepare_type" TEXT NOT NULL,
    "on_promo" BOOLEAN NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "category" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "order" (
    "_id" UUID NOT NULL,
    "order_number" INTEGER NOT NULL,
    "order_date" TEXT NOT NULL,
    "delivery_time" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "payment_token" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,
    "delivery_address" TEXT NOT NULL,
    "delivery_fee" DOUBLE PRECISION NOT NULL,
    "service_fee" DOUBLE PRECISION NOT NULL,
    "note" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "_id" UUID NOT NULL,
    "user_email" TEXT NOT NULL,
    "favorites" TEXT[],

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_address_key" ON "users"("email_address");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
