import React from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'



class Brewery extends React.Component {

  state = { brewery: [] }

  componentDidMount() {
    axios.get(`/api/brewery/${this.props.match.params.name}`)
      .then(res => this.setState({brewery: res.data.entries[0]}))
  }




  render() {

    const {brewery} = this.state

    return (
      <div>
        <br />

        <Card>
          <Card.Content>
            <Card.Header>
              {brewery.name}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            {brewery.description}
          </Card.Content>
        </Card>
        
      </div>
    )
  }

}



export default Brewery