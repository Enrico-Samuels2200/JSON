-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
