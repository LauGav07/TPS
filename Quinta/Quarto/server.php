<?php

class Converter {

    public function cmToInch($request){
        $cm = $request->cm;
        return ["inch" => $cm / 2.54];
    }

    public function inchToCm($request){
        $inch = $request->inch;
        return ["cm" => $inch * 2.54];
    }

}

$server = new SoapServer("converter.wsdl");
$server->setClass("Converter");
$server->handle();

?>