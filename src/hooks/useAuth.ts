import { useAuthContext } from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuthContext();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};
