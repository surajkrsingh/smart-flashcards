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
    Notice,
    ComboboxControl
} from '@wordpress/components';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import { post } from '@wordpress/icons';
import { debounce } from 'lodash';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const [availablePosts, setAvailablePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

    // Load initial posts when post type changes
    useEffect(() => {
        if (!attributes.postType) {
            setAvailablePosts([]);
            return;
        }
        
        setIsLoading(true);
        setError('');

        // Get post type data
        apiFetch({ 
            path: '/wp/v2/types',
            method: 'GET'
        }).then(types => {
            const type = types[attributes.postType];
            if (!type || !type.rest_base) {
                setError(__('Invalid post type selected.', 'smart-flashcards'));
                setIsLoading(false);
                return;
            }

            // Fetch initial posts
            apiFetch({
                // Fetch recent posts with title and author
                path: `/wp/v2/${type.rest_base}?per_page=20&_fields=id,title,author&orderby=date&order=desc`,
                method: 'GET'
            }).then(posts => {
                if (Array.isArray(posts) && posts.length > 0) {
                    const options = posts.map(post => ({
                        label: post.title.rendered || `Post #${post.id}`,
                        value: post.id.toString()
                    }));
                    setAvailablePosts(options);
                    
                    // If we have a selected post, make sure it's in the list
                    if (attributes.postId && !options.find(p => p.value === attributes.postId.toString())) {
                        apiFetch({
                            path: `/wp/v2/${type.rest_base}/${attributes.postId}`,
                            method: 'GET'
                        }).then(post => {
                            if (post) {
                                setAvailablePosts([
                                    {
                                        label: post.title.rendered || `Post #${post.id}`,
                                        value: post.id.toString()
                                    },
                                    ...options
                                ]);
                            }
                        });
                    }
                }
                setIsLoading(false);
            });
        }).catch(error => {
            console.error('Error fetching posts:', error);
            setError(__('Error fetching posts.', 'smart-flashcards'));
            setIsLoading(false);
        });
    }, [attributes.postType]);

    // Handle post search
    const searchPosts = useCallback(debounce(async (searchText) => {
        if (!attributes.postType || !searchText) {
            setSearchResults([]);
            return;
        }

        try {
            const types = await apiFetch({ 
                path: '/wp/v2/types',
                method: 'GET'
            });

            const type = types[attributes.postType];
            if (!type || !type.rest_base) return;

            const posts = await apiFetch({
                path: `/wp/v2/${type.rest_base}?search=${encodeURIComponent(searchText)}&per_page=20&_fields=id,title`,
                method: 'GET'
            });

            if (Array.isArray(posts)) {
                const options = posts.map(post => ({
                    label: post.title.rendered || `Post #${post.id}`,
                    value: post.id.toString()
                }));
                setSearchResults(options);
            }
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    }, 300), [attributes.postType]);

    // Handle post selection
    const handlePostSelection = (postId) => {
        setAttributes({ 
            postId: parseInt(postId, 10),
            timestamp: Date.now()
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
                                postId: 0
                            });
                            setSearchQuery('');
                            setSearchResults([]);
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
                        <ComboboxControl
                            label={__('Search and Select Post', 'smart-flashcards')}
                            value={attributes.postId ? attributes.postId.toString() : ''}
                            options={searchQuery ? searchResults : availablePosts}
                            onFilterValueChange={(inputValue) => {
                                setSearchQuery(inputValue);
                                if (inputValue) {
                                    searchPosts(inputValue);
                                }
                            }}
                            onChange={handlePostSelection}
                            allowReset={true}
                            help={__('Type to search posts or select from recent posts', 'smart-flashcards')}
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