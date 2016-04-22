<?php
include('variables.php');
include ('db.php');

$db = DB::getDbInstance();

$db->connectDb($serverName, $userName, $password, $dbname);

$dataIdCity = $db->converting($_POST['officesPost']);

$sql = "SELECT * FROM $dataIdCity[1] WHERE  id = $dataIdCity[0]";

$res = $db->query($sql);

$db->getLocationMail($res);

$db->close();



