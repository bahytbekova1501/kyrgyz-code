// pages/admin/login.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "@/redux/authSlices/adminSlice";
interface AdminLoginProps {
  onClose: () => void;
}
const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [admin, setAdmin] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  //   const [username, setUsername] = useState("");
  //   const [, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.admin.status);
  const error = useSelector((state: RootState) => state.admin.error);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(login(admin)).unwrap();
      onClose();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log("Changing:", name, value); // Добавлен отладочный вывод
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Вы администратор?</h1>
      <input
        type="text"
        name="username"
        value={admin.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={admin.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button
        type="submit"
        // onClick={handleLogin}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Logging in..." : "Login"}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AdminLogin;
