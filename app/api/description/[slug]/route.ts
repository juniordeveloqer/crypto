import { NextResponse } from "next/server";

const API_KEY = process.env.OPENSEA_API_KEY;

if (!API_KEY) {
  throw new Error("API Key is missing!");
}

const fetchOptions: RequestInit = {
  method: "GET",
  headers: {
    "X-API-KEY": API_KEY,
    Accept: "application/json",
  },
};

export async function getCollectionItems(collectionName: string) {
  const res = await fetch(
    `https://api.opensea.io/api/v2/collections/${collectionName}`,
    {
      ...fetchOptions,
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("API Error Response:", errorData);
    throw new Error("Failed to fetch collection info");
  }

  const data = await res.json();
  console.log("API Response:", data); // Yanıtı konsola yazdır

  // Description kontrolü
  const description = data?.description;
  if (description) {
    return description; // Açıklama mevcutsa döndür
  } else {
    return "No description available for this collection."; // Açıklama yoksa mesaj döndür
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  try {
    const description = await getCollectionItems(slug);
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Error fetching description:", error);
    return NextResponse.json(
      { error: "Error fetching description." },
      { status: 500 },
    );
  }
}
