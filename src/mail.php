<?php
$to = 'music.blog.spb@gmail.com';
$subject = 'New message';
$message = isset($_POST['source']) ? $_POST['source'] : $_POST['name'].$_POST['phone'];
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
header('Location: /?success=true');
?>
