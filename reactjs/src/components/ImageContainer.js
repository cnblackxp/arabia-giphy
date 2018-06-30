import React from 'react';

export class ImageContainer extends React.Component {
  render() {

    let element = (
      <div id="img-container" className="row">
            <div className='loading'>Loading ...</div>
        </div>
    );

    if (this.props.imgs.length > 0) {
      let columns = [];
      let colImgs = [];
      const imgs = this.props.imgs;
      //let html = "";
      let els = 0;
      let col = 0;
      imgs.forEach((el, i) => {
        if (els === 0)
          columns[col] = [];
        els++;
        // {/*onclick="viewImage('${el.images.original.url}', '${el.title}')"*/}
        colImgs.push(
          <img src={el} key={i} alt={el} className="img" onClick={() => this.props.openFullView(el)} />
        )
        if (els === 6) {
          columns[col].push(colImgs);
          col++;
          colImgs = [];
          els = 0;
        }
      });

      console.log(columns)

      element = (
        <div className="row">
          {columns.map((el, i) => 
            <div className="column" key={i}>{el.map((img, i) => img)}</div>
          )}
        </div>
      );
    }

    return (
      <div className="container">
        {element}
      </div>
    );
  }
}