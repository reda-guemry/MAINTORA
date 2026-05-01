import { Link } from "react-router-dom";
import { MaintoraLogo } from "@/shared/components/ui";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Inter',sans-serif] text-main">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <MaintoraLogo
            to="/"
            size={28}
            showText
            wrapperClassName="flex items-center gap-2"
            ariaLabel="Go to home page"
          />
          
          <div className="hidden items-center gap-8 text-[13px] font-semibold text-gray-600 md:flex">
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-primary">Login</Link>
            <Link to="/login" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32">
        <section className="mx-auto max-w-5xl px-6 text-center">
          
          <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-[#0F172A] md:text-7xl">
            Preventive Maintenance <br />
            <span className="text-primary">via Control Rounds</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-gray-500">
            Avoid unexpected breakdowns and extend asset lifespan with our intuitive control round platform. Built for high-reliability industrial teams.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/login" className="rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              Start Free Trial
            </Link>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-4xl shadow-2xl">
            <img 
              src="/public/photo_accueille.avif" 
              alt="Industrial Maintenance" 
              className="h-125 w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-md">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full border-2 border-white bg-primary" />
                <div className="h-6 w-6 rounded-full border-2 border-white bg-blue-500" />
              </div>
              Currently monitoring 42 active units
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Engineered for Reliability</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Our platform provides the specialized tools you need to maintain peak operational performance across every department.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="group rounded-[28px] border border-gray-100 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F9F8] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-3xl">monitoring</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Real-time Monitoring</h3>
              <p className="mt-4 text-sm leading-7 text-gray-500">Track equipment health instantly with live data feeds. Get immediate alerts when performance deviates from baseline parameters.</p>
            </div>

            <div className="group rounded-[28px] border border-gray-100 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F9F8] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Automated Scheduling</h3>
              <p className="mt-4 text-sm leading-7 text-gray-500">Set and forget maintenance intervals with smart triggers. Our algorithm optimizes routes based on urgency and technician proximity.</p>
            </div>

            <div className="group rounded-[28px] border border-gray-100 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F9F8] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Asset Reliability</h3>
              <p className="mt-4 text-sm leading-7 text-gray-500">Ensure long-term stability and reduced maintenance costs. Build a comprehensive history of every asset for regulatory compliance.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[40px] bg-primary px-8 py-16 text-center text-white md:py-20">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                <span className="material-symbols-outlined text-[300px]">settings_suggest</span>
            </div>
            
            <h2 className="relative z-10 text-3xl font-black md:text-5xl">
              Ready to optimize your maintenance?
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-xl text-white/80">
              Join hundreds of industrial teams improving their reliability and cutting downtime by up to 30%.
            </p>
            
            <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/login" className="rounded-xl bg-white px-8 py-4 text-sm font-black text-primary shadow-lg hover:bg-gray-50 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-[#18233b] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <MaintoraLogo to="/" size={24} showText ariaLabel="Go to home page" />
          <div className="flex gap-8 text-[13px] font-bold text-gray-500">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Documentation</a>
          </div>
          <p className="text-[13px] text-gray-400">© 2026 Maintora Platforms. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
