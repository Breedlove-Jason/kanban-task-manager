import logo from "../../assets/logo-mobile.svg";
import iconDown from "../../assets/icon-chevron-down.svg";
import iconUp from "../../assets/icon-chevron-up.svg";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import HeaderDropdown from "../headerDropdown/HeaderDropdown.jsx";
import AddEditBoardModal from "../../modals/AddEditBoardModal.jsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

/**
 * Header component for the Kanban application.
 *
 * @param {Object} props - Component props.
 * @param {function} props.setBoardModalOpen - Function to set the board modal open state.
 * @param {boolean} props.boardModalOpen - State indicating if the board modal is open.
 * @returns {JSX.Element} - The rendered Header component.
 */
function Header({ setBoardModalOpen, boardModalOpen }) {
  const dispatch = useDispatch();
  // State to manage the visibility of the dropdown menu
  const [openDropdown, setOpenDropdown] = useState(false);

  // State to manage the type of board operation (add/edit)
  const [boardType] = useState("add");

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  return (
    <div className={"p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0"}>
      <header className={"flex justify-between dark:text-white items-center"}>
        {/* Left Side */}
        <div className={"flex items-center space-x-2 md:space-x-4"}>
          <img src={logo} alt={"Logo"} className={"h-6 w-6 "} />
          <h3
            className={"hidden md:inline-block font-bold font-sans md:text-4xl"}
          >
            Kanban
          </h3>
          <div className={"flex items-center"}>
            <h3
              className={
                "truncate max-w-[200px] md:text-2xl text-x1 font-bold md:ml20 font-sans"
              }
            >
              {activeBoard.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt={"dropdown icon"}
              className={"w-3 ml-2 md:hidden"}
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>
        <div className={"flex space-x-4 items-center md:space-x-6"}>
          <button className={"hidden md:block button"}>+ Add New Task</button>
          <button className={"button py-1 px-3 md:hidden"}>+</button>
          <img
            src={ellipsis}
            alt={"ellipsis"}
            className={"cursor-pointer h6"}
          />
        </div>
      </header>
      {openDropdown && (
        <HeaderDropdown
          setBoardOpenModal={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
    </div>
  );
}

Header.propTypes = {
  setBoardModalOpen: PropTypes.func.isRequired,
  boardModalOpen: PropTypes.bool.isRequired,
};

export default Header;
