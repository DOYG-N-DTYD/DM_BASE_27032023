<?php
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    $acceptLang = ['ru', 'en']; 
    $lang = in_array($lang, $acceptLang) ? $lang : 'en';
    require_once "index_{$lang}.html"; 
?>