export function dijkstra(grid, startNode, finishNode) {
  const visitedNodes = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(currNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeightbors(currNode, grid);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = currNode.distance + 1;
    neighbor.previous = currNode;
  }
}

function getUnvisitedNeightbors(currNode, grid) {
  const neighbors = [];
  const { row, col } = currNode;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesOfShortestPath(finishNode) {
  const nodesOfShortestPath = [];
  let currNode = finishNode;

  while (currNode != null) {
    nodesOfShortestPath.unshift(currNode);
    currNode = currNode.previous;
  }

  return nodesOfShortestPath;
}

export function getTotalPathWeight(nodesOfShortestPath) {
  let totalPathWeight = 0;

  for (const node of nodesOfShortestPath) {
    totalPathWeight += node.distance;
  }

  return totalPathWeight;
}
