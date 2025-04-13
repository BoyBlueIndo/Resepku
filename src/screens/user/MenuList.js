const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        Alert.alert("Error", "Response dari server bukan JSON.");
        return false;
      }

      if (response.ok) {
        if (!data.user || !data.user.role) {
          Alert.alert("Error", "Role pengguna tidak ditemukan.");
          return false;
        }

        const userRole = data.user.role;
        const userData = {
          token: data.token,
          role: userRole,
          userId: data.user._id,
        };

        setUser(userData);

        if (userRole === "admin") {
          return "admin";
        } else if (userRole === "user") {
          return "user";
        } else {
          Alert.alert("Error", "Role tidak valid.");
          return false;
        }
      } else {
        Alert.alert("Login Gagal", data.msg || "Email atau password salah.");
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Gagal menghubungi server.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
