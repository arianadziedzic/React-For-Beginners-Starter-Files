import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super();
    //  get initial state
    this.state = {
      fishes: {},
      order: {}
    };
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this. loadSamples.bind(this);
  }
  addFish(fish) {
    // update state
    // ... is the spread. below is taking a copy of the state
    const fishes = {...this.state.fishes};
    // timestamps, in order to assign it to fish instance on creation
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // sets state
    this.setState({ fishes });
  }
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

export default App;
