<?php
namespace app\models;

use yii\db\ActiveRecord;

class Route extends ActiveRecord
{
    public function rules()
    {
        return [
            [['number'], 'unique']
        ];
    }
}