import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class SongList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderSongs = this.renderSongs.bind(this);
    }

    renderSongs() {
        const { songs } = this.props.data;
        if (songs === undefined || songs === null) {
            return null;
        }
        return songs.map(obj => (<li className="collection-item"
            key={obj.id}>{obj.title}
        </li>));
    }

    render() {
        return <div>
            {this.props.data.loading && <div>loading</div>}
            <ul className="collection">
                {
                    this.renderSongs()
                }
            </ul>
            <Link
                to="/songs/new"
                className="btn-floating btn-large red right"
            >
                <i className="material-icons">add</i>
            </Link>
        </div>
    }
}

const query = gql`
{
  songs {
    id
    title
  }
}
`;

export default graphql(query)(SongList);
