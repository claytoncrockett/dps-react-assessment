import React from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller';




class Search extends React.Component {
  state = { search: "", results: [], page: 3 }


  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value, page: 3 })

  }

  render() {
    const { search, results, page } = this.state
    return (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            axios.get(`/api/search_all?query=${this.state.search}&per_page=${this.state.page}`)
              .then(res => this.setState({ results: res.data.entries, page: this.state.page + 3 }))
          }}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
      <div>
        <input
          name="search"
          placeholder="Search..."
          value={search}
          onChange={this.handleChange}
        />

          <br /><br />
          <Card.Group itemsPerRow={3}>
            {results.map((r, i) =>
              <Card key={i}>
                <Card.Header>
                  {r.name}
                </Card.Header>
                <Card.Content extra>
                  {r.description}
                </Card.Content>
              </Card>

            )}
          </Card.Group>


        </div>
        </InfiniteScroll>
        )
        }
      
      
      
      
      }
      
      export default Search
      
