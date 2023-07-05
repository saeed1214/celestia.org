import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

function SEO({ description, lang, meta, keywords, title, image }) {
	const { site } = useStaticQuery(graphql`
		query DefaultSEOQuery {
			site {
				siteMetadata {
					title
					description
					author
					image
                    siteUrl
				}
			}
		}
	`);
    

    console.log(site.siteMetadata.image)

	const metaTitle = title || site.siteMetadata.title;
	const metaDescription = description || site.siteMetadata.description;
	const metaImage = image ? site.siteMetadata.siteUrl + image : site.siteMetadata.siteUrl + site.siteMetadata.image;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: metaTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:image`,
					content: metaImage,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: metaTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			]
				.concat(
					keywords.length > 0
						? {
								name: `keywords`,
								content: keywords.join(`, `),
						  }
						: []
				)
				.concat(meta)}
			title={metaTitle}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
		/>
	);
}

SEO.defaultProps = {
	lang: `en`,
	keywords: [],
	meta: [],
};

SEO.propTypes = {
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    lang: PropTypes.string,
    meta: PropTypes.array,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default SEO;