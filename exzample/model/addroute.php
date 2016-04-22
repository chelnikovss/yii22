<?php
include('variables.php');
include ('db.php');

$db = DB::getDbInstance();

$db->connectDb($serverName, $userName, $password, $dbname);

$calcTrackTime = $_POST['calcTrackTime'];

//var_dump($calcTrackTime['routepost']);

$routepost = serialize($calcTrackTime['routepost']);
//var_dump($calcTrackTime['routepost']);

$sql = "INSERT INTO `route` (`id`,`numberoute`,`routepost`,`track`,`time`)  VALUES ('','$calcTrackTime[numberoute]','$calcTrackTime[routepost]','$calcTrackTime[track]','$calcTrackTime[time]')";

$res = $db->query($sql);

echo $res;

$db->close();
