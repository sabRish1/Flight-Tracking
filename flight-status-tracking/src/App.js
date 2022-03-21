import logo from './logo.svg';
import './App.css';
import Test from './sections/test'
import FilterComponent from './sections/filterComponent/filtercomponent'
import { Container, Row, Col } from 'react-bootstrap'

const headingstyle = {
   'textAlign': 'center','font-size': 'xxx-large','font-weight': '800'
}
function App() {
  return (
    <div>
      <Container>
        <Row className='m-1'><div style={headingstyle}>Flight Status Tracking</div> </Row>
        <Row>
          <Col><FilterComponent></FilterComponent></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
