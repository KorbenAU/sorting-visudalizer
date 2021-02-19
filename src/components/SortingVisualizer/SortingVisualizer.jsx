import React, { Component } from 'react';
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
} from '../../SortingAlgorithms/SortingAlgorithms';
import './SortingVisualizer.css';
import { Button } from './SortingVisualizer.styled';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SWAP_COLOR = 'yellow';

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

  mergeSort = () => {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };
  quickSort = () => {};
  heapSort = () => {};
  bubbleSort = () => {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const { action, indicies } = animations[i];
      const [barOneIdx, barTwoIdx] = indicies;
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      switch (action) {
        case 'comparing':
          setTimeout(() => {
            console.log(`compare: ${barOneIdx}, ${barTwoIdx}`);
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 'swap':
          setTimeout(() => {
            console.log(
              `swap: ${barOneIdx}, ${barTwoIdx} | ${barOneStyle.height}, ${barTwoStyle.height}`
            );
            barOneStyle.backgroundColor = SWAP_COLOR;
            barTwoStyle.backgroundColor = SWAP_COLOR;
            const temp = barOneStyle.height;
            barOneStyle.height = `${barTwoStyle.height}`;
            barTwoStyle.height = `${temp}`;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 'finish':
          setTimeout(() => {
            console.log(
              `finish: ${barOneIdx}, ${barTwoIdx} | ${barOneStyle.height}, ${barTwoStyle.height}`
            );
            console.log();
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  };

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

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
          <Button onClick={this.resetArray}>Generate New Array</Button>
          <Button onClick={this.mergeSort}>Merge Sort</Button>
          <Button onClick={this.quickSort}>Quick Sort</Button>
          <Button onClick={this.heapSort}>Heap Sort</Button>
          <Button onClick={this.bubbleSort}>Bubble Sort</Button>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
