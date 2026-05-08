export default function MemoEditor({
dateLabel,
memo,
setMemo,
handleSave,
savedMessage,
handleDelete,
}) {
return ( <div className = "bg-slate-900 rounded-2xl p-6 shadow-xl">
	<p className = "text-slate-300 mb-3"> { dateLabel } のメモ </p>


	<textarea value = { memo } onChange = {
		(e) => setMemo(e.target.value) } placeholder = "今日の予定、気づきをメモ"
	className = "w-full h-72 rounded-xl bg-slate-800 text-white p-4 outline-none border border-slate-700 focus:border-blue-400" />

	<button onClick = { handleSave } className = "mt-4 w-full rounded-xl bg-blue-500 py-3 font-bold hover:bg-blue-400 transition" >
	保存する </button>	 
<button
  onClick={handleDelete}
  className="mt-2 w-full rounded-xl bg-red-500 py-3 font-bold hover:bg-red-400 transition"
>
  削除する
</button>
	{savedMessage && ( 
		<p className = "mt-3 text-green-400 text-sm" > { savedMessage } </p>
)}
</div>
)};