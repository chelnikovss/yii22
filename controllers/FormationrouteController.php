<?php
namespace app\controllers;

use app\models\Postcenters;
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

        return $this->render('choose',['postcenters'=>$postcenters]);
    }
}