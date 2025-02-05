import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
    'core/image',
    'core/video',
    'core/columns',
    'core/buttons',
    'core/list'
];

const TEMPLATE = [
    ['core/heading', { 
        level: 2, 
        placeholder: __('Card Title', 'smart-flashcards')
    }],
    ['core/paragraph', { 
        placeholder: __('Card content...', 'smart-flashcards')
    }]
];

export default function Edit({ attributes, clientId }) {
    const { index } = attributes;

    const { isSelected } = useSelect(
        (select) => ({
            isSelected: select('core/block-editor').isBlockSelected(clientId)
        }),
        [clientId]
    );

    const blockProps = useBlockProps({
        className: `wp-block-smfcs-card ${isSelected ? 'is-selected' : ''}`
    });

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'card-content' },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: TEMPLATE,
            templateLock: false,
            renderAppender: isSelected ? InnerBlocks.ButtonBlockAppender : false
        }
    );

    return (
        <div {...blockProps}>
            {index && <div className="card-index">{index}</div>}
            <div {...innerBlocksProps} />
        </div>
    );
} 