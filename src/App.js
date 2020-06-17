import React from 'react';

import { Grid } from '@material-ui/core';

import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';



class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null
  }

  componentDidMount() {
    console.log(this.state.selectedVideo);
    if (this.state.selectedVideo == null) {
      this.handleSubmit('Bafoussam');
    }

  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }

  handleSubmit = async (SearchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyAqQB6RONNE1vVnY9sNMd186kLVoyvt-wY',
        q: SearchTerm
      }
    });
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <Grid justify="center" container >
        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
