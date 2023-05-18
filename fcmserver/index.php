<?php
// Set the FCM server key and endpoint URL
$serverKey = "AAAAzouV4zM:APA91bExwrrAep3zHqU6I7msPAMVK4RSGyxbZSY40kowEdajbpb5YntBAL9WOaW6fDzhHMJII6lZRM7l65n2YfQSHdM2hJlh8RjWJQILBEhlPmECVyFJvE8XsSR2s3eCj1eSrx1Sh5yH";
$endpoint = 'https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send';

// Set the FCM notification payload
$message = array(
    'notification' => array(
        'title' => 'Example Notification',
        'body' => 'This is an example notification sent from PHP',
    ),
    "android"=>array(
        "notification"=> array(
          "image" => "https://foo.bar/pizza-monster.png"
        )
    ),
    'to' => 'f_HtcMvbS2aD7EOqbYBL4U:APA91bEOFealQOTxAnBiVC2HBVTm_Y1xf-HqGH2SmWrXHr_otFnPQNwzWKzRuxD5j17EqsCWsYWXVOUWwc_i2qqSNpKNCXntHvLw9XmBEalwObMLYi8-_MHZPRoIne9h8pIjQHGBoaJ6',
);

// Set the request headers
$headers = array(
    'Authorization: key='.$serverKey,
    'Content-Type: application/json',
);

// Send the request to FCM server
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $endpoint,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($message),
    CURLOPT_HTTPHEADER => $headers,
));
$response = curl_exec($curl);
curl_close($curl);

// Print the response
echo $response;
echo "Hello";
?>
