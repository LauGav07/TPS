<?php

function cmToInch($cm) {
    return $cm / 2.54;
}

function inchToCm($inch) {
    return $inch * 2.54;
}

$server = new SoapServer("convert.wsdl");
$server->addFunction("cmToInch");
$server->addFunction("inchToCm");
$server->handle();
?>
