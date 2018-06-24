import React from 'react';
import { Card } from 'semantic-ui-react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';




class Breweries extends React.Component {
  state = { breweries: [], page: 12, search: "", long: false, url: '/api/all_breweries?per_page=' }


  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value })
    this.checkLength()
  }

  checkLength = () => {
    if (this.state.search.length >= 1) {
      this.setState({ breweries: [], long: true, url: `/api/search_breweries?query=${this.state.search}&per_page=`, page: 12 })
    } else {
      this.setState({ long: false, url: '/api/all_breweries?per_page=', page: 12 })
    }
  }



  render() {
    const { breweries, search, url, page } = this.state
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          axios.get(`${url}${page}`)
            .then(res => this.setState({ breweries: res.data.entries, page: page + 12 }))
        }}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <input
          name="search"
          placeholder="Search..."
          value={search}
          onChange={this.handleChange}
        />
        <div>
          <br />
          <br /><br />
          <Card.Group itemsPerRow={3}>
            {breweries.map((b, i) =>
              <Card key={i}>
                <Card.Header>
                  <Link to={`/breweries/${b.name}`}> {b.name} </Link>
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

export default Breweries