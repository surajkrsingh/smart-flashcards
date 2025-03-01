/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    ToggleControl,
    Spinner,
    Placeholder,
    Icon,
    Notice
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import { post } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const [availablePosts, setAvailablePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Get available post types
    const postTypes = useSelect(select => {
        const { getPostTypes } = select('core');
        const allPostTypes = getPostTypes() || [];
        
        // Filter to include public and viewable post types
        return allPostTypes
            .filter(type => type.viewable && type.rest_base)
            .map(type => ({
                label: type.labels.singular_name,
                value: type.slug,
                restBase: type.rest_base
            }));
    }, []);
    
    // Fetch posts when post type changes
    useEffect(() => {
        if (!attributes.postType) {
            setAvailablePosts([]);
            return;
        }
        
        setIsLoading(true);
        setError('');
        setAvailablePosts([]);
        
        // Find the selected post type object
        const selectedPostType = postTypes.find(type => type.value === attributes.postType);
        if (!selectedPostType) {
            setError(__('Invalid post type selected.', 'smart-flashcards'));
            setIsLoading(false);
            return;
        }

        // Use the REST base from the post type object
        const restBase = selectedPostType.restBase || attributes.postType;
        
        apiFetch({
            path: `/wp/v2/${restBase}?per_page=50&_fields=id,title,type&status=publish`,
            method: 'GET'
        }).then(posts => {
            if (Array.isArray(posts) && posts.length > 0) {
                const options = posts.map(post => ({
                    label: post.title.rendered || post.title || `Post #${post.id}`,
                    value: post.id
                }));
                setAvailablePosts(options);
                
                // If current postId is not in the new list of posts, reset it
                if (attributes.postId && !options.find(p => p.value === attributes.postId)) {
                    setAttributes({ postId: 0 });
                }
            } else {
                setError(__('No published posts found for this post type.', 'smart-flashcards'));
                setAttributes({ postId: 0 });
            }
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching posts:', error);
            setError(__('Error fetching posts. Please check if the post type has REST API support.', 'smart-flashcards'));
            setAttributes({ postId: 0 });
            setIsLoading(false);
        });
    }, [attributes.postType]);

    // Handle post selection change
    const handlePostChange = (postId) => {
        const numericId = parseInt(postId, 10);
        // Force re-render by updating both postId and a timestamp
        setAttributes({ 
            postId: isNaN(numericId) ? 0 : numericId,
            timestamp: Date.now() // Add this to force re-render
        });
    };
    
    // Image size options
    const imageSizeOptions = [
        { label: __('Thumbnail', 'smart-flashcards'), value: 'thumbnail' },
        { label: __('Medium', 'smart-flashcards'), value: 'medium' },
        { label: __('Large', 'smart-flashcards'), value: 'large' },
        { label: __('Full', 'smart-flashcards'), value: 'full' }
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Post Selection', 'smart-flashcards')} initialOpen={true}>
                    <SelectControl
                        label={__('Post Type', 'smart-flashcards')}
                        value={attributes.postType}
                        options={[
                            { label: __('Select a post type', 'smart-flashcards'), value: '' },
                            ...postTypes
                        ]}
                        onChange={postType => {
                            setAttributes({ 
                                postType,
                                postId: 0 // Reset post ID when post type changes
                            });
                        }}
                    />
                    
                    {error && (
                        <Notice status="error" isDismissible={false}>
                            {error}
                        </Notice>
                    )}
                    
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <SelectControl
                            label={__('Select Post', 'smart-flashcards')}
                            value={attributes.postId || 0}
                            options={[
                                { label: __('Select a post', 'smart-flashcards'), value: 0 },
                                ...availablePosts
                            ]}
                            onChange={handlePostChange}
                            disabled={availablePosts.length === 0}
                        />
                    )}
                </PanelBody>
                
                <PanelBody title={__('Display Options', 'smart-flashcards')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Title', 'smart-flashcards')}
                        checked={attributes.showTitle}
                        onChange={showTitle => setAttributes({ showTitle })}
                    />
                    <ToggleControl
                        label={__('Show Content', 'smart-flashcards')}
                        checked={attributes.showContent}
                        onChange={showContent => setAttributes({ showContent })}
                    />
                    <ToggleControl
                        label={__('Show Excerpt', 'smart-flashcards')}
                        checked={attributes.showExcerpt}
                        onChange={showExcerpt => setAttributes({ showExcerpt })}
                    />
                    <ToggleControl
                        label={__('Show Featured Image', 'smart-flashcards')}
                        checked={attributes.showFeaturedImage}
                        onChange={showFeaturedImage => setAttributes({ showFeaturedImage })}
                    />
                    {attributes.showFeaturedImage && (
                        <SelectControl
                            label={__('Image Size', 'smart-flashcards')}
                            value={attributes.imageSize}
                            options={imageSizeOptions}
                            onChange={imageSize => setAttributes({ imageSize })}
                        />
                    )}
                    <ToggleControl
                        label={__('Show Meta Information', 'smart-flashcards')}
                        checked={attributes.showMeta}
                        onChange={showMeta => setAttributes({ showMeta })}
                    />
                    {attributes.showMeta && (
                        <>
                            <ToggleControl
                                label={__('Show Date', 'smart-flashcards')}
                                checked={attributes.showDate}
                                onChange={showDate => setAttributes({ showDate })}
                            />
                            <ToggleControl
                                label={__('Show Author', 'smart-flashcards')}
                                checked={attributes.showAuthor}
                                onChange={showAuthor => setAttributes({ showAuthor })}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>
            
            {attributes.postId ? (
                <ServerSideRender
                    block="smfcs/single-post-display"
                    attributes={attributes}
                    skipBlockSupportAttributes={true}
                    EmptyResponsePlaceholder={() => (
                        <Placeholder
                            icon={<Icon icon={post} />}
                            label={__('Single Post Display', 'smart-flashcards')}
                            instructions={__('Loading post content...', 'smart-flashcards')}
                        >
                            <Spinner />
                        </Placeholder>
                    )}
                    ErrorResponsePlaceholder={({ response }) => (
                        <Placeholder
                            icon={<Icon icon={post} />}
                            label={__('Error', 'smart-flashcards')}
                            instructions={
                                response?.message || 
                                __('Error loading post content. Please try again.', 'smart-flashcards')
                            }
                        />
                    )}
                />
            ) : (
                <Placeholder
                    icon={<Icon icon={post} />}
                    label={__('Single Post Display', 'smart-flashcards')}
                    instructions={__('Select a post type and post to display', 'smart-flashcards')}
                />
            )}
        </div>
    );
};

export default Edit; 