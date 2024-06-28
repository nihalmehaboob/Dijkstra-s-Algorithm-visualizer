import React from 'react';
import '../stylesheets/IconLegend.css';

const IconLegend = () => (
  <div>
    <ul id='icon-legend'>
      <li className='icon-label'>
        Start Node{' '}
        <img
          className='icon'
          src={require('../icons/arrow-right.png')}
          alt='start-node-icon'
        />
      </li>
      <li className='icon-label'>
        Endpoint Node{' '}
        <img
          className='icon'
          src={require('../icons/waypoint.png')}
          alt='endpoint-node-icon'
        />
      </li>
      <li className='icon-label'>
        Wall Node{' '}
        <img
          className='icon'
          src={require('../icons/wall-node.png')}
          alt='wall-node-icon'
        />
      </li>
      <li className='icon-label'>
        Visited Node{' '}
        <img
          className='icon'
          src={require('../icons/visited-node.png')}
          alt='visited-node-icon'
        />
      </li>
      <li className='icon-label'>
        Unvisited Node{' '}
        <img
          className='icon'
          src={require('../icons/unvisited-node.png')}
          alt='unvisited-node-icon'
        />
      </li>
      <li className='icon-label'>
        Shortest-path Node{' '}
        <img
          className='icon'
          src={require('../icons/shortest-path.png')}
          alt='path-node-icon'
        />
      </li>
    </ul>
  </div>
);

export default IconLegend;
