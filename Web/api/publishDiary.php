<?php
	require_once('config.php');

	// Log to file
	$file = 'published.log';
	$fp = fopen($file, 'a+') or die('Could not open file!');
	$json = file_get_contents('php://input');
	fwrite($fp, $json) or die('Could not write to file');
	fclose($fp);

	// Add to database
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	if ($mysqli->connect_errno) {
		die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
	}

	$jsond = json_decode($json);
	$nickname = isset($jsond->config->nickname) ? $jsond->config->nickname : '';
	$age = isset($jsond->config->age) ? $jsond->config->age : '';
	$gender = isset($jsond->config->gender) ? $jsond->config->gender : '';
	$avatar = isset($jsond->config->avatar) ? $jsond->config->avatar : '';
	$picture = isset($jsond->config->picture) ? $jsond->config->picture : '';
	$raw_config = isset($jsond->config) ? json_encode($jsond->config) : '';
	$raw_pictures = isset($jsond->pictures) ? json_encode($jsond->pictures) : '';
	$raw_answers = isset($jsond->answers) ? json_encode($jsond->answers) : '';

	if (!($stmt = $mysqli->prepare('INSERT INTO '. $tbldiaries . ' ( `sent`, `nickname`, `age`, `gender`, `avatar`, `picture`, `raw_config`, `raw_pictures`, `raw_answers` ) VALUES ( NOW(), ?, ?, ?, ?, ?, ?, ?, ? )'))) {
		die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
	}

	if (!$stmt->bind_param("ssssssss", $nickname, $age, $gender, $avatar, $picture, $raw_config, $raw_pictures, $raw_answers)) {
		die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
	}

	if (!$stmt->execute()) {
		die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
	}

	$mysqli->close();

	echo "ok"; // Values: ok / ko