import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { Footer } from "./Footer.tsx";
import { ComponentChildren } from "preact";

export function Layout(props: {
  copyrightName?: string;
  description: string;
  githubProjectUrl: string;
  ogImage: string;
  title: string;
  children: ComponentChildren;
}) {
  return (
    <html class="dark">
      <Head>
        {/* Primary Meta Tags */}
        <title>{props.title}</title>
        <meta name="title" content={props.title} />
        <meta name="description" content={props.description} />
        {/* Theme */}
        <meta name="theme-color" content="#000" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />

        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        {/* <meta property="og:image" content={settings.ogImage} /> */}
        <meta
          property="og:url"
          content={`https://jfitzy.deno.dev/${
            IS_BROWSER ? window.location.pathname : ""
          }`}
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props.title} />
        <meta property="twitter:description" content={props.description} />
        <meta property="twitter:image" content={props.ogImage} />
      </Head>
      <body class="dark:bg-black dark:text-white font-sans leading-normal tracking-normal">
        <div
          class="min-h-screen grid grid-cols-1 bg-default text-gray-300"
          style="grid-template-rows: auto 1fr auto;"
        >
          {props.children}
          <Footer
            copyrightName={props.copyrightName || ""}
            githubProjectUrl={props.githubProjectUrl}
          />
        </div>
      </body>
    </html>
  );
}
