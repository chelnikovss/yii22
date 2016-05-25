<?php
namespace app\controllers;

use app\models\Postcenters;
use app\models\Centerspost;
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
}