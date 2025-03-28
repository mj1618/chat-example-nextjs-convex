export default function ChatSidebar() {
  return (
    <aside className="flex flex-0">
      <div className="flex h-[100svh] w-60 flex-col overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900 sm:h-[100vh] sm:w-64">
        <div className="flex px-4">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-blue-600"
            fill="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
          >
            <path d="M20.553 3.105l-6 3C11.225 7.77 9.274 9.953 8.755 12.6c-.738 3.751 1.992 7.958 2.861 8.321A.985.985 0 0012 21c6.682 0 11-3.532 11-9 0-6.691-.9-8.318-1.293-8.707a1 1 0 00-1.154-.188zm-7.6 15.86a8.594 8.594 0 015.44-8.046 1 1 0 10-.788-1.838 10.363 10.363 0 00-6.393 7.667 6.59 6.59 0 01-.494-3.777c.4-2 1.989-3.706 4.728-5.076l5.03-2.515A29.2 29.2 0 0121 12c0 4.063-3.06 6.67-8.046 6.965zM3.523 5.38A29.2 29.2 0 003 12a6.386 6.386 0 004.366 6.212 1 1 0 11-.732 1.861A8.377 8.377 0 011 12c0-6.691.9-8.318 1.293-8.707a1 1 0 011.154-.188l6 3A1 1 0 018.553 7.9z"></path>
          </svg>
          <h2 className="px-5 text-lg font-medium text-slate-800 dark:text-slate-200">
            Chats
            <span className="mx-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200">
              6
            </span>
          </h2>
        </div>
        <div className="mx-2 mt-8">
          <button className="flex w-full gap-x-4 rounded-lg border border-slate-300 p-4 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
            New Chat
          </button>
        </div>
        {/* Previous chats container */}
        <div className="h-1/2 space-y-4 overflow-y-auto border-b border-slate-300 px-2 py-4 dark:border-slate-700">
          <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              Tailwind Classes
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">12 Mar</p>
          </button>
          <button className="flex w-full flex-col gap-y-2 rounded-lg bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              explain quantum computing
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">10 Feb</p>
          </button>
          <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              How to create ERP Diagram
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">22 Jan</p>
          </button>
          <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              API Scaling Strategies
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
          </button>
          <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              What is GPT UI?
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
          </button>
          <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
            <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
              How to use Tailwind components?
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
          </button>
        </div>
        <div className="mt-auto w-full space-y-4 px-2 py-4">
          <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
            </svg>
            User
          </button>
          <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            </svg>
            Settings
          </button>
        </div>
      </div>
    </aside>
  );
}
