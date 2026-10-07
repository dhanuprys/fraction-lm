import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { Shell, Sidebar, Stack } from "@/components/pouf/layout";
import { BottomNav, type NavItem } from "@/components/pouf/BottomNav";
import { NavLink, type LinkComponent } from "@/components/pouf/NavLink";
import logoRectangle from "@/assets/images/bg/logo-rectangle.webp";

const RouterLinkAdapter: LinkComponent = ({
  href,
  className,
  children,
  "aria-current": ariaCurrent,
}) => (
  <RouterLink to={href} className={className} aria-current={ariaCurrent}>
    {children}
  </RouterLink>
);

const NAV: NavItem[] = [
  { href: "/admin", label: "Dasbor", icon: "home", tone: "purple" },
  {
    href: "/admin/monitor",
    label: "Monitor",
    icon: "overview",
    tone: "orange",
  },
  { href: "/admin/topics", label: "Topik", icon: "wand", tone: "yellow" },
  {
    href: "/admin/subtopics",
    label: "Subtopik",
    icon: "calendar",
    tone: "blue",
  },
  {
    href: "/admin/materials",
    label: "Materi",
    icon: "activity",
    tone: "pink",
  },
  { href: "/admin/users", label: "Pengguna", icon: "users", tone: "orange" },
  {
    href: "/admin/chat-logs",
    label: "Riwayat",
    icon: "channels",
    tone: "mint",
  },
  {
    href: "/admin/settings",
    label: "Pengaturan",
    icon: "settings",
    tone: "idle",
  },
  {
    href: "/admin/backup",
    label: "Cadangan",
    icon: "activity",
    tone: "mint",
  },
  {
    href: "/student",
    label: "Halaman Siswa",
    icon: "home",
    tone: "purple",
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Shell>
        <Sidebar mobile="hide">
          <div className="flex items-center h-12 mb-4">
            <img src={logoRectangle} alt="METADIA Admin" className="h-16 w-auto object-contain" />
          </div>
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              currentPath={currentPath}
              icon={item.icon}
              tone={item.tone}
              link={RouterLinkAdapter}
            >
              {item.label}
            </NavLink>
          ))}
        </Sidebar>

        <Stack gap={5}>
          <Outlet />
        </Stack>
      </Shell>

      <BottomNav
        primary={NAV.slice(0, 3)}
        groups={[{ title: "Admin", items: NAV }]}
        currentPath={currentPath}
        link={RouterLinkAdapter}
      />
    </>
  );
}
