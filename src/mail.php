<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';


$email = $_POST['user_mail'];

                        

$mail->isSMTP();                                   
$mail->Host = 'smtp.mail.ru';  																						
$mail->SMTPAuth = true;                              
$mail->Username = '120587@internet.ru'; 
$mail->Password = 'uaYP*ofIPt45'; 
$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465; 
$mail->setFrom('120587@internet.ru');
$mail->addAddress('2288986@gmail.com');   

$mail->isHTML(true);                                  

$mail->Subject = 'Заявка с High-Pass';

$mail->Body    = '' .$email . ' Подписался на рассылку ';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>