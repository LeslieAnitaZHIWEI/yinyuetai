<?php 
	require 'conn.php';

	class data{

	}
	$data=new data();

	$info=mysql_query("select * from startop");
	$startop=array();
	for ($i=0; $i < mysql_num_rows($info); $i++) { 
		$startop[$i]=mysql_fetch_array($info,MYSQL_ASSOC);	
	}
	$data->startop=$startop;

	$goodstop=array();
	$info=mysql_query("select * from goodstop");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$goodstop[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->goodstop=$goodstop;

	$newcd=array();
	$info=mysql_query("select * from newcd");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$newcd[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->newcd=$newcd;

	$mostlove=array();
	$info=mysql_query("select * from mostlove");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$mostlove[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->mostlove=$mostlove;

	$recommend=array();
	$info=mysql_query("select * from recommend");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$recommend[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->recommend=$recommend;

	$neidisale=array();
	$info=mysql_query("select * from neidisale");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$neidisale[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->neidisale=$neidisale;

	$jinkousale=array();
	$info=mysql_query("select * from jinkousale");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$jinkousale[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->jinkousale=$jinkousale;

	$surrounding=array();
	$info=mysql_query("select * from surrounding");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$surrounding[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->surrounding=$surrounding;

	$activity=array();
	$info=mysql_query("select * from activity");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$activity[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->activity=$activity;

	$hotsale=array();
	$info=mysql_query("select * from hotsale");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$hotsale[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->hotsale=$hotsale;

	$chinese=array();
	$info=mysql_query("select * from chinese");
	for($i=0; $i<mysql_num_rows($info); $i++){
		$chinese[$i]=mysql_fetch_array($info,MYSQL_ASSOC);
	}
	$data->chinese=$chinese;

	

	echo json_encode($data);
 ?>