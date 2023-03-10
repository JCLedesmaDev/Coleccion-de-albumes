import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { ISpinnerModels } from "../interface/models/ISpinner.models";
import { IUserModels } from "../interface/models/IUser.models";
import { getStorage, setStorage } from "../utils/magnamentStorage";

interface IStore {
    readonly state: {
        spinnerModal: ISpinnerModels;
        user: IUserModels;
        showPopup: boolean;
    },
    actions: {
        setUser: (user: IUserModels) => void
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void
        setShowPopup: (newStatus: boolean) => void
    }
}

const appStore = create<IStore>((set, get) => ({
    state: {
        spinnerModal: {} as ISpinnerModels,
        user: getStorage<IUserModels>("User") ?? {} as IUserModels,
        showPopup: false
    },
    actions: {
        setUser: (user: IUserModels) => {
            console.log("🚀 ~ setUser", user)
            setStorage("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        },
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
            }))
        },
        setShowPopup: (newStatus: boolean) => {
            set(produce((store: IStore) => {
                store.state.showPopup = newStatus
            }))
        },
    }
}))

export const useAppStore = () => ({ ...appStore((state) => (state), shallow) })
export default appStore