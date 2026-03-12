<?php

$result = "";

if(isset($_POST['value'])){

    $value = $_POST['value'];
    $type = $_POST['type'];

    $client = new SoapClient("http://localhost/soap_converter/converter.wsdl");

    if($type == "cmToInch"){
        $response = $client->cmToInch(["cm"=>$value]);
        $result = $response->inch . " inch";
    }

    if($type == "inchToCm"){
        $response = $client->inchToCm(["inch"=>$value]);
        $result = $response->cm . " cm";
    }

}

?>

<!DOCTYPE html>
<html>
<head>
<title>SOAP Converter</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">

<h2>Converter cm and inch</h2>

<form method="post">

<input type="number" step="any" name="value" placeholder="Inserisci misura" required>

<select name="type">
<option value="cmToInch">cm to inch</option>
<option value="inchToCm">inch to cm</option>
</select>

<button type="submit">Converti</button>

</form>

<?php
if($result != ""){
    echo "<div class='result'>Risultato: $result</div>";
}
?>

</div>

</body>
</html>