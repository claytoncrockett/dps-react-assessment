import React from 'react';
import { Card } from 'semantic-ui-react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';




class Beers extends React.Component {
  state = { beers: [], page: 12, search:"", long: false, url: '/api/all_beers?per_page=' }


  handleChange = (e) => {
    const {target: {name, value}} = e;
    this.setState({ [name]: value})
    this.checkLength()
  }

  checkLength() {
    if (this.state.search.length >= 1){
      this.setState({beers: [], long: true, url: `/api/search_beers?query=${this.state.search}&per_page=`, page:12})
    } else{
      this.setState({long: false, url: '/api/all_beers?per_page=', page:12})
    }
  }
  


  render() {
    const { beers, search, url, page } = this.state
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          axios.get(`${url}${page}`)
            .then(res => this.setState({ beers: res.data.entries, page: page + 12 }))
        }}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div>
          <br />
        <input
          name="search"
          placeholder="Search..."
          value={search}
          onChange={this.handleChange}  
        />
          <br /><br />
          <Card.Group itemsPerRow={3}>
            {beers.map((b, i) =>
              <Card key={i}>
                <Card.Header>
                  <Link to={`/beers/${b.name}`}> {b.name} </Link>
                </Card.Header>
                <Card.Content extra>
                  {b.description}
                </Card.Content>
              </Card>

            )}
          </Card.Group>
        </div>
      </InfiniteScroll>
    )
  }



}

export default Beers