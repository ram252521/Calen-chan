import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

import CalendarPanel from "./components/CalendarPanel";
import MemoEditor from "./components/MemoEditor";
import MemoList from "./components/MemoList";

export default function App() {
  const [date, setDate] = useState(new Date()); //今の日付で初期化
  const [memo, setMemo] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const [memos, setMemos] = useState(() => {
    return JSON.parse(localStorage.getItem("memos") || "{}");
  }); //ローカルから取り出しJSON.parseで文字列をオブジェクトにし、memos(state)にセットする

  //カレンダーを成形
  const formatDate = (date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSelectMemo = (dateKey) => {
    const selectedDate = new Date(dateKey);

    setDate(selectedDate);
    setMemo(memos[dateKey] || "");
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const key = newDate.toISOString().split("T")[0];
    setMemo(memos[key] || "");
  };

  const dateKey = date.toISOString().split("T")[0];

  const handleSave = () => {
    const newMemos = {
      ...memos,
      [dateKey]: memo,
    };

    setMemos(newMemos);
    localStorage.setItem("memos", JSON.stringify(newMemos));

    setSavedMessage("保存しました");

    setTimeout(() => {
      setSavedMessage("");
    }, 1500);
  };

  //削除機能

  const handleDelete = () => {
    if (!confirm("本当に削除しますか？")) return;
    const newMemos = { ...memos };

    delete newMemos[dateKey]; // ← ここが

    setMemos(newMemos);
    localStorage.setItem("memos", JSON.stringify(newMemos));

    setMemo(""); // 入力欄もクリア
    setSavedMessage("削除しました");

    setTimeout(() => {
      setSavedMessage("");
    }, 1000);
  };

  //自動保存
  useEffect(() => {
    const timer = setTimeout(() => {
      const newMemos = {
        ...memos,
        [dateKey]: memo,
      };

      setMemos(newMemos);
      localStorage.setItem("memos", JSON.stringify(newMemos));

      if (memo.trim() !== "") {
        setSavedMessage("自動保存しました");
      }

      setTimeout(() => {
        setSavedMessage("");
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, [memo, dateKey]); // ← 常に2個
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header>
          <p className="text-blue-400 font-semibold">
            RCMA -React Calendar Memo App-
          </p>

          <h1 className="text-4xl font-bold mt-2">Calendar Memo</h1>

          <p className="text-slate-400 mt-2">
            日付とメモが連動したメモアプリ、カレンちゃん
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <CalendarPanel
            handleDateChange={handleDateChange}
            date={date}
            memos={memos}
          />

          <MemoEditor
            dateLabel={formatDate(date)}
            memo={memo}
            setMemo={setMemo}
            handleSave={handleSave}
            handleDelete={handleDelete}
            savedMessage={savedMessage}
          />
        </div>
        <MemoList memos={memos} onSelectMemo={handleSelectMemo} />
      </div>
    </div>
  );
}
