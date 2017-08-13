import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class UserDeckList extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render(){
		let decks  = this.props.deckList
		return (
			<div className="UserDeckList col-lg-9 offset-lg-3">
				<h3>Check out your decks!</h3>
				<hr />
				<div className="row">
					decks.map(deck => (
						<figure className="col-xs-4" key={ deck.id }>
							<Link to={`/users/decks/${deck.id}`} > 
								{deck.title}
							</Link>
						</figure>

						))
				</div>
				<button role="Make New Deck">
					Make a New Deck!
				</button>
			</div>
			)
	}
}

const mapState = (state) => ({
  deckList: state.deckList
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UserDeckList);

