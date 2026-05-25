import React from "react";
import Container from "../Container/Container";
import { API_BASE_URL } from "@/app/config/api";
import FlashDealClient from "./FlashDealClient";

type RecommendationStyle = "old_style" | "style_1" | "style_2";

async function getFlashCollection(): Promise<{
  data: any[];
  style: RecommendationStyle;
  styleOneBackground: {
    color: string;
    image: string | null;
    textColor: string;
  };
}> {
  const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: [], style: "style_1", styleOneBackground: { color: "#ffffff", image: null, textColor: "#20232d" } };
  }

  const data: any = await response.json();

  return {
    data: data?.data ?? [],
    style: data?.style === "style_2" ? "style_2" : data?.style === "old_style" ? "old_style" : "style_1",
    styleOneBackground: {
      color: data?.style_1_background?.color || "#ffffff",
      image: data?.style_1_background?.image || null,
      textColor: data?.style_1_background?.text_color || "#20232d",
    },
  };
}

type Props = {
  styleOverride?: RecommendationStyle;
};

export default async function FlashDeal({ styleOverride }: Props = {}) {
  const collection = await getFlashCollection();

  if (!collection.data.length) {
    return null;
  }

  return (
    <section className="home-section">
      <Container>
        <FlashDealClient
          items={collection.data}
          style={styleOverride ?? collection.style}
          styleOneBackground={collection.styleOneBackground}
        />
      </Container>
    </section>
  );
}
