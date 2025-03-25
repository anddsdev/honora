export function AuthFormHeading() {
  return (
    <div className="mb-6 flex justify-center">
      <div className="flex items-center space-x-2 text-2xl font-bold">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span>Honora</span>
      </div>
    </div>
  );
}
