import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  return localStorage.getItem("theme") || "light";
};

export const setThemeAsync = createAsyncThunk(
  "theme/setThemeAsync",
  async (theme) => {
    const resolvedTheme = theme == "dark" ? "dark" : "light";

    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolvedTheme);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", resolvedTheme);
    }

    return resolvedTheme;
  }
);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme()
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setThemeAsync.fulfilled, (state, action) => {
      state.mode = action.payload;
    });
  }
});

export default themeSlice.reducer;
