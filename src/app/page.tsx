import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { PublicationsCard } from "@/components/publications-card";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        "font-sans text-[10px] font-bold uppercase tracking-[0.28em]",
        "text-muted-foreground",
      )}
    >
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <main className="relative mx-auto w-full max-w-layout scroll-my-12 px-4 pb-10 print:p-8 sm:px-6 md:px-10 md:pb-12 lg:px-14">
      <section className="w-full space-y-10 bg-background print:space-y-8 md:space-y-11">
        <header
          className={cn(
            "sticky top-0 z-40 border-b border-border bg-background pb-12 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-sm md:pb-16",
            "print:static print:shadow-none",
          )}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
            <div className="min-w-0 flex-1 space-y-6 md:space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/"
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-foreground hover:opacity-70"
                >
                  {RESUME_DATA.name.replace(/ /g, "\u00a0")}
                </Link>
                <div className="flex items-center gap-5 print:hidden">
                  <nav
                    className="flex items-center gap-6 font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
                    aria-label="Primary"
                  >
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                    <a href="#writing" className="hover:underline">
                      Writing
                    </a>
                  </nav>
                  <ThemeToggle className="relative size-8 shrink-0" />
                </div>
              </div>

              <div
                className="h-px max-w-lg bg-border"
                aria-hidden
              />

              <p
                className={cn(
                  "max-w-4xl text-pretty font-serif font-normal tracking-tight text-foreground",
                  "text-[1.625rem] leading-[1.18] sm:text-3xl sm:leading-[1.16]",
                  "md:text-[2.125rem] md:leading-[1.14] lg:text-[2.5rem] lg:leading-[1.12]",
                )}
              >
                {RESUME_DATA.about}
              </p>

              <div
                className="h-px max-w-md bg-foreground/15"
                aria-hidden
              />

              <div className="space-y-3">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <a
                    className="hover:underline"
                    href={RESUME_DATA.locationLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {RESUME_DATA.location}
                  </a>
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] print:hidden">
                  {RESUME_DATA.contact.email ? (
                    <a
                      className="border-b border-transparent hover:border-foreground"
                      href={`mailto:${RESUME_DATA.contact.email}`}
                    >
                      Email
                    </a>
                  ) : null}
                  {RESUME_DATA.contact.social.map((social) => (
                    <a
                      key={social.name}
                      className="border-b border-transparent hover:border-foreground"
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden flex-col gap-1 font-serif text-xs text-foreground print:flex">
                {RESUME_DATA.contact.email ? (
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <span className="underline">{RESUME_DATA.contact.email}</span>
                  </a>
                ) : null}
                {RESUME_DATA.contact.tel ? (
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <span className="underline">{RESUME_DATA.contact.tel}</span>
                  </a>
                ) : null}
              </div>
            </div>

            <Avatar className="size-24 shrink-0 rounded-none border border-border md:size-28">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Section className="gap-y-4 pt-6 md:pt-10">
          <SectionTitle>About</SectionTitle>
          <p className="max-w-4xl text-pretty font-serif text-sm leading-relaxed text-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>

        <Section className="gap-y-5">
          <SectionTitle>Work experience</SectionTitle>
          {RESUME_DATA.work.map((work) => {
            return (
              <Card key={work.company} className="border-border p-0">
                <CardHeader className="px-6 pb-2 pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4">
                    <h3 className="font-sans text-base font-semibold leading-tight tracking-tight">
                      <a className="hover:underline" href={work.link}>
                        <span
                          className={cn(
                            "blurCompany" in work &&
                              work.blurCompany &&
                              "inline-block rounded-sm blur-md print:blur-none",
                          )}
                        >
                          {work.company}
                        </span>
                      </a>
                      <span className="mt-2 flex flex-wrap gap-1 sm:ml-2 sm:inline-flex sm:mt-0">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="outline"
                            className="align-middle font-normal normal-case tracking-normal"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="shrink-0 font-sans text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      {work.start} — {work.end}
                    </div>
                  </div>

                  <h4 className="font-sans text-xs font-medium leading-snug text-foreground">
                    {work.title}
                  </h4>
                </CardHeader>
                <div className="space-y-3 border-t border-border px-6 py-5 pb-6">
                  {work.description.map((bulletPoint, idx) => (
                    <p className="font-serif text-xs leading-relaxed text-foreground md:text-sm" key={idx}>
                      {bulletPoint}
                    </p>
                  ))}
                </div>
              </Card>
            );
          })}
        </Section>

        <Section className="gap-y-5">
          <SectionTitle>Education</SectionTitle>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school} className="p-0">
                <CardHeader className="px-6 pb-2 pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-sans text-base font-semibold leading-tight">
                      {education.school}
                    </h3>
                    <div className="shrink-0 font-sans text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      {education.start} — {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 border-t border-border px-6 py-5 pb-6 text-foreground">
                  <p className="font-serif text-xs leading-relaxed md:text-sm">{education.degree}</p>
                  <p className="font-sans text-xs font-medium">CGPA {education.cgpa}</p>
                </CardContent>
              </Card>
            );
          })}
        </Section>

        <Section className="gap-y-4">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.skills.map((skill) => {
              return (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              );
            })}
          </div>
        </Section>

        <Section
          id="writing"
          className={cn(
            "scroll-mb-16 gap-y-5 print-force-new-page",
            /* Clear sticky header when jumping to #writing; avoids cards kissing the header hairline */
            "scroll-mt-[max(6rem,env(safe-area-inset-top,0px)+4.5rem)]",
          )}
        >
          <SectionTitle>Publications & technical writing</SectionTitle>
          <div className="-mx-1 grid grid-cols-1 gap-4 print:grid-cols-2 print:gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {RESUME_DATA.articles.map((article) => {
              return (
                <PublicationsCard
                  key={article.title}
                  title={article.title}
                  description={article.description}
                  tags={article.techStack}
                  link={
                    !article.slug
                      ? article.link.href
                      : `/articles/${article.slug}`
                  }
                  isMyBlog={article.slug ? true : false}
                />
              );
            })}
          </div>
        </Section>
      </section>

      <SiteFooter />

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
