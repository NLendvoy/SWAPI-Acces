import React, { Component } from 'react';
import http from './../services/httpService';

class MovieDetails extends Component {
    state = {
        id: this.props.match.params.id,
        name: this.props.name, 
        films: [],
    }

    async componentDidMount() {

        const url = "https://swapi.dev/api/people/" + this.state.id + '/';    // Dynamically change the URL to get the right person
        let finalFilmList = [];
            try {
                const filmUrlList = await (await http.get(url)).data.films;

                let count = 0;
                while (filmUrlList[count] !== undefined) {
                    try {
                        const filmData = await http.get(filmUrlList[count]);
                        
                        finalFilmList = finalFilmList.concat(filmData);
                    }
                    catch (ex) {
                        //alert("Something failed while fetching film data.")
                    }
                    count++;
                }
                this.setState({films: finalFilmList});
                //console.log(this.state.films);
            } 
            catch (ex) {
                //alert('Something failed while fetching a person.')
            }
    }

    render() {
        const {length: count} = this.state.films;
        const {films, name} = this.state;

        return (
            <div>
                <h2>{name} appeared in {count} films:</h2>
                <div>
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