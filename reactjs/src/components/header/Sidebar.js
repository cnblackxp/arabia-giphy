import React from 'react';

export class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const cssClasses = 
      this.props.collapsed ? 
        "sidebar sidebar-collapsed":
        "sidebar";
    
    
    
    return (
      <div className={cssClasses}>
        <ul className="sidebar-list"> 
          <li onClick={() => this.props.onCloseSidebar()}><b>&gt;</b></li>
          {
            this.props.searchTerms.map((el, i) => 
                <li 
                  key={el} 
                  className={this.props.currentSearchTerm === i ? 'selected': null}
                  onClick={() => this.props.loadImages(i)}>
                  {el.split('+').join(' ')}
                </li>
              )
          }
          {/* <li data-search="weather" className="selected">Weather</li>
          <li data-search="Forecast">Forecast</li>
          <li data-search="storms">Storms</li>
          <li data-search="hurrican">Hurrican</li>
          <li data-search="heat+wave">Heat Wave</li> */}
        </ul>
      </div>
    );
  }
}