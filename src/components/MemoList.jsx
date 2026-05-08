import { useState } from "react";

export default function MemoList({ memos, onSelectMemo }) {
  const [searchText, setSearchText] = useState("");

  const memoEntries = Object.entries(memos)
    .filter(([dateKey, text]) => {
      const keyword = searchText.toLowerCase();

      return (
        dateKey.includes(keyword) ||
        text.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="mt-6 bg-slate-900 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">メモ一覧</h2>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="メモを検索..."
        className="mb-4 w-full rounded-xl bg-slate-800 text-white p-3 outline-none border border-slate-700 focus:border-blue-400"
      />

      {memoEntries.length === 0 ? (
        <p className="text-slate-400">該当するメモがありません</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {memoEntries.map(([dateKey, text]) => (
            <button
              key={dateKey}
              onClick={() => onSelectMemo(dateKey)}
              className="w-full text-left rounded-xl bg-slate-800 p-4 hover:bg-slate-700 active:scale-95 transition"
            >
              <p className="text-blue-400 font-semibold">
                {new Date(dateKey).toLocaleDateString("ja-JP")}
              </p>

              <p className="text-slate-300 mt-1 line-clamp-2">
                {text}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}