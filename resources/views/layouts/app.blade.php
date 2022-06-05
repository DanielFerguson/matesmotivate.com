<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="{{ asset('js/app.js') }}" defer></script>

    <meta name="description"
        content="Mates Motivate is the next thing in following your goals, we have found in our own lives that the best motivator there is “your mates”. Encourage a stronger commitment, celebrate your wins, and keep you motivated toward completing your goals.">
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://matesmotivate.com/" />
    <meta property="og:title" content="Mates Motivate | Achieve your goals, celebrate success together." />
    <meta property="og:description"
        content="Mates Motivate is the next thing in following your goals, we have found in our own lives that the best motivator there is “your mates”. Encourage a stronger commitment, celebrate your wins, and keep you motivated toward completing your goals." />
    <meta property="og:image" content="https://matesmotivate.com/assets/meta.jpg" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://matesmotivate.com/" />
    <meta property="twitter:title" content="Mates Motivate | Achieve your goals, celebrate success together." />
    <meta property="twitter:description"
        content="Mates Motivate is the next thing in following your goals, we have found in our own lives that the best motivator there is “your mates”. Encourage a stronger commitment, celebrate your wins, and keep you motivated toward completing your goals." />
    <meta property="twitter:image" content="https://matesmotivate.com/assets/meta.jpg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <script src="https://cdn.usefathom.com/script.js" data-site="ZHYFEMUW" defer></script>
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-100">
        @include('layouts.navigation')

        <!-- Page Heading -->
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {{ $header }}
            </div>
        </header>

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </div>
</body>

</html>
