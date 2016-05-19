<?php
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;

use app\models\Route;

class RouteController extends Controller
{
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionGtroutes()
    {
        $routes = Route::find()->all();
        $indexmail ="";
        for($i=0;$i<count($routes);$i++)
        {
            $r = (json_decode($routes[$i]['routepost']));
            for($j=0;$j<count($r);$j++)
            {
                $indexmail .= $r[$j]->indexmail." ";
            }
            $routes[$i]['routepost'] = $indexmail;
            $indexmail ="";
        }

        return $this->render('gtroutes',['routes'=>$routes]);
    }

    public function actionAjax(){

        if(Yii::$app->request->isAjax)
        {
            //exsel
            if(Yii::$app->request->post('checkInput'))
            {
                $arrayId = Yii::$app->request->post('checkInput');

                $inputFileName = './patternxsl/pattern.xlsx';
                // Loading a Workbook from a file
                $objPHPExcel = \PHPExcel_IOFactory::load($inputFileName);

                /*  ------ start phpexsel   */
                //https://github.com/PHPOffice/PHPExcel/blob/develop/Documentation/markdown/Overview/03-Creating-a-Spreadsheet.md

                /*array(6) {
                ["id"]=> string(2) "62"
                ["numberoute"]=> string(1) "5"
                ["routepost"]=> string(265) "[{"indexmail":"91002","addressDesc":"г. Луганск, ул.Артема, 183"},{"indexmail":"91007","addressDesc":"г. Луганск, ул. Достаевского, 43"},{"indexmail":"91005","addressDesc":"г. Луганск, ул. Годуванцева, 6"}]"
                ["track"]=> string(6) "12.839"
                ["time"]=> string(7) "0:24:39"
                ["parametersroute"]=> string(118) "[{"distance":6483,"parkingTime":"0:05"},{"distance":6483,"parkingTime":"0:05"},{"distance":6356,"parkingTime":"0:05"}]" }*/
                $numberStartLine = 14;
                $objPHPExcel->setActiveSheetIndex(0);
                for($i=0, $j = count($arrayId); $i<$j; $i++)
                {
                    $route = Route::find()->where(['id' => $arrayId[$i]])->asArray()->one();
                    var_dump($route);

                    $routepost = json_decode($route["routepost"]);

                    $parametersroute = json_decode($route["parametersroute"]);

                    for($n = 0, $k = count($routepost); $n<$k; $n++)
                    {
                        $number = $numberStartLine+$n;
                        $objPHPExcel->getActiveSheet()->setCellValue('A'.$number, $n+1);
                        if($n == 0)
                        {
                            $text = $objPHPExcel->getActiveSheet()->getCell('C7')->getValue();
                            $text = $text.$route['numberoute'];
                            $objPHPExcel->getActiveSheet()->setCellValue('C7', "$text");
                            $objPHPExcel->getActiveSheet()->setCellValue('E13', "$route[exitime]");
                            //$objPHPExcel->getActiveSheet()->setCellValue('E13', "111");
                        }

                        //массив $parametersroute всегда меньше на 1 чем $routepost
                        //***---****---****  (****) - отделение почты
                        if($n<$k-1){
                            //$parkingTime = $parametersroute[$n]->parkingTime;
                            $objPHPExcel->getActiveSheet()
                                ->setCellValue('B'.$number, $parametersroute[$n]->distancetimetext)
                                ->setCellValue('C'.$number, $parametersroute[$n]->coming)
                                ->setCellValue('D'.$number, $parametersroute[$n]->parkingTime)
                                ->setCellValue('E'.$number, $parametersroute[$n]->departure)
                                ->setCellValue('F'.$number, $parametersroute[$n]->distance);
                        }

                        $objPHPExcel->getActiveSheet()
                            ->setCellValue('G'.$number, $routepost[$n]->addressDesc)
                            ->setCellValue('F52', $route['track']);
                    }
                    $objPHPExcel->getActiveSheet()->setTitle('Луганск');
                    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                    $currentTime = time();
                    var_dump($currentTime);

                    $nameFile = $currentTime;

                    $nameFile = "xlsx/Marchrut-".$route["numberoute"]."_".$nameFile.".xlsx";
                    var_dump($nameFile);

                    $objWriter->save(str_replace(__FILE__,$nameFile,__FILE__));
                    //$objWriter->save(str_replace(__FILE__,'xlsx/filename1.xlsx',__FILE__));
                }
                echo "__FILE__".__FILE__."<br>";
                // Завершаем приложение
                return;
            }

            //удаление
            if(Yii::$app->request->post('checkRoute'))
            {
                $arrayId = Yii::$app->request->post('checkRoute');

                for($i = 0, $len = count($arrayId); $i<$len; $i++)
                {
                    $route = Route::findOne($arrayId[$i]);
                    $res = $route->delete();
                    if(!is_int($res))
                    {
                        break;
                    }
                    else
                    {
                        $res = true;
                    }
                }

                return $res;
            }
        }

    }

    public function getJson(){
        return 0;
    }
}

