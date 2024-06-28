import React, { Component } from 'react';
import Sidebar from './Sidebar';
import IconLegend from './IconLegend';
import Node from './Node';
import '../stylesheets/PathfindingVisualizer.css';
import { dijkstra, getNodesOfShortestPath } from '../algorithms/dijkstra';

let startNodeRow = 9;
let startNodeCol = 10;
let finishNodeRow = 9;
let finishNodeCol = 40;

class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      nodeType: '',
      mouseIsPressed: false,
      startNodeIsPressed: false,
      finishNodeIsPressed: false
    };
    this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  componentDidMount() {
    const grid = gridInit();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const { grid, startNodeIsPressed, finishNodeIsPressed } = this.state;

    if (row === startNodeRow && col === startNodeCol) {
      this.setState({ startNodeIsPressed: true });
    } else if (row === finishNodeRow && col === finishNodeCol) {
      this.setState({ finishNodeIsPressed: true });
    } else {
      const gridWithWall = updateGrid(
        grid,
        startNodeIsPressed,
        finishNodeIsPressed,
        row,
        col
      );
      this.setState({ grid: gridWithWall });
    }
    this.setState({ mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const { grid, startNodeIsPressed, finishNodeIsPressed } = this.state;
    const newGrid = updateGrid(
      grid,
      startNodeIsPressed,
      finishNodeIsPressed,
      row,
      col
    );
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      startNodeIsPressed: false,
      finishNodeIsPressed: false
    });
  }

  animateDijkstra(visitedNodes, nodesOfShortestPath) {
    document.getElementById('start-button').className =
      'btn btn-danger disabled';
    document.getElementById('reset-button').className =
      'btn btn-link disabled';

    for (let i = 0; i <= visitedNodes.length - 1; i++) {
      const node = visitedNodes[i];
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          this.animatePath(nodesOfShortestPath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        if (node.row === startNodeRow && node.col === startNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start node-visited';
        } else if (node.row === finishNodeRow && node.col === finishNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish node-visited';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 5 * i);
    }
  }

  animatePath(nodesOfShortestPath) {
    for (let i = 0; i <= nodesOfShortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = nodesOfShortestPath[i];
        if (i === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start node-path';
        } else if (i === nodesOfShortestPath.length - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish node-path';
          document.getElementById('start-button').className =
            'btn btn-success';
          document.getElementById('reset-button').className =
            'btn btn-link';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-path';
        }
      }, 5 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodes = dijkstra(grid, startNode, finishNode);
    const nodesOfShortestPath = getNodesOfShortestPath(finishNode);
    this.animateDijkstra(visitedNodes, nodesOfShortestPath);
  }

  resetGrid() {
    const grid = gridInit();
    for (let row = 0; row < grid.length; row++) {
      let currentRow = grid[row];
      for (let col = 0; col < currentRow.length; col++) {
        if (row === 9 && col === 10) {
          document.getElementById(`node-${row}-${col}`).className =
            'node node-start';
        } else if (row === 9 && col === 40) {
          document.getElementById(`node-${row}-${col}`).className =
            'node node-finish';
        } else {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
    this.setState({ grid });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div className='visualizer-container'>
        <Sidebar
          handleStart={this.visualizeDijkstra}
          resetGrid={this.resetGrid}
        />
        <div className='main-content'>
        <div className='icon-legend-container'>
            <IconLegend />
          </div>
         
          <div className='grid'>
            {grid.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className='row-spacing'>
                  {row.map((node, nodeIndex) => {
                    const { row, col, isStart, isFinish, isWall } = node;
                    return (
                      <Node
                        key={nodeIndex}
                        row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const gridInit = () => {
  const grid = [];
  startNodeRow = 9;
  startNodeCol = 10;
  finishNodeRow = 9;
  finishNodeCol = 40;
  for (let row = 0; row < 18; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    isWall: false,
    isVisited: false,
    distance: Infinity,
    previous: null
  };
};

const updateGrid = (
  grid,
  startNodeIsPressed,
  finishNodeIsPressed,
  newRow,
  newCol
) => {
  const newGrid = grid.slice();
  const node = newGrid[newRow][newCol];

  if (startNodeIsPressed) {
    const previousNode = newGrid[startNodeRow][startNodeCol];
    const updatePreviousNode = {
      ...previousNode,
      isStart: false
    };

    newGrid[startNodeRow][startNodeCol] = updatePreviousNode;
    startNodeRow = newRow;
    startNodeCol = newCol;

    const newStartNode = {
      ...node,
      isStart: node.row === startNodeRow && node.col === startNodeCol
    };
    newGrid[newRow][newCol] = newStartNode;
  } else if (finishNodeIsPressed) {
    const previousNode = newGrid[finishNodeRow][finishNodeCol];
    const updatePreviousNode = {
      ...previousNode,
      isFinish: false
    };

    newGrid[finishNodeRow][finishNodeCol] = updatePreviousNode;
    finishNodeRow = newRow;
    finishNodeCol = newCol;

    const newFinishNode = {
      ...node,
      isFinish: node.row === finishNodeRow && node.col === finishNodeCol
    };
    newGrid[newRow][newCol] = newFinishNode;
  } else {
    const newWallNode = {
      ...node,
      isWall: !node.isWall
    };

    newGrid[newRow][newCol] = newWallNode;
  }

  return newGrid;
};

export default PathfindingVisualizer;
