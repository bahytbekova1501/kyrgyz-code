import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "@/redux/authSlices/authSlice";
import styles from "./Admin.module.css";

interface AdminLoginProps {
  onClose: () => void;
}
const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(login(user)).unwrap();
      onClose();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className={styles.login_container}>
          <h2 className={styles.login_h2}>Вы администратор?</h2>
          <input
            className={styles.login_input}
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className={styles.login_input}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {loading && <p>Загрузка...</p>} {error && <p>Error: {error}</p>}
          <button
            className={styles.login_btn}
            type="submit"
            // onClick={handleLogin}
            disabled={loading}
          >
            Войти
          </button>
        </div>
      </form>{" "}
    </div>
  );
};

export default AdminLogin;
