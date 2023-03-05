<?php


// Validacija punog imena (dozvoljava slova i razmake)
$fullNameRegex = '/^(?!\s*$)[a-zA-Z\s]{2,100}$/';

// Validacija e-pošte
$emailRegex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

// Validacija predmeta poruke (dozvoljava bilo koji znak osim razmaka)
$subjectRegex = '/^(?!\s*$)[\s\S]{1,100}$/';

// Validacija poruke (dozvoljava bilo koji znak)
$messageRegex = '/^(?!\s*$)[\s\S]{1,1000}$/';

$fullName = $_POST['fullName'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$error = false;
// Provjera punog imena
if (!preg_match($fullNameRegex, $fullName)) {
  $error = true;

}

// Provjera e-pošte
if (!preg_match($emailRegex, $email)) {
  $error = true;
}

// Provjera predmeta poruke
if (!preg_match($subjectRegex, $subject)) {
 $error = true;
}

// Provjera poruke
if (!preg_match($messageRegex, $message)) {
  $error = true;
}

if(!$error){
// Slanje e-pošte
$to = 'vukzdravkovic69@gmail.com';
$subject = $subject;
$message = $message;
$headers = 'From: ' . $email. "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

//mail($to, $subject, $message, $headers);
header("Content-Type: Application/json");
echo json_encode(['data' => ' Uspešno poslata poruka ']);


}else{
	http_response_code(500);
}
