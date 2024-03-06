export default function Button({
  isFetching,
  paginate,
  disabled,
  label,
  onMouseEnter,
}: {
  isFetching?: boolean;
  paginate: () => void;
  disabled: boolean;
  label: string;
  onMouseEnter?: () => void;
}) {
  return (
    <button
      className="px-4 py-1.5 rounded-md max-w-max bg-slate-100 hover:bg-slate-200/65 active:bg-slate-100 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={paginate}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
    >
      {isFetching ? (
        <div className="animate-spin border-[3px] border-t-green-400 rounded-full w-5 h-5"></div>
      ) : (
        label
      )}
    </button>
  );
}
