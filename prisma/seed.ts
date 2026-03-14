import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import fs from "fs";
import path from "path";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const categoriesData: Prisma.CategoryCreateInput[] = [
  { name: "Beauty", slug: "beauty" },
  { name: "Fragrances", slug: "fragrances" },
  { name: "Furniture", slug: "furniture" },
  { name: "Groceries", slug: "groceries" },
];

async function main() {
  console.log("Seeding database...");

  // 1. Upsert categories and build a slug -> real ID map
  console.log("Upserting categories...");
  const categoryIdBySlug: Record<string, string> = {};

  for (const category of categoriesData) {
    const upserted = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
    categoryIdBySlug[upserted.slug] = upserted.id;
  }

  // 2. Read products from mapped_products.json
  const productsFilePath = path.join(process.cwd(), "mapped_products.json");
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

  // 3. Upsert products, resolving categoryId from the slug map
  console.log(`Upserting ${productsData.length} products...`);
  for (const product of productsData) {
    const resolvedCategoryId = categoryIdBySlug[product.categoryId];

    if (!resolvedCategoryId) {
      throw new Error(
        `Category slug "${product.categoryId}" not found for product "${product.name}". ` +
          `Make sure it's listed in categoriesData.`,
      );
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        featured: product.featured,
        categoryId: resolvedCategoryId,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        featured: product.featured,
        categoryId: resolvedCategoryId,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
