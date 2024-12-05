import { categories } from "@/app/assets/data";

export async function GET() {
  return new Response(JSON.stringify(categories));
}
