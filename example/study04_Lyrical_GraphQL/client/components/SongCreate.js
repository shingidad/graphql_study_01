import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const propTypes = {
    mutate: PropTypes.func,
};

const defaultProps = {
    mutate: () => { }
}


class SongCreate extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ title: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { mutate, history } = this.props;
        const { title } = this.state;

        mutate({ variables: { title } })
            .then(() => {
                history.push('/');
            });
    }

    render() {
        return (
            <div>
                <Link to="/">back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;


export default graphql(mutation)(SongCreate);