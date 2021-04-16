import { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import axios from 'axios'

function App() {

  const [randomUserState, setRandomUserState] = useState({
    users: [],
    columns: [
      {
        Header: 'name',
        accessor: 'name',
        filterable: true
      },
      {
        Header: 'email',
        accessor: 'email',
        filterable: true
      },
      {
        Header: 'phone',
        accessor: 'phone',
        filterable: true
      },
      {
        Header: 'cell',
        accessor: 'cell',
        filterable: true
      }
    ]
  })

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=50')
      .then(({ data }) => {
        const randoUsers = data.results.map(randoUser => ({
          name: `${randoUser.name.first} ${randoUser.name.last}`,
          email: randoUser.email,
          phone: randoUser.phone,
          cell: randoUser.cell
        })
        )
        console.log(randoUsers)
        setRandomUserState({ ...randomUserState, users: randoUsers })
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col xs='12'>
            <Jumbotron>
              <h1 className="display-3 text-center">Employee Directory</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col xs='12'>
            <ReactTable
              data={randomUserState.users}
              columns={randomUserState.columns}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App