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

const BLUE   = "#2563eb"
const VIOLET = "#7c3aed"

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
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
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
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
                userSelect: "none",
              }}
            >
              {/* Active highlight - renders before text so text is on top */}
              {isActive && (
                <motion.div
                  layoutId="tubelight-active"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    background: `linear-gradient(135deg, rgba(37,99,235,0.35), rgba(124,58,237,0.25))`,
                    boxShadow: `0 0 18px rgba(37,99,235,0.45), 0 0 4px rgba(37,99,235,0.6)`,
                  }}
                >
                  {/* Tubelight glow bar - bottom edge of pill */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "55%",
                      height: 3,
                      borderRadius: "0 0 4px 4px",
                      background: `linear-gradient(90deg, transparent, ${BLUE}, ${VIOLET}, transparent)`,
                      boxShadow: `0 0 10px ${BLUE}, 0 4px 24px rgba(37,99,235,0.6), 0 8px 40px rgba(37,99,235,0.2)`,
                    }}
                  />
                </motion.div>
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
