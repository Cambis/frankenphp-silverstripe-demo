<?php

// https://frankenphp.dev/docs/worker/#custom-apps

// Prevent worker script termination when a client connection is interrupted
ignore_user_abort(true);

use SilverStripe\Control\HTTPApplication;
use SilverStripe\Control\HTTPRequestBuilder;
use SilverStripe\Core\CoreKernel;

// Find autoload.php
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require __DIR__ . '/../vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'autoload.php not found';
    exit(1);
}

if (!function_exists('frankenphp_handle_request')) {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'FrankenPHP must be in worker mode to use this script.';
    exit(1);
}

// Default application
$kernel = new CoreKernel(BASE_PATH);
$app = new HTTPApplication($kernel);

$running = true;
$requestCount = 0;
$maxRequests = $_ENV['MAX_REQUESTS'] ?? $_SERVER['MAX_REQUESTS'] ?? null;
$maxRequestsHit = false;

// Handler outside the loop for better performance (doing less work)
$handler = static function () use ($app): void {
    // Called when a request is received
    $request = HTTPRequestBuilder::createFromEnvironment();
    $app->handle($request)->output();
};

while ($running) {
    $requestCount += 1;
    $running = \frankenphp_handle_request($handler);   

    if (is_numeric($maxRequests) && $requestCount >= (int) $maxRequests) {
        $running = false;
    }

    // Call the garbage collector to reduce the chances of it being triggered in the middle of a page generation
    gc_collect_cycles();
}
