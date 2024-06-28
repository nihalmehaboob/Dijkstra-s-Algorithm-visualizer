// import React, { Component } from 'react';
// import '../stylesheets/Sidebar.css';

// class Sidebar extends Component {
//   render() {
//     return (
//       <div className='sidebar'>
//         <div className='sidebar-brand'>
//           <a href='#'>Dijkstra's Algorithm</a>
//         </div>
//         <div className='sidebar-content'>
//           <a className='nav-item nav-link about-header' href='#'>
//             About{' '}
//             <span className='about-desc'>
//               This application visualizes Dijkstra's Algorithm, finding the
//               shortest path between the start point and endpoint.
//             </span>
//           </a>
//           <a className='nav-item nav-link instructions-header' href='#'>
//             Instructions
//             <ul className='instructions'>
//               <li>
//                 Click and drag the <em>Start</em> and <em>Finish Nodes</em>{' '}
//                 to reposition them.
//               </li>
//               <hr />
//               <li className='second-tooltip'>
//                 Click on a single <em>Unvisited Node</em> or click and drag
//                 throughout the grid to create a wall.
//               </li>
//             </ul>
//           </a>
//           <div className='button-group'>
//             <a
//               id='start-button'
//               className='btn btn-outline-success'
//               href='#'
//               onClick={this.props.handleStart}
//               tabIndex='-1'
//               aria-disabled='true'
//             >
//               RUN Dijkstra's
//             </a>
//             <a
//               id='reset-button'
//               className='btn btn-outline-danger'
//               onClick={this.props.resetGrid}
//               href='#'
//               tabIndex='-1'
//               aria-disabled='true'
//             >
//               Reset
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Sidebar;
