( function( wp ) {
    const { registerPlugin } = wp.plugins;
    const PluginPostStatusInfo = wp.editor?.PluginPostStatusInfo || wp.editPost.PluginPostStatusInfo;
    const { createElement: el, useEffect } = wp.element;
    const { useSelect, useDispatch } = wp.data;
    const { Notice } = wp.components;
    const { __ } = wp.i18n;

    const LOCK_ID = 'wordpress-validate-seo-lock';

    const SEOValidationComponent = () => {
        const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
        
        // Extra safety check in JS, even though PHP gate should handle it
        if ( postType !== 'post' ) {
            return null;
        }

        const { focusKeywordMeta, yoastKeyword } = useSelect( ( select ) => {
            const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
            
            // Try to get the live keyword from Yoast's own data store
            const yoastStore = select( 'yoast-seo/editor' ) || select( 'yoast-seo/core' );
            let keyword = null;
            if ( yoastStore && typeof yoastStore.getFocusKeyphrase === 'function' ) {
                keyword = yoastStore.getFocusKeyphrase();
            } else if ( yoastStore && typeof yoastStore.getKeyword === 'function' ) {
                keyword = yoastStore.getKeyword();
            }

            return {
                focusKeywordMeta: meta?._yoast_wpseo_focuskw,
                yoastKeyword: keyword
            };
        }, [] );

        const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

        // Validation logic
        // If Yoast's store is active, it might return an empty string. If it's not registered, it returns null.
        const isYoastActive = typeof focusKeywordMeta !== 'undefined' || yoastKeyword !== null;
        const currentKeyword = yoastKeyword !== null ? yoastKeyword : focusKeywordMeta;
        const isKeywordEmpty = !currentKeyword || currentKeyword.trim() === '';

        useEffect( () => {
            if ( isYoastActive && isKeywordEmpty ) {
                lockPostSaving( LOCK_ID );
            } else {
                unlockPostSaving( LOCK_ID );
            }

            return () => {
                unlockPostSaving( LOCK_ID );
            };
        }, [ currentKeyword, isYoastActive, isKeywordEmpty, lockPostSaving, unlockPostSaving ] );

        if ( ! isYoastActive ) {
            return el( PluginPostStatusInfo, {},
                el( Notice, { status: 'info', isDismissible: false },
                    __( 'Yoast SEO is not active. SEO validation is disabled.', 'wordpress-validate-seo' )
                )
            );
        }

        if ( isKeywordEmpty ) {
            return el( PluginPostStatusInfo, {},
                el( 'div', { className: 'wvs-validation-wrapper' },
                    el( Notice, { status: 'error', isDismissible: false },
                        __( 'A focus keyphrase is required before publishing.', 'wordpress-validate-seo' )
                    )
                )
            );
        }

        return el( PluginPostStatusInfo, {},
            el( Notice, { status: 'success', isDismissible: false },
                __( 'Focus keyphrase is set.', 'wordpress-validate-seo' )
            )
        );
    };

    registerPlugin( 'wordpress-validate-seo', {
        render: SEOValidationComponent,
        icon: 'admin-site-alt3',
    } );

} )( window.wp );
