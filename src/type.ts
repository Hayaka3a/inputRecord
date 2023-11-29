type Category = {
  id: number;
  category: string;
  text: string;
}[];

type User = { userName: string };

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
  user: User;
  categories: { text: string };
}[];

export type { Category, Record };
