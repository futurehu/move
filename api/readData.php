<?php
     header('content-type:application/json;charset=utf-8');
    $str=file_get_contents('../json/nav.json');
    // echo $str;
    $arr=json_decode($str);//二维数组
    // print_r($arr);
//    定义一个响应的数组
    $response=[
        "code"=>"0",
        "msg"=>'请求失败'
    ];
    if( $arr){
        $response['code']='ok';
       $response[ "msg"]='请求成功';
       $response['data']=$arr;
    }
    echo json_encode($response);
?>