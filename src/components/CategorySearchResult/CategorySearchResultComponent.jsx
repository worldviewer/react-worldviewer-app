import React, { Component } from 'react';
import './CategorySearchResult.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import hashtag from '../../images/hashtag.svg';

class CategorySearchResultComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		const textStyles = {
			fontFamily: 'LeagueGothic',
			textTransform: 'uppercase',
			fontSize: '30px',
			letterSpacing: '1px',
			lineHeight: '1.2',
			paddingTop: '10px',
			paddingBottom: '10px'
		};

		return this.props.hit && this.props.search.query &&
			this.props.search.query.length > 3 ?
			(<Row
				className="CategorySearchResult"
				ref="Hit"
				key={this.props.hit.objectID}>

				<div
					className="CategoryHit" 
					style={ {overflowWrap: 'break-word'} }>

					<Col xs={2} xsOffset={2}>
						<img
							alt="hashtag"
							src={hashtag}
							className="Hashtag" />
					</Col>
					<Col xs={8}>
						<p style={textStyles}><i>{this.props.hit.text}</i></p>
					</Col>
				</div>
		
			</Row>) :
			null;
	}
}

export default withRouter(CategorySearchResultComponent);
