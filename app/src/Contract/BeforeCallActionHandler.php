<?php

namespace App\Contract;

use SilverStripe\Control\HTTPRequest;

/**
 * @see \SilverStripe\Control\Controller::$handleAction()
 */
interface BeforeCallActionHandler
{
    public function beforeCallActionHandler(HTTPRequest $request, string $action): void;
}
