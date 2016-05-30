<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/style.css',
    ];
    public $js = [
        'https://www.google.com/jsapi',
        'http://maps.google.com/maps/api/js?key=AIzaSyC2URhf2NqG8Sj_ek-Q2LY3zheCXvtPhm0&callback=initialize',
        //'http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initialize',
        'js/script.js',
        'js/function.js',
        //'js/bootbox.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',

    ];
}
