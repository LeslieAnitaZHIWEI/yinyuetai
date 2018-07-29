<?php
	require "conn.php";

	if(isset($_POST['phone'])){
	$username=$_POST['phone'];
	$result=mysql_query("select * from user where username='$username'");
	if(mysql_fetch_array($result)){//有重复
		echo true;//1
	}else{
		$username=$_POST['phone'];
		$userpass=md5($_POST['userpass']);//密码
		mysql_query("insert user (username,userpass) values('$username','$userpass')");
		echo 3;
	}
	
	}



?>

