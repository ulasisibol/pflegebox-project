

// PAGE-1 BAŞLANGICI

document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".carousel-control-next");
    const prevButton = document.querySelector(".carousel-control-prev");
    const carouselIndicators = document.querySelectorAll(".carousel-indicators li");

    nextButton.addEventListener("click", function () {
        const activeIndicator = document.querySelector(".carousel-indicators li.active");
        const nextIndicator = activeIndicator.nextElementSibling;

        const activeItem = document.querySelector(".carousel-item.active");
        const nextItem = activeItem.nextElementSibling;

        if (nextIndicator && nextItem) {
            activeIndicator.classList.remove("active");
            nextIndicator.classList.add("active");
            activeItem.classList.remove("active");
            nextItem.classList.add("active");
        }
    });

    prevButton.addEventListener("click", function () {
        const activeIndicator = document.querySelector(".carousel-indicators li.active");
        const prevIndicator = activeIndicator.previousElementSibling;

        const activeItem = document.querySelector(".carousel-item.active");
        const prevItem = activeItem.previousElementSibling;

        if (prevIndicator && prevItem) {
            activeIndicator.classList.remove("active");
            prevIndicator.classList.add("active");
            activeItem.classList.remove("active");
            prevItem.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselIndicators = document.querySelectorAll(".carousel-indicators li");

    carouselIndicators.forEach(function (indicator, index) {
        indicator.addEventListener("click", function () {
            const activeIndicator = document.querySelector(".carousel-indicators li.active");
            const activeItem = document.querySelector(".carousel-item.active");

            activeIndicator.classList.remove("active");
            indicator.classList.add("active");

            activeItem.classList.remove("active");
            const items = document.querySelectorAll(".carousel-item");
            items[index].classList.add("active");
        });
    });
});



// PAGE-1 SONU


// PAGE-2 BAŞLANGICI

// Başlangıçta progress bar'ı boş göster
updateProgressBar(0);

// Progress barı güncelleyen fonksiyon
function updateProgressBar(totalAmount) {
    // Progress bar öğesini seç
    var progressBar = document.querySelector('.w3-grey');
    if (progressBar) {
        // Toplam miktarın progress bar üzerindeki yüzdesini hesapla
        var percentage = (totalAmount / 10) * 100;
        // Progress barı güncelle, soldan başlayarak dolacak şekilde
        progressBar.style.width = percentage + '%';
    }
    document.getElementById('totalAmount').textContent = totalAmount;




    // TotalAmount 10 olduğunda bütün count-right düğmelerini inaktif hale getir
    // TotalAmount 10'dan küçükse count-right düğmelerini aktif hale getir
    var countRightButtons = document.querySelectorAll('.count-right');
    countRightButtons.forEach(function (button) {
        if (totalAmount >= 10) {
            button.classList.add('inactive');
        }

        else if (totalAmount >= 8 | totalAmount >= 9) {
            disableThreePointProducts(true);
            if (totalAmount == 8)
                button.classList.remove('inactive');

        }
        else {
            button.classList.remove('inactive');
        }
        if (totalAmount == 9) {
            disableOnePointProducts(false);
            disableTwoPointProducts(true)
        }
    });
}

// Sayfa tamamen yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function () {
    // Başlangıçta progress bar'ı boş göster
    updateProgressBar(0);

    // Toplam miktarı güncelleyen fonksiyon
    function updateTotalAmount() {
        var totalAmount = 0; // Toplam miktarı saklamak için bir değişken oluştur
        var countElements = document.querySelectorAll('.box-count'); // Tüm sayı öğelerini seç

        // Her bir sayı öğesi üzerinde döngü oluştur
        countElements.forEach(function (countElement) {
            var count = parseInt(countElement.textContent); // Mevcut sayı değerini al
            var amount = parseFloat(countElement.dataset.price); // Ürün fiyatını al
            totalAmount += count * amount; // Toplam miktarı güncelle
        });

        // Toplam miktar 10'u geçiyorsa, ekleme yapma
        if (totalAmount >= 10) {
            var countRightButtons = document.querySelectorAll('.count-right');
            countRightButtons.forEach(function (button) {
                button.classList.add('inactive');
            });
        }

        // Toplam miktarı gösteren öğeyi bul ve güncelle
        var totalAmountElement = document.querySelector('.total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = totalAmount.toFixed(2); // Toplam miktarı göster
        }

        // Progress barı güncelle
        updateProgressBar(totalAmount);
    }

    // 'count-left' class'ına sahip tüm butonlar üzerinde döngü oluştur
    var countLeftButtons = document.querySelectorAll('.count-left');
    countLeftButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var countElement = button.nextElementSibling; // Sayıyı tutan kardeş öğeyi al
            var count = parseInt(countElement.textContent); // Mevcut sayı değerini al
            // Sayı 0'dan büyükse sayıyı azalt
            if (count > 0) {
                count--;
                countElement.textContent = count; // Gösterilen sayıyı güncelle
                // Sayı 0'dan büyükse 'inactive' sınıfını kaldır
                button.classList.remove('inactive');
                // Toplam miktarı güncelle
                updateTotalAmount();
            }
            // Sayı 0 ise 'inactive' sınıfını ekle
            if (count === 0) {
                button.classList.add('inactive');
            }
        });
    });

    // 'count-right' class'ına sahip tüm butonlar üzerinde döngü oluştur
    var countRightButtons = document.querySelectorAll('.count-right');
    countRightButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Eğer toplam miktar 10'u geçmiyorsa ve buton inaktif değilse devam et
            if (!button.classList.contains('inactive')) {
                var countElement = button.previousElementSibling; // Sayıyı tutan kardeş öğeyi al
                var count = parseInt(countElement.textContent); // Mevcut sayı değerini al
                // Sayıyı artır
                count++;
                // Eğer totalAmount 10'u geçiyorsa, ekleme yapma
                if (count <= 10) {
                    countElement.textContent = count; // Gösterilen sayıyı güncelle
                    // Sol butona ait 'inactive' sınıfını kaldır
                    button.parentNode.querySelector('.count-left').classList.remove('inactive');
                    // Toplam miktarı güncelle
                    var totalAmount = updateTotalAmount();
                    // Total amount 10'u geçiyorsa, bütün count-right düğmelerini inaktif hale getir
                    if (totalAmount >= 10) {
                        countRightButtons.forEach(function (rightButton) {
                            rightButton.classList.add('inactive');
                        });
                    }
                }
            }
        });
    });

});


