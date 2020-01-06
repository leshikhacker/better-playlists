import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff'
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2 style={defaultStyle}>{this.props.playlists.length} playlists</h2>
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
        <h2 style={defaultStyle}>{(totalDuration / 3600).toFixed(2)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, fontSize: '54px'}}>
        <img src/>
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src={playlist.imageUrl} style={{width: '60px'}} />
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
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if(!accessToken)
      return;


    let headers = {'Authorization': 'Bearer ' + accessToken};

    fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => response.json())
    .then(data => this.setState({
        user: {name: data.display_name}
    }));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: headers
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items;
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {headers: headers});
        let trackDataPromise = responsePromise.then(response => response.json());
        return trackDataPromise;
      });

      let allTracksDatasPromises = Promise.all(trackDataPromises);
      
      let playlistPromise = allTracksDatasPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
          .map(
            item => item.track
          )
          .map(trackData => ({
            name: trackData.name,
            duration: trackData.duration_ms / 1000
          }));
        });
        return playlists;
      });

      return playlistPromise;
    })
    .then(playlists => 
      this.setState({
      playlists: playlists.map(item => ({
        name: item.name, 
        imageUrl: item.images[0].url,
        songs: item.trackDatas.slice(0, 3).map(trackData => (
          {
            name: trackData.name,
            duration: trackData.duration
          }
        ))
      }))
    }))
  }
  render() {
    let playlistsToRender = this.state.user && this.state.playlists ? 
      this.state.playlists.filter(playlist => {
        let matchesPlaylist = playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase());
        let matchesSong = playlist.songs.find(song => 
          song.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        );

        return matchesPlaylist || matchesSong;
      })
      :
      [];
    return (
      <div className="App">
        {
          this.state.user ?
          <div>
            <h1 style={defaultStyle}>{this.state.user.name}'s Playlist</h1>
              
            <PlaylistCounter playlists={playlistsToRender}/>
            <HoursCounter playlists={playlistsToRender}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {
              
              playlistsToRender.map(playlist => 
                <Playlist playlist={playlist} />
              )
            }            
          </div> : 
          <button 
            onClick={() => {
              window.location = window.location.href.includes('localhost') ?
                'http://localhost:8888/login'
                :
                'https://leshikhacker-bp-backend.herokuapp.com/login'
                ;
              }
            }
            style={{padding: '20px', fontSize: '50px', marginTop: '20px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  } 
}

export default App;
