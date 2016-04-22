<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\Lugansk;

class SiteController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

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

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    public function actionAbout()
    {
        return $this->render('about');
    }
    public function actionSay($message='Привет')
    {
        return $this->render('say',['message' => $message]);
    }
    public function actionMain()
    {
        if(Yii::$app->request->isAjax){

            if(Yii::$app->request->post('officesPost'))
            {
                $dataIdCity = $this->converting(Yii::$app->request->post('officesPost'));
                $id = $dataIdCity[0];
                $tableName = $dataIdCity[1];

                //Lugansk::tableName($dataIdCity[1]);

                if($tableName =='lugansk')
                {
                    $office = Lugansk::find()->where(['id' => $id])->asArray()->one();
                }
                $this->getLocationMail($office);


                return;
            }
            echo 111;
            return;

        }

        return $this->render('main');
    }
    public function converting($dataPost){
        return explode('|', $dataPost);
    }
    public function getLocationMail($res){
        $coordinate['latlocation'] = $res['latlocation'];
        $coordinate['lnglocation'] = $res['lnglocation'];
        $coordinate['indexmail'] = $res['indexmail'];

        echo json_encode($coordinate);
    }

}
