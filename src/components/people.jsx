import React, { Component } from 'react';
import http from "./../services/httpService";
import Pagination from './common/pagination';
import PersonGeneral from './personGeneral';
import { paginate } from '../utils/paginate';

import '../App.css';

class People extends Component {
    state = { 
        personList: [],     //Array of people retrieved from the API
        speciesList: [],
        pageSize: 10,
        currentPage: 1,
    }
    
    async componentDidMount() { // Lifecycle hook, asyncronous to access API
        
        let personResult = [];

        let url = "https://swapi.dev/api/people/";
        let tempPersonArray = [];

        for(let count=1; count<84; count++){
        if (count !== 17) {                                         // API has missing element which prevents use of while(defined)
            url = "https://swapi.dev/api/people/" + count + '/';    // Dynamically change the URL to get the right person
            try {
                personResult = await http.get(url);                        // Access the API
                if (personResult.data.species[0] === undefined) {
                    personResult.data.species = "Human"
                }
                else {
                    try {
                        let speciesResult = await (await http.get(personResult.data.species[0]));
                        //console.log(speciesResult.data.name);
                        personResult.data.species = speciesResult.data.name;
                    }
                    catch {
                        //alert("Something went wrong getting the species")
                    }
                }
            } 
            catch (ex) {                                            // Catch errors or exceptions
                //alert('Something failed while fetching a person.')
            }
            tempPersonArray = tempPersonArray.concat(personResult);                  // Concatenate most recent array to existing array
        }
        }
        this.setState({personList: tempPersonArray});                    // Store all characters in the class state
        console.log(this.state.personList);
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
    
    getId = (url) => {
        const start = url.indexOf("people") + 7;
        const end = url.length - 1;
        console.log(url.slice(start, end));
        return url.slice(start, end);
    }

    render() {
        const { length: count } = this.state.personList;
        const { pageSize, currentPage, personList: allPeople} = this.state;    // Object Destructuring

        const personList = paginate(allPeople, currentPage, pageSize);

        return (
            <div>
                <p>Showing {count} people in the database.</p>  {/* Count all people in the list for easy access to user */}
                <div className='person-list'>                   {/* Map all required info into general info list for display */}
                    {personList.map(person => <PersonGeneral            
                    key={this.getId(person.data.url)}
                    id={this.getId(person.data.url)}
                    name={person.data.name}
                    height={person.data.height}
                    gender={person.data.gender}
                    species={person.data.species}
                    />)}
                </div>
                <Pagination 
                    itemsCount={count} 
                    pageSize={pageSize} 
                    currentPage={currentPage} 
                    onPageChange={this.handlePageChange}
                />
            </div>
        );
    }
}
 
export default People;