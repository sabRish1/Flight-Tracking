import { Component } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'


export default class DetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterdetails: null,
            detailsData: []
        }
        this.style1 = {
            'font-size': 'larger',
            'font-weight': '600'
        }

        this.style2 = {
            'font-size': 'xxx-large'
        }

        this.style3 = {
            'font-size': 'small',
            'font-weight': '400'
        }
        this.style4 = {
            'margin': 'auto'
        }
    }

    async componentDidMount() {
        this.convertToArray(this.props.filterData);
    }

    convertToArray() {
        const tempData = this.props.filterData.data.results;
        if (tempData !== null) {
            var res = Object.keys(tempData).map(function (data) {
                var obj = [];
                obj.push(tempData[data]);
                return obj;
            });
            this.setState({ detailsData: res });
        }
    }

    getTime(val) {
        var time = new Date(val);
        return time.getUTCHours() + ':' + time.getUTCMinutes();
    }

    getDay(val) {
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        var day = new Date(val);
        return weekday[day.getUTCDay()] + ' ' + day.getUTCDate() + ' ' + month[day.getMonth()];
    }


    render() {
        return (
            <Container className='mt-3'>
                <Row xs={1} md={1} className="g-4">
                    {this.state.detailsData.map((_, idx) => (
                        <Col className='border rounded m-1 shadow p-3 bg-white rounded'>
                            <Row className='m-1'>
                                <Col sm={6} md={10} lg={10}>
                                    <Row className='mb-1' style={this.style1}>
                                        <Col className='p-0'>
                                            {this.props.origin.shortName + ' (' + this.props.origin.iataCode + ')'}
                                        </Col>
                                        <Col className='p-0'>
                                            {this.props.destination.shortName + ' (' + this.props.destination.iataCode + ')'}
                                        </Col>
                                    </Row>
                                    <Row className='mb-1'>
                                        <Col className=''>
                                            <Row className='mb-1' style={this.style3}>Departed:</Row>
                                            <Row className='mb-1' style={this.style2}>
                                                {this.getTime(_[0].flightRoute[0].departureTime.actual)}
                                            </Row>
                                            <Row className='mb-1' style={this.style3}>
                                                {this.getDay(_[0].flightRoute[0].departureTime.actual)}
                                            </Row>
                                            <Row className='mb-1' style={this.style3}>
                                                Scheluded Departure: {this.getTime(_[0].flightRoute[0].departureTime.schedule)}
                                            </Row>
                                        </Col>
                                        <Col className=''>
                                            <Row className='mb-1' style={this.style3}>Arrived:</Row>
                                            <Row className='mb-1' style={this.style2}>
                                                {this.getTime(_[0].flightRoute[0].arrivalTime.actual)}
                                            </Row>
                                            <Row className='mb-1' style={this.style3}>
                                                {this.getDay(_[0].flightRoute[0].arrivalTime.actual)}
                                            </Row>
                                            <Row className='mb-1' style={this.style3}>
                                                Scheluded Arrival: {this.getTime(_[0].flightRoute[0].arrivalTime.schedule)}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='justify-content-center lign-items-center' style={this.style4}>
                                    <Row>{_[0].airlineDesignator + ' ' + _[0].flightNumber}</Row>
                                </Col>
                                <Col>
                                    <Row>
                                        {_[0].flightRoute[0].statusCode === 'ARVD' && <Badge bg="success">Arrived</Badge>}
                                        {_[0].flightRoute[0].statusCode === 'PDEP' && <Badge bg="primary">Not Departed </Badge>}
                                        {_[0].flightRoute[0].statusCode !== 'ARVD' && _[0].flightRoute[0].statusCode !== 'PDEP' && <Badge bg="warning">Primary</Badge>}
                                    </Row>
                                </Col>

                            </Row>

                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}