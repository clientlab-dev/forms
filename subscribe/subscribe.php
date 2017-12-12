<?php

function curPageURL() {
 $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
} else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
}
return $pageURL;
}

$identification = $_POST['identification'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$user_message = $_POST['message'];
$page = $_POST['page-title'];

$syte= $_POST['syte'];

$message = "Форма: ".$identification."\r\n";
$subject = $identification;

if($phone == null || $phone == "")
  die("no valid data");

$allow_send = false;

if ( $identification=='Заявка на кредит') {
  $subject = $identification;
  $message .= 'Имя: '.$name."\r\n";
  $message .= 'Телефон: '.$phone."\r\n";
  $message .= 'e-mail: '.$email."\r\n";
  $message .= 'Комментарий: '.$user_message."\r\n";
  $message .= 'Страница: '.$page."\r\n";
  $allow_send = true;
}

//utm-метки
$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_term = $_POST['utm_term'];
$type=$_POST['type'];
$source=$_POST['source'];
$added=$_POST['added'];
$block=$_POST['block'];
$pos=$_POST['pos'];
$key=$_POST['key'];
$campaign=$_POST['campaign'];
$ad=$_POST['ad'];
$phrase=$_POST['phrase'];
$from = $_POST['from'];



$message .= "\r\n\r\n"."Дополнительная информация об источнике перехода:"."\r\n";
$message .= "utm_source: ".$utm_source."\r\n";
$message .= "utm_medium: ".$utm_medium."\r\n";
$message .= "utm_term: ".$utm_term."\r\n";
$message .= "type: ".$type."\r\n";
$message .= "source: ".$source."\r\n";
$message .= "added: ".$added."\r\n";
$message .= "block: ".$block."\r\n";
$message .= "pos: ".$pos."\r\n";
$message .= "key: ".$key."\r\n";
$message .= "campaign: ".$campaign."\r\n";
$message .= "ad: ".$ad."\r\n";
$message .= "phrase: ".$phrase."\r\n";
$message .= "from: ".$from."\r\n";

function smtpmail($subject,$syte,$content, $attach=false){
  require_once('config.php');
  require_once('class.phpmailer.php');
  $mail = new PHPMailer(true);

  $mail->IsSMTP();
  echo $to."<br />".$subject."<br />".$content."<br />";
  try {
    $mail->Host       = $__smtp['host']; 
    $mail->SMTPDebug  = $__smtp['debug']; 
    $mail->SMTPAuth   = $__smtp['auth'];
    $mail->Host       = $__smtp['host'];
    $mail->Port       = $__smtp['port']; 
    $mail->Username   = $__smtp['username'];
    $mail->Password   = $__smtp['password'];
    $mail->SMTPSecure = $__smtp['SMTPSecure'];
 // $mail->AddReplyTo($__smtp['addreply'], $__smtp['username']);

  //Получатели писем
    //$mail->AddAddress('v.kulyabin@clientlab.ru'); // dev
    //$mail->AddAddress('asypko@trinitytrade.ru'); //mng
    $mail->AddAddress('arotermel@trinitytrade.ru'); //clieint
    $mail->AddAddress('i.komaricheva@clientlab.ru'); //clieint

 $mail->SetFrom($__smtp['username']);
 $mail->FromName = "=?utf-8?B?" . base64_encode('Тринити рено') . "?=";
 if($_POST['email'] != ''){
  $mail->AddReplyTo($_POST['email'], 'Клиент');
}else{
  $mail->AddReplyTo($__smtp['addreply'],  $__smtp['username']);
}

$mail->Subject ="=?utf-8?B?" . base64_encode($syte.". ".$subject).  "?=";
$mail->CharSet = 'UTF-8';
$mail ->Body= ''.$content;
if($attach)  $mail->AddAttachment($attach);
$mail->Send();
echo "Message sent Ok!</p>\n";
} catch (phpmailerException $e) {
  echo $e->errorMessage(); 
} catch (Exception $e) {
  echo $e->getMessage(); 
}
}

//если заявка отправлена через форму сайта

if ($allow_send) {
  smtpmail($subject,'Trinity Reno',$message);
} else{
  die("Please use the form on the site");
}//end allow send check


?>