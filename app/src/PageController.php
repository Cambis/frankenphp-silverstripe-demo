<?php

namespace {

    use Cambis\Inertia\Extension\InertiaPageControllerExtension;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Control\HTTPRequest;

    /**
     * @template T of Page
     * @extends ContentController<T>
     *
     * @mixin InertiaPageControllerExtension
     */
    class PageController extends ContentController
    {
        /**
         * An array of actions that can be accessed via a request. Each array element should be an action name, and the
         * permissions or conditions required to allow the user to access it.
         *
         * <code>
         * [
         *     'action', // anyone can access this action
         *     'action' => true, // same as above
         *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
         *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
         * ];
         * </code>
         */
        private static array $allowed_actions = [];

        /**
         * @return void
         */
        protected function init()
        {
            parent::init();
            // You can include any CSS or JS required by your project here.
            // See: https://docs.silverstripe.org/en/developer_guides/templates/requirements/
        }

        public function index(HTTPRequest $request)
        {
            return $this->inertia->render(
                'Page',
                [
                    'title' => $this->data()->Title,
                    'content' => $this->data()->Content,
                ]
            );
        }
    }
}
