import react, { Component } from 'react'
import { Container, Row} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';


export default class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Date()
        }
    }

    setDateValue(value){
        this.setState({value : value});
    }
    render() {
        return (
            <Container>
                <Row>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                views={['day']}
                                label="Departing"
                                value={this.state.value}
                                onChange={(newValue) => {
                                    this.setState({value : newValue});
                                    this.props.setDate(newValue);
                                }}
                                maxDate={new Date()}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Row>
            </Container>
        )
    }
}