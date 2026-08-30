"use client";

interface MarkdownRenderProps {
  source: string; // The property string accepting clean HTML rich text payloads
}

export default function MarkdownRender({ source }: MarkdownRenderProps) {
  const injectBackendImagePaths = (htmlContent: string) => {
    if (!htmlContent) return "";

    // Dynamic resolution matching our explicit backend storage targets safely
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const apiBase = backendUrl.replace("/api/v1", "");

    // Safely replaces raw local image names with full external asset urls
    return htmlContent.replace(
      /src=["'](news-[^"']+)["']/g,
      `src="${apiBase}/images/news/$1"`,
    );
  };

  return (
    <div
      // FIX: Upgraded layout scale to text-lg and amplified spacing parameters to optimize comfortable reading
      className="normal-case tracking-normal leading-relaxed text-lg font-bold prose max-w-none bg-transparent text-chess-text
                 [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-6 [&_p]:opacity-90
                 [&_h3]:text-2xl [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:text-chess-text [&_h3]:mt-8 [&_h3]:mb-4
                 [&_img]:w-full [&_img]:h-auto [&_img]:block [&_img]:rounded-xl [&_img]:border [&_img]:border-chess-border [&_img]:my-8
                 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:opacity-90
                 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:opacity-90
                 [&_li]:mb-2"
      dangerouslySetInnerHTML={{ __html: injectBackendImagePaths(source) }}
    />
  );
}
