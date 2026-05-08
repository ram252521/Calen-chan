import Calendar from "react-calendar";
import JapaneseHolidays from "japanese-holidays";

export default function CalendarPanel({ handleDateChange, date, memos }) {
  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // 50px以上動いたらスワイプ判定
    if (Math.abs(diff) < 50) return;

    const newDate = new Date(date);

    if (diff > 0) {
      // 左スワイプ → 次の月
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      // 右スワイプ → 前の月
      newDate.setMonth(newDate.getMonth() - 1);
    }

    handleDateChange(newDate);
  };

  return (
    <div
      className="bg-slate-900 rounded-3xl p-6 shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="bg-slate-700 text-slate-100 rounded-xl p-4 shadow-inner"
        showNeighboringMonth={false}
        maxDetail="month"
        tileContent={({ date }) => {
          const key = date.toISOString().split("T")[0];

          if (memos[key]) {
            return (
              <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-blue-500 shadow" />
            );
          }

          return null;
        }}
        tileClassName={({ date }) => {
          const isHoliday = JapaneseHolidays.isHoliday(date);
          const day = date.getDay(); // 0:日曜

          if (isHoliday || day === 0) {
            return "text-red-500 font-bold";
          }

          return null;
        }}
      />
    </div>
  );
}
