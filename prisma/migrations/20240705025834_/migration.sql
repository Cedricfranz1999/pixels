-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_checkoutId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "checkoutId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
