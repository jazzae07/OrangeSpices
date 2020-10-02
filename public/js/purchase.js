$(document).ready(function() {
    $("button.save-btn").click(function() {
        var purchDate = document.getElementById("purchDate").value;
        var expDate = document.getElementById("expDate").value;
        var numItems = document.getElementById("numItems").value;
        var purchPrice = document.getElementById("purchPrice").value;
        var supplyName = document.getElementById("supplyName");
        var supplyID = supplyName.options[supplyName.selectedIndex].getAttribute("data-id");

        if (purchDate == "" || expDate == "" || numItems == "" || purchPrice == "" || supplyName == "Select Supply") {
            alert("Incomplete data");
        } else if (numItems < 0 || purchPrice < 0) {
            alert("Negative number of items and purchase price is invalid")
        } else {
            $.ajax({
                url: '/purchase/add',
                method: 'POST',
                data: {
                    purchDate: purchDate,
                    supplyName: supplyID,
                    numItems: numItems,
                    expDate: expDate,
                    purchPrice: purchPrice
                },
                error: () => callback(),
                success: function() {
                    alert("Purchase successfully added!");
                    window.location.href = "/procurement";
                }
            });
        }
    });
});