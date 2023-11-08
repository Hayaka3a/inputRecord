"use client";
import { supabase } from "@/supabase";
import { ChangeEvent, useState } from "react";
import styles from "@/styles/components/recordForm.module.scss";

export default function RecordForm() {
  const tmpData = [
    { id: 1, category: "読書", text: "を読みました" },
    { id: 2, category: "映画", text: "を観ました" },
    { id: 3, category: "学習", text: "を学習しました" },
  ];

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("読書");
  const [memoOpen, setMemoOpen] = useState(false);

  const handleSubmit = async () => {
    console.log("送信処理");
    // const { error } = await supabase.from("record").insert({
    //   userID: 1,
    //   title: title,
    //   memo: memo,
    //   date: date,
    //   category: category,
    // });
    // if (error) {
    //   console.log("記録を追加できませんでした");
    // } else {
    // }
  };

  const textfilter = tmpData.find((data) => {
    return data.category === category;
  });

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div className={styles.upper}>
        <label>
          日付
          <br />
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setDate(new Date(Date.parse(e.target.value)))}
          />
        </label>
        <label>
          カテゴリー
          <br />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {tmpData.map((data) => {
              return (
                <option value={data.category} key={data.id}>
                  {data.category}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p>{textfilter && textfilter.text}</p>
      </label>
      <label>
        <div onClick={() => setMemoOpen(!memoOpen)}>▼メモ</div>
        {memoOpen && (
          <textarea
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
            className={styles.memo}
          />
        )}
      </label>
      <button type="submit">記録</button>
    </form>
  );
}
