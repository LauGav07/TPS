<?php
$wsdl_url = "http://localhost/soap/convert.wsdl";

if (isset($_POST['value'], $_POST['operation'])) {

    $client = new SoapClient($wsdl_url);

    $value = floatval($_POST['value']);

    if ($_POST['operation'] == "cmToInch") {
        echo $value . " cm = " . $client->cmToInch($value) . " pollici";
    }

    if ($_POST['operation'] == "inchToCm") {
        echo $value . " pollici = " . $client->inchToCm($value) . " cm";
    }
}
?>
