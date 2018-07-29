<?php 
	require "../conn.php";
	$id=$_GET['id'];
	mysql_query("delete from wrongquestion where id=$id");
	echo '删除成功';
 ?>