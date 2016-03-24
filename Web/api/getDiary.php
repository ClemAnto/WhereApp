<?php
	require_once('config.php');

	// Search the database
	$userId = isset($_GET['id']) ? $_GET['id'] : '';

	$dsn = 'mysql:dbname='.$dbname.';host='.$dbhost;
	try {
		$dbh = new PDO($dsn, $dbuser, $dbpass);
	} catch (PDOException $e) {
    	echo 'Connection failed: ' . $e->getMessage();
	}

	try{
		$sth = $dbh->prepare('SELECT * FROM '. $tbldiaries . ' WHERE id = :userid');
	} catch(PDOException $e) {
	    echo 'Prepare failed: ' . $e->getMessage();
	}

	$params = array(':userid' => $userId);

	try{
		$sth->execute($params);
	} catch(PDOException $e) {
	    echo 'Execute failed: ' . $e->getMessage();
	}

	$row = $sth->fetch(PDO::FETCH_ASSOC);

	if (is_null($row)) {
		die("No record found");
	}

	$user = new stdClass();
	$user->avatar = $row['avatar'];
	$user->picture = $row['picture'];
	$user->nickname = $row['nickname'];
	$user->age = $row['age'];
	$user->gender = $row['gender'];
	$user->date = $row['sent'];
	$user->answers = json_decode($row['raw_answers']);
	$user->pictures = json_decode($row['raw_pictures']);
	$user->config = json_decode($row['raw_config']); // add by CI

	echo json_encode($user);

	@$res->close();
	
	die;
