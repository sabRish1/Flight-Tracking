import { Component } from 'react'
import { getListOfAirports } from '../../services/api/getListOfAirports'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DropDownComponent from '../dropDownComponent/dropdownComponent'
import DatePickerComponent from '../datePickerComponent/datePickerComponent'
import DetailsComponent from '../detailsComponent/detailsComponent'
import { getDetails } from '../../services/api/getDetails';


export default class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAirports: null,
            dropDownData: [],
            origin: {},
            destination: {},
            date: '',
            showDetailsComponent: false,
            showError: false,
            filterdetails : null

        }
        this.style={ 'textAlign': 'center','color': '#b31414'}
        
    }

    async componentDidMount() {
        getListOfAirports().then(data => {
            this.setState({ listOfAirports: data });
            this.convertToArray();
        });
    }

    convertToArray() {
        const tempData = this.state.listOfAirports.data.results;

        var res = Object.keys(tempData).map(function (name) {
            var obj = [];
            obj.push(tempData[name]);
            return obj;
        });
        this.setState({ dropDownData: res });
    }

    setOrigin(data) {
        this.setState({ origin: data[0] }, this.check);

    }

    setDestination(data) {
        this.setState({ destination: data[0] }, this.check);

    }

    setDate(data) {
        this.setState({ date: data });
    }

    viewDetails() {
        this.setState({ showDetailsComponent: false  })
        var DepartureDate = this.state.date.toISOString().split('T')[0];
        var origin = this.state.origin.iataCode;
        var destination = this.state.destination.iataCode;
        getDetails(DepartureDate, origin, destination).then(data => {
            this.setState({ filterdetails: data },this.showDetails);
            //this.convertToArray();
        });
        
    }

    showDetails(){
        this.setState({ showDetailsComponent: true })
    }

    check() {
        if (Object.keys(this.state.origin).length !== 0 && Object.keys(this.state.destination).length !== 0) {
            this.state.origin.iataCode === this.state.destination.iataCode ?
                this.setState({ showError: true }) : this.setState({ showError: false });
        }
    }

    render() {
        return (
            <Container className=''>
                <Row className='border rounded m-4'>
                    <Row className='m-2'>
                        <Col>
                            {this.state.dropDownData !== [] && <DropDownComponent input={this.state.dropDownData == null ? null : this.state.dropDownData} placeholder={'Leaving From'} setDestination={this.setOrigin.bind(this)}></DropDownComponent>}
                        </Col>
                        <Col>
                            {this.state.dropDownData !== [] && <DropDownComponent input={this.state.dropDownData == null ? null : this.state.dropDownData} placeholder={'Going To'} setDestination={this.setDestination.bind(this)}></DropDownComponent>}
                        </Col>
                        <Col>
                            <DatePickerComponent setDate={this.setDate.bind(this)}></DatePickerComponent>
                        </Col>
                        <Col>
                            <Button variant="outline-danger" onClick={this.viewDetails.bind(this)} disabled={this.state.showError}>View Details</Button>
                        </Col>
                    </Row>
                    <Row className='mx-auto' style={this.style}>
                        {this.state.showError && <p>Both origin and destination cannot be same</p>}
                    </Row>
                </Row>

                <Row className=''>
                    {this.state.showDetailsComponent &&
                        <DetailsComponent origin={this.state.origin}
                            destination={this.state.destination} date={this.state.date} filterData={this.state.filterdetails}></DetailsComponent>}
                </Row>
            </Container>
        )
    }
}