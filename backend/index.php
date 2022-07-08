<?php

require 'vendor/autoload.php';
require 'db.php';


$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$container = $app->getContainer();
$container['upload_directory'] ='../frontend/src/assets/img/';

#API #1 - User Login
$app->post('/user/login', function ($request, $response, $args) {

    $login = $request->getParam('login');
    $password = $request->getParam('password');

    $sql = "SELECT * FROM user WHERE login = '$login' AND password = '$password'";

    try {
        $db = new db();
        $db = $db->connect();

        $stmt = $db->query($sql);
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($user);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
    }
});

// API #2 Register
$app->post('/user/register', function ($request, $response, $args) {
    $fullname = $request->getParam('fullname');
    $login = $request->getParam('login');
    $password = $request->getParam('password');

    try {
        $sql = "INSERT INTO user (fullname,login,password,usertype) VALUES (:fullname,:login,:password,:usertype)";

        $db = new db();
        // Connect
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':fullname', $fullname);
        $stmt->bindValue(':login', $login);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':usertype', "member");

        $stmt->execute();
        $count = $stmt->rowCount();
        $db = null;

        $data = array(
            "status" => "success",
            "rowcount" =>$count
        );
        echo json_encode($data);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }
});

// API #3 Get Booking List with status in progress
$app->get('/book', function ($request, $response, $args) {

    $sql = "SELECT b.bookingID, b.quantity, b.bookingDate, b.bookingTime, b.status, b.userID, b.movieID, u.fullname, m.movieName, m.ticketPrice FROM booking b INNER JOIN user u ON b.userID = u.userID INNER JOIN movie m ON b.movieID = m.movieID WHERE b.status = 'in process'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $book = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }
});


// API #4 Get Booking List with status collected
$app->get('/book/collected', function ($request, $response, $args) {

    $sql = "SELECT b.bookingID, b.quantity, b.bookingDate, b.bookingTime, b.status, b.userID, b.movieID, u.fullname, m.movieName, m.ticketPrice FROM booking b INNER JOIN user u ON b.userID = u.userID INNER JOIN movie m ON b.movieID = m.movieID WHERE b.status = 'Collected'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $book = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }
});

//API #5 Update Booking Status
$app->put('/book/{id}', function($request, $response, $args){

    $id = $args["id"];
    $status = $request->getParam('status');
    // $response->getBody()->write("update the user data with id: $id");
    // return $response;
    
    $sql = "UPDATE booking SET
				status	= :status
			WHERE bookingId = $id";

    try{
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':status',$status);

        $stmt->execute();
        $count = $stmt->rowCount();

        $data = array(
            "rowAffected" => $count,
            "status" => "success"
        );
        echo json_encode($data);
    
    } catch(PDOException $e){
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
        }
});

// API #6 Get current user
$app->get('/user/{id}', function ($request, $response, $args) {

    $id = $args["id"];
    $sql = "SELECT * FROM user WHERE userID = $id";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($user[0]);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
    }

});

// API #7 Update user full name
$app->put('/user/{id}', function($request, $response, $args){

    $id = $args["id"];
    $fullname = $request->getParam('fullname');
    
    $sql = "UPDATE user SET
				fullname	= :fullname
			WHERE userID = $id";

    try{
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':fullname',$fullname);

        $stmt->execute();
        $count = $stmt->rowCount();

        $data = array(
            "rowAffected" => $count,
            "status" => "success"
        );
        echo json_encode($data);
    
    } catch(PDOException $e){
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
        }
});

// API #8 Update Password
$app->put('/user/updatePassword/{id}', function($request, $response, $args){

    $id = $args["id"];
    $newPassword = $request->getParam('password');

    
    $sql = "UPDATE user SET
				password	= :password
			WHERE userID = $id";

    try{
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':password',$newPassword);

        $stmt->execute();
        $count = $stmt->rowCount();

        $data = array(
            "rowAffected" => $count,
            "status" => "success"
        );
        echo json_encode($data);
    
    } catch(PDOException $e){
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
        }
});

