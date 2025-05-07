import { create } from "zustand";
import { UserRecordType } from "shared/types/UserTypes";

type UserStore = {
  user: UserRecordType | null
  setUser: (user: UserRecordType) => void
  removeUser: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({user}),
  removeUser: () => set({user: null})
}));

export default useUserStore;