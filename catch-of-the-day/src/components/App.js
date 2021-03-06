import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    //  get initial state
    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }
  componentWillMount() {
    // this runs right before the app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App components order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }
  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }
  addToOrder(key) {
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // updates state
    this.setState({ order });
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
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