// API #9 Update Profile Image
$app->post('/user/updateImage/{id}', function ( $request, $response,$args){
    $id = $args["id"];
    $response = array();
    $upload_dir = '../frontend/src/assets/img/';
    $server_url = 'http://127.0.0.1:8000';

    if($_FILES['image'])
    {
        $image_name = $_FILES["image"]["name"];
        $image_tmp_name = $_FILES["image"]["tmp_name"];
        $error = $_FILES["image"]["error"];

        if($error > 0){
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }else 
        {
            $random_name = rand(1000,1000000)."-".$image_name;
            $upload_name = $upload_dir.strtolower($random_name);
            $random_name = strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
        
            if(move_uploaded_file($image_tmp_name , $upload_name)) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url."/".$upload_name
                );

                $sql = "UPDATE user SET
				photo	= :photo
                WHERE userID = $id";

                try{
                    $db = new db();
                    $db = $db->connect();
                    $stmt = $db->prepare($sql);

                    $stmt->bindParam(':photo',$random_name);

                    $stmt->execute();
                    $count = $stmt->rowCount();

                    $data = array(
                        "rowAffected" => $count,
                        "status" => "success"
                    );
                    echo json_encode($data);
                
                } catch(PDOException $e){
                    $data = array(
                        "status" => "fail",
                        $e
                    );
                    echo json_encode($data);
                    }

            }else
            {
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }
    }
    }else{
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
    }

    echo json_encode($response);

});

//API #10 Get all movie list
$app->get('/movie', function ($request, $response, $args) {

    $sql = "SELECT * FROM movie";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        // $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        $data = array();
        while($row = $stmt->fetch()){
            array_push($data,
            array('movieID'=>$row['movieID'],
                  'movieName'=>$row['movieName'],
                  'movieDescription'=>$row['movieDescription'],
                  'movieImage'=>$row['movieImage'],
                  'duration'=>$row['duration'],
                  'ticketPrice'=>$row['ticketPrice']
                  ));
        }


        $db = null;
        echo json_encode($data);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }
});

// API #11 - Insert New Movies
$app->post('/movie', function ($request, $response, $args) {

    $allPostPutVars = $request->getParsedBody();
    $movieName = $_POST["movieName"];
    $movieDescription = $_POST["movieDescription"];
    $duration = $_POST["duration"];
    $ticketPrice = $_POST["ticketPrice"];
    
    
    $response = array();
    $upload_dir = '../frontend/src/assets/img/';
    $server_url = 'http://127.0.0.1:8000';

    if($_FILES['image'])
    {
        $image_name = $_FILES["image"]["name"];
        $image_tmp_name = $_FILES["image"]["tmp_name"];
        $error = $_FILES["image"]["error"];

        if($error > 0){
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }else 
        {
            $random_name = rand(1000,1000000)."-".$image_name;
            $random_name = strtolower($random_name);
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
        
            if(move_uploaded_file($image_tmp_name , $upload_name)) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url."/".$upload_name
                );

                $sql = "INSERT INTO movie (movieName, movieDescription, movieImage, duration, ticketPrice) 
                VALUES (:movieName,:movieDescription,:image, :duration,:ticketPrice)";

                try{
                    $db = new db();
                    $db = $db->connect();
                    $stmt = $db->prepare($sql);

                    $stmt->bindValue(':movieName', $movieName);
                    $stmt->bindValue(':movieDescription', $movieDescription);
                    $stmt->bindValue(':image',$random_name);
                    $stmt->bindValue(':duration', $duration);
                    $stmt->bindValue(':ticketPrice', $ticketPrice);
                    $stmt->execute();
                    $count = $stmt->rowCount();

                    $data = array(
                        "rowAffected" => $count,
                        "status" => "success"
                    );
                    echo json_encode($data);
                
                } catch(PDOException $e){
                    $data = array(
                        "status" => "fail",
                        $e
                    );
                    echo json_encode($data);
                    }

            }else
            {
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }
    }
    }else{
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
    }

    echo json_encode($response);
});

