<?php 
	header('content-type:text/html;charset=utf-8');
	$conn=@mysql_connect('localhost','root','');
	mysql_query("SET NAMES UTF8");
	if(!$conn){
		die('连接失败');
	}
	mysql_select_db('yinyuestore');


	
 ?>