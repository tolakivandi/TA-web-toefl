import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPacket = createAsyncThunk("packet/fetchPackets", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://103.106.72.182:8040/api/get-all-paket-simulation", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.data || !response.data.payload) {
      throw new Error(response.data.message);
    }

    const packet = response.data.payload;
    console.log(packet)

      return packet.map(packet => ({
        id: packet.id,
        no_packet: packet.no_packet,
        name_packet: packet.packet_name,
        type_packet: packet.packet_type,
        akurasi: packet.akurasi,
        question_count: packet.question_count,
      }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
// Fetch data dari API menggunakan createAsyncThunk
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async (_, { rejectWithValue }, idPacket) => {
  try {
    const response = await axios.get(`http://103.106.72.182:8040/api/get-pakets/${idPacket}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.data || !response.data.payload) {
      throw new Error(response.data.message);
    }
    
    const packet = response.data.payload;
    console.log(packet)
    return {
      id: packet.id,
      no_packet: packet.no_packet,
      name_packet: packet.name_packet,
      questions: packet.questions?.map((q) => ({
        id: q.id ?? null,
        type_question: q.type_question ?? "",
        part_question: q.part_question ?? "",
        description_part_question: q.description_part_question ?? "",
        question: q.question ?? "",
        nested_question_id: q.nested_question_id ?? null,
        nested_question: q.nested_question ?? "",
        multiple_choices: q.multiple_choices?.map((choice) => ({
          id: choice.id ?? null,
          choice: choice.choice ?? "",
        })) || [],
      })) || [],
      user_answer: packet.user_answer ?? [],
      packet_claim: packet.packet_claim ?? false,
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
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
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
  