// API #12 - Update Movie
$app->put('/movie/{id}', function($request, $response, $args){

    $id = $args["id"];
    $movieName = $request->getParam('movieName');
    $movieDescription = $request->getParam('movieDescription');
    $duration = $request->getParam('duration');
    $ticketPrice = $request->getParam('ticketPrice');
    
    $sql = "UPDATE movie SET
		movieName = :movieName,
        movieDescription = :movieDescription,
        duration = :duration,
        ticketPrice	= :ticketPrice
        WHERE movieID = $id";

    try{
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':movieName',$movieName);
        $stmt->bindParam(':movieDescription',$movieDescription);
        $stmt->bindParam(':duration',$duration);
        $stmt->bindParam(':ticketPrice',$ticketPrice);

        $stmt->execute();
        $count = $stmt->rowCount();

        $data = array(
            "rowAffected" => $count,
            "status" => "success"
        );
        echo json_encode($data);
    
    } catch(PDOException $e){
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
        }
});

// API #13 - Delete movie
$app->delete('/movie/{id}', function($request, $response, $args){
    $id = $args["id"];
   
    $sql = "DELETE FROM movie WHERE movieID = $id";

    try{
        $db = new db();
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $count = $stmt->rowCount();

        $data = array(
            "rowAffected" => $count,
            "status" => "success"
        );
        echo json_encode($data);
    
    } catch(PDOException $e){
        $data = array(
            "status" => "fail",
            $e
        );
        echo json_encode($data);
        }
});

// API #14 Get Booking List by userID
$app->get('/book/{id}', function ($request, $response, $args) {
    $id = $args["id"];
    $sql = "SELECT b.bookingID, b.quantity, b.bookingDate, b.bookingTime, b.status, b.userID, m.movieName, m.ticketPrice FROM booking b INNER JOIN movie m ON b.movieID = m.movieID WHERE b.userID = $id ";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $book = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }
});

// API #15 Insert Book
$app->post('/book', function ($request, $response, $args) {
    $quantity = $request->getParam('quantity');
    $bookingDate = $request->getParam('bookingDate');
    $bookingTime = $request->getParam('bookingTime');
    $status = "in process";
    $userID = $request->getParam('userID');
    $movieID = $request->getParam('movieID');

    try {
        $sql = "INSERT INTO booking (quantity,bookingDate,bookingTime,status,userID,movieID) VALUES (:quantity,:bookingDate,:bookingTime,:status,:userID,:movieID)";
        $db = new db();
        // Connect
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':quantity', $quantity);
        $stmt->bindValue(':bookingDate', $bookingDate);
        $stmt->bindValue(':bookingTime', $bookingTime);
        $stmt->bindValue(':status', $status);
        $stmt->bindValue(':userID', $userID);
        $stmt->bindValue(':movieID', $movieID);

        $stmt->execute();
        $count = $stmt->rowCount();
        $db = null;

        $data = array(
            "status" => "success",
            "rowcount" =>$count
        );
        echo json_encode($data);
    } catch (PDOException $e) {
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }

});

//API #16 Get Single Movie
$app->get('/movie/{id}', function ($request, $response, $args) {
    $id = $args['id'];

    $sql = "SELECT * FROM movie WHERE movieID = $id";

    class Movie{
        public $movieID = "";
        public $movieName = "";
        public $movieDescription = "";
        public $movieImage = "";
        public $duration = "";
        public $ticketPrice = "";
    }

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $row = $stmt->fetch();
        $movie = new Movie();
        $movie->movieID = $row['movieID'];
        $movie->movieName = $row['movieName'];
        $movie->movieDescription = $row['movieDescription'];
        // $movie->movieImage = base64_encode($row['movieImage']);
        $movie->movieImage = $row['movieImage'];
        $movie->duration = $row['duration'];
        $movie->ticketPrice = $row['ticketPrice'];
        $db = null;
        
        
        echo json_encode($movie);
    } catch(PDOException $e){
        $data = array(
            "status" => "fail"
        );
        echo json_encode($data);
    }


});

$app->run();
?>