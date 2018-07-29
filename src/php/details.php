<?php 
	$proid=$_GET['id'];
	$data=file_get_contents('http://shop.yinyuetai.com/goods/detail.json?goodsId='.$proid);
	echo $data;


 ?>