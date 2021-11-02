import React from 'react';
import './Home.css';
// import TempDisplay1 from '../Search/TempDisplay1';
import Temp from './Temp';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggested: [],
      trending: [],
      history: []
    }
  }

  componentDidMount() {
    // const validProps = this.props.data.suggested.length > 0 && this.props.data.trending > 0 && this.props.data.history > 0;
    axios.get('/home/homePage').then(({data}) => {
      this.setState({
        suggested: data.suggested,
        trending: data.trending,
        history: data.history
      })
    })

  }

  render () {
    return (
      
      <div>
      <div id="Search">
        <div className='test'>
          <h1 className='search-header'>Stream Finder</h1>
        </div>
        <input 
          className='search-box' 
          type="text"
          placeholder='search a movie to display streaming providers 🎣' 
        />
        <button 
          // onClick={this.handleClick} - figure out something here
          className='search-button'>Search
        </button>
      </div>
      <h2 className='s-header-home'>suggested</h2>
      {this.state.suggested ? 
        <Temp data={this.state.suggested}/> 
      :
        <div>loading</div>
      }
  
      <h2 className='t-header-home'>Trending</h2>
      {this.state.suggested ? 
        <Temp data={this.state.trending}/> 
      :
        <div>loading</div>
      }
  
  
      <h2 className='h-header-home'>History</h2>
      {this.state.suggested ? 
        <Temp data={this.state.history}/> 
      :
        <div>loading</div>
      }
  
    </div>
    )
      
  }
}

export default Home;
