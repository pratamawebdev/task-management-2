import { format } from "date-fns";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../slices/taskSlice";
import CheckButton from "../Elements/Button/CheckButton";
import Modal from "./Modal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Item = ({ task }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (task.status === "done") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [task.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTask({ ...task, status: checked ? "to_do" : "done" }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-between p-4 mb-6 bg-white rounded last:mb-0"
        variants={child}
      >
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col gap-1 overflow-hidden">
            <p
              className={
                task.status === "done"
                  ? "break-all font-medium text-md text-[#585858] line-through "
                  : "break-all font-medium text-md text-slate-900"
              }
            >
              {task.title}
            </p>
            <div className="flex flex-col gap-1 ">
              <p className="block text-xs md:text-md font-light -mt-1 text-[#585858]">
                Created: {format(new Date(task.time), "p, MM/dd/yyyy")}
              </p>
              {task.deadline && (
                <p className="block text-xs md:text-md font-light -mt-1 text-[#585858]">
                  Deadline: {format(new Date(task.deadline), "p, MM/dd/yyyy")}
                </p>
              )}
            </div>
            <span className="text-xs text-slate-500">#{task.status}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <div
            className="text-md p-2 text-[#585858] flex transition hover:bg-[#ecedf6] duration-300 ease items-center justify-center cursor-pointer bg-[#eee] rounded-[4px]"
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-label="Delete"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <div
            className="text-md p-2 text-[#585858] flex transition hover:bg-[#ecedf6] duration-300 ease items-center justify-center cursor-pointer bg-[#eee] rounded-[4px]"
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-label="Edit"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </div>
      </motion.div>
      <Modal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        task={task}
      />
    </>
  );
};

export default Item;
