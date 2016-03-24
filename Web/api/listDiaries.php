<?php
	require_once('config.php');

	// Search the database
	$curr_max = isset($_GET['cm']) ? (int) $_GET['cm'] : 0; // If -1 starts from MAX(id) + 1
	$limit = isset($_GET['l']) ? (int) $_GET['l'] : 0;

	$dsn = 'mysql:dbname='.$dbname.';host='.$dbhost;
	try {
		$dbh = new PDO($dsn, $dbuser, $dbpass);
	} catch (PDOException $e) {
    	echo 'Connection failed: ' . $e->getMessage();
	}

	$sth = false;

	if ($curr_max === -1) {
		try{
			$sth = $dbh->prepare('SELECT * FROM '. $tbldiaries . ' INNER JOIN (SELECT id FROM '. $tbldiaries . ' WHERE id < (SELECT MAX(id) + 1 FROM '. $tbldiaries . ') ORDER BY id DESC LIMIT :limit) AS diaries USING(id)');
		} catch(PDOException $e) {
		    echo 'Prepare failed: ' . $e->getMessage();
		}
		$sth->bindValue(":limit", (int) $limit, PDO::PARAM_INT);
	
	} else {
		try{
			$sth = $dbh->prepare('SELECT * FROM '. $tbldiaries . ' INNER JOIN (SELECT id FROM '. $tbldiaries . ' WHERE id < :id ORDER BY id DESC LIMIT :limit) AS diaries USING(id)');
		} catch(PDOException $e) {
		    echo 'Prepare failed: ' . $e->getMessage();
		}
		
		$sth->bindValue(":id", (int) $curr_max, PDO::PARAM_INT);
		$sth->bindValue(":limit", (int) $limit, PDO::PARAM_INT);
	}

	try{
		$sth->execute();
	} catch(PDOException $e) {
	    echo 'Execute failed: ' . $e->getMessage();
	}


	$rows = array();
	while ($row =  $sth->fetch(PDO::FETCH_ASSOC)) {
		$user = new stdClass();
		$user->id = $row['id'];
		$user->avatar = $row['avatar'];
		$user->picture = $row['picture'];
		$user->nickname = $row['nickname'];
		$user->date = $row['sent'];
		$user->answers = json_decode($row['raw_answers']);
		$user->pictures = json_decode($row['raw_pictures']);
		$rows[] = $user;
	}

	if (count($rows) <= 0) {
		die("No record found");
	}

	echo json_encode($rows);

	@$res->close();

	die;
