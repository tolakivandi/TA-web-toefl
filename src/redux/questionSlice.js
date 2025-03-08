import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch data dari API menggunakan createAsyncThunk
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await axios.get("http://10.0.2.38:9000/api/get-pakets/2", {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const packet = response.data.payload;
  return {
    id: packet.id,
    no_packet: packet.no_packet,
    name_packet: packet.name_packet,
    questions: packet.questions.map((q) => ({
      id: q.id,
      type_question: q.type_question,
      part_question: q.part_question,
      description_part_question: q.description_part_question,
      question: q.question,
      multiple_choices: q.multiple_choices.map((choice) => ({
        id: choice.id,
        choice: choice.choice,
      })),
    })),
    user_answer: packet.user_answer,
    packet_claim: packet.packet_claim,
  };
});

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    data: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default questionSlice.reducer;
