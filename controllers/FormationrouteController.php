<?php
namespace app\controllers;

use app\models\Postcenters;
use app\models\Centerspost;
use app\models\Distancesmatrix;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;

//use app\models\Formation;
class FormationrouteController extends Controller
{
    public function actions()
    {
        return [
            'error' =>[
                'class' =>'yii\web\ErrorAction',
            ],
        ];
    }
    
    public function actionChoose()
    {
        $postcenters = Postcenters::find()->all();
        $postoffices = [];
        foreach ($postcenters as $post)
        {
            $postoffices[] = [
                'idcenter' => $post->idcenter,
                'nameoffices' => $post->nameoffices
            ];
        }

        return $this->render('choose',['postoffices'=>$postoffices]);
    }
    public function actionCreate()
    {
        $postoffices = [];
        $request = Yii::$app->request;
        $optradio = explode('|',$request->post('optradio'));
        $postoffices['nameoffices'] = $optradio[0];
        $postoffices['id'] = $optradio[1];
        $postoffices['dataroute'] = $request->post('dataroute');

        $postcenters = Centerspost::find()->where(['id_center' =>$postoffices['id']])->all();

        return $this->render('create',['postcenters'=>$postcenters, 'postoffices' => $postoffices]);
    }
    
    public function actionCreatexsel()
    {
        if(Yii::$app->request->isAjax)
        {
            if(Yii::$app->request->post('routeAll'))
            {
                $routeAll = Yii::$app->request->post('routeAll');
                for($i = 0, $len = count($routeAll); $i<$len; $i++)
                {
                    $arrDataBD = [];
                    foreach ($routeAll[$i] as $key => $route)
                    {
                        if($key == 'typeStransport')
                        {
                            $startFinish = explode('|', $route);
                            $arrDataBD['typeStransportStart'] = $startFinish[0];
                            $arrDataBD['typeStransportFinish'] = $startFinish[1];
                            //echo $arrDataBD['typeStransportStart']."---".$arrDataBD['typeStransportFinish']."<br />";
                        }
                        if($key == 'timeDeparture')
                        {
                            $arrDataBD['timeStart'] =  $route;
                            //echo $arrDataBD['timeStart']."<br />";
                        }
                        if($key == 'timeDurationBreak')
                        {
                            $arrDataBD['timebreak'] =  $route;
                            //echo $arrDataBD['timebreak']."<br />";
                        }
                        if($key == 'timeSharing')
                        {
                            $arrDataBD['timechange'] =  $route;
                            //echo $arrDataBD['timechange']."<br />";
                        }
                        if($key == 'placeBreakIdPochta')
                        {
                            $arrDataBD['idbreak'] =  $route;
                           // echo $arrDataBD['idbreak']."<br />";
                        }
                        if($key == 'routeName')
                        {
                            $arrDataBD['routeName'] =  $route;
                           // echo $arrDataBD['routeName']."<br />";
                        }
                        if($key == 'arrPochta')
                        {
                            for($i = 0, $len = count($route) - 1; $i<$len; $i++)
                            {

                                //var_dump($route);
                                $j=$i+1;
                                echo $route[$i]['idpochta']."-".$route[$i+1]['idpochta']."<br />";
                                echo "idcenter = ".$route[$j]['idcenter']."<br />";
                                $idcenter = $route[$i]['idcenter'];
                                $idpochtastart = $route[$i]['idpochta'];
                                $idpochtafinish = $route[$j]['idpochta'];
                                //для первомайска
                                // если $idpochtastart = 15 заменяем на 1
                                // если $idpochtafinish = 14 заменяем на 4
                                if($route[$i]['idcenter'] == 2)
                                {
                                    if($idpochtastart == 15)
                                        $idpochtastart = 1;
                                    if($idpochtastart == 14)
                                        $idpochtastart = 4;
                                    if($idpochtafinish == 15)
                                        $idpochtafinish = 1;
                                    if($idpochtafinish == 14)
                                        $idpochtafinish = 4;
                                }
                                echo " route[j]['namepochta'] = ".$route[$j]['name'];
                                $sql = "SELECT distance FROM distancesmatrix WHERE `id_center`='$idcenter' AND `id_centerspost_start`='$idpochtastart' AND `id_centerspost_finish`='$idpochtafinish'";
                                $distance = Distancesmatrix::findBySql($sql)->asArray()->one();
                                echo "distance = ".$distance['distance']."<br />";
                                // 40 км/ч = 11 м/c
                                $timeWay = ($distance['distance']*1000)/11;
                                echo "time = ".$timeWay."<br />";
                                $arrDataBD[] = array('namepochta'=>$route[$j]['name'],'timeWay' => $this->changeTimeFormatHM($timeWay),'distance' => $distance['distance']);
                                echo "time HH::MM = ".$this->changeTimeFormatHM($timeWay)."<br />";
                            }
                        }
                    }
                    var_dump($arrDataBD);
                    //start exsel
                    $inputFileName = './patternxsl/pattern.xlsx';

                    $objPHPExcel = \PHPExcel_IOFactory::load($inputFileName);

                    $numberStartLine = 19;

                    $objPHPExcel->setActiveSheetIndex(0);

                    for($i=0, $len = count($arrDataBD); $i<$len; $i++)
                    {
                        echo "i = ".$i."<br />";
                        if($i == 0)
                        {

                            $objPHPExcel->getActiveSheet()->setCellValue('E17', $arrDataBD['timeStart']);
                        }
                        $number = $numberStartLine+$i;
                        $objPHPExcel->getActiveSheet()->setCellValue('A'.$number, $i+1);
                        
                    }
                    $objPHPExcel->getActiveSheet()->setTitle('111');
                    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                    $currentTime = time();
                    $nameFile = $currentTime;

                    $nameFile = "xlsx/Marchrut-_".$nameFile.".xlsx";

                    $objWriter->save(str_replace(__FILE__,$nameFile,__FILE__));

                    echo "__FILE__".__FILE__."<br>";

                    //end exsel
                }
                return;
            }
        }
    }
    function changeTimeFormatHM($s)
    {
        $h = floor($s/3600);
        $s-=$h*3600;
        $m = floor($s/60);
        $s-=$m*3600;

        if($s>30)
        {
            $m+=1;
        }
        if($m==60)
        {
            $h+=1;
            $m = 0;
        }

        return ($h<10?'0'.$h:$h).":".($m<10?'0'.$m:$m);
    }
}