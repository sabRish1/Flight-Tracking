import { Component } from 'react'
import { Container, Row} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

export default class DropDownComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAirports: null,
            filterdetails: null,
        }
    }

    async componentDidMount() {    
    }

    render() {
        return (
            <Container>
                <Row>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={this.props.input}
                        sx={{ width: 300 }}
                        onChange={(event,value) => this.props.setDestination(value)}
                        getOptionLabel={(option) => option[0].shortName + ' (' + option[0].iataCode +')'}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option[0].shortName} ({option[0].iataCode})
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label={this.props.placeholder} />}
                    />
                </Row>
            </Container>
        )
    }
}