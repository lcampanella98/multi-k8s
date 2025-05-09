import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const values = await axios.get('/api/values/current');
      console.log({values});
      this.setState({ values: values.data });
    } catch (err) {
      console.error('Failed to fetch current values:', err);
      this.setState({ values: {} }); // Or keep previous values
    }
  }
  
  async fetchIndexes() {
    try {
      const seenIndexes = await axios.get('/api/values/all');
      console.log({seenIndexes});
      this.setState({ seenIndexes: seenIndexes.data });
    } catch (err) {
      console.error('Failed to fetch seen indexes:', err);
      this.setState({ seenIndexes: [] }); // Or keep previous indexes
    }
  }
  

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    if (Array.isArray(this.state.seenIndexes)) {
      return this.state.seenIndexes.map(({ number }) => number).join(', ');
      
    }
    return "No seen indexes";
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
