<?php 
	require "../conn.php";
	$table=mysql_query("select * from wrongquestion");
	$arr=array();
	for ($i=0; $i < mysql_num_rows($table); $i++) { 
	$arr[$i]=mysql_fetch_array($table,MYSQL_ASSOC);
		
	}
	echo json_encode($arr);
 ?>