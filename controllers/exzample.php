<?php
$arrPochta = [
    '0'=>['name1',2,10],
    '1'=>['name2',3,10],
    '2'=>['name3',4,10],
    '3'=>['name4',6,10],
];

$arrDictance = [
    '0'=>[0,1,2,3],
    '1'=>[1,0,5,6],
    '2'=>[2,5,0,7],
    '3'=>[3,6,7,0],
];

for($i = 0, $len = count($arrPochta); $i<$len; $i++ )
{
    for($j=0; $j<$len; $j++)
    {
        echo 'distance: '.$arrDictance[$i][$j].' start: '.$arrPochta[$j][0].' finish: '.$arrPochta[$i][0];
        echo ' id_center: '.$arrPochta[$i][2].'  id_center_start: '.$arrPochta[$i][1];
        echo ' id_center_finish: '.$arrPochta[$j][1];
        echo "<br />";
    }
    echo "<br /><br />";
}