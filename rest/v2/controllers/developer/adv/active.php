<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/adv/Adv.php';

$conn = null;
$conn = checkDbConnection();
$adv = new Adv($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("advid", $_GET)) {

        checkPayload($data);
        $adv->adv_aid = $_GET['advid'];
        $adv->adv_is_active = trim($data["isActive"]);
        $adv->adv_datetime = date("Y-m-d H:i:s");

        checkId($adv->adv_aid);
        $query = checkActive($adv);
        http_response_code(200);
        returnSuccess($adv, "adv", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();