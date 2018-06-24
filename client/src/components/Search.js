import React from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'



class Search extends React.Component{
  state= {search: "", results:[], page: 12}


  handleChange = (e) => {
    const {target: {name, value}} = e;
    this.setState({ [name]: value})
    if (this.state.search.length > 2){
      axios.get(`/api/search_all?query=${this.state.search}&per_page=${this.state.page}`)
        .then(res => this.setState({results: res.data.entries}))
    }
  }

  render(){
    const {search, results} = this.state
    return(
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
  )
  }




}

export default Search

