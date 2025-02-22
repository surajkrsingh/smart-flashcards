import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPicker } from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/buttons',
	'core/media-text',
	'core/list',
	'core/quote',
	'core/code'
];

const TEMPLATE = [
	['core/heading', { level: 2, placeholder: __('Add back side title...', 'smart-flashcards') }],
	['core/paragraph', { placeholder: __('Add back side content...', 'smart-flashcards') }]
];

const BORDER_STYLES = [
	{ label: __('Default', 'smart-flashcards'), value: 'default' },
	{ label: __('Vintage Frame', 'smart-flashcards'), value: 'vintage' },
	{ label: __('Art Nouveau', 'smart-flashcards'), value: 'art-nouveau' },
	{ label: __('Celtic Pattern', 'smart-flashcards'), value: 'celtic' },
	{ label: __('Japanese Style', 'smart-flashcards'), value: 'japanese' },
	{ label: __('Modern Geometric', 'smart-flashcards'), value: 'geometric' },
	{ label: __('Royal Frame', 'smart-flashcards'), value: 'royal' }
];

export default function Edit({ attributes, setAttributes }) {
	const { borderStyle, primaryBorderColor, secondaryBorderColor } = attributes;
	const blockProps = useBlockProps({
		className: `flashcard-back border-style-${borderStyle}`,
		style: {
			'--primary-border-color': primaryBorderColor,
			'--secondary-border-color': secondaryBorderColor
		}
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Border Style', 'smart-flashcards')}>
					<SelectControl
						label={__('Choose Style', 'smart-flashcards')}
						value={borderStyle}
						options={BORDER_STYLES}
						onChange={(value) => setAttributes({ borderStyle: value })}
					/>
					{borderStyle !== 'default' && (
						<>
							<div className="smfcs-color-picker-wrapper">
								<label>{__('Primary Border Color', 'smart-flashcards')}</label>
								<ColorPicker
									color={primaryBorderColor}
									onChange={(color) => setAttributes({ primaryBorderColor: color })}
									enableAlpha
								/>
							</div>
							<div className="smfcs-color-picker-wrapper">
								<label>{__('Secondary Border Color', 'smart-flashcards')}</label>
								<ColorPicker
									color={secondaryBorderColor}
									onChange={(color) => setAttributes({ secondaryBorderColor: color })}
									enableAlpha
								/>
							</div>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="flashcard-content">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
					/>
				</div>
			</div>
		</>
	);
} 
