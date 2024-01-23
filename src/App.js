import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/todosContexts";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "المهمة الاولي",
//     details: "التفاصيل الخاصة بالمهمة الاولي",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "اقرأ كتاب ارض زيكولا",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "اخلص السيكشن",
//     details: "افهمه كويس",
//     isCompleted: false,
//   },
// ];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              height: "100vh",
              direction: "rtl",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
