import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  isMyBlog: boolean;
  isLinkEnabled: boolean;
}

export function PublicationsCard({
  title,
  description,
  tags,
  link,
  isMyBlog,
  isLinkEnabled,
}: Props) {
  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden p-6",
        "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
        "hover:border-foreground/25 hover:bg-muted/35 hover:shadow-sm",
        "dark:hover:bg-muted/25",
      )}
    >
      <CardHeader className="p-0">
        <div className="space-y-2">
          <CardTitle className="font-serif text-base font-semibold leading-snug">
            {link ? (
              <a
                href={link}
                target={isMyBlog ? "_self" : "_blank"}
                rel={isMyBlog ? undefined : "noreferrer"}
                className={cn(
                  "rounded-sm transition-colors duration-150",
                  "underline-offset-4 decoration-foreground/25 hover:underline hover:decoration-foreground",
                )}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="hidden font-serif text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <CardDescription className="font-serif text-xs leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex p-0 pt-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              className="font-normal normal-case tracking-normal"
              variant="outline"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
