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

  // 1. Create categories and build a slug -> real ID map
  console.log("Creating categories...");
  const categoryIdBySlug: Record<string, string> = {};

  for (const category of categoriesData) {
    const created = await prisma.category.create({ data: category });
    categoryIdBySlug[created.slug] = created.id;
  }

  // 2. Read products from mapped_products.json
  const productsFilePath = path.join(process.cwd(), "mapped_products.json");
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

  // 3. Create products, resolving categoryId from the slug map
  console.log(`Creating ${productsData.length} products...`);
  for (const product of productsData) {
    const resolvedCategoryId = categoryIdBySlug[product.categoryId];

    if (!resolvedCategoryId) {
      throw new Error(
        `Category slug "${product.categoryId}" not found for product "${product.name}". ` +
          `Make sure it's listed in categoriesData.`,
      );
    }

    await prisma.product.create({
      data: {
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
