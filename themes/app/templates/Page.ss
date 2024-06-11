<!doctype html>
<html lang="en">
<head>
    <%-- Required meta tags --%>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    {$MetaTags(false)}

    {$InertiaHead($PageData)}

    <% require themedCSS("dist/app") %>
</head>
    <body data-pagetype="{$ClassName}">
        {$InertiaBody($PageData)}
    </body>

    <% require themedJavascript("dist/app") %>
</html>
