import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },

    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },

    savingNewNote: state => {
      state.isSaving = true;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = '';
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
