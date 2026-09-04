import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: 100,
};

export const ArticleReducer = createSlice({
  name: "ArticleSlices",
  initialState, // ✅ تم ربط الحالة الأولية بالـ Slice
  reducers: {
    add: (currentState, action) => {
      console.log("calling the reducer for action name :(add)");
      currentState.result = action.payload; // ✅ تعديل الـ state مباشرة بفضل Immer
    }
  }
});

// ✅ تصحيح اسم الأكشن ليطابق دالة Add بحرف كبير
export const { add } = ArticleReducer.actions;

export default ArticleReducer.reducer;

