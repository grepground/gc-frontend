// src/app/news/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import ArticleDetailClient from "../_components/ArticleDetailClient";
import { getPageTitle, getSiteName } from "../../services/siteConfig";

// FIX: Force dynamic execution to completely bypass static route generation when slugs mutate layout hooks
export const dynamic = "force-dynamic";

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  claps: number;
  userId: number;
  createdAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostDetail(slug: string): Promise<Post | null> {
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  try {
    const res = await fetch(`${backendUrl}/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("SSR framework data layer failure:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) {
    return {
      title: getPageTitle("Article Not Found"),
    };
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const apiBase = backendUrl.replace("/api/v1", "");

  const coverSrc = post.coverImage
    ? `${apiBase}/images/news/${post.coverImage}`
    : `${apiBase}/images/news/default-cover.svg`;

  const cleanTitle = `${post.title.toLowerCase()} | ${getSiteName()}`;

  return {
    title: cleanTitle,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://grepground.org"}/news/${post.slug}`,
      siteName: getSiteName(),
      images: [
        {
          url: coverSrc,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [coverSrc],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) {
    notFound();
  }

  return <ArticleDetailClient initialPost={post} />;
}
