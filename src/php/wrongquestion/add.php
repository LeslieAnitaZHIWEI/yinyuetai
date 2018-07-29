<?php 
	require "../conn.php";
	$tittle=$_GET['tit'];
	$question=$_GET['que'];
	$resolve=$_GET['res'];
	mysql_query("insert wrongquestion(tittle,question,resolve,time) values('$tittle','$question','$resolve',NOW())");
	echo "添加成功";

 ?>
