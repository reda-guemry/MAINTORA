export function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,#34d399_0%,#0f766e_42%,#0f172a_100%)] px-6 py-8 text-white shadow-[0_26px_70px_rgba(15,23,42,0.28)] md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/70">
              Chef Technician Hub
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Keep every preventive round sharp and on schedule.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
              Monitor execution quality, template readiness, and field coverage
              from one clean control surface.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Open Rounds", value: "08" },
              { label: "Templates Ready", value: "14" },
              { label: "Assets Covered", value: "42" },
              { label: "Alerts Today", value: "03" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                This Week
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Inspection performance snapshot
              </h2>
            </div>
            <span className="rounded-full bg-[#e8faf5] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Stable Flow
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Completed rounds",
                value: "27",
                helper: "5 more than last week",
              },
              {
                title: "Average completion",
                value: "92%",
                helper: "Field teams closing faster",
              },
              {
                title: "Critical misses",
                value: "2",
                helper: "Both flagged for follow-up",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl bg-[#f8fbfc] p-5 ring-1 ring-slate-100"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {card.title}
                </p>
                <p className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {card.helper}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            Focus Queue
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Priority templates
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "Boiler startup safety checklist",
              "Weekly conveyor alignment review",
              "Hydraulic pressure validation set",
              "Cooling line anomaly follow-up",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-3xl bg-[#f8fbfc] px-4 py-4 ring-1 ring-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-black text-primary">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-sm font-bold leading-6 text-slate-900">
                    {item}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Ready for field execution review.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
