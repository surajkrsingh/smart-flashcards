/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    Spinner,
    Placeholder,
    Icon,
    Notice,
    RangeControl,
    ComboboxControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import { commentAuthorAvatar } from '@wordpress/icons';
import { debounce } from 'lodash';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const [availableUsers, setAvailableUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch users based on search query
    const fetchUsers = async (query = '') => {
        setIsLoading(true);
        setError('');

        try {
            const response = await apiFetch({
                path: `/wp/v2/users?${query ? `search=${encodeURIComponent(query)}&` : ''}per_page=100&context=edit`,
            });

            const users = response.map((user) => ({
                value: user.id.toString(),
                label: `${user.name} (${user.email})`,
            }));

            setAvailableUsers(users);
        } catch (err) {
            setError(err.message);
            setAvailableUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced search function
    const debouncedFetchUsers = debounce((query) => {
        fetchUsers(query);
    }, 300);

    // Initial fetch of users
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Member Settings', 'smart-flashcards')}>
                    <div className="user-search-container">
                        <ComboboxControl
                            label={__('Select or Search Member', 'smart-flashcards')}
                            value={attributes.userId ? attributes.userId.toString() : ''}
                            options={availableUsers}
                            onFilterValueChange={(inputValue) => debouncedFetchUsers(inputValue)}
                            onChange={(value) => setAttributes({ userId: parseInt(value) })}
                            placeholder={__('Type to search members...', 'smart-flashcards')}
                            __experimentalShowLoading={isLoading}
                        />
                        {error && (
                            <Notice status="error" isDismissible={false}>
                                {error}
                            </Notice>
                        )}
                    </div>

                    <ToggleControl
                        label={__('Show Name', 'smart-flashcards')}
                        checked={attributes.showName}
                        onChange={(value) => setAttributes({ showName: value })}
                    />

                    <ToggleControl
                        label={__('Show Avatar', 'smart-flashcards')}
                        checked={attributes.showAvatar}
                        onChange={(value) => setAttributes({ showAvatar: value })}
                    />

                    {attributes.showAvatar && (
                        <RangeControl
                            label={__('Avatar Size', 'smart-flashcards')}
                            value={attributes.avatarSize}
                            onChange={(value) => setAttributes({ avatarSize: value })}
                            min={32}
                            max={256}
                            step={8}
                        />
                    )}

                    <ToggleControl
                        label={__('Show Bio', 'smart-flashcards')}
                        checked={attributes.showBio}
                        onChange={(value) => setAttributes({ showBio: value })}
                    />

                    <ToggleControl
                        label={__('Show Email', 'smart-flashcards')}
                        checked={attributes.showEmail}
                        onChange={(value) => setAttributes({ showEmail: value })}
                    />

                    <ToggleControl
                        label={__('Show Website', 'smart-flashcards')}
                        checked={attributes.showWebsite}
                        onChange={(value) => setAttributes({ showWebsite: value })}
                    />

                    <ToggleControl
                        label={__('Show Social Links', 'smart-flashcards')}
                        checked={attributes.showSocialLinks}
                        onChange={(value) => setAttributes({ showSocialLinks: value })}
                    />
                </PanelBody>
            </InspectorControls>

            {attributes.userId ? (
                <ServerSideRender
                    block="smfcs/member"
                    attributes={attributes}
                    EmptyResponsePlaceholder={() => (
                        <Placeholder
                            icon={<Icon icon={commentAuthorAvatar} />}
                            label={__('Member', 'smart-flashcards')}
                            instructions={__('Loading member content...', 'smart-flashcards')}
                        >
                            <Spinner />
                        </Placeholder>
                    )}
                    ErrorResponsePlaceholder={({ response }) => (
                        <Placeholder
                            icon={<Icon icon={commentAuthorAvatar} />}
                            label={__('Error', 'smart-flashcards')}
                            instructions={
                                response?.message ||
                                __('Error loading member content. Please try again.', 'smart-flashcards')
                            }
                        />
                    )}
                />
            ) : (
                <Placeholder
                    icon={<Icon icon={commentAuthorAvatar} />}
                    label={__('Member', 'smart-flashcards')}
                    instructions={__('Select a member to display', 'smart-flashcards')}
                />
            )}
        </div>
    );
};

export default Edit;
