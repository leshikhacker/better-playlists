import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Alexis',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {
            name: 'A Moment In a Million Years',
            duration: 1345
          },
          {
            name: 'Because I Want You',
            duration: 1345
          },
          {
            name: 'Best Day',
            duration: 1345
          }
        ]
      },
      {
        name: 'Discover weekly',
        songs: [
          {
            name: 'Save me',
            duration: 1345
          },
          {
            name: 'Words',
            duration: 1345
          },
          {
            name: 'Better together',
            duration: 1345
          }
        ]
      },
      {
        name: 'Shazamed',
        songs: [
          {
            name: 'The Keeper',
            duration: 1345
          },
          {
            name: 'Carnival of Rust',
            duration: 1345
          },
          {
            name: 'Hallelujah',
            duration: 1345
          }
        ]
      },
      {
        name: 'New one',
        songs: [
          {
            name: 'Roses',
            duration: 1345
          },
          {
            name: 'Run',
            duration: 1345
          },
          {
            name: 'This Ain\'t Goodbye',
            duration: 1345
          }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2 style={defaultStyle}>{this.props.playlists.length} text</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);

    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2 style={defaultStyle}>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, 'font-size': '54px'}}>
        <input type="text"/>

      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={defaultStyle}>{this.state.serverData.user.name}'s Playlist</h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            {
              this.state.serverData.user.playlists.map(playlist => 
                <Playlist playlist={playlist} />
              )

            }
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  } 
}

export default App;
