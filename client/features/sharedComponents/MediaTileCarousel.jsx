import React from 'react';

import { Logger } from '../../../logger.js'
import TempMediaTile from './TempMediaTile.jsx';
import './MediaTileCarousel.css';

class MediaTileCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.containerElement = React.createRef();

    window.addEventListener('resize', this.handleResize);

    this.containerWidth = 0;
    this.tileWidth = 0;
    this.maxScroll = 0;
    this.navLeftSymbol = String.fromCharCode(12296);
    this.navRightSymbol = String.fromCharCode(12297);

    this.state = {
      showLeftNav: false,
      showRightNav: false
    };
  }

  resetState() {
    this.setState({
      showLeftNav: false,
      showRightNav: false
    });
  }

  refreshState(scrollPosition) {
    this.setState({
      showLeftNav: scrollPosition !== 0,
      showRightNav: scrollPosition < this.maxScroll
    });
  }

  navsDisplayed() {
    return this.state.showLeftNav || this.state.showRightNav;
  }

  handleAction(productId) {
    this.props.compare(productId);
  }

  handleScroll(event) {
    if (this.containerWidth > event.target.clientWidth) {
      this.refreshState(event.target.scrollLeft);
    } else {
      this.resetState();
    }
  }

  handleNav(event) {
    const tileContainer = this.containerElement.current;
    const cmd = event.currentTarget.id;

    if (cmd === 'mtc-right-nav') {
      tileContainer.scrollLeft += this.tileWidth + 8;
    } else {
      tileContainer.scrollLeft -= this.tileWidth - 8;
    }
  }

  handleResize() {
    const tileContainer = this.containerElement.current;
    this.containerWidth = tileContainer?.scrollWidth;
    if (this.containerWidth && this.containerWidth < window.innerWidth) {
      this.resetState();
    } else {
      const position = tileContainer.scrollLeft;
      this.maxScroll = this.containerWidth - tileContainer.clientWidth;
      this.refreshState(position);
    }
  }

  componentDidMount() {
    // console.log('MT scroll container', this.containerElement);
    const tileContainer = this.containerElement.current;
    if (tileContainer) {
      this.tileWidth = tileContainer.firstChild.offsetWidth;
      // console.log('242?', this.tileWidth);
      this.containerWidth = tileContainer.scrollWidth;
      // console.log(this.containerWidth);
      if (this.containerWidth > window.innerWidth) {
        this.maxScroll = this.containerWidth - window.innerWidth;
        this.setState({
          showRightNav: true
        });
      } else {
        this.maxScroll = 0;
      }
    }
  }

  componentDidUpdate() {
    const tileContainer = this.containerElement.current;
    if (tileContainer && tileContainer.scrollWidth !== this.containerWidth) {
      // console.log(tileContainer.scrollWidth, this.containerWidth);
      this.containerWidth = tileContainer.scrollWidth;
      if (this.containerWidth > window.innerWidth) {
        const nextMaxOffset = this.containerWidth - tileContainer.clientWidth;
        if (this.maxScroll !== nextMaxOffset) {
          this.maxScroll = nextMaxOffset;
          // console.log('tile width:', this.tileWidth);
          // console.log('View width:', tileContainer.clientWidth);
          // console.log('Container width:', this.containerWidth);
          // console.log('Max left offset:', this.maxScroll);
          // this.tileWidth = tileContainer.firstChild.offsetWidth;
          this.setState({
            containerLeftOffset: 0,
            showLeftNav: false,
            showRightNav: true
          });
        }
      } else {
        this.resetState();
      }
    }
  }

  render() {
    const { containerElement, navLeftSymbol, navRightSymbol, handleScroll, handleAction } = this;
    const { mediaIds, checkCache, updateCache, label, tempData } = this.props;
    const { containerLeftOffset, showLeftNav, showRightNav } = this.state;

    let key = 0;
    return (
      <div id={`MediaTileCarousel-${label}`} className="mtc-carousel" >
        <span className='mtc-component-title'>{ label || 'Media Tile Carousel' }</span>
        <div className='mtc-viewport'>
          {
            showLeftNav
            ? <div id='mtc-left-nav'
                className='mtc-nav mtc-nav-left'
                onClick={ this.handleNav }>
                <span className='mtc-nav-symbol'>{ navLeftSymbol }</span>
              </div>
            : null
          }
          <div className='mtc-tile-container' onScroll={ handleScroll } ref={ containerElement }  >{
            Array.isArray(tempData) && tempData.length
            ? (
              tempData.map((tile, i) => (
                <TempMediaTile
                  key={`mt${i++}`}
                  title={ tile.title }
                  imgUrl={ tile.imgUrl } />
              ))
            )
            : (
              <div className='mtc-tile mtc-tile-placeholder'>Searching...</div>
            )}
          </div>
          {
            showRightNav
            ? <div id='mtc-right-nav'
                className='mtc-nav mtc-nav-right'
                onClick={ this.handleNav }>
                <span className='mtc-nav-symbol'>{ navRightSymbol }</span>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default MediaTileCarousel;
