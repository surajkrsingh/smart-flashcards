import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

// Register Front Side Block
registerBlockType(metadata.name, {
	edit: () => <InnerBlocks templateLock={false} />,
	save: () => <InnerBlocks.Content />
});
