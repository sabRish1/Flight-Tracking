import react,{Component} from 'react'
import {getListOfAirports} from '../services/api/getListOfAirports' 
import {getDetails} from  '../services/api/getDetails';


export default class Test extends Component {
    constructor(props){
        super(props);
    }
    async componentDidMount(){
        var result = await getListOfAirports();
        console.log((result));

        var details = await getDetails('2022-03-17','DXB','LHR');

        console.log(details);
    }

    render(){
        return (
        <div>Testing</div>)
    }
}