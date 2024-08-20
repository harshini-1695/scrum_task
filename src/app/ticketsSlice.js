import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
  },
  reducers: {
    addTicket: (state, action) => {
      const existingIds = state.tickets.map(ticket => parseInt(ticket.id));
      const maxId = Math.max(...existingIds, 0);
      const newId = (maxId + 1).toString().padStart(4, '0');

      const newTicket = {
        ...action.payload,
        id: newId,
      };
      state.tickets.push(newTicket);
    },
    updateTicket: (state, action) => {
      const { id, updates } = action.payload;
      const ticket = state.tickets.find(ticket => ticket.id === id);
      if (ticket) {
        Object.assign(ticket, updates);
      }
    },
    deleteTicket: (state, action) => {
      const { id } = action.payload;
      state.tickets = state.tickets.filter(ticket => ticket.id !== id);
    },
  },
});
export const { addTicket, updateTicket, deleteTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;