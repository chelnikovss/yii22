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
}