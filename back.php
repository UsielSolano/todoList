<?php

$entityBody = file_get_contents('php://input');
$datos=json_decode($entityBody,true); 

$type = gettype($datos);

$ruta="./datos/".$datos["correo"];
file_put_contents($ruta, strval($datos["tareas"]));
echo 'se guardo correctamente ';





