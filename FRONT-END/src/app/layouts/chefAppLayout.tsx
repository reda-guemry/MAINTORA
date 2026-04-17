export function ChefAppLayout() {
  return (
    <div>
      <header className="flex h-16 w-full items-center justify-between border-b border-primary/20 bg-white/80 dark:bg-background-dark/80 px-8 backdrop-blur-md z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded bg-primary text-white">
              <span className="material-symbols-outlined text-xl">factory</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Preventive CMMS
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              className="text-sm font-medium text-neutral-teal hover:text-primary transition-colors"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-sm font-medium text-neutral-teal hover:text-primary transition-colors"
              href="#"
            >
              Assets
            </a>
            <a
              className="text-sm font-medium text-neutral-teal hover:text-primary transition-colors"
              href="#"
            >
              Work Orders
            </a>
            <a
              className="text-sm font-semibold text-primary border-b-2 border-primary py-5"
              href="#"
            >
              Checklists
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-teal text-xl">
              search
            </span>
            <input
              className="h-10 w-64 rounded-lg border-primary/10 bg-primary/5 pl-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary dark:bg-slate-800/50"
              placeholder="Search resources..."
              type="text"
            />
          </div>
          <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="size-10 rounded-full border-2 border-primary/20 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              data-alt="Technical supervisor profile headshot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV-SMCoFcj5Wg9faLjcYHZcsR4hFGWt8TFKoYHiVMGcEsnNXpXqeTZwL-epyVPp8imDQ2hbl73P0W3ulj15mxLOddw8n7SdHTxDxIFpj1cISwzpsxILmBmLlZUrt1NpxlGCeer0DMZNf9Pguj92xG2LpbKONi7TN4Vx3cNaOtI9YR9qFy6FLGop2j7P2W7xIwWCTMM5dioj7OR9nHr-6RnnSa2jcDzhEwWJEzibcJyoe-cPVZkuI7agL-vUPpfPr2CAFZINPH2qtQ"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
