import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TextControl,PanelBody, SelectControl } from '@wordpress/components';
import './editor.scss';
import metadata from './block.json';

//const { registerBlockType, query } = wp.blocks;

import { registerBlockType } from '@wordpress/blocks';

import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		className,
	} = props;

	return (
		<>
			<InspectorControls>

				<PanelBody>
					<SelectControl
						label={__( 'Select a Set', 'learndash-flashcards' )}
						value={ '' }
						options={ [] }
						// onChange={  }
					/>

				</PanelBody>
			</InspectorControls>

			<ServerSideRender
				block= { metadata.name }
				attributes={{
					postTypes: idNew,
					ids:noOfCards
				}}
			/>
		</>
	);
}
