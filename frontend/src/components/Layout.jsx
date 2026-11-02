import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, Plus, Sparkles } from 'lucide-react'

export default function Layout() {
  const navigate = useNavigate()

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/incidents', label: 'Incidents' },
    { to: '/agent-logs', label: 'Agent Logs' },
    { to: '/shift-roster', label: 'Shift Roster' },
    { to: '/bulk-import', label: 'Bulk Import' },
  ]

  const iconBtn =
    'shrink-0 w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors'

  return (
    <div className="min-h-screen w-full flex flex-col app-backdrop text-slate-900 font-sans antialiased">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto h-[84px] flex items-center gap-8">
          <NavLink to="/dashboard" className="shrink-0 text-[26px] font-bold tracking-tight text-snow leading-none">
            resol<span className="text-leaf">v</span>
          </NavLink>

          <nav className="flex-1 min-w-0 flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-[15px] whitespace-nowrap transition-colors ${
                    isActive ? 'text-snow font-semibold' : 'text-slate-500 hover:text-snow'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/incidents')} className={iconBtn} title="Search incidents">
              <Search size={18} />
            </button>

            <div className="hidden lg:flex items-center gap-2.5 h-11 px-4 rounded-xl bg-slate-100 text-sm font-medium text-slate-900">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-leaf opacity-60 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-leaf" />
              </span>
              <Sparkles size={15} className="text-leaf" />
              <span>AI agents online</span>
            </div>

            <button onClick={() => navigate('/agent-logs')} className={`${iconBtn} relative`} title="Agent activity">
              <Bell size={18} />
              <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-leaf" />
            </button>

            <button
              onClick={() => navigate('/incidents/new')}
              className="shrink-0 h-11 inline-flex items-center gap-2 rounded-xl bg-leaf hover:bg-[#E8F57A] text-ink px-4 text-sm font-semibold transition-colors"
              title="New incident"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">New Incident</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8">
        <div className="max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>

      <footer className="px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto py-6 flex items-center justify-between text-xs text-slate-400">
          <span>resolv · Smarter incidents, happier users</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  )
}
