import Content from "../Fragments/Content";
import Navbar from "../Fragments/Navbar";

const TaskListLayouts = () => {
  return (
    <div className="w-[90%] max-w-7xl my-8 mx-auto font-[poppins]">
      <h1 className="max-w-[750px] font-semibold flex justify-center items-center w-full mt-8 mb-6 text-2xl text-center mx-auto">
        Task Management
      </h1>
      <div className="wrapper max-w-[750px] w-full my-0 mx-auto">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default TaskListLayouts;
