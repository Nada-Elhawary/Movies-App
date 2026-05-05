import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        list: savedFavorites
    },

    reducers: {
        addFavorite: (state, action) => {
            const exists = state.list.find(
                (movie) => movie.id === action.payload.id
            );

            if (!exists) {
                state.list.push(action.payload);
                localStorage.setItem(
                    "favorites",
                    JSON.stringify(state.list)
                );
            }
        },

        removeFavorite: (state, action) => {
            state.list = state.list.filter(
                (movie) => movie.id !== action.payload
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(state.list)
            ); 
        },

        toggleFavorite: (state, action) => {
            const exists = state.list.find(
                (movie) => movie.id === action.payload.id
            );

            if (exists) {
                state.list = state.list.filter(
                    (movie) => movie.id !== action.payload.id
                );
            } else {
                state.list.push(action.payload);
            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(state.list)
            );
        }
    }
});

export const {
    addFavorite,
    removeFavorite,
    toggleFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;