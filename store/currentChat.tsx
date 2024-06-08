import create from 'zustand';

type CurrentChatUser = {
    firstname: string;
    lastname: string;
    profileImage: string;
    username: string;
};

type CurrentChatStore = {
    currentChatUser: CurrentChatUser;
    setCurrentChatUser: (user: CurrentChatUser) => void;
};

const useCurrentChatStore = create<CurrentChatStore>((set) => ({
    currentChatUser: {
        firstname: '',
        lastname: '',
        profileImage: '',
        username: '',
    },
    setCurrentChatUser: (user: CurrentChatUser) => set({ currentChatUser: user }),
}));



export default useCurrentChatStore;
