<?php

declare(strict_types=1);

const RECIPIENT_EMAIL = 'chomawerka@gmail.com';
const SENDER_EMAIL = 'kontakt@stajniazlotapodkowa.pl';
const SITE_NAME = 'Stajnia Złota Podkowa';

const SUCCESS_URL = '/kontakt/dziekujemy/';
const FAILURE_URL = '/kontakt/?blad=1#blad-formularza';

const MIN_FILL_SECONDS = 3;
const MAX_FILL_SECONDS = 60 * 60 * 24;

const FIELD_LIMITS = [
    'name' => 120,
    'contact' => 160,
    'message' => 5000,
];

const TOPICS = [
    'jazdy' => 'Jazdy konne',
    'pensjonat' => 'Pensjonat dla konia',
    'sesja-zdjeciowa' => 'Sesja zdjęciowa',
    'impreza' => 'Impreza / urodziny',
    'hipoterapia' => 'Hipoterapia',
    'inne' => 'Inne',
];

const MESSAGE_SENT = 'Dziękujemy! Wiadomość została wysłana — odezwiemy się najszybciej, jak to możliwe.';
const MESSAGE_INVALID = 'Uzupełnij poprawnie wszystkie wymagane pola i zaznacz zgodę.';
const MESSAGE_TOO_FAST = 'Formularz został wysłany zbyt szybko. Odczekaj chwilę i spróbuj ponownie.';
const MESSAGE_SEND_FAILED = 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas.';

mb_internal_encoding('UTF-8');

function wantsJson(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

function respond(bool $ok, string $message, int $status = 200): never
{
    if (wantsJson()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
        exit;
    }

    header('Location: ' . ($ok ? SUCCESS_URL : FAILURE_URL), true, 303);
    exit;
}

function postedText(string $name): string
{
    $value = $_POST[$name] ?? '';
    return is_string($value) ? trim(str_replace("\0", '', $value)) : '';
}

function containsHeaderBreak(string $value): bool
{
    return preg_match('/[\r\n]/', $value) === 1;
}

function isValidPhone(string $value): bool
{
    return preg_match('/^\+?[0-9][0-9 ()\-]{6,19}$/', $value) === 1;
}

function isValidEmail(string $value): bool
{
    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
}

function exceedsLimit(string $field, string $value): bool
{
    return mb_strlen($value) > FIELD_LIMITS[$field];
}

function isFilledTooFast(): bool
{
    $startedAt = postedText('form_started_at');
    if ($startedAt === '') {
        // The timestamp is set by JavaScript; visitors without JS must still be able to send the form.
        return false;
    }
    $elapsedSeconds = time() - intdiv((int) $startedAt, 1000);
    return $elapsedSeconds < MIN_FILL_SECONDS || $elapsedSeconds > MAX_FILL_SECONDS;
}

function buildBody(string $name, string $contact, string $topicLabel, string $message): string
{
    $lines = [
        'Nowa wiadomość z formularza kontaktowego na stronie ' . SITE_NAME . '.',
        '',
        'Imię i nazwisko: ' . $name,
        'Kontakt: ' . $contact,
        'Temat: ' . $topicLabel,
        'Zgoda na przetwarzanie danych: tak',
        'Wysłano: ' . date('Y-m-d H:i'),
        '',
        'Wiadomość:',
        $message,
    ];
    return preg_replace('/\r\n?|\n/', "\r\n", implode("\n", $lines));
}

function sendMail(string $name, string $contact, string $topicLabel, string $message): bool
{
    $subject = mb_encode_mimeheader("Formularz: {$topicLabel} — {$name}", 'UTF-8', 'B', "\r\n");
    $headers = [
        'From: ' . mb_encode_mimeheader(SITE_NAME, 'UTF-8', 'B', "\r\n") . ' <' . SENDER_EMAIL . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if (isValidEmail($contact)) {
        $headers[] = 'Reply-To: ' . $contact;
    }
    $body = chunk_split(base64_encode(buildBody($name, $contact, $topicLabel, $message)), 76, "\r\n");

    return mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . SENDER_EMAIL);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Dozwolona jest tylko metoda POST.';
    exit;
}

if (postedText('website') !== '') {
    respond(true, MESSAGE_SENT);
}

if (isFilledTooFast()) {
    respond(false, MESSAGE_TOO_FAST, 422);
}

$name = postedText('name');
$contact = postedText('contact');
$topic = postedText('topic');
$message = postedText('message');
$hasConsent = postedText('consent') !== '';

$isValid = $name !== ''
    && $contact !== ''
    && $message !== ''
    && $hasConsent
    && array_key_exists($topic, TOPICS)
    && !exceedsLimit('name', $name)
    && !exceedsLimit('contact', $contact)
    && !exceedsLimit('message', $message)
    && !containsHeaderBreak($name)
    && !containsHeaderBreak($contact)
    && (isValidEmail($contact) || isValidPhone($contact));

if (!$isValid) {
    respond(false, MESSAGE_INVALID, 422);
}

if (!sendMail($name, $contact, TOPICS[$topic], $message)) {
    respond(false, MESSAGE_SEND_FAILED, 500);
}

respond(true, MESSAGE_SENT);
