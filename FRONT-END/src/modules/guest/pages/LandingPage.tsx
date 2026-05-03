import { Link } from "react-router-dom";
import { MaintoraLogo } from "@/shared/components/ui";

function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-display selection:bg-[#43968C]/20 selection:text-[#43968C]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-350 items-center justify-between px-8 py-4">
          <MaintoraLogo
            to="/"
            size={32}
            showText
            wrapperClassName="flex items-center gap-3"
            ariaLabel="Go to home page"
          />
          
          <div className="hidden items-center gap-10 md:flex">
            <button onClick={() => scrollToSection('features')} className="text-xs font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-[#43968C]">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-xs font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-[#43968C]">
              How it works
            </button>
            <button onClick={() => scrollToSection('impact')} className="text-xs font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-[#43968C]">
              Impact
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/login" className="rounded-xl bg-[#43968C] px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[#367a72] active:scale-95">
              System Access
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-36">
        <section className="mx-auto max-w-6xl px-8 text-center">
         
          <h1 className="mt-8 text-[64px] font-black leading-[1.05] tracking-tight text-slate-900 md:text-[88px]">
            Preventive Maintenance <br />
            <span className="text-[#43968C]">via Control Rounds</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-[16px] font-medium leading-relaxed text-slate-500">
            Avoid unexpected breakdowns and extend asset lifespan with our intuitive control round platform. Built for high-reliability industrial teams requiring strict operational standards.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <Link to="/login" className="rounded-2xl bg-slate-900 px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-slate-800 active:scale-95">
              Initialize Deployment
            </Link>
            <button onClick={() => scrollToSection('features')} className="rounded-2xl border-2 border-slate-200 bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-slate-900 transition-all hover:border-slate-300 active:scale-95">
              Explore Architecture
            </button>
          </div>

          <div className="relative mt-24 overflow-hidden rounded-[40px] bg-white p-4 shadow-2xl ring-1 ring-slate-100">
            <div className="absolute inset-0 bg-linear-to-l from-slate-900/40 to-transparent z-10 rounded-[36px]"></div>
            <img 
              src="/public/photo_accueille.avif" 
              alt="Industrial Maintenance" 
              className="h-150 w-full rounded-4xl object-cover"
            />
            <div className="absolute bottom-10 left-10 z-20 flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-xl ring-1 ring-white/20">
              <div className="flex -space-x-3">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-[#43968C]" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-800" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white">
                Monitoring 42 active units
              </span>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-350 px-8 py-40">
          <div className="text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#43968C]">Core Architecture</h2>
            <p className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Engineered for Reliability
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <div className="group rounded-4xl bg-white p-10 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/5 hover:ring-[#43968C]/20">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-slate-50 text-[#43968C] transition-all group-hover:bg-[#43968C] group-hover:text-white group-hover:scale-110">
                <span className="material-symbols-outlined text-[32px]">monitoring</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Real-time Monitoring</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">Track equipment health instantly with live data feeds. Get immediate alerts when performance deviates from baseline parameters.</p>
            </div>

            <div className="group rounded-4xl bg-white p-10 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/5 hover:ring-[#43968C]/20">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-slate-50 text-[#43968C] transition-all group-hover:bg-[#43968C] group-hover:text-white group-hover:scale-110">
                <span className="material-symbols-outlined text-[32px]">calendar_month</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Automated Scheduling</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">Set and forget maintenance intervals with smart triggers. Our algorithm optimizes routes based on urgency and technician proximity.</p>
            </div>

            <div className="group rounded-4xl bg-white p-10 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/5 hover:ring-[#43968C]/20">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-slate-50 text-[#43968C] transition-all group-hover:bg-[#43968C] group-hover:text-white group-hover:scale-110">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Asset Reliability</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">Ensure long-term stability and reduced maintenance costs. Build a comprehensive history of every asset for regulatory compliance.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-slate-900 py-40">
          <div className="mx-auto max-w-350 px-8">
            <div className="grid gap-20 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#43968C]">Workflow Protocol</h2>
                <p className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Streamlined Execution <br/>from End to End
                </p>
                <div className="mt-12 space-y-10">
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white font-black">01</div>
                    <div>
                      <h4 className="text-lg font-black text-white">Define Parameters</h4>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">Establish baseline metrics and acceptable deviation margins for all monitored machinery.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white font-black">02</div>
                    <div>
                      <h4 className="text-lg font-black text-white">Execute Control Rounds</h4>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">Technicians follow optimized routes, inputting data via secure mobile interfaces.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#43968C] text-white font-black shadow-lg shadow-[#43968C]/20">03</div>
                    <div>
                      <h4 className="text-lg font-black text-white">Analyze & Intervene</h4>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">System processes data instantly, flagging anomalies and deploying repair protocols before failure.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-150 rounded-[40px] bg-slate-800 ring-1 ring-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjNDM5NjhDIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgMEwzMCA2ME0wIDMwTDYwIDMwIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[120px] text-slate-700">account_tree</span>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="mx-auto max-w-350 px-8 py-40">
          <div className="relative overflow-hidden rounded-[48px] bg-[#43968C] px-10 py-24 text-center text-white shadow-2xl md:py-32">
            <div className="absolute -right-20 -top-20 opacity-10">
                <span className="material-symbols-outlined text-[400px]">settings_suggest</span>
            </div>
            
            <h2 className="relative z-10 text-4xl font-black tracking-tight md:text-6xl">
              Ready to optimize your maintenance?
            </h2>
            <p className="relative z-10 mx-auto mt-8 max-w-2xl text-lg font-medium text-teal-50">
              Join elite industrial teams improving their reliability metrics and cutting unplanned downtime by up to 30%.
            </p>
            
            <div className="relative z-10 mt-12 flex justify-center gap-6">
              <Link to="/login" className="rounded-2xl bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-[#43968C] shadow-xl transition-all hover:scale-105 active:scale-95">
                Request System Access
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-8 px-8 md:flex-row">
          <div className="flex flex-col gap-2">
            <MaintoraLogo to="/" size={28} showText ariaLabel="Go to home page" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
              Enterprise Grade Maintenance
            </p>
          </div>
          
          <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="transition-colors hover:text-[#43968C]">Protocol</a>
            <a href="#" className="transition-colors hover:text-[#43968C]">Security</a>
            <a href="#" className="transition-colors hover:text-[#43968C]">Documentation</a>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
               © 2026 Systems Active
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;