var selectedItems = [];

function updateSelectedItems() {
    // Seçili ürünlerin bilgilerini içeren bir dizi oluştur
    selectedItems = []; // Her seferinde diziyi temizle

    // Tüm kutu öğelerini seç
    var boxItems = document.querySelectorAll('.box-item');

    // Her bir kutu öğesi üzerinde döngü oluştur
    boxItems.forEach(function (boxItem) {
        // Kutu öğesinden seçilen miktarı ve bilgileri al
        var count = parseInt(boxItem.querySelector('.box-count').textContent);
        var title = boxItem.querySelector('h3').textContent;
        var details = boxItem.querySelector('p').textContent;

        // Eğer seçilen miktar 0'dan büyükse, seçili ürünler dizisine ekle
        if (count > 0) {
            selectedItems.push(count + 'x ' + title + ' (' + details + ')');

            localStorage.setItem(title, count);
        }
        if (count === 0) {
            localStorage.removeItem(title);
        }

    });

    // 'box-items-selected' sınıfına sahip div'i seç
    var selectedItemsDiv = document.querySelector('.box-items-selected');

    // Seçili ürünler dizisini HTML içeriğine dönüştür ve 'box-items-selected' div'inin içine yerleştir
    selectedItemsDiv.innerHTML = selectedItems.join('<br>');
}


// 'DOMContentLoaded' olayı gerçekleştiğinde ve ürün miktarı değiştiğinde seçili ürünleri güncelle
document.addEventListener('DOMContentLoaded', function () {
    updateSelectedItems(); // Başlangıçta seçili ürünleri güncelle

    // Tüm 'count-right' sınıfına sahip öğeleri seç
    var countRightButtons = document.querySelectorAll('.count-right');
    countRightButtons.forEach(function (countRightButton) {
        // Her bir 'count-right' öğesine tıklama olayı ekle
        countRightButton.addEventListener('click', function () {
            updateSelectedItems(); // Seçili ürünleri güncelle
        });
    });

    // Tüm 'count-left' sınıfına sahip öğeleri seç
    var countLeftButtons = document.querySelectorAll('.count-left');
    countLeftButtons.forEach(function (countLeftButton) {
        // Her bir 'count-left' öğesine tıklama olayı ekle
        countLeftButton.addEventListener('click', function () {
            updateSelectedItems(); // Seçili ürünleri güncelle
        });
    });
});

