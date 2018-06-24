import React from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'



class Beer extends React.Component {

  state = { beer: [] }

  componentDidMount() {
    axios.get(`/api/beer/${this.props.match.params.name}`)
      .then(res => this.setState({beer: res.data.entries[0]}))
  }




  render() {

    const {beer} = this.state

    return (
      <div>
        <br />
        <Card>
          <Card.Content>
            <Card.Header>
              {beer.name}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            {beer.description}
          </Card.Content>
        </Card>
        
      </div>
    )
  }

}



export default Beer