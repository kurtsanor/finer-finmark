const Topbar = () => {
  return (
    <div className="flex justify-between items-center bg-black h-15 px-5 sticky top-0 z-999">
      {/* Left side: logo and title */}
      <aside className="flex gap-1">
        <img className="size-9" src="/finmark_logo.png" alt="FinMark Logo" />
        <p className="text-white text-2xl font-bold">FinMark</p>
      </aside>
      {/* Middle: search bar */}
      <aside>
        <input
          className="bg-white p-2 rounded w-200 placeholder:text-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search FinMark"
        />
      </aside>
      {/* Right side: action buttons */}
      <aside className="flex gap-8 border">
        <button className="border-white">
          <svg
            width="25"
            height="25"
            viewBox="0 0 40 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66666 1.5H8.33332L12.8 21.585C12.9524 22.2756 13.3698 22.8959 13.9792 23.3374C14.5886 23.779 15.3512 24.0135 16.1333 24H32.3333C33.1155 24.0135 33.878 23.779 34.4874 23.3374C35.0968 22.8959 35.5142 22.2756 35.6667 21.585L38.3333 9H9.99999M16.6667 31.5C16.6667 32.3284 15.9205 33 15 33C14.0795 33 13.3333 32.3284 13.3333 31.5C13.3333 30.6716 14.0795 30 15 30C15.9205 30 16.6667 30.6716 16.6667 31.5ZM35 31.5C35 32.3284 34.2538 33 33.3333 33C32.4128 33 31.6667 32.3284 31.6667 31.5C31.6667 30.6716 32.4128 30 33.3333 30C34.2538 30 35 30.6716 35 31.5Z"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="border-white">
          <svg
            width="25"
            height="25"
            viewBox="0 0 42 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.4955 36.4248C24.1072 36.9931 23.55 37.4648 22.8795 37.7927C22.209 38.1206 21.4488 38.2932 20.675 38.2932C19.9013 38.2932 19.1411 38.1206 18.4706 37.7927C17.8001 37.4648 17.2429 36.9931 16.8546 36.4248M33.9251 12.0498C33.9251 9.06612 32.5291 6.20464 30.0442 4.09485C27.5594 1.98507 24.1892 0.799805 20.675 0.799805C17.1609 0.799805 13.7907 1.98507 11.3059 4.09485C8.82103 6.20464 7.42505 9.06612 7.42505 12.0498C7.42505 25.1748 0.800049 28.9248 0.800049 28.9248H40.5501C40.5501 28.9248 33.9251 25.1748 33.9251 12.0498Z"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </aside>
    </div>
  );
};

export default Topbar;