// 'count-right' butonlarının durumunu güncelleyen fonksiyon
function disableOnePointProducts(disable) {
    var threePointProducts = document.querySelectorAll('.box-count[data-price="1"]'); // 3 puanlık ürünleri seç
    threePointProducts.forEach(function (product) {
        var countRightButton = product.parentNode.querySelector('.count-right'); // 'count-right' butonunu al
        if (disable) { // Eğer inaktif hale getirilmek isteniyorsa
            countRightButton.classList.add('inactive'); // 'count-right' butonunu inaktif yap
        } else { // Eğer aktif hale getirilmek isteniyorsa
            countRightButton.classList.remove('inactive'); // 'count-right' butonunu aktif yap
        }
    });
}
function disableTwoPointProducts(disable) {
    var threePointProducts = document.querySelectorAll('.box-count[data-price="2"]'); // 3 puanlık ürünleri seç
    threePointProducts.forEach(function (product) {
        var countRightButton = product.parentNode.querySelector('.count-right'); // 'count-right' butonunu al
        if (disable) { // Eğer inaktif hale getirilmek isteniyorsa
            countRightButton.classList.add('inactive'); // 'count-right' butonunu inaktif yap
        } else { // Eğer aktif hale getirilmek isteniyorsa
            countRightButton.classList.remove('inactive'); // 'count-right' butonunu aktif yap
        }
    });
}
// 'count-right' butonlarının durumunu güncelleyen fonksiyon
function disableThreePointProducts(disable) {
    var threePointProducts = document.querySelectorAll('.box-count[data-price="3"]'); // 3 puanlık ürünleri seç
    threePointProducts.forEach(function (product) {
        var countRightButton = product.parentNode.querySelector('.count-right'); // 'count-right' butonunu al
        if (disable) { // Eğer inaktif hale getirilmek isteniyorsa
            countRightButton.classList.add('inactive'); // 'count-right' butonunu inaktif yap
        } else { // Eğer aktif hale getirilmek isteniyorsa
            countRightButton.classList.remove('inactive'); // 'count-right' butonunu aktif yap
        }
    });
}

// PAGE-2 SONU

//LOCALSTORAGE İŞLEMLERİ


var standard = "1x Nitril Handschuhe (100 Stk.) 1x Mundschutz (50 Stk.) 1x Flächendesinfektion (1.000 ml, Spray), 1x Handdesinfektionsgel (500 ml, inkl. Pumpspender)";
var inkontinenz = "2x Bettschutzunterlagen ( 2x 25 Stk.) 1x Flächendesinfektion (1.000 ml, Spray) 1x Handdesinfektionsgel (500 ml, inkl. Pumpspender)";
var desinfektion = "2xFlächendesinfektion (1.000 ml, Spray) 2x Handdesinfektionsgel (500 ml, inkl. Pumpspender)";

// Her butona tıklamayı dinle
document.getElementById("individuell").addEventListener("click", handleClick);
document.getElementById("standard").addEventListener("click", handleClick);
document.getElementById("inkontinenz").addEventListener("click", handleClick);
document.getElementById("desinfektion").addEventListener("click", handleClick);

//page-1 hangi butonun seçildiğini alıp selected'e ata
var button1Value = document.querySelector('#individuell').value;
var button2Value = document.querySelector('#standard').value;
var button3Value = document.querySelector('#inkontinenz').value;
var button4Value = document.querySelector('#desinfektion').value;


function handleClick(event) {
    // Hangi butona tıklandığını al
    var clickedButtonId = event.target.id;

    // Hangi butona tıklandığını kontrol et
    if (clickedButtonId === "individuell") {
        var selected = localStorage.setItem('selected', button1Value);
    }
    else if (clickedButtonId === "standard") {
        var selected = localStorage.setItem('selected', button2Value);
        var selectedProducts = localStorage.setItem('selectedProducts', standard);
        localStorage.setItem('gratis', 'Feuchte Waschhandschuhe mit Schutzcreme');


    } else if (clickedButtonId === "inkontinenz") {
        var selected = localStorage.setItem('selected', button3Value);
        var selectedProducts = localStorage.setItem('selectedProducts', inkontinenz);
        localStorage.setItem('gratis', 'Inkontinenz Reinigungs-/Pflegetücher');


    } else if (clickedButtonId === "desinfektion") {
        var selected = localStorage.setItem('selected', button4Value);
        var selectedProducts = localStorage.setItem('selectedProducts', desinfektion);
        localStorage.setItem('gratis', 'Shampoo-Haube');


    } else {
        console.log("Bilinmeyen bir butona tıklandı");
    }
}

//page-1.1
function myFunction() {
    var clickedButton = document.getElementById('individuellProducts');
    if (clickedButton.id === "individuellProducts") {
        var selectedProducts = localStorage.setItem('selectedProducts', selectedItems);

    }
}

//page-4

// Fonksiyon formdan seçilen değeri alır, bir değişkene atar ve localStorage'a kaydeder
function kaydetVeAta() {
    // Seçilen değeri al
    var gratis = document.querySelector('input[name="bedpads"]:checked').value;

    localStorage.setItem('gratis', gratis);
}

//page-3



//LOCALSTORAGE İŞLEMLERİ SONU




