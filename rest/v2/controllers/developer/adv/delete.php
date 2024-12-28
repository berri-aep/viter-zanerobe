<?php
$conn = null;
$conn = checkDbConnection();
$adv = new Adv($conn);
// $error = [];
// $returnData = [];
if (array_key_exists("advid", $_GET)) {
    $adv->adv_aid = $_GET['advid'];
    checkId($adv->adv_aid);
    // isAssociated($adv);
    $query = checkDelete($adv);
    returnSuccess($adv, "adv", $query);
}

checkEndpoint();