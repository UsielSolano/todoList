<?php 
    $saml_lib_path = '/simplesamlphp/lib/_autoload.php';  
    require_once($saml_lib_path);
    // Fuente de autenticacion definida en el authsources del SP ej, default-sp
	$SP_ORIGEN= 'desarrollo4sistemas';   
    // Se crea la instancia del saml, pasando como parametro la fuente de autenticacion.
	$saml = new SimpleSAML_Auth_Simple($SP_ORIGEN);   
	$saml ->requireAuth();
	$atributos=$saml->getAttributes();

	session_start();
	$_SESSION["uCorreo"]=$atributos["uCorreo"][0];
	echo $_SESSION["uCorreo"];
	var_dump($_SESSION);