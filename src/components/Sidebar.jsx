import React from 'react';
import { FaPlay, FaRedo } from 'react-icons/fa';
import '../stylesheets/Sidebar.css';

const Sidebar = ({ handleStart, resetGrid }) => (
  <div className='sidebar'>
    <h2 className='sidebar'>Dijkstra's Algorithm</h2>
    <button id='start-button' onClick={handleStart} className='btn btn-success'>
      <FaPlay className='icon' /> Start
    </button>
    <button id='reset-button' onClick={resetGrid} className='btn btn-success'>
      <FaRedo className='icon' /> Reset
    </button>
  </div>
);

export default Sidebar;
