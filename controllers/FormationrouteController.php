<?php
namespace app\controllers;

use app\models\Postcenters;
use app\models\Centerspost;
use app\models\Distancesmatrix;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\helpers\BaseFileHelper;

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
                $inputFileName = './patternxsl/pattern.xlsx';
                $objPHPExcel = \PHPExcel_IOFactory::load($inputFileName);
                for($i = 0, $len = count($routeAll); $i<$len; $i++)
                {
                    $arrDataBD = [];
                    $timeLuganskCOPP = null;
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
                        /*  if($key == 'timeSharing')
                        {
                            $arrDataBD['timechange'] =  $route;
                            //echo $arrDataBD['timechange']."<br />";
                        }*/
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
                            for($k = 0, $ln = count($route) - 1; $k<$ln; $k++)
                            {
                                if($k==0) 
                                    $timeLuganskCOPP = $route[$k]['timeSharingLocal'];
                                $j=$k+1;
                                $idcenter = $route[$k]['idcenter'];
                                $idpochtastart = $route[$k]['idpochta'];
                                $idpochtaConststart =  $idpochtastart;
                                $idpochtafinish = $route[$j]['idpochta'];
                                $idpochtaConstfinish = $idpochtafinish;
                                //TODO
                                //для первомайска id_center = 2
                                // если $idpochtastart = 15 заменяем на 1
                                // если $idpochtafinish = 14 заменяем на 4
                                if($route[$k]['idcenter'] == 2)
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
                                $sql = "SELECT distance FROM distancesmatrix WHERE `id_center`='$idcenter' AND `id_centerspost_start`='$idpochtastart' AND `id_centerspost_finish`='$idpochtafinish' OR `id_centerspost_start`='$idpochtafinish' AND `id_centerspost_finish`='$idpochtastart'";
                                $distance = Distancesmatrix::findBySql($sql)->asArray()->one();
                                // 40 км/ч = 11 м/c
                                $timeWay = ($distance['distance']*1000)/11;
                                $arrDataBD[] = array('idpochta' =>$route[$j]['idpochta'],'timeSharingLocal' =>$route[$j]['timeSharingLocal'], 'namepochtastart'=>$route[$k]['name'],'namepochta'=>$route[$j]['name'],'timeWay' => $this->secondToHMS($timeWay),'distance' => $distance['distance'],'idpochtaConststart'=>$idpochtaConststart,'idpochtaConstfinish'=>$idpochtaConstfinish);
                                var_dump($arrDataBD);
                            }
                        }

                    }
                    //start excel
                    echo "start exsel";
                    //start line in excel file
                    $numberStartLine = 19;
                    $objPHPExcel->setActiveSheetIndex(0);
                    $n = 0;
                    $start = 0;
                    $startFormatExcelFile = true;
                    $endTime = 0;
                    $flayWay = true;
                    $total = array('distanse' => 0,'time' => 0);
                    end($arrDataBD);
                    $last = key($arrDataBD);
                    foreach($arrDataBD as $key => $value)
                    {
                        if($startFormatExcelFile)
                        {
                            //$text = $objPHPExcel->getActiveSheet()->getCell('C8')->getValue();
                            $numberMarchrut = $i+1;
                            $text ="движения автотранспорта по маршруту  №"."$numberMarchrut ".$arrDataBD['routeName'];
                            $objPHPExcel->getActiveSheet()->setCellValue('C8', $text);
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
                            //$endTime = $this->hmsToSecond($arrDataBD['timechange'])+$tempTime;
                            $endTime = $this->hmsToSecond($timeLuganskCOPP)+$tempTime;
                            $endTime = $this->secondToHMS($endTime);
                            $tempTime = $this->secondToHMS($tempTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('C18', $tempTime);
                            //$objPHPExcel->getActiveSheet()->setCellValue('D18', $arrDataBD['timechange']);
                            //$route[0]['timeSharingLocal'] время стоянки на Луганск ЦОП всегда первый - поэтому ноль
                            $objPHPExcel->getActiveSheet()->setCellValue('D18', $timeLuganskCOPP);
                            $objPHPExcel->getActiveSheet()->setCellValue('E18', $endTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('G18', 'Луганск Центральная касса');
                            $startFormatExcelFile = false;
                        }

                        if(!is_string($key))
                        {
                            echo " key = ".$key;
                            //в обратную сторону
                            // первомайск idpochtaConstfinish = 15
                            $number = $numberStartLine+$n;
                            if($arrDataBD[$key]['idpochtaConstfinish'] == 15)
                            {
                                $objPHPExcel->getActiveSheet()->setCellValue('H'.$number, $arrDataBD[$key]['distance']);
                                $total['distanse']+=$arrDataBD[$key]['distance'];
                                //echo $total['distanse']." = total <br />"."n = "."$n"."<br /><br />";
                                $objPHPExcel->getActiveSheet()->setCellValue('I'.$number, $arrDataBD[$key]['timeWay']);
                                $total['time']+=$this->hmsToSecond($arrDataBD[$key]['timeWay']);
                                echo "endTime 1 = ".$endTime."<br />";
                                echo "total[time] = ".$total['time']."<br />";
                                echo "arrDataBD[key]['timeWay'] = ".$arrDataBD[$key]['timeWay']."<br />";
                                $tempTime = $this->hmsToSecond($arrDataBD[$key]['timeWay']) + $this->hmsToSecond($endTime);
                                //echo "tempTime  = ".$tempTime."<br />";
                                $t = $this->secondToHMS($tempTime);
                                //echo "t  = ".$t."<br />";
                                $objPHPExcel->getActiveSheet()->setCellValue('J'.$number, $t);
                                $objPHPExcel->getActiveSheet()->setCellValue('K'.$number, $arrDataBD[$key]['timeSharingLocal']);
                                $endTime = $this->hmsToSecond($arrDataBD[$key]['timeSharingLocal']) + $tempTime;
                                $endTime = $this->secondToHMS($endTime);
                                $objPHPExcel->getActiveSheet()->setCellValue('L'.$number, $endTime);
                                $flayWay = false;
                            }
                            else
                            {
                                $objPHPExcel->getActiveSheet()->setCellValue(($flayWay?'F':'H').$number, $arrDataBD[$key]['distance']);
                                $total['distanse']+=$arrDataBD[$key]['distance'];
                                ///time start
                                $objPHPExcel->getActiveSheet()->setCellValue(($flayWay?'B':'I').$number, $arrDataBD[$key]['timeWay']);
                                $total['time']+=$this->hmsToSecond($arrDataBD[$key]['timeWay']);
                                $tempTime = $this->hmsToSecond($arrDataBD[$key]['timeWay'])+$this->hmsToSecond($endTime);
                                $objPHPExcel->getActiveSheet()->setCellValue(($flayWay?'C':'J').$number, $this->secondToHMS($tempTime));
                                //учитываем время перерыва
                                if($arrDataBD['idbreak'] == $arrDataBD[$key]['idpochta'])
                                {
                                    $timeBreak = $this->hmsToSecond($arrDataBD['timebreak']) + $this->hmsToSecond($arrDataBD[$key]['timeSharingLocal']);
                                    $timeBreak = $this->secondToHMS($timeBreak);
                                    $objPHPExcel->getActiveSheet()->setCellValue('D'.$number, $timeBreak);
                                    $endTime =  $this->hmsToSecond($timeBreak) + $tempTime;
                                    //$objPHPExcel->getActiveSheet()->setCellValue('E'.$number, $endTime);
                                }
                                else
                                {
                                    $objPHPExcel->getActiveSheet()->setCellValue(($flayWay?'D':'K').$number, $arrDataBD[$key]['timeSharingLocal']);
                                    $endTime = $this->hmsToSecond($arrDataBD[$key]['timeSharingLocal']) + $tempTime;
                                }
                                $endTime = $this->secondToHMS($endTime);
                                $objPHPExcel->getActiveSheet()->setCellValue(($flayWay?'E':'L').$number, $endTime);
                                ///time end
                                if($flayWay)
                                    $objPHPExcel->getActiveSheet()->setCellValue('A'.$number, $n+1);
                            }
                                $objPHPExcel->getActiveSheet()->setCellValue('G'.$number, $arrDataBD[$key]['namepochta']);
                                $n++;
                        }
                        if($last === $key)
                        {
                            echo $total['distanse']." = total <br />";
                            $total['distanse']+=$arrDataBD['typeStransportFinish'];
                            $total['distanse']+=$arrDataBD['typeStransportStart'];
                            $number+=1;
                            $objPHPExcel->getActiveSheet()->setCellValue('G'.$number, 'Луганск  ЦОПП, гараж');
                            $objPHPExcel->getActiveSheet()->setCellValue('H'.$number, $arrDataBD['typeStransportFinish']);
                            if($arrDataBD['typeStransportFinish'] == 10)
                            {
                                $timeLast = "00:15";
                            }
                            if($arrDataBD['typeStransportFinish'] == 2)
                            {
                                $timeLast = "00:05";
                            }
                            $objPHPExcel->getActiveSheet()->setCellValue('I'.$number, $timeLast);
                            $timeLastForTotal = $timeLast;
                            $endTime = $this->hmsToSecond($endTime) + $this->hmsToSecond($timeLast);
                            $timeLast = $this->secondToHMS($endTime);
                            $objPHPExcel->getActiveSheet()->setCellValue('J'.$number, $timeLast);
                            //$objPHPExcel->getActiveSheet()->setCellValue('B'.$number,$total['distanse']);
                            //$text = $objPHPExcel->getActiveSheet()->getCell('B50')->getValue();
                            $text = "Протяженность маршрута ";
                            $text = $text.$total['distanse'].' км';
                            $objPHPExcel->getActiveSheet()->setCellValue('B50', $text);

                            //$text = $objPHPExcel->getActiveSheet()->getCell('B51')->getValue();
                            $text = "Продолжительность рабочего времени на маршруте: ";
                            echo "total['time'] = ".$total['time']."<br />";
                            echo "total['time'] = ".$timeLast."<br />";
                            echo "hmsToSecond($timeLastForTotal) = ".$this->hmsToSecond($timeLastForTotal)."<br />";
                            $total['time'] += $this->hmsToSecond($timeLastForTotal);
                            $total['time'] = $this->secondToHMS($total['time'],false);

                            echo "total['time'] = ".$total['time']."<br />";
                            $text = $text.$total['time'];
                            $objPHPExcel->getActiveSheet()->setCellValue('B51', $text);
                        }
                    }
                    $charset = 'UTF-8';
                    $length = 31;
                    if(mb_strlen($arrDataBD['routeName'], $charset) > $length) {
                        $arrDataBD['routeName'] = mb_substr($arrDataBD['routeName'], 0, 27, $charset) . '...';
                    }
                    $objPHPExcel->getActiveSheet()->setTitle($arrDataBD['routeName']);
                    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                    $currentTime = time();
                    $routeName = mb_convert_encoding($arrDataBD['routeName'],'Windows-1251', 'UTF-8');
                    $nameFile = $routeName.'-('.$timeData.")-".$currentTime;

                    BaseFileHelper::createDirectory("xlsx/".$timeData);
                    $nameFile = "xlsx/".$timeData."/Marchrut-".$nameFile.".xlsx";
                    $objWriter->save(str_replace(__FILE__,$nameFile,__FILE__));
                    echo "__FILE__".__FILE__."<br />";
                    echo "end xsl"."<br />";
                    //end excel
                }
                return;
            }
        }
    }

    public function actionAddpochta()
    {
        if(Yii::$app->request->isAjax)
        {
            if(Yii::$app->request->post('pochta'))
            {
                $pochta = Yii::$app->request->post('pochta');
                $rowCenterspost = new Centerspost();
                $rowCenterspost->namepochta = $pochta['addpochta'];
                $rowCenterspost->adress = $pochta['adresid'];
                $center = Postcenters::find()->where(['idcenter'=>$pochta['numberpochta']])->asArray()->one();
                $rowCenterspost->namecenter = $center['nameoffices'];
                $rowCenterspost->id_center = $pochta['numberpochta'];
                $res = $rowCenterspost->save();
                if($res)
                    return 1;
                else
                    return 0;

            }
            if(Yii::$app->request->post('keyData'))
            {
                $keyData = Yii::$app->request->post('keyData');
                $res = Centerspost::find()->where(['id_center'=>$keyData['idCenter'],'namepochta'=>$keyData['namePochta']])->asArray()->one();
                //id добавленного почтового отделения $res['idcenterspost']
                $resAll = Centerspost::find()->where(['id_center'=>$keyData['idCenter']])->asArray()->all();
                $data = [];
                $data['newPochta'] = $res;
                $data['allOldPochta'] = $resAll;
                $result = json_encode($data);
                return $result;
            }
            if(Yii::$app->request->post('allRouteMatrix'))
            {
                $allRouteMatrix = Yii::$app->request->post('allRouteMatrix');
                var_dump($allRouteMatrix);
                $result = 0;
                for($i = 0, $len = count($allRouteMatrix); $i<$len; $i++)
                {
                    $distancesmatrix = new Distancesmatrix();
                    $distancesmatrix->distance = $allRouteMatrix[$i]['distance'];
                    $distancesmatrix->start = $allRouteMatrix[$i]['start'];
                    $distancesmatrix->finish = $allRouteMatrix[$i]['finish'];
                    $distancesmatrix->id_center = $allRouteMatrix[$i]['idcenter'];
                    $distancesmatrix->id_centerspost_start = $allRouteMatrix[$i]['idstart'];
                    $distancesmatrix->id_centerspost_finish = $allRouteMatrix[$i]['idfinish'];
                    $res = $distancesmatrix->save();

                    if(!$res)
                    {
                        $result = $res;
                        break;
                    }
                    elseif($i == $len-1)
                    {
                        $result = $res;
                        break;
                    }


                }
                return $result;
            }
            if(Yii::$app->request->post('dataForDel'))
            {
                $dataForDel = Yii::$app->request->post('dataForDel');
                $res = Centerspost::find()->where(['id_center' =>$dataForDel['number']])->asArray()->all();;
                $jsonData = json_encode($res);
                return $jsonData;
            }
            if(Yii::$app->request->post('idData')){

                $data = Yii::$app->request->post('idData');
                //var_dump($data);
                $id = $data['idcenterspost'];
                $id_center = $data['id_center'];
                $centerspost = Centerspost::findOne($id);
                $res = $centerspost->delete();
                if(!$res)
                {
                    return false;
                }
                else
                {
                    //Customer::deleteAll('age > :age AND gender = :gender', [':age' => 20, ':gender' => 'M']);
                    $countsDeleteRows = Distancesmatrix::deleteAll('id_center = :id_center AND (id_centerspost_start = :id_centerspost_start OR id_centerspost_finish = :id_centerspost_finish)',[':id_center'=>$id_center,':id_centerspost_start'=>$id, ':id_centerspost_finish'=>$id]);
                    if($countsDeleteRows>1)
                        return $countsDeleteRows;
                }
                return true;
            }
            if(Yii::$app->request->post('dataForChange')){

                return 1;

            }
        }
    }


    public function actionAdd()
    {
        return $this->render('add');
    }

    /*перевод секунд в формата времени HH:MM:SS*/
    function secondToHMS($s,$flag=true)
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
        if($flag)
            return ($h<10?'0'.$h:$h).":".($m<10?'0'.$m:$m);
        else
            return ($h<10?'0'.$h:$h)." ч. ".($m<10?'0'.$m:$m)." м. ";

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
