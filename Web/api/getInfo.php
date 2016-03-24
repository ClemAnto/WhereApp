<?php
	require_once('config.php');

	// Collect info
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	if ($mysqli->connect_errno) {
		die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
	}

	if (!($res = $mysqli->query('SELECT MAX(id) AS curr_max, COUNT(*) AS num_recs FROM ' . $tbldiaries))) {
		die("Query failed: (" . $mysqli->errno . ") " . $mysqli->error);
	}

	$row = $res->fetch_assoc();
	if (is_null($row)) {
		die("No record found");
	}

	$info = new stdClass();
	$info->curr_max = $row['curr_max'];
	$info->num_recs = $row['num_recs'];

	echo json_encode($info);

	@$res->close();

	die;
