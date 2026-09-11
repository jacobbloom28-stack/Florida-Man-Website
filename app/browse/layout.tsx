import type { Metadata } from "next";

// browse/page.tsx is a Client Component (it reads useSearchParams for live
// filtering), and metadata exports only work in Server Components — so the
// metadata lives here instead, in the route's server-rendered layout.
export const metadata: Metadata = {
  title: "Browse",
  description:
    "Browse the full verified archive of Florida Man stories — filter by category, city, date, and Florida Man score.",
  alternates: { canonical: "/browse" },
};

export default function BrowseLayout({ children }: LayoutProps<"/browse">) {
  return children;
}
