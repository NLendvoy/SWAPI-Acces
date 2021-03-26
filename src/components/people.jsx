import React, { Component } from 'react';
import http from "./../services/httpService";
import Pagination from './common/pagination';
import PersonGeneral from './personGeneral';
import { paginate } from '../utils/paginate';

import '../App.css';


/*
    This class is the homepage of the app. It contains the state of the information 
    displayed and the current page information.

    Data is fetched from the API when this component mounts
*/
class People extends Component {
    state = { 
        personList: [],     //Array of people retrieved from the API
        pageSize: 10,
        currentPage: 1,
    }
    
    async componentDidMount() { // Lifecycle hook, asyncronous to wait for API promise
        
        let personResult = [];
        let tempPersonArray = [];
        let url = "https://swapi.dev/api/people/";
        let speciesResult = "";

        for(let count=1; count<84; count++){
            if (count !== 17) { // API has missing element which prevents use of while(defined) and this is a quick fix to prevent duplicates/missing data
                url = "https://swapi.dev/api/people/" + count + '/';    // Dynamically change the URL to get the right person
                try {
                    personResult = await http.get(url);                 // Get person object from API
                    if (personResult.data.species[0] === undefined) {   // All humans in the DB have undefined species => set to human
                        personResult.data.species = "Human"
                    }
                    else {  // Person is non-human
                        try {
                            speciesResult = await (await http.get(personResult.data.species[0]));   // Get non-human species from DB
                            personResult.data.species = speciesResult.data.name;
                        }
                        catch {
                            alert("Something went wrong getting the species")
                        }
                    }
                } 
                catch (ex) {
                    alert('Something failed while getting a person.')
                }
                tempPersonArray = tempPersonArray.concat(personResult); // Concatenate new person object to existing array
            }
        }
        this.setState({personList: tempPersonArray});                   // Store all characters in the class state
    }

    // This function is used for pagination. It handles the event of a page change and autoscrolls to the top of the new page.
    handlePageChange = (page) => {
        this.setState({currentPage: page});
        window.scrollTo(0, 0);
    }
    
    // This function takes a url of a person and determines their ID
    getId = (url) => {
        const start = url.indexOf("people") + 7;
        const end = url.length - 1;
        console.log(url.slice(start, end));
        return url.slice(start, end);
    }

    render() {
        const { length: count } = this.state.personList;                        
        const { pageSize, currentPage, personList: allPeople} = this.state; // Object destructuring

        const personList = paginate(allPeople, currentPage, pageSize);  // Use paginate function to determine how many people to display

        return (
            <div>
                <div className='person-list'>                   {/* Map all required info into general info list for display */}
                    {personList.map(person => <PersonGeneral            
                    key={this.getId(person.data.url)}
                    id={this.getId(person.data.url)}
                    name={person.data.name}
                    height={person.data.height}
                    gender={person.data.gender}
                    species={person.data.species}
                    />)}
                </div>                                          {/* Pagination component. Returns button array and sends data back to parent for page changes */}
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