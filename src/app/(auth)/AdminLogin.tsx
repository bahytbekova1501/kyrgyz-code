import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "@/redux/authSlices/adminSlice";

interface AdminLoginProps {
  onClose: () => void;
}
const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [admin, setAdmin] = useState({

  //   username: "",
  //   password: "",
  // });
  //   const [username, setUsername] = useState("");
  //   const [, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.admin.loading);
  const error = useSelector((state: RootState) => state.admin.error);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ username, password }));
  };
  // const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     await dispatch(login(admin)).unwrap();
  //     onClose();
  //   } catch (err) {
  //     console.error("Login failed:", err);
  //   }
  // };
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   // console.log("Changing:", name, value); // Добавлен отладочный вывод
  //   setAdmin((prevAdmin) => ({
  //     ...prevAdmin,
  //     [name]: value,
  //   }));
  // };

  return (
    <form onSubmit={handleLogin}>
      <h1>Вы администратор?</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <p>Загрузка...</p>} {error && <p>Error: {error}</p>}
      <button
        type="submit"
        // onClick={handleLogin}
        disabled={loading}
      ></button>
    </form>
  );
};

export default AdminLogin;
