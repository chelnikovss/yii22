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
        $postoffices = [];
        foreach ($postcenters as $post)
        {
            $postoffices[]=[
                'idoffices' => $post->idoffices,
                'nameoffices' => $post->nameoffices
            ];
        }

        return $this->render('choose',['postoffices'=>$postoffices]);
    }
    public function actionCreate()
    {
        $postoffices = [];
        $request = Yii::$app->request;
        $postoffices['id'] = $request->post('dataroute');;
        $postoffices['nameoffices'] = $request->post('optradio');

        return $this->render('create',['postoffices'=>$postoffices]);
    }
}