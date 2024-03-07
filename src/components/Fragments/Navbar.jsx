import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Elements/Button/Button";
import SelectButton from "../Elements/Button/SelectButton";
import { updateFilterStatus } from "../../slices/taskSlice";
import Modal from "./Modal";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.task.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <nav className="flex items-center justify-between h-[60px]">
      <Button
        classname="text-white transition bg-slate-800 hover:bg-slate-700"
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </Button>

      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
        ariaLabel="Filter Status"
      >
        <option value="all">All</option>
        <option value="to_do">TO DO</option>
        <option value="in_progress">IN PROGRESS</option>
        <option value="review">REVIEW</option>
        <option value="reject">REJECT</option>
        <option value="done">DONE</option>
      </SelectButton>
      <Modal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </nav>
  );
};

export default Navbar;
