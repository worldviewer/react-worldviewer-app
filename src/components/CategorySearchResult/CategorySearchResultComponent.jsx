import React, { Component } from 'react';
import './CategorySearchResult.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import hashtag from '../../images/hashtag.svg';
import { getPartsFromFacetString } from '../../libs/utils';

class CategorySearchResultComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	clickHashtag(hashtagText) {
		const [facetCategory, facetSubCategory] =
				getPartsFromFacetString(hashtagText);

		this.props.setSearchFacet(facetCategory, facetSubCategory, hashtagText);
		this.props.setSearchQuery('');
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
			(<Grid>
				<Row
					className="CategorySearchResult"
					ref="Hit"
					key={this.props.hit.objectID}>

					<Col xs={12} className="Hashtag" style={textStyles}
						onClick={this.clickHashtag.bind(this, this.props.hit.text)}>

						<img
							alt="hashtag"
							src={hashtag}
							className="HashtagIcon" />

						<span className="HashtagText">
							<i>{this.props.hit.text}</i>
						</span>
					</Col>
			
				</Row>
			</Grid>) :
			null;
	}
}

export default withRouter(CategorySearchResultComponent);
