import React, { Component } from 'react';
import http from './../services/httpService';


/*
    This component is used to display the movie details of a given character.
    The character is selected via the props sent to this component.
*/
class MovieDetails extends Component {
    state = {
        id: this.props.match.params.id,
        films: [],
    }

    // Function called when component is first created. Async to wait for API promises
    async componentDidMount() {
        const url = "https://swapi.dev/api/people/" + this.state.id + '/';      // Dynamically set URL to get the right person
        let finalFilmList = [];
            try {
                const filmUrlList = await (await http.get(url)).data.films;     // Get list of film urls related to character

                let count = 0;
                while (filmUrlList[count] !== undefined) {                      // Iterate through all films character has
                    try {
                        const filmData = await http.get(filmUrlList[count]);    // Get films from urls
                        
                        finalFilmList = finalFilmList.concat(filmData);         // Concatinate current film object to film array
                    }
                    catch (ex) {
                        alert("Something failed while fetching film data.")
                    }
                    count++;
                }
                this.setState({films: finalFilmList});                          // Set state with new array of film objects
            } 
            catch (ex) {
                alert("Something failed while fetching a person's films.")
            }
    }

    render() {
        const {length: count} = this.state.films;
        const {films} = this.state;                 // Object destructuring

        return (
            <div>
                <h2>Character appeared in {count} films:</h2>
                <div>                                           {/* Map to display film data */}
                    {films.map(film => (
                        <div key={film.data.episode_id}>
                            <h2>Title: {film.data.title}</h2>
                            <h5>Episode ID: {film.data.episode_id}</h5>
                            <h5>Director: {film.data.director}</h5>
                            <h5>Release Date: {film.data.release_date}</h5>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
 
export default MovieDetails;