import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Item from "./Item";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Content = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const filterStatus = useSelector((state) => state.task.filterStatus);

  const sortedTaskList = [...taskList];
  sortedTaskList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTaskList = sortedTaskList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className="p-4 bg-slate-500 rounded-xl sm:p-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTaskList && filteredTaskList.length > 0 ? (
          filteredTaskList.map((task) => <Item key={task.id} task={task} />)
        ) : (
          <motion.p
            variants={child}
            className="h-auto px-4 py-2 mx-auto my-0 text-base font-medium text-center text-white "
          >
            No Task Available
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Content;
