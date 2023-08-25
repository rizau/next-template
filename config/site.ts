export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next",
  description: "by RZU",
  footer: { copyRightYear: 2023, copyRightName: "Rzu Software" },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Invoices",
      href: "/invoices",
    },
    {
      title: "Tasks",
      href: "/tasks",
    },
    {
      title: "Reports",
      href: "/reports",
    },
    {
      title: "Pages",
      href: "/pager",
    },
    {
      title: "Parameters",
      href: "/parameters",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
