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
                        if($key == 'date'){
                            $arrDataBD['date'] = $route;
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
                                //echo $route[$i]['idpochta']."-".$route[$i+1]['idpochta']."<br />";
                                //echo "idcenter = ".$route[$j]['idcenter']."<br />";
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
                                $sql = "SELECT distance FROM distancesmatrix WHERE `id_center`='$idcenter' AND `id_centerspost_start`='$idpochtastart' AND `id_centerspost_finish`='$idpochtafinish'";
                                $distance = Distancesmatrix::findBySql($sql)->asArray()->one();
                                // 40 км/ч = 11 м/c
                                $timeWay = ($distance['distance']*1000)/11;
                                $arrDataBD[] = array('idpochta' =>$route[$j]['idpochta'],'namepochta'=>$route[$j]['name'],'timeWay' => $this->secondToHMS($timeWay),'distance' => $distance['distance']);
                            }
                        }
                    }
                    var_dump($arrDataBD);
                    //start excel
                    $inputFileName = './patternxsl/pattern.xlsx';
                    $objPHPExcel = \PHPExcel_IOFactory::load($inputFileName);
                    //start line in excel file
                    $numberStartLine = 19;
                    $objPHPExcel->setActiveSheetIndex(0);
                    $n = 0;
                    $start = 0;
                    $startFormatExcelFile = true;
                    $endTime = 0;
                    foreach($arrDataBD as $key=>$value)
                    {
                        if($startFormatExcelFile)
                        {
                            $timeData = strtotime($arrDataBD['date']);
                            $timeData = date("d-m-Y",$timeData);
                            $objPHPExcel->getActiveSheet()->setCellValue('C9', $timeData." г.");
                            $objPHPExcel->getActiveSheet()->setCellValue('E17', $arrDataBD['timeStart']);
                            $objPHPExcel->getActiveSheet()->setCellValue('F18', $arrDataBD['typeStransportStart']);
                            if($arrDataBD['typeStransportStart'] == 8)
                            {
                                $start = '00:15';
                            }
                            elseif($arrDataBD['typeStransportStart'] == 2)
                            {
                                $start = '00:05';
                            }
                            $objPHPExcel->getActiveSheet()->setCellValue('B18', $start);
                            $tempTime = $this->hmsToSecond($arrDataBD['timeStart'])+$this->hmsToSecond($start);
                            $endTime = $this->hmsToSecond($arrDataBD['timechange'])+$tempTime;
                            $endTime = $this->secondToHMS($endTime);
                            $tempTime = $this->secondToHMS($tempTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('C18', $tempTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('D18', $arrDataBD['timechange']);
                            $objPHPExcel->getActiveSheet()->setCellValue('E18', $endTime);
                            $startFormatExcelFile = false;
                        }

                        if(!is_string($key))
                        {
                            $number = $numberStartLine+$n;
                            $objPHPExcel->getActiveSheet()->setCellValue('F'.$number, $arrDataBD[$key]['distance']);
                            $objPHPExcel->getActiveSheet()->setCellValue('G'.$number, $arrDataBD[$key]['namepochta']);
                            ///time start
                            $objPHPExcel->getActiveSheet()->setCellValue('B'.$number, $arrDataBD[$key]['timeWay']);
                            $tempTime = $this->hmsToSecond($arrDataBD[$key]['timeWay'])+$this->hmsToSecond($endTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('C'.$number, $this->secondToHMS($tempTime));
                            //учитываем время перерыва
                            if($arrDataBD['idbreak'] == $arrDataBD[$key]['idpochta'])
                            {
                                $timeBreak = $this->hmsToSecond($arrDataBD['timebreak']) + $this->hmsToSecond($arrDataBD['timechange']);
                                $timeBreak = $this->secondToHMS($timeBreak);
                                $objPHPExcel->getActiveSheet()->setCellValue('D'.$number, $timeBreak);
                                $endTime =  $this->hmsToSecond($timeBreak) + $tempTime;
                                //$objPHPExcel->getActiveSheet()->setCellValue('E'.$number, $endTime);
                            }
                            else
                            {
                                $objPHPExcel->getActiveSheet()->setCellValue('D'.$number, $arrDataBD['timechange']);
                                $endTime = $this->hmsToSecond($arrDataBD['timechange'])+$tempTime;
                            }
                            $endTime = $this->secondToHMS($endTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('E'.$number, $endTime);
                            ///time end
                            $objPHPExcel->getActiveSheet()->setCellValue('A'.$number, $n+1);
                            $n++;
                        }

                    }
                    $objPHPExcel->getActiveSheet()->setTitle($arrDataBD['routeName']);
                    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                    $currentTime = time();
                    $routeName = mb_convert_encoding($arrDataBD['routeName'],'Windows-1251', 'UTF-8');
                    $nameFile = $routeName.'-('.$timeData.")-".$currentTime;
                    $nameFile = "xlsx/Marchrut-".$nameFile.".xlsx";
                    $objWriter->save(str_replace(__FILE__,$nameFile,__FILE__));
                    echo "__FILE__".__FILE__."<br>";
                    //end excel
                }
                return;
            }
        }
    }
    /*перевод секунд в формата времени HH:MM:SS*/
    function secondToHMS($s)
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
    /*перевод HH:MM:SS в секунды*/
    function hmsToSecond($timeHHMM)
    {
        if(count($timeHHMM)<7)
            $timeHHMM .=":00";

        $p = explode(":",$timeHHMM);
        $s = 0;
        $m = 1;

        while (count($p)>0)
        {
            $s += $m * intval(array_pop($p));
            $m*=60;
        }

        return $s;


    }

    }
