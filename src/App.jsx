import Header from "./components/header/Header.jsx";
import Center from "./components/center/Center.jsx";
import { useState } from "react";

/**
 * Main application component.
 *
 * @returns {JSX.Element} - The main application component.
 */
function App() {
  // State to manage the visibility of the board modal
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Center Section */}
      <Center />
    </div>
  );
}

export default App;
