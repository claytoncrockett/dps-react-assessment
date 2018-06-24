import React from 'react';
import { Card } from 'semantic-ui-react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';





class Breweries extends React.Component {
  state = { breweries: [], page: 12 }


  render() {
    const { breweries } = this.state
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          axios.get(`/api/all_breweries?per_page=${this.state.page}`)
            .then(res => this.setState({ breweries: res.data.entries, page: this.state.page + 12 }))
        }}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div>
          <br />
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