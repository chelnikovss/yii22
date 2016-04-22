<?php
trait Singleton{
    static private $instance = null;
    private function __construct(){}    //new Singleton
    private function __clone(){}        //защита от клонирования
    private function __wakeup(){}       //защита от unserialize

    static public function getDbInstance (){
       
        return self::$instance===null?self::$instance = new static():self::$instance;
    }
}
class DB{
    use Singleton;

    //protected $db;
    private $conn;

    public function connectDb($serverName,$userName,$password,$dbname){

        @$this->conn = new mysqli($serverName,$userName,$password,$dbname);

        if(!$this->conn)
        {
            die("Error !".mysqli_connect_error());
        }
        $this->conn->query("SET NAMES 'utf8'");

    }

    public function converting($dataPost){
        return explode('|', $dataPost);
    }

    public function query($sql){
        //echo 11111;
        return $this->conn->query($sql);
    }

    public function getLocationMail($res){
        if($res->num_rows>0)
        {
            while($row = $res->fetch_assoc())
            {
                $coordinate['latlocation'] = $row['latlocation'];
                $coordinate['lnglocation'] = $row['lnglocation'];
                $coordinate['indexmail'] = $row['indexmail'];

                echo json_encode($coordinate);

            }
        }
    }

    public function close(){
        $this->conn->close();
    }

}
