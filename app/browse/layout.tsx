import type { Metadata } from "next";

// browse/page.tsx is a Client Component (it reads useSearchParams for live
// filtering), and metadata exports only work in Server Components — so the
// metadata lives here instead, in the route's server-rendered layout.
export const metadata: Metadata = {
  title: "Browse",
  description:
    "Every verified Florida Man story we've got: filter by category, city, date, or just how wild it scored.",
  alternates: { canonical: "/browse" },
};

export default function BrowseLayout({ children }: LayoutProps<"/browse">) {
  return children;
}
