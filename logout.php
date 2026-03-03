<?php
session_start();

/* Remove todas as sessões */
$_SESSION = [];
session_destroy();

/* Remove cookie remember-me */
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, '/', '', true, true);
}

header('Location: /Login/Login.php');
exit;