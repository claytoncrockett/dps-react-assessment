import React from 'react';
import { Card } from 'semantic-ui-react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';



class Beers extends React.Component {
  state = { beers: [], page: 12 }


  render() {
    const { beers } = this.state
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          axios.get(`/api/all_beers?per_page=${this.state.page}`)
            .then(res => this.setState({ beers: res.data.entries, page: this.state.page + 12 }))
        }}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div>
          <br />
          <Card.Group itemsPerRow={3}>
            {beers.map((b, i) =>
              <Card key={i}>
                <Card.Header>
                  {b.name}
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