<?php
$secret  = 'zmaxlab_deploy_2026';
$payload = file_get_contents('php://input');
$sig     = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$expect  = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expect, $sig)) {
    http_response_code(403);
    exit('Forbidden');
}

$data = json_decode($payload, true);
if (($data['ref'] ?? '') !== 'refs/heads/main') {
    exit('Not main branch — skipped.');
}

$root   = $_SERVER['DOCUMENT_ROOT'];
$output = shell_exec("cd " . escapeshellarg($root) . " && git pull origin main 2>&1");

http_response_code(200);
echo "Deployed OK\n" . $output;
