<?php 
require "conn.php";

if(isset($_POST['phone'])){//前端ajax传输过来的额
	$username=$_POST['phone'];//获取用户名
	$password=md5($_POST['userpass']);//获取密码
}else{
	exit('非法操作');
}

//匹配用户名和密码是否同时相等
$result1=mysql_query("select * from user where username='$username'");
$result2=mysql_query("select * from user where username='$username' and userpass='$password'");
if(mysql_fetch_array($result1)){
	if(mysql_fetch_array($result2)){
		echo true;
	}else{
		echo 2;
	}
}else{
	echo false;
}


 ?>