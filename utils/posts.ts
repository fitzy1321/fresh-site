import { extract } from "$std/front_matter/yaml.ts";
import { settings } from "./constants.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
}

export async function loadPost(slug: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(
      `${settings.blogPostsPath}/${decodeURIComponent(slug)}.md`,
    );
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  try {
    const { attrs, body } = extract(text);
    const params = attrs as Record<string, string>;
    return {
      slug,
      title: params.title,
      publishedAt: new Date(params.published_at),
      content: body,
      snippet: params.snippet,
    };
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir(settings.blogPostsPath)) {
    const slug = entry.name.replace(".md", "");
    promises.push(loadPost(slug));
  }
  // wait for all promises to resolve, remove nulls, and cast as appropriate object
  const posts = (await Promise.all(promises)).filter((x) =>
    x !== null
  ) as Post[];

  // sort all posts by datetime
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
