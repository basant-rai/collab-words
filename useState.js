let state = [];
let stateIndex = 0;

function useState(initialValue) {

  console.log("👀 ~ useState ~ initialValue:", initialValue)
  // Check if state already exists for this index, otherwise initialize it
  state[stateIndex] = state[stateIndex] || initialValue;

  const setState = (newValue) => {
    // This is the closure. It remembers the 'stateIndex' and the 'state' array.
    state[stateIndex] = newValue;
    // In a real application, this would trigger a re-render
    // For this example, we just log the new state.
    console.log(`State at index ${stateIndex} updated to:`, state[stateIndex]);
  };

  // Return an array with the current state and the setter function
  const result = [state[stateIndex], setState];

  // Increment the index to handle multiple useState calls
  stateIndex++;

  return result;
}

// Example of using our simplified useState
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  // To simulate the component rendering, we'll just log
  console.log(`Current count:`, count);

  return {
    handleClick,
    count
  };
}

// Simulate a component rendering and getting its state
const myComponent = Counter();
myComponent.handleClick();
myComponent.handleClick();
myComponent.handleClick();
myComponent.handleClick();
myComponent.handleClick();
myComponent.handleClick();
myComponent.handleClick();
console.log("count", myComponent.count); // Output: Current count: 0

