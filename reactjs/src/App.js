import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components/header/Navbar';
import { Sidebar } from './components/header/Sidebar';
import { ImageContainer } from './components/ImageContainer';
import { ImageFullView } from './components/ImageFullView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchTerm: 0,
      searchTerms: [
        'weather',
        'forecast',
        'storms',
        'hurrican',
        'heat+wave'
      ],
      sidebarCollapsed: true,
      imgs: [],
      currentFullView: undefined
    
    };
  }

  giphyApi(searchTerm) {
    return `https://api.giphy.com/v1/gifs/search?api_key=MnXeNoIc0AxJaRWF8zkl2WXcUV7Cpx5Y&q=${searchTerm}&limit=24`;
  }

  onOpenSidebar() {
    this.setState({
      sidebarCollapsed: false
    });
  }

  onCloseSidebar() {
    this.setState({
      sidebarCollapsed: true
    });
  }

  componentDidMount() {
    this.loadData(this.state.currentSearchTerm);
  }

  loadData(currSearchTerm) {
    fetch(this.giphyApi(this.state.searchTerms[currSearchTerm]))
      .then(result => result.json())
      .then(json => json.data)
      .then(imgs => {
        console.log(imgs);
        const imgUrls = imgs.map(el => el.images.preview_webp.url);
        console.log(imgUrls);
        this.setState({
          imgs: imgUrls,
          currentSearchTerm: currSearchTerm,
          sidebarCollapsed: true
        });
      });
  }

  openFullView(currentFullView) {
    this.setState({
      currentFullView
    })
  }

  closeFullView() {
    this.setState({
      currentFullView: undefined
    })
  }

  render() {
    return (
      <div>
        <Navbar 
          onMenuClick={() => this.onOpenSidebar()} />
        <ImageContainer 
          imgs={this.state.imgs}
          openFullView={(currentFullView) => this.openFullView(currentFullView )} />
        <ImageFullView
          currentFullView={this.state.currentFullView}
          closeFullView={()=> this.closeFullView()} />
        <Sidebar 
          onCloseSidebar={() => this.onCloseSidebar()} 
          collapsed={this.state.sidebarCollapsed}
          searchTerms={this.state.searchTerms}
          currentSearchTerm={this.state.currentSearchTerm}
          loadImages={(curr) => this.loadData(curr)} />
      </div>
    );
  }
}

export default App;
