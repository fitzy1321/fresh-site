import { Github } from "./Github.tsx";
import { FlexRowCenter } from "./Flex.tsx";

export function Footer(
  props: { copyrightName: string; githubProjectUrl: string },
) {
  return (
    <footer>
      <FlexRowCenter class="w-full my-4 gap-2">
        <p>&copy; 2023 {props.copyrightName}</p>
        <p>•</p>
        <Github class="h-5 w-5" to={props.githubProjectUrl}>Source</Github>
        <p>•</p>
        <a
          href="https://fresh.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="197"
            height="37"
            src="/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
      </FlexRowCenter>
    </footer>
  );
}
