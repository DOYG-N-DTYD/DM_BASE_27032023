<?php  
    $to = "antonpaulau@gmail.com"; // емайл получателя данных из формы    antonpaulau@gmail.com
    $tema = "Заказ DrewMet"; // тема полученного емайла
    $message = "Имя клиента: ".$_POST['nameBMD']."<br>";//присвоить переменной значение, полученное из формы name=name
    $message .= "E-mail: ".$_POST['emailBMD']."<br>"; //полученное из формы name=email
    //$message .= "Номер телефона: ".$_POST['phone']."<br>"; //полученное из формы name=phone
    $message .= "Сообщение: ".$_POST['messageBMD']."<br>"; //полученное из формы name=message
    $headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
    mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных
    header("Location: https://mzdev.webd.pro");
    die();
?>