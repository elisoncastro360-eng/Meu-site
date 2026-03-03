if (isset($_POST['remember'])) {
    $token = bin2hex(random_bytes(32));

    setcookie(
        'remember_token',
        $token,
        time() + (60 * 60 * 24 * 30),
        '/',
        '',
        true,
        true
    );

    $pdo->prepare("
        UPDATE usuarios SET remember_token = :token WHERE id = :id
    ")->execute([
        'token' => hash('sha256', $token),
        'id' => $user['id']
    ]);
}