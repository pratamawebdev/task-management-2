import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { addTask, updateTask } from "../../slices/taskSlice";
import Button from "../Elements/Button/Button";
import { isToday, isPast } from "date-fns";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const generateId = () => {
  return Date.now().toString();
};

const Modal = ({ type, modalOpen, setModalOpen, task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("to_do");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const isDeadlineToday = isToday(new Date(deadline));
    const isDeadlinePast = isPast(new Date(deadline));

    if (isDeadlineToday && isDeadlinePast) {
      toast.error("Deadline has passed!");
    }
    if (type === "update" && task) {
      setTitle(task.title);
      setStatus(task.status);
      setDeadline(task.deadline || "");
    } else {
      setTitle("");
      setStatus("to_do");
    }
  }, [type, task, modalOpen, deadline]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      const taskId = generateId();

      if (type === "add") {
        dispatch(
          addTask({
            id: taskId,
            title,
            status,
            time: format(new Date(), "p, MM/dd/yyyy"),
            deadline: deadline || null,
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "update") {
        if (
          task.title !== title ||
          task.status !== status ||
          task.deadline !== deadline
        ) {
          dispatch(updateTask({ ...task, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000] flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-300 max-w-sm md:max-w-lg w-[90%] h-full max-h-96 my-0 mx-auto flex items-center justify-center p-6 rounded-lg relative"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute top-[-10px] right-0 transform -translate-y-full text-2xl p-1 rounded bg-white text-slate-700 flex items-center justify-center cursor-pointer "
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>

            <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
              <h1 className="text-lg font-bold text-slate-700">
                {type === "add" ? "Add" : "Update"} Task
              </h1>
              <label htmlFor="title" className="text-md text-[#646681]">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 mt-2 mb-2 bg-white border-none text-md"
                />
              </label>
              <label htmlFor="type" className="text-md text-[#646681]">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 mt-2 mb-2 bg-white border-none text-md"
                >
                  <option value="all">All</option>
                  <option value="to_do">TO DO</option>
                  <option value="in_progress">IN PROGRESS</option>
                  <option value="review">REVIEW</option>
                  <option value="reject">REJECT</option>
                  <option value="done">DONE</option>
                </select>
              </label>
              <label htmlFor="deadline" className="text-md text-[#646681]">
                Deadline
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2 mt-2 mb-2 bg-white border-none text-md"
                />
              </label>
              <div className="flex items-center justify-start gap-4 mt-4">
                <Button type="submit" classname="text-white bg-slate-800">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button
                  onClick={() => setModalOpen(false)}
                  classname="text-white bg-slate-500"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
