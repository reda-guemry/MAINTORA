

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-10 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}


export default EmptyState ; 
