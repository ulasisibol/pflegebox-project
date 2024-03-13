<?php
if(isset($_FILES['pdf']['name'])){
    $uploadDir = 'uploads/'; // PDF dosyalarının kaydedileceği klasör
    $uploadFile = $uploadDir . basename($_FILES['pdf']['name']);

    if(move_uploaded_file($_FILES['pdf']['tmp_name'], $uploadFile)){
        echo "Dosya başarıyla yüklendi.\n";

        // PHPMailer ile e-posta gönderme işlemleri
        require 'phpmail/class.phpmailer.php';
        require 'phpmail/class.smtp.php';

        //Mail Bağlantı Ayarları 
        //Mail Hangi Hesaptan Gönderilecek ise onun bilgilerini yazın.
        $MailSmtpHost = "smtp.gmail.com";
        $MailUserName = "cerenulas8@gmail.com";
        $MailPassword = "efeflbwheybyrfar";
        //Mail Bağlantı Ayarları Tamamlandı

        //Doldurulan Form Mail Olarak Kime Gidecek?
        $MailKimeGidecek1 = "kalkan_pepe@hotmail.com.tr";
        $MailKimeGidecek3 = "antrag@pflegedienstbox.de";

        //Doldurulan Form Mail Olarak Kime Gidecek Tamamlandı

        $mail = new PHPMailer();
        $mail->IsSMTP();
        // SMTP ayarlarınızı burada yapın
        // ...
        $mail->SMTPAuth = true;
        $mail->Host = $MailSmtpHost; //Smtp Host
        $mail->SMTPSecure = 'ssl';  //yada tls
        $mail->Port = 465;  //SSL kullanacaksanız portu 465 olarak değiştiriniz - TLS Portu 587
        $mail->Username = $MailUserName; //Smtp Kullanıcı Adı
        $mail->Password = $MailPassword; //Smtp Parola
        $mail->SetFrom($mail->Username, 'Pflegebox Form');
        $mail->AddAddress("$MailKimeGidecek1", 'Ulaş İşibol'); //Mailin Gideceği Adres ve Alıcı Adı
        $mail->AddAddress("$MailKimeGidecek3", 'Pflegebox'); //Mailin Gideceği
        
        $mail->CharSet = 'UTF-8'; //Mail Karakter Seti
        $mail->Subject = "DENEME"; //Mail Konu Başlığı
        $mail->addAttachment($uploadFile); // PDF dosyasını ekle
        $mail->Subject = 'PDF document';
        $mail->Body    = 'PDF:';

        if(!$mail->send()) {
            echo "<script>alert('Mail konnte nicht gesendet werden. Bitte überprüfen Sie Ihre Internetverbindung. Wenn das Problem weiterhin besteht, wechseln Sie Ihren Browser!');</script>";
        } else {
            echo "<script>alert('Mail wurde gesendet.');</script>";
        }
        
    } else {
        echo "Dosya yüklenirken bir hata oluştu.\n";
    }
}
?>
