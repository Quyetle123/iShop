import { createSlice } from '@reduxjs/toolkit';

const aiSlice = createSlice({
    name: 'ais',
    initialState: {
        chatboxs: [],
        loading: false,
        error: null,
    },
    reducers: {
        addChatBoxStart(state, action) {
            state.loading = true;
            state.chatboxs.push({ text: action.payload.question, sender: 'user' });
            state.error = null;
        },
        addChatBoxSuccess(state, action) {
            state.loading = false;
            state.chatboxs.push({ text: action.payload, sender: 'ai' });
            state.error = null;
        },
        addChatBoxError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchChatBoxStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchChatBoxSuccess(state, action) {
            state.loading = false;
            state.chatboxs = action.payload;
            state.error = null;
        },
        fetchChatBoxError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addChatBoxStart,
    addChatBoxSuccess,
    addChatBoxError,
    fetchChatBoxStart,
    fetchChatBoxSuccess,
    fetchChatBoxError,
} = aiSlice.actions;

export default aiSlice.reducer;
