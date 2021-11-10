import create from "zustand";
import { devtools } from "zustand/middleware";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { IPoll } from "../utils/interfaces";

interface IPollStore {
	pollData: IPoll;
	addNewPoll(data: IPoll): Promise<boolean>;
	updatePollData(data: IPoll): void;
  addVote(data: IPoll): Promise<boolean>
}

const initialPollData: IPoll = {
  name: "",
  options: [],
  title: "",
  uid: "",
  voteInfo: [],
  createdOn: new Date()
};

const usePollStore = create<IPollStore>(
	devtools((set, get) => ({
		pollData: initialPollData,
		addNewPoll: async (data) => {
			try {
				const collectionRef = collection(firestore, "polls");
				await addDoc(collectionRef, data);
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
		updatePollData: (data) => {
			set({ pollData: data });
		},
    addVote: async (data) => {
      try {
        const docRef = doc(firestore, `polls/${data.id}`)
        if (data.NO_ID_FIELD) delete data.NO_ID_FIELD
        await updateDoc(docRef, {...data})
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    }
	}))
);

export { usePollStore };
