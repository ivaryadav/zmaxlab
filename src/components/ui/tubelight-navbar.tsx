import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

const BLUE = "#1D4ED8"

export function NavBar({ items, className }: NavBarProps) {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState(items[0].name)

  useEffect(() => {
    const match = items.find(
      (item) =>
        pathname === item.url ||
        (item.url !== "/" && pathname.startsWith(item.url))
    )
    if (match) setActiveTab(match.name)
  }, [pathname, items])

  return (
    <div className={className} style={{ display: "flex", alignItems: "center" }}>
      {/* Pill container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "4px",
          borderRadius: 999,
          background: "rgba(11,18,32,0.04)",
          border: "1px solid rgba(11,18,32,0.08)",
        }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                color: isActive ? "#ffffff" : "rgba(11,18,32,0.62)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
                userSelect: "none",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="tubelight-active"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    background: BLUE,
                    boxShadow: `0 2px 10px rgba(29,78,216,0.35)`,
                  }}
                />
              )}

              {/* Desktop: text */}
              <span style={{ position: "relative", display: "none" }} className="nav-tube-label">
                {item.name}
              </span>

              {/* Mobile: icon */}
              <span style={{ position: "relative", display: "flex" }} className="nav-tube-icon">
                <Icon size={17} strokeWidth={2.5} />
              </span>
            </Link>
          )
        })}
      </div>

      <style>{`
        @media (min-width: 769px) {
          .nav-tube-label { display: inline !important; }
          .nav-tube-icon  { display: none !important; }
        }
      `}</style>
    </div>
  )
}
