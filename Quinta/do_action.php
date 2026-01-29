<?php
$wsdl_url = "http://ppetrozzi.000webhostapp.com/soap/convert.wsdl";

if (isset($_POST['value'], $_POST['operation'])) {

    $client = new SoapClient($wsdl_url, [
        "location" => "http://ppetrozzi.000webhostapp.com/soap/"
    ]);

    $value = floatval($_POST['value']);
    $op = $_POST['operation'];

    if ($op == "cmToInch") {
        $result = $client->cmToInch($value);
        echo "$value cm = $result pollici";
    }

    if ($op == "inchToCm") {
        $result = $client->inchToCm($value);
        echo "$value pollici = $result cm";
    }
}
?>
