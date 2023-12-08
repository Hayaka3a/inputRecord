type Category = {
  id: number;
  category: string;
  text: string;
}[];

type User = { id: number; userName: string; loginID: string; pw: string };

type RecordList = {
  id: number;
  userID: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  yearMonth: string;
  create_at: Date;
  status: boolean;
  users: User;
  categories: { text: string; allText: string; category: string };
}[];

type Record = {
  id: number;
  userID: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  yearMonth: string;
  create_at: Date;
  status: boolean;
  users: User;
  categories: { text: string; allText: string; category: string };
};

export type { Category, RecordList, Record, User };
