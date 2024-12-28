<?php
$conn = null;
$conn = checkDbConnection();
$adv = new Adv($conn);

if (array_key_exists("advid", $_GET)) {
    checkEndpoint();
} 

checkPayload($data);

$adv->adv_title = checkIndex($data, "adv_title");
$adv->adv_image = checkIndex($data, "adv_image");

$adv->adv_is_active = 1;
$adv->adv_created = date("Y-m-d H:i:s");
$adv->adv_datetime = date("Y-m-d H:i:s");

// isNameExist($adv, $adv->adv_title);

$query = checkCreate($adv);
returnSuccess($adv, "adv", $query);