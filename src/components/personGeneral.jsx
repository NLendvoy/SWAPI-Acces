import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

//This class serves as a modular child to "People" class. It is used to display all the general info of each individual character.
class PersonGeneral extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        height: this.props.height,
        gender: this.props.gender,
        species: this.props.species,
    }

    // Updates all data when updated from parent. This will be called any time a new page is chosen.
    componentDidUpdate(prevProps){
        if (this.props.name !== prevProps.name) {
            this.setState({name: this.props.name, height: this.props.height, gender: this.props.gender, species: this.props.species});
        }
    }

    render() {
        const {id, name, height, gender, species} = this.state; // Object destructuring

        return (
            // When clicked, user is taken to movie details for the character. Send ID through route params.
            <Link to={`/movieDetails/${id}`} className='personGeneral-container'>
                    <div xs={18}>
                        <h2 className='name'>{name}</h2>
                        <h5>Gender: {gender}</h5>
                        <h5>Height: {height} cm</h5>
                        <h5>Species: {species}</h5>
                    </div>
            </Link>
         );
    }
}
 
export default PersonGeneral;