<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$adv = new Adv($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("advid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $adv->adv_aid = $_GET['advid'];
  $adv->adv_title = checkIndex($data, "adv_title");
  $adv->adv_image = checkIndex($data, "adv_image");
  $adv->adv_created = date("Y-m-d H:i:s");
  $adv->adv_datetime = date("Y-m-d H:i:s");
  checkId($adv->adv_aid);

//checks current data to avoid same entries from being updated
// $adv_name_old = checkIndex($data, 'adv_name_old');
// compareName($adv, $adv_name_old, $adv->adv_name);
// checkId($adv->adv_aid);

  // update
  $query = checkUpdate($adv);
  returnSuccess($adv, "adv", $query);
}

// return 404 error if endpoint not available
checkEndpoint();