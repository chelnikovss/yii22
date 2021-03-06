<?php

namespace app\controllers;

use app\models\Route;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\Lugansk;

use yii\web\Response;


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
        //$model = new Route();

        if(Yii::$app->request->isAjax){

            if(Yii::$app->request->post('officesPost'))
            {
                $dataIdCity = $this->converting(Yii::$app->request->post('officesPost'));
                $id = $dataIdCity[0];
                $tableName = $dataIdCity[1];

                if($tableName =='lugansk')
                {
                    $office = Lugansk::find()->where(['id' => $id])->asArray()->one();
                }
                $this->getLocationMail($office);

            }
            elseif (Yii::$app->request->post('calcTrackTime')){
                //  if (Yii::$app->request->isAjax && $model->load(Yii::$app->request->post()))
                Yii::$app->response->format = Response::FORMAT_JSON;
                $calcTrackTime = Yii::$app->request->post('calcTrackTime');
                //если такой маршрут есть
                $numberRoute = Route::findOne(['numberoute' => $calcTrackTime['numberoute']]);
                if($numberRoute != NULL)
                {
                    //echo "Маршрут с номером: ".$calcTrackTime['numberoute']." уже есть";
                    return "Маршрут с номером: ".$calcTrackTime['numberoute']." уже есть";
                }

                //return ActiveForm::validate($model);
                //$routepost = serialize($calcTrackTime['routepost']);
                // INSERT (table name, column values)

                $res = Yii::$app->db->createCommand()->insert(
                    'route', [
                    'id' => '',
                    'numberoute' => $calcTrackTime['numberoute'],
                    'routepost' => $calcTrackTime['routepost'],
                    'exitime' => $calcTrackTime['exitime'],
                    'track' => $calcTrackTime['track'],
                    'time' => $calcTrackTime['time'],
                    'parametersroute' => $calcTrackTime['parametersroute'],
                ])->execute();

                echo $res;
            }
            
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
        $coordinate['addressDesc'] = $res['addressDesc'];
        $coordinate['id'] = $res['id'];

        echo json_encode($coordinate);
    }

}
