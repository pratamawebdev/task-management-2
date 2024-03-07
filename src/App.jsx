import { Toaster } from "react-hot-toast";
import "./App.css";
import TaskListLayouts from "./components/Layouts/TaskListLayouts";

function App() {
  return (
    <>
      <TaskListLayouts />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.2rem",
          },
        }}
      />
    </>
  );
}

export default App;
