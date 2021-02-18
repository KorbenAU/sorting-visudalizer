import React, { Component } from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    console.log('Compoennt did mount!');
    this.resetArray();
  }

  resetArray = () => {
    console.log('reset array');
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomIntFromInterval(10, 800));
    }
    this.setState({ array });
  };

  mergeSort = () => {};
  quickSort = () => {};
  heapSort = () => {};
  bubbleSort = () => {};

  render() {
    const { array } = this.state;
    return (
      <>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="controller">
          <button onClick={this.resetArray}>Generate New Array</button>
          <button onClick={this.mergeSort}>Merge Sort</button>
          <button onClick={this.quickSort}>Quick Sort</button>
          <button onClick={this.heapSort}>Heap Sort</button>
          <button onClick={this.bubbleSort}>Bubble Sort</button>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
