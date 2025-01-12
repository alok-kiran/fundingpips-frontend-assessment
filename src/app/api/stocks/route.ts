import db from '@/data/db.json';

export async function GET(request: Request) {
   const url = new URL(request.url);
   const page = parseInt(url.searchParams.get('page') || '1', 10);
   const limit = parseInt(url.searchParams.get('limit') || '10', 10);
   const startIndex = (page - 1) * limit;
   const endIndex = startIndex + limit;

   const paginatedData = db.data.slice(startIndex, endIndex);
   const totalPage = Math.ceil(db.data.length / limit);

   return new Response(JSON.stringify({ paginatedData, totalPage }), {
      headers: { 'Content-Type': 'application/json' }
   });
}