import { useState } from "react";
import styles from "./Admin.module.css";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/redux/slices/adminSlice";
interface AdminProps {
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Проверка для простого примера
    if (username === "admin" && password === "12345") {
      dispatch(setAdmin(true));
      onClose();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.admin_container}>
      <form>
        <div className={styles.admin_form}>
          <h2> Войти как администратор</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.admin_btn} onClick={handleLogin}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
