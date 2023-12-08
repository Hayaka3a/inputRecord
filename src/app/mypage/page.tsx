import styles from "@/styles/app/mypage.module.scss";
import Quit from "./quit";
import UserEdit from "./userEdit";

export default function Myapage() {
  return (
    <main className={styles.main}>
      <div className={styles.contents}>
        <UserEdit />
        <br />
        <Quit />
      </div>
    </main>
  );
}
