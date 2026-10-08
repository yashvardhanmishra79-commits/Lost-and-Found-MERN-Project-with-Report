

const Loader = () => {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-6">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-xs font-medium text-slate-500 tracking-wide">Loading...</span>
    </div>
  );
};

export default Loader;
