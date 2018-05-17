import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
  }

  // componentWillMount() {
  //   this.setLink();
  // }

  componentDidMount() {
    this.setLink();
  }

  // setLink() {
  //   window.db.collection('artists')
  //     .aggregate({ $sample: { size: 100 } })
  //     .toArray()
  //     .then((artists) => {
  //       const artist = artists[~~(Math.random() * artists.length)];

  //       if (artist) {
  //         this.setState({ id: artist._id.toString() });
  //       }
  //     });
  // }

  setLink() {
    // .aggregate({ $sample: { size: 100 } })
    //     .toArray()
    axios.get('/api/artist-all')
    .then (res => {
        // console.log('res.data: ',res.data);
        return res.data;
    })
    .then ((artists) => {
      const artist = artists[~~(Math.random() * artists.length)];

      if (artist) {
        // console.log('Header: bf setState: artist: ',artist);
        this.setState({ id: artist._id.toString() });
        // console.log('Header: after setState: this.state.id', this.state.id);
      }
    });
  }

  displayArtist() {
    if (this.state.id) {
      history.push(`/artists/${this.state.id}`);
      this.setLink();
    }
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">UpStar Music</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li onClick={this.displayArtist.bind(this)}>
                    Random Artist
                </li>
                <li>
                  <Link to={'/artists/new'}>
                    Create Artist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;
