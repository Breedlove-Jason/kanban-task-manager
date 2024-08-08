/**
 * This file defines the Redux slice for managing boards in the Kanban application.
 * It includes actions and reducers for adding, editing, deleting, and managing boards and tasks.
 */

import { createSlice } from "@reduxjs/toolkit"; // Import the createSlice function from Redux Toolkit
import data from "../data/data.json"; // Import initial data from a JSON file

// Create a slice for boards
const boardsSlice = createSlice({
  name: "boards", // Name of the slice
  initialState: data.boards, // Initial state from the imported data
  reducers: {
    /**
     * Add a new board to the state.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    addBoard: (state, action) => {
      const isActive = state.length === 0; // Set the new board as active if it's the first board
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns; // Add new columns to the board
      state.push(board); // Add the new board to the state
    },
    /**
     * Edit the currently active board.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      board.name = payload.name; // Update the board name
      board.columns = payload.newColumns; // Update the board columns
    },
    /**
     * Delete the currently active board.
     * @param {Array} state - The current state of the boards.
     */
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive); // Find the active board
      state.splice(state.indexOf(board), 1); // Remove the active board from the state
    },
    /**
     * Set a board as active based on its index.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false); // Set the board as active if the index matches
        return board;
      });
    },
    /**
     * Add a new task to a specific column in the active board.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive); // Find the active board
      const column = board.columns.find((col, index) => index === newColIndex); // Find the specified column
      column.tasks.push(task); // Add the new task to the column
    },
    /**
     * Edit an existing task in the active board.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      const column = board.columns.find((col, index) => index === prevColIndex); // Find the previous column
      const task = column.tasks.find((task, index) => index === taskIndex); // Find the task to edit
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return; // If the column hasn't changed, return
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex); // Remove the task from the previous column
      const newCol = board.columns.find((col, index) => index === newColIndex); // Find the new column
      newCol.tasks.push(task); // Add the task to the new column
    },
    /**
     * Move a task from one column to another within the active board.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      const prevCol = board.columns.find((col, i) => i === prevColIndex); // Find the previous column
      const task = prevCol.tasks.splice(taskIndex, 1)[0]; // Remove the task from the previous column
      board.columns.find((col, i) => i === colIndex).tasks.push(task); // Add the task to the new column
    },
    /**
     * Toggle the completion status of a subtask.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      const col = board.columns.find((col, i) => i === payload.colIndex); // Find the column
      const task = col.tasks.find((task, i) => i === payload.taskIndex); // Find the task
      const subtask = task.subtasks.find((subtask, i) => i === payload.index); // Find the subtask
      subtask.isCompleted = !subtask.isCompleted; // Toggle the completion status
    },
    /**
     * Set the status of a task and move it to a new column if necessary.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex); // Find the current column
      if (payload.colIndex === payload.newColIndex) return; // If the column hasn't changed, return
      const task = col.tasks.find((task, i) => i === payload.taskIndex); // Find the task
      task.status = payload.status; // Update the task status
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex); // Remove the task from the current column
      const newCol = columns.find((col, i) => i === payload.newColIndex); // Find the new column
      newCol.tasks.push(task); // Add the task to the new column
    },
    /**
     * Delete a task from a specific column in the active board.
     * @param {Array} state - The current state of the boards.
     * @param {Object} action - The action object containing the payload.
     */
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive); // Find the active board
      const col = board.columns.find((col, i) => i === payload.colIndex); // Find the column
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex); // Remove the task from the column
    },
  },
});

export default boardsSlice; // Export the boards slice
