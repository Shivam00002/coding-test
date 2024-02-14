import create from 'zustand';
import axios from 'axios';

const useDataStore = create((set) => ({
    data: [],
    getData: async () => {
        try {
            const res = await axios.get('http://localhost:5000/projects');
            set({ data: res.data });
        } catch (error) {
            console.log(error);
        }
    },
}));

export {
    useDataStore

}
