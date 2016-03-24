<?php
	require_once('config.php');

	// Export all surveys data from the database
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	if ($mysqli->connect_errno) {
		die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
	}

	if (!($res = $mysqli->query('SELECT * FROM '. $tbldiaries . ' ORDER BY id DESC'))) {
		die("Query failed: (" . $mysqli->errno . ") " . $mysqli->error);
	}

	$rows = array();
	while ($row = $res->fetch_assoc()) {
		//$csv = '"' . $row['sent'] . '","' . $row['age'] . '","' . $row['gender'] . '"';
		$csv = array($row['sent'], $row['age'], $row['gender']);
		$raw_answers = json_decode($row['raw_answers']);
		foreach ($raw_answers as $q) {
			foreach ($q as $a) {
				//$csv .= ',"' . $a . '"';
				$csv[] = $a;
			}
		}
		$rows[] = $csv;
	}

	if (count($rows) <= 0) {
		die("No record found");
	}

	// output headers so that the file is downloaded rather than displayed
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename=data.csv');

	// create a file pointer connected to the output stream
	$output = fopen('php://output', 'w');

	// output the column headings
	fputcsv($output, array('Sent', 'Age', 'Gender', 'S1 Q1', 'S1 Q2', 'S2 Q1', 'S2 Q2', 'S3 Q1', 'S3 Q2', 'S4 Q1', 'S4 Q2', 'S5 Q1', 'S5 Q2', 'S6 Q1', 'S6 Q2'));

	// loop over the rows, outputting them
	foreach ($rows as $row) fputcsv($output, $row);

	@$res->close();

	die;


