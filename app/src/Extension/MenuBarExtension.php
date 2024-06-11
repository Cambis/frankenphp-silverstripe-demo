<?php

namespace App\Extension;

use App\Contract\BeforeCallActionHandler;
use Override;
use PageController;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Extension;

/**
 * @extends Extension<PageController>
 */
final class MenuBarExtension extends Extension implements BeforeCallActionHandler
{
    #[Override]
    public function beforeCallActionHandler(HTTPRequest $request, string $action): void
    {
        $items = [];

        foreach ($this->getOwner()->getMenu(1) as $page) {
            $item = [
                'id' => static function () use ($page): int {
                    return $page->ID;
                },
                'menuTitle' => static function () use ($page): string {
                    return $page->MenuTitle;
                },
                'link' => static function () use ($page): string {
                    return $page->Link();
                },
            ];

            $items[] = $item;
        }

        $this->getOwner()->inertia->share('menuItems', $items);
    }
}
