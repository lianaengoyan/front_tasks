export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};