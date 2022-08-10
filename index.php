<?php
$saml_lib_path = '/simplesamlphp/lib/_autoload.php';
require_once($saml_lib_path);
// Fuente de autenticacion definida en el authsources del SP ej, default-sp
$SP_ORIGEN = 'desarrollo4sistemas';
// Se crea la instancia del saml, pasando como parametro la fuente de autenticacion.
$saml = new SimpleSAML_Auth_Simple($SP_ORIGEN);
$saml->requireAuth();
$atributos = $saml->getAttributes();

session_start();
$_SESSION["uCorreo"] = $atributos["uCorreo"][0];


?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <script src="js/FileSaver.js"></script> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="./manifest.json">
  



    <meta name="theme-color" content="#2F3BA2">
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <link rel="apple-touch-icon" href="/images/img1.jpg" />
    <link rel="apple-touch-icon" href="/images/img2.jpg" />
    <link rel="apple-touch-icon" href="/images/img3.jpg" />
    <link rel="apple-touch-icon" href="/images/img4.jpg" />
    <link rel="apple-touch-icon" href="/images/img5.webp" />
    <link rel="apple-touch-icon" href="/images/img6.jpg" />
    <link rel="apple-touch-icon" href="/images/img7.jpg" />


    <meta name="apple-mobile-web-app-status-bar" content="#db4938" />
	<link rel="stylesheet" href="./css/style.css"> 



    <title> applitacion crud</title>
</head>

<body>
   
    <p id="uCorreo" hidden> <?php echo $_SESSION["uCorreo"]; ?> </p>

   
 <header>
        <div class="container__input">
            <label>Ingrese un dato</label>
            <input id="tarea" type="text">
            <input id="enter" type="submit" value="Enter">
        </div>
    </header>
    <div class="container__todo" >
     
    </div>
    <script src="./js/app.js"></script>


    <script src="./regist_serviceWorker.js"></script>


</body>

</html>