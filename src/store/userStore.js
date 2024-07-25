import create from 'zustand';

const useUserStore = create((set, get) => ({
  user_id: null,
  username: '',
  email: '',
  setUser: (user) => set(() => user),
  getUser: () => get(),
  getUser_id: () => get().user_id,
}));

export default useUserStore;

