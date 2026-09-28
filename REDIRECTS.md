# 301 redirect map — Extreme Fire Design Inc
#
# TODO_CONFIRM: the final production domain. Every target below is written
# relative (no host) so the whole map can be dropped into whichever host or
# CDN ends up in front of the site. GitHub Pages does NOT support redirects in
# a .htaccess or _redirects file, so these must be applied wherever the real
# domain is hosted (Cloudflare, Netlify, Vercel, or the web host itself).
#
# Format:  <old path>  ->  <new path>

## Old top-level product pages with spaces in the filename.
# These were never valid URLs, but they have been linked to and may be indexed.
/fire%20hydrant.html                 ->  /fire-hydrant-hose-reel-systems.html
/fire hydrant.html                   ->  /fire-hydrant-hose-reel-systems.html
/hydrant.html                       ->  /fire-hydrant-hose-reel-systems.html

/auto%20sprinkler.html               ->  /fire-sprinkler-installation-harare.html
/auto sprinkler.html                 ->  /fire-sprinkler-installation-harare.html
/auto-sprinkler.html                 ->  /fire-sprinkler-installation-harare.html
/sprinkler.html                      ->  /fire-sprinkler-installation-harare.html
/fire-sprinkler.html                 ->  /fire-sprinkler-installation-harare.html

/fire%20detection.html               ->  /fire-alarm-detection-systems-harare.html
/fire detection.html                 ->  /fire-alarm-detection-systems-harare.html
/fire-detection.html                 ->  /fire-alarm-detection-systems-harare.html
/detection.html                      ->  /fire-alarm-detection-systems-harare.html
/fire-alarm.html                     ->  /fire-alarm-detection-systems-harare.html

/gas%20fire.html                     ->  /gas-fire-suppression-fm200.html
/gas fire.html                       ->  /gas-fire-suppression-fm200.html
/gas-fire.html                       ->  /gas-fire-suppression-fm200.html
/fm200.html                          ->  /gas-fire-suppression-fm200.html

/deluge%20water%20spray.html         ->  /systems.html
/deluge water spray.html             ->  /systems.html
/deluge-water-spray.html             ->  /systems.html
/water-spray.html                    ->  /systems.html

## Core pages — unchanged targets, listed so the audit is explicit.
/portfolio.html                      ->  /portfolio.html
/services.html                       ->  /services.html
/about.html                          ->  /about.html
/contact.html                        ->  /contact.html
/faq.html                            ->  /faq.html
/systems.html                        ->  /systems.html

## New landing pages: no redirect needed, listed for completeness.
/fire-sprinkler-installation-harare.html   -> (new)
/fire-alarm-detection-systems-harare.html  -> (new)
/fire-hydrant-hose-reel-systems.html       -> (new)
/gas-fire-suppression-fm200.html            -> (new)
/fire-safety-compliance-zimbabwe.html       -> (new)
/fire-protection-bulawayo.html              -> (new)

## Domain-level: if extremefire.co.zw is retired in favour of the confirmed
# production domain, add a host-level 301 for the whole apex domain plus a
# wildcard, and confirm which of the two domains is canonical before launch.
# extremefire.co.zw                ->  <confirmed production domain>
# www.extremefiredesigninc.com     ->  <confirmed production domain>
