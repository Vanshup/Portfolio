<?php
// Set content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$subject = trim($data['subject']);
$message = trim($data['message']);
$to_email = 'vanshitaparab1475@gmail.com';

// Basic validation
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Prepare email
$email_subject = "Portfolio Contact: " . $subject;
$email_body = "
Name: $name
Email: $email
Subject: $subject

Message:
$message

---
This message was sent from your portfolio contact form.
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Try to send email
if (mail($to_email, $email_subject, $email_body, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send message. Please try again or email me directly at vanshitaparab1475@gmail.com'
    ]);
}
?>